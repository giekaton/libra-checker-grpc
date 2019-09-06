// package: network
// file: network.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class PeerInfo extends jspb.Message { 
    getEpoch(): number;
    setEpoch(value: number): void;

    clearAddrsList(): void;
    getAddrsList(): Array<Uint8Array | string>;
    getAddrsList_asU8(): Array<Uint8Array>;
    getAddrsList_asB64(): Array<string>;
    setAddrsList(value: Array<Uint8Array | string>): void;
    addAddrs(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PeerInfo.AsObject;
    static toObject(includeInstance: boolean, msg: PeerInfo): PeerInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PeerInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PeerInfo;
    static deserializeBinaryFromReader(message: PeerInfo, reader: jspb.BinaryReader): PeerInfo;
}

export namespace PeerInfo {
    export type AsObject = {
        epoch: number,
        addrsList: Array<Uint8Array | string>,
    }
}

export class SignedPeerInfo extends jspb.Message { 
    getPeerInfo(): Uint8Array | string;
    getPeerInfo_asU8(): Uint8Array;
    getPeerInfo_asB64(): string;
    setPeerInfo(value: Uint8Array | string): void;

    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignedPeerInfo.AsObject;
    static toObject(includeInstance: boolean, msg: SignedPeerInfo): SignedPeerInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignedPeerInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignedPeerInfo;
    static deserializeBinaryFromReader(message: SignedPeerInfo, reader: jspb.BinaryReader): SignedPeerInfo;
}

export namespace SignedPeerInfo {
    export type AsObject = {
        peerInfo: Uint8Array | string,
        signature: Uint8Array | string,
    }
}

export class FullNodePayload extends jspb.Message { 
    getEpoch(): number;
    setEpoch(value: number): void;

    getDnsSeedAddr(): Uint8Array | string;
    getDnsSeedAddr_asU8(): Uint8Array;
    getDnsSeedAddr_asB64(): string;
    setDnsSeedAddr(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FullNodePayload.AsObject;
    static toObject(includeInstance: boolean, msg: FullNodePayload): FullNodePayload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FullNodePayload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FullNodePayload;
    static deserializeBinaryFromReader(message: FullNodePayload, reader: jspb.BinaryReader): FullNodePayload;
}

export namespace FullNodePayload {
    export type AsObject = {
        epoch: number,
        dnsSeedAddr: Uint8Array | string,
    }
}

export class SignedFullNodePayload extends jspb.Message { 
    getPayload(): Uint8Array | string;
    getPayload_asU8(): Uint8Array;
    getPayload_asB64(): string;
    setPayload(value: Uint8Array | string): void;

    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignedFullNodePayload.AsObject;
    static toObject(includeInstance: boolean, msg: SignedFullNodePayload): SignedFullNodePayload.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignedFullNodePayload, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignedFullNodePayload;
    static deserializeBinaryFromReader(message: SignedFullNodePayload, reader: jspb.BinaryReader): SignedFullNodePayload;
}

export namespace SignedFullNodePayload {
    export type AsObject = {
        payload: Uint8Array | string,
        signature: Uint8Array | string,
    }
}

export class Note extends jspb.Message { 
    getPeerId(): Uint8Array | string;
    getPeerId_asU8(): Uint8Array;
    getPeerId_asB64(): string;
    setPeerId(value: Uint8Array | string): void;


    hasSignedPeerInfo(): boolean;
    clearSignedPeerInfo(): void;
    getSignedPeerInfo(): SignedPeerInfo | undefined;
    setSignedPeerInfo(value?: SignedPeerInfo): void;


    hasSignedFullNodePayload(): boolean;
    clearSignedFullNodePayload(): void;
    getSignedFullNodePayload(): SignedFullNodePayload | undefined;
    setSignedFullNodePayload(value?: SignedFullNodePayload): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Note.AsObject;
    static toObject(includeInstance: boolean, msg: Note): Note.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Note, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Note;
    static deserializeBinaryFromReader(message: Note, reader: jspb.BinaryReader): Note;
}

export namespace Note {
    export type AsObject = {
        peerId: Uint8Array | string,
        signedPeerInfo?: SignedPeerInfo.AsObject,
        signedFullNodePayload?: SignedFullNodePayload.AsObject,
    }
}

export class DiscoveryMsg extends jspb.Message { 
    clearNotesList(): void;
    getNotesList(): Array<Note>;
    setNotesList(value: Array<Note>): void;
    addNotes(value?: Note, index?: number): Note;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DiscoveryMsg.AsObject;
    static toObject(includeInstance: boolean, msg: DiscoveryMsg): DiscoveryMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DiscoveryMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DiscoveryMsg;
    static deserializeBinaryFromReader(message: DiscoveryMsg, reader: jspb.BinaryReader): DiscoveryMsg;
}

export namespace DiscoveryMsg {
    export type AsObject = {
        notesList: Array<Note.AsObject>,
    }
}

export class IdentityMsg extends jspb.Message { 
    getPeerId(): Uint8Array | string;
    getPeerId_asU8(): Uint8Array;
    getPeerId_asB64(): string;
    setPeerId(value: Uint8Array | string): void;

    clearSupportedProtocolsList(): void;
    getSupportedProtocolsList(): Array<Uint8Array | string>;
    getSupportedProtocolsList_asU8(): Array<Uint8Array>;
    getSupportedProtocolsList_asB64(): Array<string>;
    setSupportedProtocolsList(value: Array<Uint8Array | string>): void;
    addSupportedProtocols(value: Uint8Array | string, index?: number): Uint8Array | string;

    getRole(): IdentityMsg.Role;
    setRole(value: IdentityMsg.Role): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IdentityMsg.AsObject;
    static toObject(includeInstance: boolean, msg: IdentityMsg): IdentityMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IdentityMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IdentityMsg;
    static deserializeBinaryFromReader(message: IdentityMsg, reader: jspb.BinaryReader): IdentityMsg;
}

export namespace IdentityMsg {
    export type AsObject = {
        peerId: Uint8Array | string,
        supportedProtocolsList: Array<Uint8Array | string>,
        role: IdentityMsg.Role,
    }

    export enum Role {
    VALIDATOR = 0,
    FULL_NODE = 1,
    }

}

export class Ping extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Ping.AsObject;
    static toObject(includeInstance: boolean, msg: Ping): Ping.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Ping, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Ping;
    static deserializeBinaryFromReader(message: Ping, reader: jspb.BinaryReader): Ping;
}

export namespace Ping {
    export type AsObject = {
    }
}

export class Pong extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Pong.AsObject;
    static toObject(includeInstance: boolean, msg: Pong): Pong.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Pong, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Pong;
    static deserializeBinaryFromReader(message: Pong, reader: jspb.BinaryReader): Pong;
}

export namespace Pong {
    export type AsObject = {
    }
}
