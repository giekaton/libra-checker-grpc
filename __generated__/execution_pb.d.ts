// package: execution
// file: execution.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as get_with_proof_pb from "./get_with_proof_pb";
import * as ledger_info_pb from "./ledger_info_pb";
import * as transaction_pb from "./transaction_pb";
import * as validator_set_pb from "./validator_set_pb";
import * as vm_errors_pb from "./vm_errors_pb";

export class ExecuteBlockRequest extends jspb.Message { 
    clearTransactionsList(): void;
    getTransactionsList(): Array<transaction_pb.SignedTransaction>;
    setTransactionsList(value: Array<transaction_pb.SignedTransaction>): void;
    addTransactions(value?: transaction_pb.SignedTransaction, index?: number): transaction_pb.SignedTransaction;

    getParentBlockId(): Uint8Array | string;
    getParentBlockId_asU8(): Uint8Array;
    getParentBlockId_asB64(): string;
    setParentBlockId(value: Uint8Array | string): void;

    getBlockId(): Uint8Array | string;
    getBlockId_asU8(): Uint8Array;
    getBlockId_asB64(): string;
    setBlockId(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecuteBlockRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ExecuteBlockRequest): ExecuteBlockRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecuteBlockRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecuteBlockRequest;
    static deserializeBinaryFromReader(message: ExecuteBlockRequest, reader: jspb.BinaryReader): ExecuteBlockRequest;
}

export namespace ExecuteBlockRequest {
    export type AsObject = {
        transactionsList: Array<transaction_pb.SignedTransaction.AsObject>,
        parentBlockId: Uint8Array | string,
        blockId: Uint8Array | string,
    }
}

export class ExecuteBlockResponse extends jspb.Message { 
    getRootHash(): Uint8Array | string;
    getRootHash_asU8(): Uint8Array;
    getRootHash_asB64(): string;
    setRootHash(value: Uint8Array | string): void;

    clearStatusList(): void;
    getStatusList(): Array<vm_errors_pb.VMStatus>;
    setStatusList(value: Array<vm_errors_pb.VMStatus>): void;
    addStatus(value?: vm_errors_pb.VMStatus, index?: number): vm_errors_pb.VMStatus;

    getVersion(): number;
    setVersion(value: number): void;


    hasValidators(): boolean;
    clearValidators(): void;
    getValidators(): validator_set_pb.ValidatorSet | undefined;
    setValidators(value?: validator_set_pb.ValidatorSet): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecuteBlockResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ExecuteBlockResponse): ExecuteBlockResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecuteBlockResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecuteBlockResponse;
    static deserializeBinaryFromReader(message: ExecuteBlockResponse, reader: jspb.BinaryReader): ExecuteBlockResponse;
}

export namespace ExecuteBlockResponse {
    export type AsObject = {
        rootHash: Uint8Array | string,
        statusList: Array<vm_errors_pb.VMStatus.AsObject>,
        version: number,
        validators?: validator_set_pb.ValidatorSet.AsObject,
    }
}

export class CommitBlockRequest extends jspb.Message { 

    hasLedgerInfoWithSigs(): boolean;
    clearLedgerInfoWithSigs(): void;
    getLedgerInfoWithSigs(): ledger_info_pb.LedgerInfoWithSignatures | undefined;
    setLedgerInfoWithSigs(value?: ledger_info_pb.LedgerInfoWithSignatures): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommitBlockRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CommitBlockRequest): CommitBlockRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommitBlockRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommitBlockRequest;
    static deserializeBinaryFromReader(message: CommitBlockRequest, reader: jspb.BinaryReader): CommitBlockRequest;
}

export namespace CommitBlockRequest {
    export type AsObject = {
        ledgerInfoWithSigs?: ledger_info_pb.LedgerInfoWithSignatures.AsObject,
    }
}

export class CommitBlockResponse extends jspb.Message { 
    getStatus(): CommitBlockStatus;
    setStatus(value: CommitBlockStatus): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommitBlockResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CommitBlockResponse): CommitBlockResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommitBlockResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommitBlockResponse;
    static deserializeBinaryFromReader(message: CommitBlockResponse, reader: jspb.BinaryReader): CommitBlockResponse;
}

export namespace CommitBlockResponse {
    export type AsObject = {
        status: CommitBlockStatus,
    }
}

export class ExecuteChunkRequest extends jspb.Message { 

    hasTxnListWithProof(): boolean;
    clearTxnListWithProof(): void;
    getTxnListWithProof(): transaction_pb.TransactionListWithProof | undefined;
    setTxnListWithProof(value?: transaction_pb.TransactionListWithProof): void;


    hasLedgerInfoWithSigs(): boolean;
    clearLedgerInfoWithSigs(): void;
    getLedgerInfoWithSigs(): ledger_info_pb.LedgerInfoWithSignatures | undefined;
    setLedgerInfoWithSigs(value?: ledger_info_pb.LedgerInfoWithSignatures): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecuteChunkRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ExecuteChunkRequest): ExecuteChunkRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecuteChunkRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecuteChunkRequest;
    static deserializeBinaryFromReader(message: ExecuteChunkRequest, reader: jspb.BinaryReader): ExecuteChunkRequest;
}

export namespace ExecuteChunkRequest {
    export type AsObject = {
        txnListWithProof?: transaction_pb.TransactionListWithProof.AsObject,
        ledgerInfoWithSigs?: ledger_info_pb.LedgerInfoWithSignatures.AsObject,
    }
}

export class ExecuteChunkResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecuteChunkResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ExecuteChunkResponse): ExecuteChunkResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecuteChunkResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecuteChunkResponse;
    static deserializeBinaryFromReader(message: ExecuteChunkResponse, reader: jspb.BinaryReader): ExecuteChunkResponse;
}

export namespace ExecuteChunkResponse {
    export type AsObject = {
    }
}

export enum CommitBlockStatus {
    SUCCEEDED = 0,
    FAILED = 1,
}
