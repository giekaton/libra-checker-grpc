// package: secret_service
// file: secret_service.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as secret_service_pb from "./secret_service_pb";

interface ISecretServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    generateKey: ISecretServiceService_IGenerateKey;
    getPublicKey: ISecretServiceService_IGetPublicKey;
    sign: ISecretServiceService_ISign;
}

interface ISecretServiceService_IGenerateKey extends grpc.MethodDefinition<secret_service_pb.GenerateKeyRequest, secret_service_pb.GenerateKeyResponse> {
    path: string; // "/secret_service.SecretService/GenerateKey"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<secret_service_pb.GenerateKeyRequest>;
    requestDeserialize: grpc.deserialize<secret_service_pb.GenerateKeyRequest>;
    responseSerialize: grpc.serialize<secret_service_pb.GenerateKeyResponse>;
    responseDeserialize: grpc.deserialize<secret_service_pb.GenerateKeyResponse>;
}
interface ISecretServiceService_IGetPublicKey extends grpc.MethodDefinition<secret_service_pb.PublicKeyRequest, secret_service_pb.PublicKeyResponse> {
    path: string; // "/secret_service.SecretService/GetPublicKey"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<secret_service_pb.PublicKeyRequest>;
    requestDeserialize: grpc.deserialize<secret_service_pb.PublicKeyRequest>;
    responseSerialize: grpc.serialize<secret_service_pb.PublicKeyResponse>;
    responseDeserialize: grpc.deserialize<secret_service_pb.PublicKeyResponse>;
}
interface ISecretServiceService_ISign extends grpc.MethodDefinition<secret_service_pb.SignRequest, secret_service_pb.SignResponse> {
    path: string; // "/secret_service.SecretService/Sign"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<secret_service_pb.SignRequest>;
    requestDeserialize: grpc.deserialize<secret_service_pb.SignRequest>;
    responseSerialize: grpc.serialize<secret_service_pb.SignResponse>;
    responseDeserialize: grpc.deserialize<secret_service_pb.SignResponse>;
}

export const SecretServiceService: ISecretServiceService;

export interface ISecretServiceServer {
    generateKey: grpc.handleUnaryCall<secret_service_pb.GenerateKeyRequest, secret_service_pb.GenerateKeyResponse>;
    getPublicKey: grpc.handleUnaryCall<secret_service_pb.PublicKeyRequest, secret_service_pb.PublicKeyResponse>;
    sign: grpc.handleUnaryCall<secret_service_pb.SignRequest, secret_service_pb.SignResponse>;
}

export interface ISecretServiceClient {
    generateKey(request: secret_service_pb.GenerateKeyRequest, callback: (error: grpc.ServiceError | null, response: secret_service_pb.GenerateKeyResponse) => void): grpc.ClientUnaryCall;
    generateKey(request: secret_service_pb.GenerateKeyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secret_service_pb.GenerateKeyResponse) => void): grpc.ClientUnaryCall;
    generateKey(request: secret_service_pb.GenerateKeyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secret_service_pb.GenerateKeyResponse) => void): grpc.ClientUnaryCall;
    getPublicKey(request: secret_service_pb.PublicKeyRequest, callback: (error: grpc.ServiceError | null, response: secret_service_pb.PublicKeyResponse) => void): grpc.ClientUnaryCall;
    getPublicKey(request: secret_service_pb.PublicKeyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secret_service_pb.PublicKeyResponse) => void): grpc.ClientUnaryCall;
    getPublicKey(request: secret_service_pb.PublicKeyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secret_service_pb.PublicKeyResponse) => void): grpc.ClientUnaryCall;
    sign(request: secret_service_pb.SignRequest, callback: (error: grpc.ServiceError | null, response: secret_service_pb.SignResponse) => void): grpc.ClientUnaryCall;
    sign(request: secret_service_pb.SignRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secret_service_pb.SignResponse) => void): grpc.ClientUnaryCall;
    sign(request: secret_service_pb.SignRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secret_service_pb.SignResponse) => void): grpc.ClientUnaryCall;
}

export class SecretServiceClient extends grpc.Client implements ISecretServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public generateKey(request: secret_service_pb.GenerateKeyRequest, callback: (error: grpc.ServiceError | null, response: secret_service_pb.GenerateKeyResponse) => void): grpc.ClientUnaryCall;
    public generateKey(request: secret_service_pb.GenerateKeyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secret_service_pb.GenerateKeyResponse) => void): grpc.ClientUnaryCall;
    public generateKey(request: secret_service_pb.GenerateKeyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secret_service_pb.GenerateKeyResponse) => void): grpc.ClientUnaryCall;
    public getPublicKey(request: secret_service_pb.PublicKeyRequest, callback: (error: grpc.ServiceError | null, response: secret_service_pb.PublicKeyResponse) => void): grpc.ClientUnaryCall;
    public getPublicKey(request: secret_service_pb.PublicKeyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secret_service_pb.PublicKeyResponse) => void): grpc.ClientUnaryCall;
    public getPublicKey(request: secret_service_pb.PublicKeyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secret_service_pb.PublicKeyResponse) => void): grpc.ClientUnaryCall;
    public sign(request: secret_service_pb.SignRequest, callback: (error: grpc.ServiceError | null, response: secret_service_pb.SignResponse) => void): grpc.ClientUnaryCall;
    public sign(request: secret_service_pb.SignRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: secret_service_pb.SignResponse) => void): grpc.ClientUnaryCall;
    public sign(request: secret_service_pb.SignRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: secret_service_pb.SignResponse) => void): grpc.ClientUnaryCall;
}
