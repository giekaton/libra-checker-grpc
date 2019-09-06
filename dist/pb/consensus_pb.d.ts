// package: network
// file: consensus.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as ledger_info_pb from "./ledger_info_pb";
import * as transaction_pb from "./transaction_pb";

export class ConsensusMsg extends jspb.Message { 

    hasProposal(): boolean;
    clearProposal(): void;
    getProposal(): Proposal | undefined;
    setProposal(value?: Proposal): void;


    hasVote(): boolean;
    clearVote(): void;
    getVote(): Vote | undefined;
    setVote(value?: Vote): void;


    hasRequestBlock(): boolean;
    clearRequestBlock(): void;
    getRequestBlock(): RequestBlock | undefined;
    setRequestBlock(value?: RequestBlock): void;


    hasRespondBlock(): boolean;
    clearRespondBlock(): void;
    getRespondBlock(): RespondBlock | undefined;
    setRespondBlock(value?: RespondBlock): void;


    hasTimeoutMsg(): boolean;
    clearTimeoutMsg(): void;
    getTimeoutMsg(): TimeoutMsg | undefined;
    setTimeoutMsg(value?: TimeoutMsg): void;


    hasSyncInfo(): boolean;
    clearSyncInfo(): void;
    getSyncInfo(): SyncInfo | undefined;
    setSyncInfo(value?: SyncInfo): void;


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
        vote?: Vote.AsObject,
        requestBlock?: RequestBlock.AsObject,
        respondBlock?: RespondBlock.AsObject,
        timeoutMsg?: TimeoutMsg.AsObject,
        syncInfo?: SyncInfo.AsObject,
    }

    export enum MessageCase {
        MESSAGE_NOT_SET = 0,
    
    PROPOSAL = 1,

    VOTE = 2,

    REQUEST_BLOCK = 3,

    RESPOND_BLOCK = 4,

    TIMEOUT_MSG = 5,

    SYNC_INFO = 6,

    }

}

export class Proposal extends jspb.Message { 

    hasProposedBlock(): boolean;
    clearProposedBlock(): void;
    getProposedBlock(): Block | undefined;
    setProposedBlock(value?: Block): void;


    hasSyncInfo(): boolean;
    clearSyncInfo(): void;
    getSyncInfo(): SyncInfo | undefined;
    setSyncInfo(value?: SyncInfo): void;


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
        proposedBlock?: Block.AsObject,
        syncInfo?: SyncInfo.AsObject,
    }
}

export class PacemakerTimeout extends jspb.Message { 
    getRound(): number;
    setRound(value: number): void;

    getAuthor(): Uint8Array | string;
    getAuthor_asU8(): Uint8Array;
    getAuthor_asB64(): string;
    setAuthor(value: Uint8Array | string): void;

    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): void;


    hasVote(): boolean;
    clearVote(): void;
    getVote(): Vote | undefined;
    setVote(value?: Vote): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PacemakerTimeout.AsObject;
    static toObject(includeInstance: boolean, msg: PacemakerTimeout): PacemakerTimeout.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PacemakerTimeout, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PacemakerTimeout;
    static deserializeBinaryFromReader(message: PacemakerTimeout, reader: jspb.BinaryReader): PacemakerTimeout;
}

export namespace PacemakerTimeout {
    export type AsObject = {
        round: number,
        author: Uint8Array | string,
        signature: Uint8Array | string,
        vote?: Vote.AsObject,
    }
}

export class TimeoutMsg extends jspb.Message { 

    hasSyncInfo(): boolean;
    clearSyncInfo(): void;
    getSyncInfo(): SyncInfo | undefined;
    setSyncInfo(value?: SyncInfo): void;


    hasPacemakerTimeout(): boolean;
    clearPacemakerTimeout(): void;
    getPacemakerTimeout(): PacemakerTimeout | undefined;
    setPacemakerTimeout(value?: PacemakerTimeout): void;

    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TimeoutMsg.AsObject;
    static toObject(includeInstance: boolean, msg: TimeoutMsg): TimeoutMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TimeoutMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TimeoutMsg;
    static deserializeBinaryFromReader(message: TimeoutMsg, reader: jspb.BinaryReader): TimeoutMsg;
}

export namespace TimeoutMsg {
    export type AsObject = {
        syncInfo?: SyncInfo.AsObject,
        pacemakerTimeout?: PacemakerTimeout.AsObject,
        signature: Uint8Array | string,
    }
}

export class SyncInfo extends jspb.Message { 

    hasHighestQuorumCert(): boolean;
    clearHighestQuorumCert(): void;
    getHighestQuorumCert(): QuorumCert | undefined;
    setHighestQuorumCert(value?: QuorumCert): void;


    hasHighestLedgerInfo(): boolean;
    clearHighestLedgerInfo(): void;
    getHighestLedgerInfo(): QuorumCert | undefined;
    setHighestLedgerInfo(value?: QuorumCert): void;


    hasHighestTimeoutCert(): boolean;
    clearHighestTimeoutCert(): void;
    getHighestTimeoutCert(): PacemakerTimeoutCertificate | undefined;
    setHighestTimeoutCert(value?: PacemakerTimeoutCertificate): void;


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
        highestQuorumCert?: QuorumCert.AsObject,
        highestLedgerInfo?: QuorumCert.AsObject,
        highestTimeoutCert?: PacemakerTimeoutCertificate.AsObject,
    }
}

export class PacemakerTimeoutCertificate extends jspb.Message { 
    getRound(): number;
    setRound(value: number): void;

    clearTimeoutsList(): void;
    getTimeoutsList(): Array<PacemakerTimeout>;
    setTimeoutsList(value: Array<PacemakerTimeout>): void;
    addTimeouts(value?: PacemakerTimeout, index?: number): PacemakerTimeout;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PacemakerTimeoutCertificate.AsObject;
    static toObject(includeInstance: boolean, msg: PacemakerTimeoutCertificate): PacemakerTimeoutCertificate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PacemakerTimeoutCertificate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PacemakerTimeoutCertificate;
    static deserializeBinaryFromReader(message: PacemakerTimeoutCertificate, reader: jspb.BinaryReader): PacemakerTimeoutCertificate;
}

export namespace PacemakerTimeoutCertificate {
    export type AsObject = {
        round: number,
        timeoutsList: Array<PacemakerTimeout.AsObject>,
    }
}

export class Block extends jspb.Message { 
    getId(): Uint8Array | string;
    getId_asU8(): Uint8Array;
    getId_asB64(): string;
    setId(value: Uint8Array | string): void;

    getParentId(): Uint8Array | string;
    getParentId_asU8(): Uint8Array;
    getParentId_asB64(): string;
    setParentId(value: Uint8Array | string): void;

    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): void;

    getRound(): number;
    setRound(value: number): void;

    getHeight(): number;
    setHeight(value: number): void;

    getTimestampUsecs(): number;
    setTimestampUsecs(value: number): void;


    hasQuorumCert(): boolean;
    clearQuorumCert(): void;
    getQuorumCert(): QuorumCert | undefined;
    setQuorumCert(value?: QuorumCert): void;

    getAuthor(): Uint8Array | string;
    getAuthor_asU8(): Uint8Array;
    getAuthor_asB64(): string;
    setAuthor(value: Uint8Array | string): void;

    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): void;


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
        id: Uint8Array | string,
        parentId: Uint8Array | string,
        payload: Uint8Array | string,
        round: number,
        height: number,
        timestampUsecs: number,
        quorumCert?: QuorumCert.AsObject,
        author: Uint8Array | string,
        signature: Uint8Array | string,
    }
}

export class QuorumCert extends jspb.Message { 

    hasVoteData(): boolean;
    clearVoteData(): void;
    getVoteData(): VoteData | undefined;
    setVoteData(value?: VoteData): void;


    hasSignedLedgerInfo(): boolean;
    clearSignedLedgerInfo(): void;
    getSignedLedgerInfo(): ledger_info_pb.LedgerInfoWithSignatures | undefined;
    setSignedLedgerInfo(value?: ledger_info_pb.LedgerInfoWithSignatures): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): QuorumCert.AsObject;
    static toObject(includeInstance: boolean, msg: QuorumCert): QuorumCert.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: QuorumCert, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): QuorumCert;
    static deserializeBinaryFromReader(message: QuorumCert, reader: jspb.BinaryReader): QuorumCert;
}

export namespace QuorumCert {
    export type AsObject = {
        voteData?: VoteData.AsObject,
        signedLedgerInfo?: ledger_info_pb.LedgerInfoWithSignatures.AsObject,
    }
}

export class VoteData extends jspb.Message { 
    getBlockId(): Uint8Array | string;
    getBlockId_asU8(): Uint8Array;
    getBlockId_asB64(): string;
    setBlockId(value: Uint8Array | string): void;

    getRound(): number;
    setRound(value: number): void;

    getExecutedStateId(): Uint8Array | string;
    getExecutedStateId_asU8(): Uint8Array;
    getExecutedStateId_asB64(): string;
    setExecutedStateId(value: Uint8Array | string): void;

    getVersion(): number;
    setVersion(value: number): void;

    getParentBlockId(): Uint8Array | string;
    getParentBlockId_asU8(): Uint8Array;
    getParentBlockId_asB64(): string;
    setParentBlockId(value: Uint8Array | string): void;

    getParentBlockRound(): number;
    setParentBlockRound(value: number): void;

    getGrandparentBlockId(): Uint8Array | string;
    getGrandparentBlockId_asU8(): Uint8Array;
    getGrandparentBlockId_asB64(): string;
    setGrandparentBlockId(value: Uint8Array | string): void;

    getGrandparentBlockRound(): number;
    setGrandparentBlockRound(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VoteData.AsObject;
    static toObject(includeInstance: boolean, msg: VoteData): VoteData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VoteData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VoteData;
    static deserializeBinaryFromReader(message: VoteData, reader: jspb.BinaryReader): VoteData;
}

export namespace VoteData {
    export type AsObject = {
        blockId: Uint8Array | string,
        round: number,
        executedStateId: Uint8Array | string,
        version: number,
        parentBlockId: Uint8Array | string,
        parentBlockRound: number,
        grandparentBlockId: Uint8Array | string,
        grandparentBlockRound: number,
    }
}

export class Vote extends jspb.Message { 

    hasVoteData(): boolean;
    clearVoteData(): void;
    getVoteData(): VoteData | undefined;
    setVoteData(value?: VoteData): void;

    getAuthor(): Uint8Array | string;
    getAuthor_asU8(): Uint8Array;
    getAuthor_asB64(): string;
    setAuthor(value: Uint8Array | string): void;


    hasLedgerInfo(): boolean;
    clearLedgerInfo(): void;
    getLedgerInfo(): ledger_info_pb.LedgerInfo | undefined;
    setLedgerInfo(value?: ledger_info_pb.LedgerInfo): void;

    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Vote.AsObject;
    static toObject(includeInstance: boolean, msg: Vote): Vote.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Vote, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Vote;
    static deserializeBinaryFromReader(message: Vote, reader: jspb.BinaryReader): Vote;
}

export namespace Vote {
    export type AsObject = {
        voteData?: VoteData.AsObject,
        author: Uint8Array | string,
        ledgerInfo?: ledger_info_pb.LedgerInfo.AsObject,
        signature: Uint8Array | string,
    }
}

export class RequestBlock extends jspb.Message { 
    getBlockId(): Uint8Array | string;
    getBlockId_asU8(): Uint8Array;
    getBlockId_asB64(): string;
    setBlockId(value: Uint8Array | string): void;

    getNumBlocks(): number;
    setNumBlocks(value: number): void;


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
        blockId: Uint8Array | string,
        numBlocks: number,
    }
}

export class RespondBlock extends jspb.Message { 
    getStatus(): BlockRetrievalStatus;
    setStatus(value: BlockRetrievalStatus): void;

    clearBlocksList(): void;
    getBlocksList(): Array<Block>;
    setBlocksList(value: Array<Block>): void;
    addBlocks(value?: Block, index?: number): Block;


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
        status: BlockRetrievalStatus,
        blocksList: Array<Block.AsObject>,
    }
}

export enum BlockRetrievalStatus {
    SUCCEEDED = 0,
    ID_NOT_FOUND = 1,
    NOT_ENOUGH_BLOCKS = 2,
}
