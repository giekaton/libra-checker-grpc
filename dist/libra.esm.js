import path from 'path';
import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';
import { RawTransaction } from './pb/transaction_pb';
import BigNumber from 'bignumber.js';

const PROTO_PATH = path.resolve(__dirname, './pb/admission_control.proto');

class Client {
  constructor(address) {
    this.address = address;
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: Number,
      enums: String,
      defaults: true,
      bytes: String,
      oneofs: true,
    });
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    this.client = new protoDescriptor.admission_control.AdmissionControl(this.address, grpc.credentials.createInsecure());
  }

  request(command, params, cb) {
    const request = {};
    request[`${command}_request`] = params;
    const promise = new Promise((resolve, reject) => {
      this.client.updateToLatestLedger({
        client_known_version: 0,
        requested_items: [request],
      }, (error, response) => {
        const result = error ? null : response.response_items[0][`${command}_response`];
        if (error) return reject(error);
        return resolve(result);
      });
    });
    if (!cb) return promise;
    return promise
      .then(res => cb(null, res))
      .catch(err => cb(err, null));
  }
}

function decodeRawTx(rawTxnBytes) {

  const rawTxn = RawTransaction.deserializeBinary(rawTxnBytes);
  const rawProgram = rawTxn.getProgram();

  const program = {
    arguments: rawProgram.getArgumentsList().map(argument => ({
      type: argument.getType(),
      value: argument.getData_asU8(),
    })),
    code: rawProgram.getCode_asU8(),
    modules: rawProgram.getModulesList_asU8(),
  };

  let gas_price = new BigNumber(rawTxn.getGasUnitPrice()).c[0];
  let gas_max = new BigNumber(rawTxn.getMaxGasAmount()).c[0];

  let to = Buffer.from(program.arguments[0].value, 'base64').toString('hex');

  let value = parseInt(bufferToHex(program.arguments[1].value), 16);

  function bufferToHex (buffer) {
    return Array
      .from(new Uint8Array(buffer))
      .reverse()
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  // program.arguments.address = address;
  // program.arguments.value = value;

  let time = BigNumber(rawTxn.getExpirationTime()).c[0];
  let from = Buffer.from(rawTxn.getSenderAccount_asU8(), 'base64').toString('hex');
  let seq_nr = new BigNumber(rawTxn.getSequenceNumber()).c[0];

  return( { from, to, value, time, seq_nr, gas_price, gas_max } );
}


var utils = {
  decodeRawTx
};

var version = "0.0.4";

export { Client, utils, version };
