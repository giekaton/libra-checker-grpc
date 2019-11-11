"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const CursorBuffer_1 = require("../common/CursorBuffer");
const PathValues_1 = __importDefault(require("../constants/PathValues"));
const deserialization_1 = require("../lcs/deserialization");
const Transactions_1 = require("../transaction/Transactions");
const Accounts_1 = require("../wallet/Accounts");
/**
 * Internal class used by LibraClient
 * to decode pb generated classes to Libra* Classes export by this library
 *
 */
class ClientDecoder {
    decodeAccountStateBlob(blob) {
        const cursor = new CursorBuffer_1.CursorBuffer(blob);
        const blobLen = cursor.read32();
        const state = {};
        for (let i = 0; i < blobLen; i++) {
            const keyLen = cursor.read32();
            const keyBuffer = new Uint8Array(keyLen);
            for (let j = 0; j < keyLen; j++) {
                keyBuffer[j] = cursor.read8();
            }
            const valueLen = cursor.read32();
            const valueBuffer = new Uint8Array(valueLen);
            for (let k = 0; k < valueLen; k++) {
                valueBuffer[k] = cursor.read8();
            }
            state[Buffer.from(keyBuffer).toString('hex')] = valueBuffer;
        }
        return Accounts_1.AccountState.fromBytes(state[PathValues_1.default.AccountStatePath]);
    }
    decodeSignedTransactionWithProof(signedTransactionWP, newGrpc) {
        var signedTransactionProtobuf = '';
        
        if (!newGrpc) {
          signedTransactionProtobuf = signedTransactionWP.getTransaction();
          signedTransactionProtobuf = signedTransactionProtobuf.getTransaction_asU8();
        }
        else {
          signedTransactionProtobuf = signedTransactionWP;
        }

        const transactionCursor = new CursorBuffer_1.CursorBuffer(signedTransactionProtobuf);

        // skip first 4 byte
        transactionCursor.read32();
        

        // lyg ir veikia
        const signedTransaction = new Transactions_1.LibraSignedTransaction(transactionCursor);
        // const transactionArgument = deserialization_1.LCSDeserialization.getTransactionArgument(transactionCursor);
        // const getAddress = deserialization_1.LCSDeserialization.getAddress(transactionCursor);

        const blockMetadata = deserialization_1.LCSDeserialization.getBlockMetadata(transactionCursor);

        // const writeSet = deserialization_1.LCSDeserialization.getByteArray(transactionCursor);
        const writeSet = deserialization_1.LCSDeserialization.getTransactionArgument(transactionCursor);


        // getSignedTransaction, getBlockMetadata, getWriteSet

        // getTransaction(SignedTransaction, WriteSet, BlockMetadata)

        // return( [ signedTransaction, writeSet, blockMetadata ]);

        const final = deserialization_1.LCSDeserialization.getTransaction(signedTransaction, '', '');

        return (final);

        // @todo
        const transaction = deserialization_1.LCSDeserialization.getRawTransaction(transactionCursor);
        const publicKey = deserialization_1.LCSDeserialization.getByteArray(transactionCursor);
        const signature = deserialization_1.LCSDeserialization.getByteArray(transactionCursor);
        
        const libraSignedTransaction = new Transactions_1.LibraSignedTransaction(transaction, publicKey, signature);
        
        // decode event
        let eventList;
        if (signedTransactionWP.hasEvents()) {
            const events = signedTransactionWP.getEvents();
            eventList = events.getEventsList().map(event => {
                const key = event.getKey_asU8();
                return new Transactions_1.LibraTransactionEvent(event.getEventData_asU8(), new bignumber_js_1.default(event.getSequenceNumber()), key);
            });
        }
        return new Transactions_1.LibraSignedTransactionWithProof(libraSignedTransaction, signedTransactionWP.getProof(), eventList);
    }
}
exports.ClientDecoder = ClientDecoder;
