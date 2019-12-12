// package: types
// file: proof.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as transaction_info_pb from "./transaction_info_pb";

export class AccumulatorProof extends jspb.Message { 
    clearSiblingsList(): void;
    getSiblingsList(): Array<Uint8Array | string>;
    getSiblingsList_asU8(): Array<Uint8Array>;
    getSiblingsList_asB64(): Array<string>;
    setSiblingsList(value: Array<Uint8Array | string>): void;
    addSiblings(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccumulatorProof.AsObject;
    static toObject(includeInstance: boolean, msg: AccumulatorProof): AccumulatorProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccumulatorProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccumulatorProof;
    static deserializeBinaryFromReader(message: AccumulatorProof, reader: jspb.BinaryReader): AccumulatorProof;
}

export namespace AccumulatorProof {
    export type AsObject = {
        siblingsList: Array<Uint8Array | string>,
    }
}

export class SparseMerkleProof extends jspb.Message { 
    getLeaf(): Uint8Array | string;
    getLeaf_asU8(): Uint8Array;
    getLeaf_asB64(): string;
    setLeaf(value: Uint8Array | string): void;

    clearSiblingsList(): void;
    getSiblingsList(): Array<Uint8Array | string>;
    getSiblingsList_asU8(): Array<Uint8Array>;
    getSiblingsList_asB64(): Array<string>;
    setSiblingsList(value: Array<Uint8Array | string>): void;
    addSiblings(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SparseMerkleProof.AsObject;
    static toObject(includeInstance: boolean, msg: SparseMerkleProof): SparseMerkleProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SparseMerkleProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SparseMerkleProof;
    static deserializeBinaryFromReader(message: SparseMerkleProof, reader: jspb.BinaryReader): SparseMerkleProof;
}

export namespace SparseMerkleProof {
    export type AsObject = {
        leaf: Uint8Array | string,
        siblingsList: Array<Uint8Array | string>,
    }
}

export class AccumulatorConsistencyProof extends jspb.Message { 
    clearSubtreesList(): void;
    getSubtreesList(): Array<Uint8Array | string>;
    getSubtreesList_asU8(): Array<Uint8Array>;
    getSubtreesList_asB64(): Array<string>;
    setSubtreesList(value: Array<Uint8Array | string>): void;
    addSubtrees(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccumulatorConsistencyProof.AsObject;
    static toObject(includeInstance: boolean, msg: AccumulatorConsistencyProof): AccumulatorConsistencyProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccumulatorConsistencyProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccumulatorConsistencyProof;
    static deserializeBinaryFromReader(message: AccumulatorConsistencyProof, reader: jspb.BinaryReader): AccumulatorConsistencyProof;
}

export namespace AccumulatorConsistencyProof {
    export type AsObject = {
        subtreesList: Array<Uint8Array | string>,
    }
}

export class AccumulatorRangeProof extends jspb.Message { 
    clearLeftSiblingsList(): void;
    getLeftSiblingsList(): Array<Uint8Array | string>;
    getLeftSiblingsList_asU8(): Array<Uint8Array>;
    getLeftSiblingsList_asB64(): Array<string>;
    setLeftSiblingsList(value: Array<Uint8Array | string>): void;
    addLeftSiblings(value: Uint8Array | string, index?: number): Uint8Array | string;

    clearRightSiblingsList(): void;
    getRightSiblingsList(): Array<Uint8Array | string>;
    getRightSiblingsList_asU8(): Array<Uint8Array>;
    getRightSiblingsList_asB64(): Array<string>;
    setRightSiblingsList(value: Array<Uint8Array | string>): void;
    addRightSiblings(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccumulatorRangeProof.AsObject;
    static toObject(includeInstance: boolean, msg: AccumulatorRangeProof): AccumulatorRangeProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccumulatorRangeProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccumulatorRangeProof;
    static deserializeBinaryFromReader(message: AccumulatorRangeProof, reader: jspb.BinaryReader): AccumulatorRangeProof;
}

export namespace AccumulatorRangeProof {
    export type AsObject = {
        leftSiblingsList: Array<Uint8Array | string>,
        rightSiblingsList: Array<Uint8Array | string>,
    }
}

export class TransactionProof extends jspb.Message { 

    hasLedgerInfoToTransactionInfoProof(): boolean;
    clearLedgerInfoToTransactionInfoProof(): void;
    getLedgerInfoToTransactionInfoProof(): AccumulatorProof | undefined;
    setLedgerInfoToTransactionInfoProof(value?: AccumulatorProof): void;


    hasTransactionInfo(): boolean;
    clearTransactionInfo(): void;
    getTransactionInfo(): transaction_info_pb.TransactionInfo | undefined;
    setTransactionInfo(value?: transaction_info_pb.TransactionInfo): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionProof.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionProof): TransactionProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionProof;
    static deserializeBinaryFromReader(message: TransactionProof, reader: jspb.BinaryReader): TransactionProof;
}

export namespace TransactionProof {
    export type AsObject = {
        ledgerInfoToTransactionInfoProof?: AccumulatorProof.AsObject,
        transactionInfo?: transaction_info_pb.TransactionInfo.AsObject,
    }
}

export class AccountStateProof extends jspb.Message { 

    hasLedgerInfoToTransactionInfoProof(): boolean;
    clearLedgerInfoToTransactionInfoProof(): void;
    getLedgerInfoToTransactionInfoProof(): AccumulatorProof | undefined;
    setLedgerInfoToTransactionInfoProof(value?: AccumulatorProof): void;


    hasTransactionInfo(): boolean;
    clearTransactionInfo(): void;
    getTransactionInfo(): transaction_info_pb.TransactionInfo | undefined;
    setTransactionInfo(value?: transaction_info_pb.TransactionInfo): void;


    hasTransactionInfoToAccountProof(): boolean;
    clearTransactionInfoToAccountProof(): void;
    getTransactionInfoToAccountProof(): SparseMerkleProof | undefined;
    setTransactionInfoToAccountProof(value?: SparseMerkleProof): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccountStateProof.AsObject;
    static toObject(includeInstance: boolean, msg: AccountStateProof): AccountStateProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccountStateProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccountStateProof;
    static deserializeBinaryFromReader(message: AccountStateProof, reader: jspb.BinaryReader): AccountStateProof;
}

export namespace AccountStateProof {
    export type AsObject = {
        ledgerInfoToTransactionInfoProof?: AccumulatorProof.AsObject,
        transactionInfo?: transaction_info_pb.TransactionInfo.AsObject,
        transactionInfoToAccountProof?: SparseMerkleProof.AsObject,
    }
}

export class EventProof extends jspb.Message { 

    hasLedgerInfoToTransactionInfoProof(): boolean;
    clearLedgerInfoToTransactionInfoProof(): void;
    getLedgerInfoToTransactionInfoProof(): AccumulatorProof | undefined;
    setLedgerInfoToTransactionInfoProof(value?: AccumulatorProof): void;


    hasTransactionInfo(): boolean;
    clearTransactionInfo(): void;
    getTransactionInfo(): transaction_info_pb.TransactionInfo | undefined;
    setTransactionInfo(value?: transaction_info_pb.TransactionInfo): void;


    hasTransactionInfoToEventProof(): boolean;
    clearTransactionInfoToEventProof(): void;
    getTransactionInfoToEventProof(): AccumulatorProof | undefined;
    setTransactionInfoToEventProof(value?: AccumulatorProof): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventProof.AsObject;
    static toObject(includeInstance: boolean, msg: EventProof): EventProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventProof;
    static deserializeBinaryFromReader(message: EventProof, reader: jspb.BinaryReader): EventProof;
}

export namespace EventProof {
    export type AsObject = {
        ledgerInfoToTransactionInfoProof?: AccumulatorProof.AsObject,
        transactionInfo?: transaction_info_pb.TransactionInfo.AsObject,
        transactionInfoToEventProof?: AccumulatorProof.AsObject,
    }
}

export class TransactionListProof extends jspb.Message { 

    hasLedgerInfoToTransactionInfosProof(): boolean;
    clearLedgerInfoToTransactionInfosProof(): void;
    getLedgerInfoToTransactionInfosProof(): AccumulatorRangeProof | undefined;
    setLedgerInfoToTransactionInfosProof(value?: AccumulatorRangeProof): void;

    clearTransactionInfosList(): void;
    getTransactionInfosList(): Array<transaction_info_pb.TransactionInfo>;
    setTransactionInfosList(value: Array<transaction_info_pb.TransactionInfo>): void;
    addTransactionInfos(value?: transaction_info_pb.TransactionInfo, index?: number): transaction_info_pb.TransactionInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionListProof.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionListProof): TransactionListProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionListProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionListProof;
    static deserializeBinaryFromReader(message: TransactionListProof, reader: jspb.BinaryReader): TransactionListProof;
}

export namespace TransactionListProof {
    export type AsObject = {
        ledgerInfoToTransactionInfosProof?: AccumulatorRangeProof.AsObject,
        transactionInfosList: Array<transaction_info_pb.TransactionInfo.AsObject>,
    }
}
