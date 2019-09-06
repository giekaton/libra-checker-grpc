// package: storage
// file: storage.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as get_with_proof_pb from "./get_with_proof_pb";
import * as ledger_info_pb from "./ledger_info_pb";
import * as transaction_pb from "./transaction_pb";
import * as account_state_blob_pb from "./account_state_blob_pb";
import * as proof_pb from "./proof_pb";

export class SaveTransactionsRequest extends jspb.Message { 
    clearTxnsToCommitList(): void;
    getTxnsToCommitList(): Array<transaction_pb.TransactionToCommit>;
    setTxnsToCommitList(value: Array<transaction_pb.TransactionToCommit>): void;
    addTxnsToCommit(value?: transaction_pb.TransactionToCommit, index?: number): transaction_pb.TransactionToCommit;

    getFirstVersion(): number;
    setFirstVersion(value: number): void;


    hasLedgerInfoWithSignatures(): boolean;
    clearLedgerInfoWithSignatures(): void;
    getLedgerInfoWithSignatures(): ledger_info_pb.LedgerInfoWithSignatures | undefined;
    setLedgerInfoWithSignatures(value?: ledger_info_pb.LedgerInfoWithSignatures): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SaveTransactionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SaveTransactionsRequest): SaveTransactionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SaveTransactionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SaveTransactionsRequest;
    static deserializeBinaryFromReader(message: SaveTransactionsRequest, reader: jspb.BinaryReader): SaveTransactionsRequest;
}

export namespace SaveTransactionsRequest {
    export type AsObject = {
        txnsToCommitList: Array<transaction_pb.TransactionToCommit.AsObject>,
        firstVersion: number,
        ledgerInfoWithSignatures?: ledger_info_pb.LedgerInfoWithSignatures.AsObject,
    }
}

export class SaveTransactionsResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SaveTransactionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SaveTransactionsResponse): SaveTransactionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SaveTransactionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SaveTransactionsResponse;
    static deserializeBinaryFromReader(message: SaveTransactionsResponse, reader: jspb.BinaryReader): SaveTransactionsResponse;
}

export namespace SaveTransactionsResponse {
    export type AsObject = {
    }
}

export class GetTransactionsRequest extends jspb.Message { 
    getStartVersion(): number;
    setStartVersion(value: number): void;

    getBatchSize(): number;
    setBatchSize(value: number): void;

    getLedgerVersion(): number;
    setLedgerVersion(value: number): void;

    getFetchEvents(): boolean;
    setFetchEvents(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionsRequest): GetTransactionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionsRequest;
    static deserializeBinaryFromReader(message: GetTransactionsRequest, reader: jspb.BinaryReader): GetTransactionsRequest;
}

export namespace GetTransactionsRequest {
    export type AsObject = {
        startVersion: number,
        batchSize: number,
        ledgerVersion: number,
        fetchEvents: boolean,
    }
}

export class GetTransactionsResponse extends jspb.Message { 

    hasTxnListWithProof(): boolean;
    clearTxnListWithProof(): void;
    getTxnListWithProof(): transaction_pb.TransactionListWithProof | undefined;
    setTxnListWithProof(value?: transaction_pb.TransactionListWithProof): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionsResponse): GetTransactionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionsResponse;
    static deserializeBinaryFromReader(message: GetTransactionsResponse, reader: jspb.BinaryReader): GetTransactionsResponse;
}

export namespace GetTransactionsResponse {
    export type AsObject = {
        txnListWithProof?: transaction_pb.TransactionListWithProof.AsObject,
    }
}

export class GetAccountStateWithProofByVersionRequest extends jspb.Message { 
    getAddress(): Uint8Array | string;
    getAddress_asU8(): Uint8Array;
    getAddress_asB64(): string;
    setAddress(value: Uint8Array | string): void;

    getVersion(): number;
    setVersion(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAccountStateWithProofByVersionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAccountStateWithProofByVersionRequest): GetAccountStateWithProofByVersionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAccountStateWithProofByVersionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAccountStateWithProofByVersionRequest;
    static deserializeBinaryFromReader(message: GetAccountStateWithProofByVersionRequest, reader: jspb.BinaryReader): GetAccountStateWithProofByVersionRequest;
}

export namespace GetAccountStateWithProofByVersionRequest {
    export type AsObject = {
        address: Uint8Array | string,
        version: number,
    }
}

export class GetAccountStateWithProofByVersionResponse extends jspb.Message { 

    hasAccountStateBlob(): boolean;
    clearAccountStateBlob(): void;
    getAccountStateBlob(): account_state_blob_pb.AccountStateBlob | undefined;
    setAccountStateBlob(value?: account_state_blob_pb.AccountStateBlob): void;


    hasSparseMerkleProof(): boolean;
    clearSparseMerkleProof(): void;
    getSparseMerkleProof(): proof_pb.SparseMerkleProof | undefined;
    setSparseMerkleProof(value?: proof_pb.SparseMerkleProof): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAccountStateWithProofByVersionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAccountStateWithProofByVersionResponse): GetAccountStateWithProofByVersionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAccountStateWithProofByVersionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAccountStateWithProofByVersionResponse;
    static deserializeBinaryFromReader(message: GetAccountStateWithProofByVersionResponse, reader: jspb.BinaryReader): GetAccountStateWithProofByVersionResponse;
}

export namespace GetAccountStateWithProofByVersionResponse {
    export type AsObject = {
        accountStateBlob?: account_state_blob_pb.AccountStateBlob.AsObject,
        sparseMerkleProof?: proof_pb.SparseMerkleProof.AsObject,
    }
}

export class GetStartupInfoRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetStartupInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetStartupInfoRequest): GetStartupInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetStartupInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetStartupInfoRequest;
    static deserializeBinaryFromReader(message: GetStartupInfoRequest, reader: jspb.BinaryReader): GetStartupInfoRequest;
}

export namespace GetStartupInfoRequest {
    export type AsObject = {
    }
}

export class GetStartupInfoResponse extends jspb.Message { 

    hasInfo(): boolean;
    clearInfo(): void;
    getInfo(): StartupInfo | undefined;
    setInfo(value?: StartupInfo): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetStartupInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetStartupInfoResponse): GetStartupInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetStartupInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetStartupInfoResponse;
    static deserializeBinaryFromReader(message: GetStartupInfoResponse, reader: jspb.BinaryReader): GetStartupInfoResponse;
}

export namespace GetStartupInfoResponse {
    export type AsObject = {
        info?: StartupInfo.AsObject,
    }
}

export class StartupInfo extends jspb.Message { 

    hasLedgerInfo(): boolean;
    clearLedgerInfo(): void;
    getLedgerInfo(): ledger_info_pb.LedgerInfo | undefined;
    setLedgerInfo(value?: ledger_info_pb.LedgerInfo): void;

    getLatestVersion(): number;
    setLatestVersion(value: number): void;

    getAccountStateRootHash(): Uint8Array | string;
    getAccountStateRootHash_asU8(): Uint8Array;
    getAccountStateRootHash_asB64(): string;
    setAccountStateRootHash(value: Uint8Array | string): void;

    clearLedgerFrozenSubtreeHashesList(): void;
    getLedgerFrozenSubtreeHashesList(): Array<Uint8Array | string>;
    getLedgerFrozenSubtreeHashesList_asU8(): Array<Uint8Array>;
    getLedgerFrozenSubtreeHashesList_asB64(): Array<string>;
    setLedgerFrozenSubtreeHashesList(value: Array<Uint8Array | string>): void;
    addLedgerFrozenSubtreeHashes(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StartupInfo.AsObject;
    static toObject(includeInstance: boolean, msg: StartupInfo): StartupInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StartupInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StartupInfo;
    static deserializeBinaryFromReader(message: StartupInfo, reader: jspb.BinaryReader): StartupInfo;
}

export namespace StartupInfo {
    export type AsObject = {
        ledgerInfo?: ledger_info_pb.LedgerInfo.AsObject,
        latestVersion: number,
        accountStateRootHash: Uint8Array | string,
        ledgerFrozenSubtreeHashesList: Array<Uint8Array | string>,
    }
}
