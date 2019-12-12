// package: state_synchronizer
// file: state_synchronizer.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as ledger_info_pb from "./ledger_info_pb";
import * as transaction_pb from "./transaction_pb";

export class GetChunkRequest extends jspb.Message { 
    getKnownVersion(): number;
    setKnownVersion(value: number): void;

    getLimit(): number;
    setLimit(value: number): void;

    getTimeout(): number;
    setTimeout(value: number): void;


    hasLedgerInfoWithSigs(): boolean;
    clearLedgerInfoWithSigs(): void;
    getLedgerInfoWithSigs(): ledger_info_pb.LedgerInfoWithSignatures | undefined;
    setLedgerInfoWithSigs(value?: ledger_info_pb.LedgerInfoWithSignatures): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChunkRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetChunkRequest): GetChunkRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChunkRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChunkRequest;
    static deserializeBinaryFromReader(message: GetChunkRequest, reader: jspb.BinaryReader): GetChunkRequest;
}

export namespace GetChunkRequest {
    export type AsObject = {
        knownVersion: number,
        limit: number,
        timeout: number,
        ledgerInfoWithSigs?: ledger_info_pb.LedgerInfoWithSignatures.AsObject,
    }
}

export class GetChunkResponse extends jspb.Message { 

    hasLedgerInfoWithSigs(): boolean;
    clearLedgerInfoWithSigs(): void;
    getLedgerInfoWithSigs(): ledger_info_pb.LedgerInfoWithSignatures | undefined;
    setLedgerInfoWithSigs(value?: ledger_info_pb.LedgerInfoWithSignatures): void;


    hasTxnListWithProof(): boolean;
    clearTxnListWithProof(): void;
    getTxnListWithProof(): transaction_pb.TransactionListWithProof | undefined;
    setTxnListWithProof(value?: transaction_pb.TransactionListWithProof): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetChunkResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetChunkResponse): GetChunkResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetChunkResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetChunkResponse;
    static deserializeBinaryFromReader(message: GetChunkResponse, reader: jspb.BinaryReader): GetChunkResponse;
}

export namespace GetChunkResponse {
    export type AsObject = {
        ledgerInfoWithSigs?: ledger_info_pb.LedgerInfoWithSignatures.AsObject,
        txnListWithProof?: transaction_pb.TransactionListWithProof.AsObject,
    }
}

export class StateSynchronizerMsg extends jspb.Message { 

    hasChunkRequest(): boolean;
    clearChunkRequest(): void;
    getChunkRequest(): GetChunkRequest | undefined;
    setChunkRequest(value?: GetChunkRequest): void;


    hasChunkResponse(): boolean;
    clearChunkResponse(): void;
    getChunkResponse(): GetChunkResponse | undefined;
    setChunkResponse(value?: GetChunkResponse): void;


    getMessageCase(): StateSynchronizerMsg.MessageCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StateSynchronizerMsg.AsObject;
    static toObject(includeInstance: boolean, msg: StateSynchronizerMsg): StateSynchronizerMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StateSynchronizerMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StateSynchronizerMsg;
    static deserializeBinaryFromReader(message: StateSynchronizerMsg, reader: jspb.BinaryReader): StateSynchronizerMsg;
}

export namespace StateSynchronizerMsg {
    export type AsObject = {
        chunkRequest?: GetChunkRequest.AsObject,
        chunkResponse?: GetChunkResponse.AsObject,
    }

    export enum MessageCase {
        MESSAGE_NOT_SET = 0,
    
    CHUNK_REQUEST = 1,

    CHUNK_RESPONSE = 2,

    }

}
