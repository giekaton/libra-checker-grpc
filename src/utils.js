import { RawTransaction } from './pb/transaction_pb';

export function bufferToHex(buffer) {
  return Array
    .from(new Uint8Array(buffer))
    .reverse()
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export function deserializeRawTxnBytes(rawTxnBytes) {
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

export function decodeGetTransactionsResult(result) {
  result.txn_list_with_proof.transactions = result.txn_list_with_proof.transactions.map(tx => Object.assign(tx, {
    raw_txn_bytes: deserializeRawTxnBytes(tx.raw_txn_bytes),
    sender_public_key: Buffer.from(tx.sender_public_key, 'base64').toString('hex'),
    sender_signature: Buffer.from(tx.sender_signature, 'base64').toString('hex'),
  }));
  return result;
}

export function decodeResult(command, result) {
  switch (command) {
    case 'get_transactions':
      return decodeGetTransactionsResult(result);
    default:
      return result;
  }
}

export default {
  decodeResult,
  decodeGetTransactionsResult,
  deserializeRawTxnBytes,
}
