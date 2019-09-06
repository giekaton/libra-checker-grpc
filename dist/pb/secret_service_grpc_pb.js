// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) The Libra Core Contributors
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('grpc');
var secret_service_pb = require('./secret_service_pb.js');

function serialize_secret_service_GenerateKeyRequest(arg) {
  if (!(arg instanceof secret_service_pb.GenerateKeyRequest)) {
    throw new Error('Expected argument of type secret_service.GenerateKeyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secret_service_GenerateKeyRequest(buffer_arg) {
  return secret_service_pb.GenerateKeyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secret_service_GenerateKeyResponse(arg) {
  if (!(arg instanceof secret_service_pb.GenerateKeyResponse)) {
    throw new Error('Expected argument of type secret_service.GenerateKeyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secret_service_GenerateKeyResponse(buffer_arg) {
  return secret_service_pb.GenerateKeyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secret_service_PublicKeyRequest(arg) {
  if (!(arg instanceof secret_service_pb.PublicKeyRequest)) {
    throw new Error('Expected argument of type secret_service.PublicKeyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secret_service_PublicKeyRequest(buffer_arg) {
  return secret_service_pb.PublicKeyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secret_service_PublicKeyResponse(arg) {
  if (!(arg instanceof secret_service_pb.PublicKeyResponse)) {
    throw new Error('Expected argument of type secret_service.PublicKeyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secret_service_PublicKeyResponse(buffer_arg) {
  return secret_service_pb.PublicKeyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secret_service_SignRequest(arg) {
  if (!(arg instanceof secret_service_pb.SignRequest)) {
    throw new Error('Expected argument of type secret_service.SignRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secret_service_SignRequest(buffer_arg) {
  return secret_service_pb.SignRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_secret_service_SignResponse(arg) {
  if (!(arg instanceof secret_service_pb.SignResponse)) {
    throw new Error('Expected argument of type secret_service.SignResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_secret_service_SignResponse(buffer_arg) {
  return secret_service_pb.SignResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// -----------------------------------------------------------------------------
// ---------------- Service definition
// -----------------------------------------------------------------------------
var SecretServiceService = exports.SecretServiceService = {
  // API to request key generation
  generateKey: {
    path: '/secret_service.SecretService/GenerateKey',
    requestStream: false,
    responseStream: false,
    requestType: secret_service_pb.GenerateKeyRequest,
    responseType: secret_service_pb.GenerateKeyResponse,
    requestSerialize: serialize_secret_service_GenerateKeyRequest,
    requestDeserialize: deserialize_secret_service_GenerateKeyRequest,
    responseSerialize: serialize_secret_service_GenerateKeyResponse,
    responseDeserialize: deserialize_secret_service_GenerateKeyResponse,
  },
  // API to request a public key
  getPublicKey: {
    path: '/secret_service.SecretService/GetPublicKey',
    requestStream: false,
    responseStream: false,
    requestType: secret_service_pb.PublicKeyRequest,
    responseType: secret_service_pb.PublicKeyResponse,
    requestSerialize: serialize_secret_service_PublicKeyRequest,
    requestDeserialize: deserialize_secret_service_PublicKeyRequest,
    responseSerialize: serialize_secret_service_PublicKeyResponse,
    responseDeserialize: deserialize_secret_service_PublicKeyResponse,
  },
  // API to request a signature
  sign: {
    path: '/secret_service.SecretService/Sign',
    requestStream: false,
    responseStream: false,
    requestType: secret_service_pb.SignRequest,
    responseType: secret_service_pb.SignResponse,
    requestSerialize: serialize_secret_service_SignRequest,
    requestDeserialize: deserialize_secret_service_SignRequest,
    responseSerialize: serialize_secret_service_SignResponse,
    responseDeserialize: deserialize_secret_service_SignResponse,
  },
};

exports.SecretServiceClient = grpc.makeGenericClientConstructor(SecretServiceService);
