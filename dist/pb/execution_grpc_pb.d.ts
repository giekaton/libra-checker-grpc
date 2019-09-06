// package: execution
// file: execution.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as execution_pb from "./execution_pb";
import * as get_with_proof_pb from "./get_with_proof_pb";
import * as ledger_info_pb from "./ledger_info_pb";
import * as transaction_pb from "./transaction_pb";
import * as validator_set_pb from "./validator_set_pb";
import * as vm_errors_pb from "./vm_errors_pb";

interface IExecutionService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    executeBlock: IExecutionService_IExecuteBlock;
    commitBlock: IExecutionService_ICommitBlock;
    executeChunk: IExecutionService_IExecuteChunk;
}

interface IExecutionService_IExecuteBlock extends grpc.MethodDefinition<execution_pb.ExecuteBlockRequest, execution_pb.ExecuteBlockResponse> {
    path: string; // "/execution.Execution/ExecuteBlock"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<execution_pb.ExecuteBlockRequest>;
    requestDeserialize: grpc.deserialize<execution_pb.ExecuteBlockRequest>;
    responseSerialize: grpc.serialize<execution_pb.ExecuteBlockResponse>;
    responseDeserialize: grpc.deserialize<execution_pb.ExecuteBlockResponse>;
}
interface IExecutionService_ICommitBlock extends grpc.MethodDefinition<execution_pb.CommitBlockRequest, execution_pb.CommitBlockResponse> {
    path: string; // "/execution.Execution/CommitBlock"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<execution_pb.CommitBlockRequest>;
    requestDeserialize: grpc.deserialize<execution_pb.CommitBlockRequest>;
    responseSerialize: grpc.serialize<execution_pb.CommitBlockResponse>;
    responseDeserialize: grpc.deserialize<execution_pb.CommitBlockResponse>;
}
interface IExecutionService_IExecuteChunk extends grpc.MethodDefinition<execution_pb.ExecuteChunkRequest, execution_pb.ExecuteChunkResponse> {
    path: string; // "/execution.Execution/ExecuteChunk"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<execution_pb.ExecuteChunkRequest>;
    requestDeserialize: grpc.deserialize<execution_pb.ExecuteChunkRequest>;
    responseSerialize: grpc.serialize<execution_pb.ExecuteChunkResponse>;
    responseDeserialize: grpc.deserialize<execution_pb.ExecuteChunkResponse>;
}

export const ExecutionService: IExecutionService;

export interface IExecutionServer {
    executeBlock: grpc.handleUnaryCall<execution_pb.ExecuteBlockRequest, execution_pb.ExecuteBlockResponse>;
    commitBlock: grpc.handleUnaryCall<execution_pb.CommitBlockRequest, execution_pb.CommitBlockResponse>;
    executeChunk: grpc.handleUnaryCall<execution_pb.ExecuteChunkRequest, execution_pb.ExecuteChunkResponse>;
}

export interface IExecutionClient {
    executeBlock(request: execution_pb.ExecuteBlockRequest, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteBlockResponse) => void): grpc.ClientUnaryCall;
    executeBlock(request: execution_pb.ExecuteBlockRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteBlockResponse) => void): grpc.ClientUnaryCall;
    executeBlock(request: execution_pb.ExecuteBlockRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteBlockResponse) => void): grpc.ClientUnaryCall;
    commitBlock(request: execution_pb.CommitBlockRequest, callback: (error: grpc.ServiceError | null, response: execution_pb.CommitBlockResponse) => void): grpc.ClientUnaryCall;
    commitBlock(request: execution_pb.CommitBlockRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: execution_pb.CommitBlockResponse) => void): grpc.ClientUnaryCall;
    commitBlock(request: execution_pb.CommitBlockRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: execution_pb.CommitBlockResponse) => void): grpc.ClientUnaryCall;
    executeChunk(request: execution_pb.ExecuteChunkRequest, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteChunkResponse) => void): grpc.ClientUnaryCall;
    executeChunk(request: execution_pb.ExecuteChunkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteChunkResponse) => void): grpc.ClientUnaryCall;
    executeChunk(request: execution_pb.ExecuteChunkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteChunkResponse) => void): grpc.ClientUnaryCall;
}

export class ExecutionClient extends grpc.Client implements IExecutionClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public executeBlock(request: execution_pb.ExecuteBlockRequest, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteBlockResponse) => void): grpc.ClientUnaryCall;
    public executeBlock(request: execution_pb.ExecuteBlockRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteBlockResponse) => void): grpc.ClientUnaryCall;
    public executeBlock(request: execution_pb.ExecuteBlockRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteBlockResponse) => void): grpc.ClientUnaryCall;
    public commitBlock(request: execution_pb.CommitBlockRequest, callback: (error: grpc.ServiceError | null, response: execution_pb.CommitBlockResponse) => void): grpc.ClientUnaryCall;
    public commitBlock(request: execution_pb.CommitBlockRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: execution_pb.CommitBlockResponse) => void): grpc.ClientUnaryCall;
    public commitBlock(request: execution_pb.CommitBlockRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: execution_pb.CommitBlockResponse) => void): grpc.ClientUnaryCall;
    public executeChunk(request: execution_pb.ExecuteChunkRequest, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteChunkResponse) => void): grpc.ClientUnaryCall;
    public executeChunk(request: execution_pb.ExecuteChunkRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteChunkResponse) => void): grpc.ClientUnaryCall;
    public executeChunk(request: execution_pb.ExecuteChunkRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: execution_pb.ExecuteChunkResponse) => void): grpc.ClientUnaryCall;
}
