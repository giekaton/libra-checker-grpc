// package: storage
// file: storage.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as storage_pb from "./storage_pb";
import * as get_with_proof_pb from "./get_with_proof_pb";
import * as ledger_info_pb from "./ledger_info_pb";
import * as transaction_pb from "./transaction_pb";
import * as account_state_blob_pb from "./account_state_blob_pb";
import * as proof_pb from "./proof_pb";

interface IStorageService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    saveTransactions: IStorageService_ISaveTransactions;
    updateToLatestLedger: IStorageService_IUpdateToLatestLedger;
    getTransactions: IStorageService_IGetTransactions;
    getAccountStateWithProofByVersion: IStorageService_IGetAccountStateWithProofByVersion;
    getStartupInfo: IStorageService_IGetStartupInfo;
    getEpochChangeLedgerInfos: IStorageService_IGetEpochChangeLedgerInfos;
}

interface IStorageService_ISaveTransactions extends grpc.MethodDefinition<storage_pb.SaveTransactionsRequest, storage_pb.SaveTransactionsResponse> {
    path: string; // "/storage.Storage/SaveTransactions"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<storage_pb.SaveTransactionsRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.SaveTransactionsRequest>;
    responseSerialize: grpc.serialize<storage_pb.SaveTransactionsResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.SaveTransactionsResponse>;
}
interface IStorageService_IUpdateToLatestLedger extends grpc.MethodDefinition<get_with_proof_pb.UpdateToLatestLedgerRequest, get_with_proof_pb.UpdateToLatestLedgerResponse> {
    path: string; // "/storage.Storage/UpdateToLatestLedger"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<get_with_proof_pb.UpdateToLatestLedgerRequest>;
    requestDeserialize: grpc.deserialize<get_with_proof_pb.UpdateToLatestLedgerRequest>;
    responseSerialize: grpc.serialize<get_with_proof_pb.UpdateToLatestLedgerResponse>;
    responseDeserialize: grpc.deserialize<get_with_proof_pb.UpdateToLatestLedgerResponse>;
}
interface IStorageService_IGetTransactions extends grpc.MethodDefinition<storage_pb.GetTransactionsRequest, storage_pb.GetTransactionsResponse> {
    path: string; // "/storage.Storage/GetTransactions"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<storage_pb.GetTransactionsRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.GetTransactionsRequest>;
    responseSerialize: grpc.serialize<storage_pb.GetTransactionsResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.GetTransactionsResponse>;
}
interface IStorageService_IGetAccountStateWithProofByVersion extends grpc.MethodDefinition<storage_pb.GetAccountStateWithProofByVersionRequest, storage_pb.GetAccountStateWithProofByVersionResponse> {
    path: string; // "/storage.Storage/GetAccountStateWithProofByVersion"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<storage_pb.GetAccountStateWithProofByVersionRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.GetAccountStateWithProofByVersionRequest>;
    responseSerialize: grpc.serialize<storage_pb.GetAccountStateWithProofByVersionResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.GetAccountStateWithProofByVersionResponse>;
}
interface IStorageService_IGetStartupInfo extends grpc.MethodDefinition<storage_pb.GetStartupInfoRequest, storage_pb.GetStartupInfoResponse> {
    path: string; // "/storage.Storage/GetStartupInfo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<storage_pb.GetStartupInfoRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.GetStartupInfoRequest>;
    responseSerialize: grpc.serialize<storage_pb.GetStartupInfoResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.GetStartupInfoResponse>;
}
interface IStorageService_IGetEpochChangeLedgerInfos extends grpc.MethodDefinition<storage_pb.GetEpochChangeLedgerInfosRequest, storage_pb.GetEpochChangeLedgerInfosResponse> {
    path: string; // "/storage.Storage/GetEpochChangeLedgerInfos"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<storage_pb.GetEpochChangeLedgerInfosRequest>;
    requestDeserialize: grpc.deserialize<storage_pb.GetEpochChangeLedgerInfosRequest>;
    responseSerialize: grpc.serialize<storage_pb.GetEpochChangeLedgerInfosResponse>;
    responseDeserialize: grpc.deserialize<storage_pb.GetEpochChangeLedgerInfosResponse>;
}

export const StorageService: IStorageService;

export interface IStorageServer {
    saveTransactions: grpc.handleUnaryCall<storage_pb.SaveTransactionsRequest, storage_pb.SaveTransactionsResponse>;
    updateToLatestLedger: grpc.handleUnaryCall<get_with_proof_pb.UpdateToLatestLedgerRequest, get_with_proof_pb.UpdateToLatestLedgerResponse>;
    getTransactions: grpc.handleUnaryCall<storage_pb.GetTransactionsRequest, storage_pb.GetTransactionsResponse>;
    getAccountStateWithProofByVersion: grpc.handleUnaryCall<storage_pb.GetAccountStateWithProofByVersionRequest, storage_pb.GetAccountStateWithProofByVersionResponse>;
    getStartupInfo: grpc.handleUnaryCall<storage_pb.GetStartupInfoRequest, storage_pb.GetStartupInfoResponse>;
    getEpochChangeLedgerInfos: grpc.handleUnaryCall<storage_pb.GetEpochChangeLedgerInfosRequest, storage_pb.GetEpochChangeLedgerInfosResponse>;
}

export interface IStorageClient {
    saveTransactions(request: storage_pb.SaveTransactionsRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.SaveTransactionsResponse) => void): grpc.ClientUnaryCall;
    saveTransactions(request: storage_pb.SaveTransactionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.SaveTransactionsResponse) => void): grpc.ClientUnaryCall;
    saveTransactions(request: storage_pb.SaveTransactionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.SaveTransactionsResponse) => void): grpc.ClientUnaryCall;
    updateToLatestLedger(request: get_with_proof_pb.UpdateToLatestLedgerRequest, callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void): grpc.ClientUnaryCall;
    updateToLatestLedger(request: get_with_proof_pb.UpdateToLatestLedgerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void): grpc.ClientUnaryCall;
    updateToLatestLedger(request: get_with_proof_pb.UpdateToLatestLedgerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void): grpc.ClientUnaryCall;
    getTransactions(request: storage_pb.GetTransactionsRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.GetTransactionsResponse) => void): grpc.ClientUnaryCall;
    getTransactions(request: storage_pb.GetTransactionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.GetTransactionsResponse) => void): grpc.ClientUnaryCall;
    getTransactions(request: storage_pb.GetTransactionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.GetTransactionsResponse) => void): grpc.ClientUnaryCall;
    getAccountStateWithProofByVersion(request: storage_pb.GetAccountStateWithProofByVersionRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.GetAccountStateWithProofByVersionResponse) => void): grpc.ClientUnaryCall;
    getAccountStateWithProofByVersion(request: storage_pb.GetAccountStateWithProofByVersionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.GetAccountStateWithProofByVersionResponse) => void): grpc.ClientUnaryCall;
    getAccountStateWithProofByVersion(request: storage_pb.GetAccountStateWithProofByVersionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.GetAccountStateWithProofByVersionResponse) => void): grpc.ClientUnaryCall;
    getStartupInfo(request: storage_pb.GetStartupInfoRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.GetStartupInfoResponse) => void): grpc.ClientUnaryCall;
    getStartupInfo(request: storage_pb.GetStartupInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.GetStartupInfoResponse) => void): grpc.ClientUnaryCall;
    getStartupInfo(request: storage_pb.GetStartupInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.GetStartupInfoResponse) => void): grpc.ClientUnaryCall;
    getEpochChangeLedgerInfos(request: storage_pb.GetEpochChangeLedgerInfosRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.GetEpochChangeLedgerInfosResponse) => void): grpc.ClientUnaryCall;
    getEpochChangeLedgerInfos(request: storage_pb.GetEpochChangeLedgerInfosRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.GetEpochChangeLedgerInfosResponse) => void): grpc.ClientUnaryCall;
    getEpochChangeLedgerInfos(request: storage_pb.GetEpochChangeLedgerInfosRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.GetEpochChangeLedgerInfosResponse) => void): grpc.ClientUnaryCall;
}

export class StorageClient extends grpc.Client implements IStorageClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public saveTransactions(request: storage_pb.SaveTransactionsRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.SaveTransactionsResponse) => void): grpc.ClientUnaryCall;
    public saveTransactions(request: storage_pb.SaveTransactionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.SaveTransactionsResponse) => void): grpc.ClientUnaryCall;
    public saveTransactions(request: storage_pb.SaveTransactionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.SaveTransactionsResponse) => void): grpc.ClientUnaryCall;
    public updateToLatestLedger(request: get_with_proof_pb.UpdateToLatestLedgerRequest, callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void): grpc.ClientUnaryCall;
    public updateToLatestLedger(request: get_with_proof_pb.UpdateToLatestLedgerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void): grpc.ClientUnaryCall;
    public updateToLatestLedger(request: get_with_proof_pb.UpdateToLatestLedgerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void): grpc.ClientUnaryCall;
    public getTransactions(request: storage_pb.GetTransactionsRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.GetTransactionsResponse) => void): grpc.ClientUnaryCall;
    public getTransactions(request: storage_pb.GetTransactionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.GetTransactionsResponse) => void): grpc.ClientUnaryCall;
    public getTransactions(request: storage_pb.GetTransactionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.GetTransactionsResponse) => void): grpc.ClientUnaryCall;
    public getAccountStateWithProofByVersion(request: storage_pb.GetAccountStateWithProofByVersionRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.GetAccountStateWithProofByVersionResponse) => void): grpc.ClientUnaryCall;
    public getAccountStateWithProofByVersion(request: storage_pb.GetAccountStateWithProofByVersionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.GetAccountStateWithProofByVersionResponse) => void): grpc.ClientUnaryCall;
    public getAccountStateWithProofByVersion(request: storage_pb.GetAccountStateWithProofByVersionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.GetAccountStateWithProofByVersionResponse) => void): grpc.ClientUnaryCall;
    public getStartupInfo(request: storage_pb.GetStartupInfoRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.GetStartupInfoResponse) => void): grpc.ClientUnaryCall;
    public getStartupInfo(request: storage_pb.GetStartupInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.GetStartupInfoResponse) => void): grpc.ClientUnaryCall;
    public getStartupInfo(request: storage_pb.GetStartupInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.GetStartupInfoResponse) => void): grpc.ClientUnaryCall;
    public getEpochChangeLedgerInfos(request: storage_pb.GetEpochChangeLedgerInfosRequest, callback: (error: grpc.ServiceError | null, response: storage_pb.GetEpochChangeLedgerInfosResponse) => void): grpc.ClientUnaryCall;
    public getEpochChangeLedgerInfos(request: storage_pb.GetEpochChangeLedgerInfosRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: storage_pb.GetEpochChangeLedgerInfosResponse) => void): grpc.ClientUnaryCall;
    public getEpochChangeLedgerInfos(request: storage_pb.GetEpochChangeLedgerInfosRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: storage_pb.GetEpochChangeLedgerInfosResponse) => void): grpc.ClientUnaryCall;
}
