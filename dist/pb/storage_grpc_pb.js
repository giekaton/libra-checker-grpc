// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) The Libra Core Contributors
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('grpc');
var storage_pb = require('./storage_pb.js');
var get_with_proof_pb = require('./get_with_proof_pb.js');
var ledger_info_pb = require('./ledger_info_pb.js');
var transaction_pb = require('./transaction_pb.js');
var account_state_blob_pb = require('./account_state_blob_pb.js');
var proof_pb = require('./proof_pb.js');

function serialize_storage_GetAccountStateWithProofByVersionRequest(arg) {
  if (!(arg instanceof storage_pb.GetAccountStateWithProofByVersionRequest)) {
    throw new Error('Expected argument of type storage.GetAccountStateWithProofByVersionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storage_GetAccountStateWithProofByVersionRequest(buffer_arg) {
  return storage_pb.GetAccountStateWithProofByVersionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_storage_GetAccountStateWithProofByVersionResponse(arg) {
  if (!(arg instanceof storage_pb.GetAccountStateWithProofByVersionResponse)) {
    throw new Error('Expected argument of type storage.GetAccountStateWithProofByVersionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storage_GetAccountStateWithProofByVersionResponse(buffer_arg) {
  return storage_pb.GetAccountStateWithProofByVersionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_storage_GetStartupInfoRequest(arg) {
  if (!(arg instanceof storage_pb.GetStartupInfoRequest)) {
    throw new Error('Expected argument of type storage.GetStartupInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storage_GetStartupInfoRequest(buffer_arg) {
  return storage_pb.GetStartupInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_storage_GetStartupInfoResponse(arg) {
  if (!(arg instanceof storage_pb.GetStartupInfoResponse)) {
    throw new Error('Expected argument of type storage.GetStartupInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storage_GetStartupInfoResponse(buffer_arg) {
  return storage_pb.GetStartupInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_storage_GetTransactionsRequest(arg) {
  if (!(arg instanceof storage_pb.GetTransactionsRequest)) {
    throw new Error('Expected argument of type storage.GetTransactionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storage_GetTransactionsRequest(buffer_arg) {
  return storage_pb.GetTransactionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_storage_GetTransactionsResponse(arg) {
  if (!(arg instanceof storage_pb.GetTransactionsResponse)) {
    throw new Error('Expected argument of type storage.GetTransactionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storage_GetTransactionsResponse(buffer_arg) {
  return storage_pb.GetTransactionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_storage_SaveTransactionsRequest(arg) {
  if (!(arg instanceof storage_pb.SaveTransactionsRequest)) {
    throw new Error('Expected argument of type storage.SaveTransactionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storage_SaveTransactionsRequest(buffer_arg) {
  return storage_pb.SaveTransactionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_storage_SaveTransactionsResponse(arg) {
  if (!(arg instanceof storage_pb.SaveTransactionsResponse)) {
    throw new Error('Expected argument of type storage.SaveTransactionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_storage_SaveTransactionsResponse(buffer_arg) {
  return storage_pb.SaveTransactionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_types_UpdateToLatestLedgerRequest(arg) {
  if (!(arg instanceof get_with_proof_pb.UpdateToLatestLedgerRequest)) {
    throw new Error('Expected argument of type types.UpdateToLatestLedgerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_types_UpdateToLatestLedgerRequest(buffer_arg) {
  return get_with_proof_pb.UpdateToLatestLedgerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_types_UpdateToLatestLedgerResponse(arg) {
  if (!(arg instanceof get_with_proof_pb.UpdateToLatestLedgerResponse)) {
    throw new Error('Expected argument of type types.UpdateToLatestLedgerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_types_UpdateToLatestLedgerResponse(buffer_arg) {
  return get_with_proof_pb.UpdateToLatestLedgerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// -----------------------------------------------------------------------------
// ---------------- Service definition for storage
// -----------------------------------------------------------------------------
var StorageService = exports.StorageService = {
  // Persist transactions. Called by Execution when either syncing nodes or
  // committing blocks during normal operation.
  saveTransactions: {
    path: '/storage.Storage/SaveTransactions',
    requestStream: false,
    responseStream: false,
    requestType: storage_pb.SaveTransactionsRequest,
    responseType: storage_pb.SaveTransactionsResponse,
    requestSerialize: serialize_storage_SaveTransactionsRequest,
    requestDeserialize: deserialize_storage_SaveTransactionsRequest,
    responseSerialize: serialize_storage_SaveTransactionsResponse,
    responseDeserialize: deserialize_storage_SaveTransactionsResponse,
  },
  // Read APIs.
  //
  // Used to get a piece of data and return the proof of it. If the client
  // knows and trusts a ledger info at version v, it should pass v in as the
  // client_known_version and we will return the latest ledger info together
  // with the proof that it derives from v.
  updateToLatestLedger: {
    path: '/storage.Storage/UpdateToLatestLedger',
    requestStream: false,
    responseStream: false,
    requestType: get_with_proof_pb.UpdateToLatestLedgerRequest,
    responseType: get_with_proof_pb.UpdateToLatestLedgerResponse,
    requestSerialize: serialize_types_UpdateToLatestLedgerRequest,
    requestDeserialize: deserialize_types_UpdateToLatestLedgerRequest,
    responseSerialize: serialize_types_UpdateToLatestLedgerResponse,
    responseDeserialize: deserialize_types_UpdateToLatestLedgerResponse,
  },
  // When we receive a request from a peer validator asking a list of
  // transactions for state synchronization, this API can be used to serve the
  // request. Note that the peer should specify a ledger version and all proofs
  // in the response will be relative to this given ledger version.
  getTransactions: {
    path: '/storage.Storage/GetTransactions',
    requestStream: false,
    responseStream: false,
    requestType: storage_pb.GetTransactionsRequest,
    responseType: storage_pb.GetTransactionsResponse,
    requestSerialize: serialize_storage_GetTransactionsRequest,
    requestDeserialize: deserialize_storage_GetTransactionsRequest,
    responseSerialize: serialize_storage_GetTransactionsResponse,
    responseDeserialize: deserialize_storage_GetTransactionsResponse,
  },
  getAccountStateWithProofByVersion: {
    path: '/storage.Storage/GetAccountStateWithProofByVersion',
    requestStream: false,
    responseStream: false,
    requestType: storage_pb.GetAccountStateWithProofByVersionRequest,
    responseType: storage_pb.GetAccountStateWithProofByVersionResponse,
    requestSerialize: serialize_storage_GetAccountStateWithProofByVersionRequest,
    requestDeserialize: deserialize_storage_GetAccountStateWithProofByVersionRequest,
    responseSerialize: serialize_storage_GetAccountStateWithProofByVersionResponse,
    responseDeserialize: deserialize_storage_GetAccountStateWithProofByVersionResponse,
  },
  // Returns information needed for libra core to start up.
  getStartupInfo: {
    path: '/storage.Storage/GetStartupInfo',
    requestStream: false,
    responseStream: false,
    requestType: storage_pb.GetStartupInfoRequest,
    responseType: storage_pb.GetStartupInfoResponse,
    requestSerialize: serialize_storage_GetStartupInfoRequest,
    requestDeserialize: deserialize_storage_GetStartupInfoRequest,
    responseSerialize: serialize_storage_GetStartupInfoResponse,
    responseDeserialize: deserialize_storage_GetStartupInfoResponse,
  },
};

exports.StorageClient = grpc.makeGenericClientConstructor(StorageService);
// Write APIs.
