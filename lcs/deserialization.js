"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_pb_1 = require("../__generated__/transaction_pb");
const BufferUtil_1 = require("../common/BufferUtil");
const AddressLCS_1 = require("./types/AddressLCS");
const ProgramLCS_1 = require("./types/ProgramLCS");
const RawTransactionLCS_1 = require("./types/RawTransactionLCS");
const TransactionArgumentLCS_1 = require("./types/TransactionArgumentLCS");
const TransactionPayloadLCS_1 = require("./types/TransactionPayloadLCS");
const BigNumber = require('bignumber.js');
class LCSDeserialization {
    static getAddress(cursor) {
        const data = cursor.readXBytes(32);
        return new AddressLCS_1.AddressLCS(BufferUtil_1.BufferUtil.toHex(data));
    }
    static getTransactionArgumentList(cursor) {
        const argLen = cursor.read32();
        const transactionArgs = [];
        for (let i = 0; i < argLen; i++) {
            transactionArgs.push(this.getTransactionArgument(cursor));
        }
        return transactionArgs;
    }





    static getBlockMetadata(cursor) {
      const id = cursor.read32();
      const timestamp_usec = cursor.read64();
      // return console.log(timestamp_usec)
      const previous_block_votes = {}
      const proposer = this.getAddress(cursor);

      var finaleObject = {id:id, timestamp_usec:timestamp_usec, previous_block_votes:previous_block_votes, proposer:proposer};
      return finaleObject;
    }
    


    static getTransaction (SignedTransaction, WriteSet, BlockMetadata) {

      const userTransaction = this.getRawTransaction(SignedTransaction.transaction);

      const writeSet = WriteSet;
      const blockMetadata = BlockMetadata;


      // return TransactionArgumentLCS_1.TransactionArgumentLCS.fromByteArray(data);
      // return userTransaction;

      // const writeSet = WriteSet;
      // const blockMetadata = BlockMetadata;

      var finalObject = {UserTransaction:userTransaction, WriteSet:writeSet, BlockMetadata:blockMetadata};
      return finalObject;
    }

  


    static getTransactionArgument(cursor) {
        const argType = cursor.read32();
        if (argType === transaction_pb_1.TransactionArgument.ArgType.U64) {
            const data = cursor.read64();
            return TransactionArgumentLCS_1.TransactionArgumentLCS.fromU64(data.toString());
        }
        else if (argType === transaction_pb_1.TransactionArgument.ArgType.ADDRESS) {
            const data = this.getAddress(cursor);
            return TransactionArgumentLCS_1.TransactionArgumentLCS.fromAddress(data);
        }
        else if (argType === transaction_pb_1.TransactionArgument.ArgType.STRING) {
            const data = this.getString(cursor);
            return TransactionArgumentLCS_1.TransactionArgumentLCS.fromString(data);
        }
        else if (argType === transaction_pb_1.TransactionArgument.ArgType.BYTEARRAY) {
            const data = this.getByteArray(cursor);
            return TransactionArgumentLCS_1.TransactionArgumentLCS.fromByteArray(data);
        }
        return new TransactionArgumentLCS_1.TransactionArgumentLCS();
    }
    static getProgram(cursor) {
        const code = this.getByteArray(cursor);
        const transactionArgs = this.getTransactionArgumentList(cursor);
        const modules = this.getListByteArray(cursor);
        const prog = new ProgramLCS_1.ProgramLCS();
        prog.setCodeFromBuffer(code);
        transactionArgs.forEach(arg => {
            prog.addTransactionArg(arg);
        });
        modules.forEach(mod => {
            prog.addModule(BufferUtil_1.BufferUtil.toHex(mod));
        });
        return prog;
    }
    // static getRawTransaction(cursor) {
    //     const sender = this.getAddress(cursor);
    //     const sequence = cursor.read64();
    //     const payload = this.getTransactionPayload(cursor);
    //     const maxGasAmount = cursor.read64();
    //     const gasUnitPrice = cursor.read64();
    //     const expiryTime = cursor.read64();
    //     const transaction = new RawTransactionLCS_1.RawTransactionLCS(sender.value, sequence.toString(), payload);
    //     transaction.maxGasAmount = maxGasAmount;
    //     transaction.gasUnitPrice = gasUnitPrice;
    //     transaction.expirtationTime = expiryTime;
    //     return transaction;
    // }



    

    // static getRawTransaction(cursor) {
    //   const sender = this.getAddress(cursor);
    //   const sequence = cursor.read64();
    //   // const payload = this.getTransactionPayload(cursor);
    //   const maxGasAmount = cursor.read64();
    //   const gasUnitPrice = new BigNumber.default(cursor.read64());
    //   const expiryTime = new BigNumber.default(cursor.read64());
    //   // const transaction = new RawTransactionLCS_1.RawTransactionLCS(sender.value, sequence.toString(), payload);
    //   // transaction.maxGasAmount = maxGasAmount;
    //   // transaction.gasUnitPrice = gasUnitPrice;
    //   // transaction.expirtationTime = expiryTime;
    //   return ({sender:sender, sequence:sequence, maxGasAmount:maxGasAmount, gasUnitPrice:gasUnitPrice, expiryTime:expiryTime});
    // }


    static getAddressNew(cursor) {
      const data = cursor.readXXBytes(32);
      // console.log(data);
      return new AddressLCS_1.AddressLCS(BufferUtil_1.BufferUtil.toHex(data));
    }

    // static getPayload(cursor) {
    //   const argType = cursor.read32();
    //   if (argType === transaction_pb_1.TransactionArgument.ArgType.U64) {
    //       const data = cursor.read64();
    //       return TransactionArgumentLCS_1.TransactionArgumentLCS.fromU64(data.toString());
    //   }
    //   else if (argType === transaction_pb_1.TransactionArgument.ArgType.ADDRESS) {
    //       const data = this.getAddress(cursor);
    //       return TransactionArgumentLCS_1.TransactionArgumentLCS.fromAddress(data);
    //   }
    //   else if (argType === transaction_pb_1.TransactionArgument.ArgType.STRING) {
    //       const data = this.getString(cursor);
    //       return TransactionArgumentLCS_1.TransactionArgumentLCS.fromString(data);
    //   }
    //   else if (argType === transaction_pb_1.TransactionArgument.ArgType.BYTEARRAY) {
    //       const data = this.getByteArray(cursor);
    //       return TransactionArgumentLCS_1.TransactionArgumentLCS.fromByteArray(data);
    //   }
    //   return new TransactionArgumentLCS_1.TransactionArgumentLCS();
    // }


    static getArgs(cursor) {
      const argType = cursor.read32();
      if (argType === transaction_pb_1.TransactionArgument.ArgType.U64) {
          const data = cursor.read64();
          return TransactionArgumentLCS_1.TransactionArgumentLCS.fromU64(data.toString());
      }
      else if (argType === transaction_pb_1.TransactionArgument.ArgType.ADDRESS) {
          const data = this.getAddress(cursor);
          return TransactionArgumentLCS_1.TransactionArgumentLCS.fromAddress(data);
      }
      return new TransactionArgumentLCS_1.TransactionArgumentLCS();
    }


    static getRawTransaction(cursor) {

      const sender = this.getAddress(cursor); // WORKS

      // @TODO
      let sequence_number = cursor.read64(); // BigNumber { s: 1, e: 18, c: [Array] },
      sequence_number = new BigNumber(sequence_number).toNumber();

      let args = this.getArgs(cursor); // WORKS

      let value = args.u64; // BigNumber { s: 1, e: 6, c: [Array] }
      value = new BigNumber(value).toNumber(); // WORKS

      // @TODO
      // let receiver = args.address.value; // WORKS
      let receiver = this.getAddressNew(cursor);

      const maxGasAmount =  new BigNumber(cursor.read64()).toNumber(); // WORKS
      const gasUnitPrice = new BigNumber(cursor.read64()).toNumber(); // WORKS 
      const expiryTime = new BigNumber(cursor.read64()).toNumber(); // WORKS


      // const transaction = new RawTransactionLCS_1.RawTransactionLCS(sender.value, sequence.toString(), payload);
      // transaction.maxGasAmount = maxGasAmount;
      // transaction.gasUnitPrice = gasUnitPrice;
      // transaction.expirtationTime = expiryTime;
      
      
      return ({
        sender: sender.value,
        sequence_number: sequence_number, 
        value: value,
        receiver: receiver,
        args: args,
        maxGasAmount: maxGasAmount, 
        gasUnitPrice: gasUnitPrice, 
        expiryTime: expiryTime});
    }





    static getTransactionPayload(cursor) {
        const payload = new TransactionPayloadLCS_1.TransactionPayloadLCS();
        payload.payloadType = cursor.read32();
        // now, only transaction with program payload is supported
        if (payload.payloadType === TransactionPayloadLCS_1.TransactionPayloadType.Program) {
            payload.program = this.getProgram(cursor);
            return payload;
        }
        throw new Error('unsupported TransactionPayload type');
    }
    static getListByteArray(cursor) {
        const len = cursor.read32();
        const byteList = [];
        for (let i = 0; i < len; i++) {
            byteList.push(this.getByteArray(cursor));
        }
        return byteList;
    }
    static getByteArray(cursor) {
        const len = cursor.read32();
        const data = cursor.readXBytes(len);
        return data;
    }
    static getString(cursor) {
        const len = cursor.read32();
        const data = [];
        for (let i = 0; i < len; i++) {
            data.push(cursor.read8());
        }
        return String.fromCharCode.apply(null, data);
    }
}
exports.LCSDeserialization = LCSDeserialization;
