// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) The Libra Core Contributors
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('grpc');
var execution_pb = require('./execution_pb.js');
var get_with_proof_pb = require('./get_with_proof_pb.js');
var ledger_info_pb = require('./ledger_info_pb.js');
var transaction_pb = require('./transaction_pb.js');
var validator_set_pb = require('./validator_set_pb.js');
var vm_errors_pb = require('./vm_errors_pb.js');

function serialize_execution_CommitBlockRequest(arg) {
  if (!(arg instanceof execution_pb.CommitBlockRequest)) {
    throw new Error('Expected argument of type execution.CommitBlockRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_execution_CommitBlockRequest(buffer_arg) {
  return execution_pb.CommitBlockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_execution_CommitBlockResponse(arg) {
  if (!(arg instanceof execution_pb.CommitBlockResponse)) {
    throw new Error('Expected argument of type execution.CommitBlockResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_execution_CommitBlockResponse(buffer_arg) {
  return execution_pb.CommitBlockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_execution_ExecuteBlockRequest(arg) {
  if (!(arg instanceof execution_pb.ExecuteBlockRequest)) {
    throw new Error('Expected argument of type execution.ExecuteBlockRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_execution_ExecuteBlockRequest(buffer_arg) {
  return execution_pb.ExecuteBlockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_execution_ExecuteBlockResponse(arg) {
  if (!(arg instanceof execution_pb.ExecuteBlockResponse)) {
    throw new Error('Expected argument of type execution.ExecuteBlockResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_execution_ExecuteBlockResponse(buffer_arg) {
  return execution_pb.ExecuteBlockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_execution_ExecuteChunkRequest(arg) {
  if (!(arg instanceof execution_pb.ExecuteChunkRequest)) {
    throw new Error('Expected argument of type execution.ExecuteChunkRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_execution_ExecuteChunkRequest(buffer_arg) {
  return execution_pb.ExecuteChunkRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_execution_ExecuteChunkResponse(arg) {
  if (!(arg instanceof execution_pb.ExecuteChunkResponse)) {
    throw new Error('Expected argument of type execution.ExecuteChunkResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_execution_ExecuteChunkResponse(buffer_arg) {
  return execution_pb.ExecuteChunkResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// -----------------------------------------------------------------------------
// ---------------- Execution Service Definition
// -----------------------------------------------------------------------------
var ExecutionService = exports.ExecutionService = {
  // Execute a list of signed transactions given by consensus. Return the id
  // of the block and the root hash of the ledger after applying transactions
  // in this block.
  executeBlock: {
    path: '/execution.Execution/ExecuteBlock',
    requestStream: false,
    responseStream: false,
    requestType: execution_pb.ExecuteBlockRequest,
    responseType: execution_pb.ExecuteBlockResponse,
    requestSerialize: serialize_execution_ExecuteBlockRequest,
    requestDeserialize: deserialize_execution_ExecuteBlockRequest,
    responseSerialize: serialize_execution_ExecuteBlockResponse,
    responseDeserialize: deserialize_execution_ExecuteBlockResponse,
  },
  // Commit a previously executed block that has been agreed by consensus.
  commitBlock: {
    path: '/execution.Execution/CommitBlock',
    requestStream: false,
    responseStream: false,
    requestType: execution_pb.CommitBlockRequest,
    responseType: execution_pb.CommitBlockResponse,
    requestSerialize: serialize_execution_CommitBlockRequest,
    requestDeserialize: deserialize_execution_CommitBlockRequest,
    responseSerialize: serialize_execution_CommitBlockResponse,
    responseDeserialize: deserialize_execution_CommitBlockResponse,
  },
  // Execute and commit a list of signed transactions received from peer
  // during synchronization. Return the id of the block
  executeChunk: {
    path: '/execution.Execution/ExecuteChunk',
    requestStream: false,
    responseStream: false,
    requestType: execution_pb.ExecuteChunkRequest,
    responseType: execution_pb.ExecuteChunkResponse,
    requestSerialize: serialize_execution_ExecuteChunkRequest,
    requestDeserialize: deserialize_execution_ExecuteChunkRequest,
    responseSerialize: serialize_execution_ExecuteChunkResponse,
    responseDeserialize: deserialize_execution_ExecuteChunkResponse,
  },
};

exports.ExecutionClient = grpc.makeGenericClientConstructor(ExecutionService);
