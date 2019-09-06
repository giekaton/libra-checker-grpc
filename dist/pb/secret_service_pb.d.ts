// package: secret_service
// file: secret_service.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class GenerateKeyRequest extends jspb.Message { 
    getSpec(): KeyType;
    setSpec(value: KeyType): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GenerateKeyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GenerateKeyRequest): GenerateKeyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GenerateKeyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GenerateKeyRequest;
    static deserializeBinaryFromReader(message: GenerateKeyRequest, reader: jspb.BinaryReader): GenerateKeyRequest;
}

export namespace GenerateKeyRequest {
    export type AsObject = {
        spec: KeyType,
    }
}

export class GenerateKeyResponse extends jspb.Message { 
    getKeyId(): Uint8Array | string;
    getKeyId_asU8(): Uint8Array;
    getKeyId_asB64(): string;
    setKeyId(value: Uint8Array | string): void;

    getCode(): ErrorCode;
    setCode(value: ErrorCode): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GenerateKeyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GenerateKeyResponse): GenerateKeyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GenerateKeyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GenerateKeyResponse;
    static deserializeBinaryFromReader(message: GenerateKeyResponse, reader: jspb.BinaryReader): GenerateKeyResponse;
}

export namespace GenerateKeyResponse {
    export type AsObject = {
        keyId: Uint8Array | string,
        code: ErrorCode,
    }
}

export class PublicKeyRequest extends jspb.Message { 
    getKeyId(): Uint8Array | string;
    getKeyId_asU8(): Uint8Array;
    getKeyId_asB64(): string;
    setKeyId(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PublicKeyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PublicKeyRequest): PublicKeyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PublicKeyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PublicKeyRequest;
    static deserializeBinaryFromReader(message: PublicKeyRequest, reader: jspb.BinaryReader): PublicKeyRequest;
}

export namespace PublicKeyRequest {
    export type AsObject = {
        keyId: Uint8Array | string,
    }
}

export class PublicKeyResponse extends jspb.Message { 
    getPublicKey(): Uint8Array | string;
    getPublicKey_asU8(): Uint8Array;
    getPublicKey_asB64(): string;
    setPublicKey(value: Uint8Array | string): void;

    getCode(): ErrorCode;
    setCode(value: ErrorCode): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PublicKeyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PublicKeyResponse): PublicKeyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PublicKeyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PublicKeyResponse;
    static deserializeBinaryFromReader(message: PublicKeyResponse, reader: jspb.BinaryReader): PublicKeyResponse;
}

export namespace PublicKeyResponse {
    export type AsObject = {
        publicKey: Uint8Array | string,
        code: ErrorCode,
    }
}

export class SignRequest extends jspb.Message { 
    getKeyId(): Uint8Array | string;
    getKeyId_asU8(): Uint8Array;
    getKeyId_asB64(): string;
    setKeyId(value: Uint8Array | string): void;

    getMessageHash(): Uint8Array | string;
    getMessageHash_asU8(): Uint8Array;
    getMessageHash_asB64(): string;
    setMessageHash(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SignRequest): SignRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignRequest;
    static deserializeBinaryFromReader(message: SignRequest, reader: jspb.BinaryReader): SignRequest;
}

export namespace SignRequest {
    export type AsObject = {
        keyId: Uint8Array | string,
        messageHash: Uint8Array | string,
    }
}

export class SignResponse extends jspb.Message { 
    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): void;

    getCode(): ErrorCode;
    setCode(value: ErrorCode): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SignResponse): SignResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignResponse;
    static deserializeBinaryFromReader(message: SignResponse, reader: jspb.BinaryReader): SignResponse;
}

export namespace SignResponse {
    export type AsObject = {
        signature: Uint8Array | string,
        code: ErrorCode,
    }
}

export enum ErrorCode {
    SUCCESS = 0,
    KEYIDNOTFOUND = 1,
    WRONGLENGTH = 2,
    INVALIDPARAMETERS = 3,
    AUTHENTICATIONFAILED = 4,
    UNSPECIFIED = 5,
}

export enum KeyType {
    ED25519 = 0,
    BLS12381 = 1,
}
