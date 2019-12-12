// package: health_checker
// file: health_checker.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class HealthCheckerMsg extends jspb.Message { 

    hasPing(): boolean;
    clearPing(): void;
    getPing(): Ping | undefined;
    setPing(value?: Ping): void;


    hasPong(): boolean;
    clearPong(): void;
    getPong(): Pong | undefined;
    setPong(value?: Pong): void;


    getMessageCase(): HealthCheckerMsg.MessageCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HealthCheckerMsg.AsObject;
    static toObject(includeInstance: boolean, msg: HealthCheckerMsg): HealthCheckerMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HealthCheckerMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HealthCheckerMsg;
    static deserializeBinaryFromReader(message: HealthCheckerMsg, reader: jspb.BinaryReader): HealthCheckerMsg;
}

export namespace HealthCheckerMsg {
    export type AsObject = {
        ping?: Ping.AsObject,
        pong?: Pong.AsObject,
    }

    export enum MessageCase {
        MESSAGE_NOT_SET = 0,
    
    PING = 1,

    PONG = 2,

    }

}

export class Ping extends jspb.Message { 
    getNonce(): number;
    setNonce(value: number): void;


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
        nonce: number,
    }
}

export class Pong extends jspb.Message { 
    getNonce(): number;
    setNonce(value: number): void;


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
        nonce: number,
    }
}
