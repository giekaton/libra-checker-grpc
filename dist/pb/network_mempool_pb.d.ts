// package: network
// file: network_mempool.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as transaction_pb from "./transaction_pb";

export class MempoolSyncMsg extends jspb.Message { 
    getPeerId(): Uint8Array | string;
    getPeerId_asU8(): Uint8Array;
    getPeerId_asB64(): string;
    setPeerId(value: Uint8Array | string): void;

    clearTransactionsList(): void;
    getTransactionsList(): Array<transaction_pb.SignedTransaction>;
    setTransactionsList(value: Array<transaction_pb.SignedTransaction>): void;
    addTransactions(value?: transaction_pb.SignedTransaction, index?: number): transaction_pb.SignedTransaction;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MempoolSyncMsg.AsObject;
    static toObject(includeInstance: boolean, msg: MempoolSyncMsg): MempoolSyncMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MempoolSyncMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MempoolSyncMsg;
    static deserializeBinaryFromReader(message: MempoolSyncMsg, reader: jspb.BinaryReader): MempoolSyncMsg;
}

export namespace MempoolSyncMsg {
    export type AsObject = {
        peerId: Uint8Array | string,
        transactionsList: Array<transaction_pb.SignedTransaction.AsObject>,
    }
}
