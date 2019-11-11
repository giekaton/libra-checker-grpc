"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const BufferUtil_1 = require("../common/BufferUtil");
const ProgamBase64Codes_1 = __importDefault(require("../constants/ProgamBase64Codes"));
const AddressLCS_1 = require("../lcs/types/AddressLCS");
const ProgramLCS_1 = require("../lcs/types/ProgramLCS");
const RawTransactionLCS_1 = require("../lcs/types/RawTransactionLCS");
const TransactionArgumentLCS_1 = require("../lcs/types/TransactionArgumentLCS");
const TransactionPayloadLCS_1 = require("../lcs/types/TransactionPayloadLCS");
class LibraTransaction {
    static createTransfer(sender, recipientAddress, numAccount, sequence) {
        // construct program
        const prog = new ProgramLCS_1.ProgramLCS();
        prog.setCodeFromBuffer(BufferUtil_1.BufferUtil.fromBase64(ProgamBase64Codes_1.default.peerToPeerTxn));
        const recipientAddressLCS = new AddressLCS_1.AddressLCS(recipientAddress);
        prog.addTransactionArg(TransactionArgumentLCS_1.TransactionArgumentLCS.fromAddress(recipientAddressLCS));
        prog.addTransactionArg(TransactionArgumentLCS_1.TransactionArgumentLCS.fromU64(numAccount.toString()));
        // construct payload
        const payload = TransactionPayloadLCS_1.TransactionPayloadLCS.fromProgram(prog);
        // raw transaction
        const transaction = new RawTransactionLCS_1.RawTransactionLCS(sender.getAddress().toHex(), sequence.toString(), payload);
        return transaction;
    }
    static createRotateKey(sender, newAddress, sequence) {
        // construct program
        // const publicKeyNewLCS = LCSSerialization.byteArrayToByte(publicKeyNew)
        const prog = new ProgramLCS_1.ProgramLCS();
        prog.setCodeFromBuffer(BufferUtil_1.BufferUtil.fromBase64(ProgamBase64Codes_1.default.rotateAuthenticationKeyTxn));
        prog.addTransactionArg(TransactionArgumentLCS_1.TransactionArgumentLCS.fromByteArray(BufferUtil_1.BufferUtil.fromHex(newAddress)));
        // construct payload
        const payload = TransactionPayloadLCS_1.TransactionPayloadLCS.fromProgram(prog);
        // raw transaction
        const transaction = new RawTransactionLCS_1.RawTransactionLCS(sender.getAddress().toHex(), sequence.toString(), payload);
        transaction.gasUnitPrice = new bignumber_js_1.default(1);
        return transaction;
    }
}
exports.LibraTransaction = LibraTransaction;
class LibraTransactionResponse {
    constructor(signedTransaction, validatorId, acStatus, mempoolStatus, vmStatus) {
        this.signedTransaction = signedTransaction;
        this.validatorId = validatorId;
        this.acStatus = acStatus;
        this.mempoolStatus = mempoolStatus;
        this.vmStatus = vmStatus;
    }
}
exports.LibraTransactionResponse = LibraTransactionResponse;
var LibraAdmissionControlStatus;
(function (LibraAdmissionControlStatus) {
    LibraAdmissionControlStatus[LibraAdmissionControlStatus["ACCEPTED"] = 0] = "ACCEPTED";
    LibraAdmissionControlStatus[LibraAdmissionControlStatus["BLACKLISTED"] = 1] = "BLACKLISTED";
    LibraAdmissionControlStatus[LibraAdmissionControlStatus["REJECTED"] = 2] = "REJECTED";
    LibraAdmissionControlStatus[LibraAdmissionControlStatus["UNKNOWN"] = -1] = "UNKNOWN";
})(LibraAdmissionControlStatus = exports.LibraAdmissionControlStatus || (exports.LibraAdmissionControlStatus = {}));
var LibraMempoolTransactionStatus;
(function (LibraMempoolTransactionStatus) {
    LibraMempoolTransactionStatus[LibraMempoolTransactionStatus["VALID"] = 0] = "VALID";
    LibraMempoolTransactionStatus[LibraMempoolTransactionStatus["INSUFFICIENTBALANCE"] = 1] = "INSUFFICIENTBALANCE";
    LibraMempoolTransactionStatus[LibraMempoolTransactionStatus["INVALIDSEQNUMBER"] = 2] = "INVALIDSEQNUMBER";
    LibraMempoolTransactionStatus[LibraMempoolTransactionStatus["MEMPOOLISFULL"] = 3] = "MEMPOOLISFULL";
    LibraMempoolTransactionStatus[LibraMempoolTransactionStatus["TOOMANYTRANSACTIONS"] = 4] = "TOOMANYTRANSACTIONS";
    LibraMempoolTransactionStatus[LibraMempoolTransactionStatus["INVALIDUPDATE"] = 5] = "INVALIDUPDATE";
    LibraMempoolTransactionStatus[LibraMempoolTransactionStatus["UNKNOWN"] = -1] = "UNKNOWN";
})(LibraMempoolTransactionStatus = exports.LibraMempoolTransactionStatus || (exports.LibraMempoolTransactionStatus = {}));
class LibraSignedTransaction {
    constructor(transaction, publicKey, signature) {
        this.transaction = transaction;
        this.publicKey = publicKey;
        this.signature = signature;
    }
}
exports.LibraSignedTransaction = LibraSignedTransaction;
class LibraSignedTransactionWithProof {
    constructor(signedTransaction, proof, events) {
        this.signedTransaction = signedTransaction;
        this.proof = proof;
        this.events = events;
    }
}
exports.LibraSignedTransactionWithProof = LibraSignedTransactionWithProof;
// TODO: Implement abstraction over the pb classes for transaction proof
class LibraSignedTransactionProof {
}
class LibraTransactionEvent {
    constructor(data, sequenceNumber, eventKey) {
        this.data = data;
        this.sequenceNumber = new bignumber_js_1.default(sequenceNumber);
        this.eventKey = eventKey;
    }
}
exports.LibraTransactionEvent = LibraTransactionEvent;


// // finish these!

// class BlockMetadata {
//   constructor(transaction, publicKey, signature) {
//       this.transaction = transaction;
//       this.publicKey = publicKey;
//       this.signature = signature;
//   }
// }
// exports.BlockMetadata = BlockMetadata;


// class Transaction {
//   constructor(SignedTransaction, WriteSet, BlockMetadata) {
//       this.SignedTransaction = SignedTransaction;
//       this.WriteSet = WriteSet;
//       this.BlockMetadata = BlockMetadata;
//   }
// }
// exports.Transaction = Transaction;