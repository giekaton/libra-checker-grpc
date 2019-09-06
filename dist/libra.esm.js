import path from 'path';
import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';
import { RawTransaction } from './pb/transaction_pb';

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

function bufferToHex(buffer) {
  return Array
    .from(new Uint8Array(buffer))
    .reverse()
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function deserializeRawTxnBytes(rawTxnBytes) {
  const rawTxn = RawTransaction.deserializeBinary(rawTxnBytes);
  const rawTxnObj = rawTxn.toObject();
  rawTxnObj.senderAccount = Buffer.from(rawTxn.getSenderAccount(), 'base64').toString('hex');
  if (rawTxn.hasProgram() && rawTxn.getProgram().getArgumentsList()) {
    rawTxnObj.program.argumentsList = rawTxn.getProgram().getArgumentsList().map(argument => ({
      type: argument.getType(),
      data: argument.getType() === 0
        ? parseInt(bufferToHex(argument.getData()), 16)
        : argument.getType() === 1
          ? Buffer.from(argument.getData(), 'base64').toString('hex')
          : argument.getData(),
    }));
  }
  return rawTxnObj;
}

function decodeGetTransactionsResult(result) {
  result.txn_list_with_proof.transactions = result.txn_list_with_proof.transactions.map(tx => Object.assign(tx, {
    raw_txn_bytes: deserializeRawTxnBytes(tx.raw_txn_bytes),
    sender_public_key: Buffer.from(tx.sender_public_key, 'base64').toString('hex'),
    sender_signature: Buffer.from(tx.sender_signature, 'base64').toString('hex'),
  }));
  return result;
}

function decodeResult(command, result) {
  switch (command) {
    case 'get_transactions':
      return decodeGetTransactionsResult(result);
    default:
      return result;
  }
}

var utils = {
  decodeResult,
  decodeGetTransactionsResult,
  deserializeRawTxnBytes,
};

var version = "0.0.4";

export { Client, utils, version };
