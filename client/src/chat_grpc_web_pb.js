/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./chat_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ChatServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ChatServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.User,
 *   !proto.JoinResponse>}
 */
const methodDescriptor_ChatService_join = new grpc.web.MethodDescriptor(
  '/ChatService/join',
  grpc.web.MethodType.UNARY,
  proto.User,
  proto.JoinResponse,
  /**
   * @param {!proto.User} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.JoinResponse.deserializeBinary
);


/**
 * @param {!proto.User} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.JoinResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.JoinResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ChatServiceClient.prototype.join =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ChatService/join',
      request,
      metadata || {},
      methodDescriptor_ChatService_join,
      callback);
};


/**
 * @param {!proto.User} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.JoinResponse>}
 *     Promise that resolves to the response
 */
proto.ChatServicePromiseClient.prototype.join =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ChatService/join',
      request,
      metadata || {},
      methodDescriptor_ChatService_join);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ChatMessage,
 *   !proto.Empty>}
 */
const methodDescriptor_ChatService_sendMessage = new grpc.web.MethodDescriptor(
  '/ChatService/sendMessage',
  grpc.web.MethodType.UNARY,
  proto.ChatMessage,
  proto.Empty,
  /**
   * @param {!proto.ChatMessage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Empty.deserializeBinary
);


/**
 * @param {!proto.ChatMessage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ChatServiceClient.prototype.sendMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ChatService/sendMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_sendMessage,
      callback);
};


/**
 * @param {!proto.ChatMessage} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.ChatServicePromiseClient.prototype.sendMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ChatService/sendMessage',
      request,
      metadata || {},
      methodDescriptor_ChatService_sendMessage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.ChatMessageList>}
 */
const methodDescriptor_ChatService_getMessages = new grpc.web.MethodDescriptor(
  '/ChatService/getMessages',
  grpc.web.MethodType.UNARY,
  proto.Empty,
  proto.ChatMessageList,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ChatMessageList.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ChatMessageList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ChatMessageList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ChatServiceClient.prototype.getMessages =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ChatService/getMessages',
      request,
      metadata || {},
      methodDescriptor_ChatService_getMessages,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ChatMessageList>}
 *     Promise that resolves to the response
 */
proto.ChatServicePromiseClient.prototype.getMessages =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ChatService/getMessages',
      request,
      metadata || {},
      methodDescriptor_ChatService_getMessages);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.UserList>}
 */
const methodDescriptor_ChatService_getUsers = new grpc.web.MethodDescriptor(
  '/ChatService/getUsers',
  grpc.web.MethodType.UNARY,
  proto.Empty,
  proto.UserList,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UserList.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.UserList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UserList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ChatServiceClient.prototype.getUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ChatService/getUsers',
      request,
      metadata || {},
      methodDescriptor_ChatService_getUsers,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UserList>}
 *     Promise that resolves to the response
 */
proto.ChatServicePromiseClient.prototype.getUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ChatService/getUsers',
      request,
      metadata || {},
      methodDescriptor_ChatService_getUsers);
};


module.exports = proto;

