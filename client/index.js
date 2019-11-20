"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const sha3_1 = __importDefault(require("sha3"));
const admission_control_pb_1 = require("../__generated__/admission_control_pb");
const get_with_proof_pb_1 = require("../__generated__/get_with_proof_pb");
const transaction_pb_1 = require("../__generated__/transaction_pb");
const BufferUtil_1 = require("../common/BufferUtil");
const HashSaltValues_1 = __importDefault(require("../constants/HashSaltValues"));
const ServerHosts_1 = __importDefault(require("../constants/ServerHosts"));
const serialization_1 = require("../lcs/serialization");
const transaction_1 = require("../transaction");
const Accounts_1 = require("../wallet/Accounts");
const Decoder_1 = require("./Decoder");
var LibraNetwork;
(function (LibraNetwork) {
    LibraNetwork["Testnet"] = "testnet";
    // Mainnet = 'mainnet'
})(LibraNetwork = exports.LibraNetwork || (exports.LibraNetwork = {}));
class LibraClient {
    constructor(config) {
        this.config = config;
        if (config.host === undefined) {
            // since only testnet for now
            this.config.host = ServerHosts_1.default.DefaultTestnet;
        }
        if (config.port === undefined) {
            this.config.port = '80';
        }
        if (config.transferProtocol === undefined) {
            this.config.transferProtocol = 'http';
        }
        if (config.dataProtocol === undefined) {
            this.config.dataProtocol = 'grpc';
        }
        // Init Admission Controller Proxy
        if (this.config.dataProtocol === 'grpc') {
            this.admissionControlProxy = require('./Node');
        }
        else {
            this.admissionControlProxy = require('./Browser');
        }
        const connectionAddress = `${this.config.dataProtocol === 'grpc' ? '' : this.config.transferProtocol + '://'}${this.config.host}:${this.config.port}`;
        this.acClient = this.admissionControlProxy.initAdmissionControlClient(connectionAddress);
        this.decoder = new Decoder_1.ClientDecoder();
    }
    /**
     * Uses the faucetService on testnet to mint coins to be sent
     * to receiver.
     *
     * Returns the sequence number for the transaction used to mint
     *
     * Note: `numCoins` should be in base unit i.e microlibra (10^6 I believe).
     */
    async mintWithFaucetService(receiver, numCoins, waitForConfirmation = true) {
        const serverHost = this.config.faucetServerHost || ServerHosts_1.default.DefaultFaucet;
        const coins = new bignumber_js_1.default(numCoins).toString(10);
        const address = receiver.toString();
        const response = await axios_1.default.post(`http://${serverHost}?amount=${coins}&address=${address}`);
        if (response.status !== 200) {
            throw new Error(`Failed to query faucet service. Code: ${response.status}, Err: ${response.data.toString()}`);
        }
        const sequenceNumber = response.data;
        /*
        if (waitForConfirmation) {
          await this.waitForConfirmation(AccountAddress.default(), sequenceNumber);
        }
        */
        return sequenceNumber;
    }
    /**
     * Fetch the current state of an account.
     *
     *
     * @param {string} address Accounts address
     */
    async getAccountState(address) {
        const result = await this.getAccountStates([address]);
        return result[0];
    }
    /**
     * Fetches the current state of multiple accounts.
     *
     * @param {AccountAddressLike[]} addresses Array of users addresses
     */
    async getAccountStates(addresses) {
        const accountAddresses = addresses.map(address => new Accounts_1.AccountAddress(address));
        const request = new get_with_proof_pb_1.UpdateToLatestLedgerRequest();
        accountAddresses.forEach(address => {
            const requestItem = new get_with_proof_pb_1.RequestItem();
            const getAccountStateRequest = new get_with_proof_pb_1.GetAccountStateRequest();
            getAccountStateRequest.setAddress(address.toBytes());
            requestItem.setGetAccountStateRequest(getAccountStateRequest);
            request.addRequestedItems(requestItem);
        });
        const response = await this.admissionControlProxy.updateToLatestLedger(this.acClient, request);
        return response.getResponseItemsList().map((item, index) => {
            const stateResponse = item.getGetAccountStateResponse();
            const stateWithProof = stateResponse.getAccountStateWithProof();
            if (stateWithProof.hasBlob()) {
                const stateBlob = stateWithProof.getBlob();
                const blob = stateBlob.getBlob_asU8();
                return this.decoder.decodeAccountStateBlob(blob);
            }
            return Accounts_1.AccountState.default(accountAddresses[index].toHex());
        });
    }
    /**
     * Returns the Accounts transaction done with sequenceNumber.
     *
     */
    async getAccountTransaction(address, sequenceNumber, fetchEvents = true) {
        const accountAddress = new Accounts_1.AccountAddress(address);
        const parsedSequenceNumber = new bignumber_js_1.default(sequenceNumber);
        const request = new get_with_proof_pb_1.UpdateToLatestLedgerRequest();
        const requestItem = new get_with_proof_pb_1.RequestItem();
        const getTransactionRequest = new get_with_proof_pb_1.GetAccountTransactionBySequenceNumberRequest();
        
        getTransactionRequest.setAccount(accountAddress.toBytes());
        getTransactionRequest.setSequenceNumber(parsedSequenceNumber.toNumber());
        getTransactionRequest.setFetchEvents(fetchEvents);
        
        requestItem.setGetAccountTransactionBySequenceNumberRequest(getTransactionRequest);
        request.addRequestedItems(requestItem);

        const response = await this.admissionControlProxy.updateToLatestLedger(this.acClient, request);
        const responseItems = response.getResponseItemsList();
        if (responseItems.length === 0) {
            return null;
        }

        // return(responseItems[0])

        const r = responseItems[0].getGetAccountTransactionBySequenceNumberResponse();
        
        const signedTransactionWP = r.getTransactionWithProof();

        // console.log(signedTransactionWP);
        // const signedTransactionWP = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKVQwYrgMAAAAAAAACAAAAxAAAAExJQlJBVk0KAQAHAUoAAAAGAAAAA1AAAAAGAAAADVYAAAAGAAAADlwAAAAGAAAABWIAAAAzAAAABJUAAAAgAAAACLUAAAAPAAAAAAAAAQACAAMAAQQAAgACBAIAAwIEAgMABjxTRUxGPgxMaWJyYUFjY291bnQJTGlicmFDb2luBG1haW4PbWludF90b19hZGRyZXNzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQACAAQADAAMARMBAQICAAAAAQAAALwNDscNxNFOw4B99DER4QwQBNoQyaUpLj53f5fnRnzhAAAAAICEHgAAAAAA4CICAAAAAAAAAAAAAAAAAGYovF0AAAAAIAAAAGZPbo826ssXcPqHnYbCwdD6/qFF6E+n1nGregEaVNUJQAAAAF1xjN/zd0lbK/jz5LlgLETIfbhIj4O5pKfaOgK7WldclyKO0PlxDoyS7QEMR7NdOrbiZDJC9GILF4OroN12xg4="
        // return signedTransactionWP.getTransaction().getTransaction_asU8();
        return this.decoder.decodeSignedTransactionWithProof(signedTransactionWP);
    }


    // Get Transaction(-s) by range
    async getTxnByRange(start_version, limit, fetchEvents = true) {
        const parsedStartVersion = new bignumber_js_1.default(start_version);
        const parsedLimit = new bignumber_js_1.default(limit);
        const request = new get_with_proof_pb_1.UpdateToLatestLedgerRequest();
        const requestItem = new get_with_proof_pb_1.RequestItem();
        const getTransactionRequest = new get_with_proof_pb_1.GetTransactionsRequest();

        getTransactionRequest.setStartVersion(parsedStartVersion.toNumber());
        getTransactionRequest.setLimit(parsedLimit.toNumber());
        getTransactionRequest.setFetchEvents(fetchEvents);
        
        requestItem.setGetTransactionsRequest(getTransactionRequest);
        request.addRequestedItems(requestItem);
        
        const response = await this.admissionControlProxy.updateToLatestLedger(this.acClient, request);
        const responseItems = response.getResponseItemsList();
        if (responseItems.length === 0) {
            return null;
        }

        const r = responseItems[0].getGetTransactionsResponse();
        const txnListWithProof = r.getTxnListWithProof();
        const txnList = txnListWithProof.getTransactionsList();
        const txnFirst = txnList[0].getTransaction();

        return this.decoder.decodeSignedTransactionWithProof(txnFirst, true);
    }


    // Get Transaction(-s) by range
    async getTxnByRangePython(start_version, limit, fetchEvents = true) {
      const parsedStartVersion = new bignumber_js_1.default(start_version);
      const parsedLimit = new bignumber_js_1.default(limit);
      const request = new get_with_proof_pb_1.UpdateToLatestLedgerRequest();
      const requestItem = new get_with_proof_pb_1.RequestItem();
      const getTransactionRequest = new get_with_proof_pb_1.GetTransactionsRequest();

      getTransactionRequest.setStartVersion(parsedStartVersion.toNumber());
      getTransactionRequest.setLimit(parsedLimit.toNumber());
      getTransactionRequest.setFetchEvents(fetchEvents);
      
      requestItem.setGetTransactionsRequest(getTransactionRequest);
      request.addRequestedItems(requestItem);
      
      const response = await this.admissionControlProxy.updateToLatestLedger(this.acClient, request);
      const responseItems = response.getResponseItemsList();
      if (responseItems.length === 0) {
          return null;
      }

      const r = responseItems[0].getGetTransactionsResponse();
      const txnListWithProof = r.getTxnListWithProof();
      const txnList = txnListWithProof.getTransactionsList();
      
      if (typeof(txnList[0]) == 'undefined') {
        return "wait";
      }

      const txnFirst = txnList[0].getTransaction()
      
      function toHex(sources) {
        const data = [];
        sources.forEach(x => {
            data.push(x.toString(16).padStart(2, '0'));
        });
        return data.join('');
      }
      let finalHex = BufferUtil_1.BufferUtil.toBase64(txnFirst);    // .getTransaction_asU8()
      return (finalHex);

      // const txnJson = JSON.stringify(txnFirst)
      // return txnJson;

      return txnFirst;
    }


    
    // Get Transaction(-s) by range
    async getTxnByRangePython100(start_version, limit, fetchEvents = true) {
      const parsedStartVersion = new bignumber_js_1.default(start_version);
      const parsedLimit = new bignumber_js_1.default(limit);
      const request = new get_with_proof_pb_1.UpdateToLatestLedgerRequest();
      const requestItem = new get_with_proof_pb_1.RequestItem();
      const getTransactionRequest = new get_with_proof_pb_1.GetTransactionsRequest();

      getTransactionRequest.setStartVersion(parsedStartVersion.toNumber());
      getTransactionRequest.setLimit(parsedLimit.toNumber());
      getTransactionRequest.setFetchEvents(fetchEvents);
      
      requestItem.setGetTransactionsRequest(getTransactionRequest);
      request.addRequestedItems(requestItem);
      
      const response = await this.admissionControlProxy.updateToLatestLedger(this.acClient, request);
      const responseItems = response.getResponseItemsList();
      if (responseItems.length === 0) {
          return null;
      }

      const r = responseItems[0].getGetTransactionsResponse();
      const txnListWithProof = r.getTxnListWithProof();
      const txnList = txnListWithProof.getTransactionsList();

      if (typeof(txnList[0]) == 'undefined') {
        return "wait";
      }

      let txnArray = [];

      txnList.forEach (txn => {
        let singleTxn = txn.getTransaction();
        let finalHex = BufferUtil_1.BufferUtil.toBase64(singleTxn);
        txnArray.push(finalHex);

        if (txnList.length == txnArray.length) {
          returnFinal(txnArray);
        }
      })
      
      return (txnArray);

      function returnFinal(txnArray) {
        // console.log(txnArray);
        return txnArray;
      }

    }


    /**
     * Transfer coins from sender to receipient.
     * numCoins should be in libraCoins based unit.
     *
     */
    async transferCoins(sender, recipientAddress, numCoins, additionalKey) {
        const state = await this.getAccountState(sender.getAddress().toHex());
        let keypair = sender.keyPair;
        if (additionalKey != null) {
            keypair = additionalKey;
        }
        return await this.execute(transaction_1.LibraTransaction.createTransfer(sender, recipientAddress, new bignumber_js_1.default(numCoins), state.sequenceNumber), keypair);
    }
    /**
     *
     * @param transaction
     * @param sender
     */
    async rotateKey(sender, newAddress) {
        const state = await this.getAccountState(sender.getAddress().toHex());
        return await this.execute(transaction_1.LibraTransaction.createRotateKey(sender, newAddress, state.sequenceNumber), sender.keyPair);
    }
    /**
     * Execute a transaction by sender.
     *
     */
    async execute(transaction, sender) {
        const request = new admission_control_pb_1.SubmitTransactionRequest();
        const senderSignature = await this.signTransaction(transaction, sender);
        const rawTxn = serialization_1.LCSSerialization.rawTransactionToByte(senderSignature.transaction);
        const publicKeyLCS = serialization_1.LCSSerialization.byteArrayToByte(senderSignature.publicKey);
        let signedTxn = BufferUtil_1.BufferUtil.concat(rawTxn, publicKeyLCS);
        const signatureLCS = serialization_1.LCSSerialization.byteArrayToByte(senderSignature.signature);
        signedTxn = BufferUtil_1.BufferUtil.concat(signedTxn, signatureLCS);
        const signedTransaction = new transaction_pb_1.SignedTransaction();
        signedTransaction.setTxnBytes(signedTxn);
        request.setTransaction(signedTransaction);
        const response = await this.admissionControlProxy.submitTransaction(this.acClient, request);
        // console.log('getAcStatus: ', response.getAcStatus())
        return response;
    }
    /**
     * Sign the transaction with keyPair and returns a promise that resolves to a LibraSignedTransaction
     *
     *
     */
    async signTransaction(transaction, keyPair) {
        const rawTxn = serialization_1.LCSSerialization.rawTransactionToByte(transaction);
        const signature = this.signRawTransaction(rawTxn, keyPair);
        return new transaction_1.LibraSignedTransaction(transaction, keyPair.getPublicKey(), signature);
    }
    signRawTransaction(rawTransaction, keyPair) {
        const saltHash = new sha3_1.default(256)
            .update(HashSaltValues_1.default.rawTransactionHashSalt, 'utf-8')
            .digest();
        const data = BufferUtil_1.BufferUtil.concat(saltHash, rawTransaction);
        const hash = new sha3_1.default(256)
            .update(BufferUtil_1.BufferUtil.toHex(data), 'hex')
            .digest();
        return keyPair.sign(hash);
    }
}
exports.LibraClient = LibraClient;
exports.LibraNetwork = LibraNetwork;
exports.default = LibraClient;
