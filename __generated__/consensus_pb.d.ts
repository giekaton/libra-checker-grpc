// package: consensus
// file: consensus.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as validator_change_pb from "./validator_change_pb";

export class ConsensusMsg extends jspb.Message { 

    hasProposal(): boolean;
    clearProposal(): void;
    getProposal(): Proposal | undefined;
    setProposal(value?: Proposal): void;


    hasVoteMsg(): boolean;
    clearVoteMsg(): void;
    getVoteMsg(): VoteMsg | undefined;
    setVoteMsg(value?: VoteMsg): void;


    hasRequestBlock(): boolean;
    clearRequestBlock(): void;
    getRequestBlock(): RequestBlock | undefined;
    setRequestBlock(value?: RequestBlock): void;


    hasRespondBlock(): boolean;
    clearRespondBlock(): void;
    getRespondBlock(): RespondBlock | undefined;
    setRespondBlock(value?: RespondBlock): void;


    hasSyncInfo(): boolean;
    clearSyncInfo(): void;
    getSyncInfo(): SyncInfo | undefined;
    setSyncInfo(value?: SyncInfo): void;


    hasEpochChange(): boolean;
    clearEpochChange(): void;
    getEpochChange(): validator_change_pb.ValidatorChangeEventWithProof | undefined;
    setEpochChange(value?: validator_change_pb.ValidatorChangeEventWithProof): void;


    hasRequestEpoch(): boolean;
    clearRequestEpoch(): void;
    getRequestEpoch(): RequestEpoch | undefined;
    setRequestEpoch(value?: RequestEpoch): void;


    getMessageCase(): ConsensusMsg.MessageCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConsensusMsg.AsObject;
    static toObject(includeInstance: boolean, msg: ConsensusMsg): ConsensusMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConsensusMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConsensusMsg;
    static deserializeBinaryFromReader(message: ConsensusMsg, reader: jspb.BinaryReader): ConsensusMsg;
}

export namespace ConsensusMsg {
    export type AsObject = {
        proposal?: Proposal.AsObject,
        voteMsg?: VoteMsg.AsObject,
        requestBlock?: RequestBlock.AsObject,
        respondBlock?: RespondBlock.AsObject,
        syncInfo?: SyncInfo.AsObject,
        epochChange?: validator_change_pb.ValidatorChangeEventWithProof.AsObject,
        requestEpoch?: RequestEpoch.AsObject,
    }

    export enum MessageCase {
        MESSAGE_NOT_SET = 0,
    
    PROPOSAL = 1,

    VOTE_MSG = 2,

    REQUEST_BLOCK = 3,

    RESPOND_BLOCK = 4,

    SYNC_INFO = 5,

    EPOCH_CHANGE = 6,

    REQUEST_EPOCH = 7,

    }

}

export class Proposal extends jspb.Message { 
    getBytes(): Uint8Array | string;
    getBytes_asU8(): Uint8Array;
    getBytes_asB64(): string;
    setBytes(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Proposal.AsObject;
    static toObject(includeInstance: boolean, msg: Proposal): Proposal.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Proposal, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Proposal;
    static deserializeBinaryFromReader(message: Proposal, reader: jspb.BinaryReader): Proposal;
}

export namespace Proposal {
    export type AsObject = {
        bytes: Uint8Array | string,
    }
}

export class SyncInfo extends jspb.Message { 
    getBytes(): Uint8Array | string;
    getBytes_asU8(): Uint8Array;
    getBytes_asB64(): string;
    setBytes(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SyncInfo.AsObject;
    static toObject(includeInstance: boolean, msg: SyncInfo): SyncInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SyncInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SyncInfo;
    static deserializeBinaryFromReader(message: SyncInfo, reader: jspb.BinaryReader): SyncInfo;
}

export namespace SyncInfo {
    export type AsObject = {
        bytes: Uint8Array | string,
    }
}

export class Block extends jspb.Message { 
    getBytes(): Uint8Array | string;
    getBytes_asU8(): Uint8Array;
    getBytes_asB64(): string;
    setBytes(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Block.AsObject;
    static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Block;
    static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
    export type AsObject = {
        bytes: Uint8Array | string,
    }
}

export class VoteMsg extends jspb.Message { 
    getBytes(): Uint8Array | string;
    getBytes_asU8(): Uint8Array;
    getBytes_asB64(): string;
    setBytes(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VoteMsg.AsObject;
    static toObject(includeInstance: boolean, msg: VoteMsg): VoteMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VoteMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VoteMsg;
    static deserializeBinaryFromReader(message: VoteMsg, reader: jspb.BinaryReader): VoteMsg;
}

export namespace VoteMsg {
    export type AsObject = {
        bytes: Uint8Array | string,
    }
}

export class VoteProposal extends jspb.Message { 
    getBytes(): Uint8Array | string;
    getBytes_asU8(): Uint8Array;
    getBytes_asB64(): string;
    setBytes(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VoteProposal.AsObject;
    static toObject(includeInstance: boolean, msg: VoteProposal): VoteProposal.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VoteProposal, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VoteProposal;
    static deserializeBinaryFromReader(message: VoteProposal, reader: jspb.BinaryReader): VoteProposal;
}

export namespace VoteProposal {
    export type AsObject = {
        bytes: Uint8Array | string,
    }
}

export class RequestBlock extends jspb.Message { 
    getBytes(): Uint8Array | string;
    getBytes_asU8(): Uint8Array;
    getBytes_asB64(): string;
    setBytes(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RequestBlock.AsObject;
    static toObject(includeInstance: boolean, msg: RequestBlock): RequestBlock.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RequestBlock, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RequestBlock;
    static deserializeBinaryFromReader(message: RequestBlock, reader: jspb.BinaryReader): RequestBlock;
}

export namespace RequestBlock {
    export type AsObject = {
        bytes: Uint8Array | string,
    }
}

export class RespondBlock extends jspb.Message { 
    getBytes(): Uint8Array | string;
    getBytes_asU8(): Uint8Array;
    getBytes_asB64(): string;
    setBytes(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RespondBlock.AsObject;
    static toObject(includeInstance: boolean, msg: RespondBlock): RespondBlock.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RespondBlock, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RespondBlock;
    static deserializeBinaryFromReader(message: RespondBlock, reader: jspb.BinaryReader): RespondBlock;
}

export namespace RespondBlock {
    export type AsObject = {
        bytes: Uint8Array | string,
    }
}

export class RequestEpoch extends jspb.Message { 
    getBytes(): Uint8Array | string;
    getBytes_asU8(): Uint8Array;
    getBytes_asB64(): string;
    setBytes(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RequestEpoch.AsObject;
    static toObject(includeInstance: boolean, msg: RequestEpoch): RequestEpoch.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RequestEpoch, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RequestEpoch;
    static deserializeBinaryFromReader(message: RequestEpoch, reader: jspb.BinaryReader): RequestEpoch;
}

export namespace RequestEpoch {
    export type AsObject = {
        bytes: Uint8Array | string,
    }
}
