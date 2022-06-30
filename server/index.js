const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const assert = require('assert');

const PROTO_PATH = "../chat.proto";
const SERVER_ADDRESS = "0.0.0.0:9090";

const users = [];
const messages = [];

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

function join(call, callback) {
    const newUser = call.request;

    const exists = users.find((user) => user.name == newUser.name);
    if (exists) {
        callback(null, {
            error: 1,
            msg: "User already exists"
        });
    } else {
        users.push(newUser);
        callback(null, {
            error: 0,
            msg: "Success"
        });
    }
}

function sendMessage(call, callback) {
    const message = call.request;
    messages.push(message);
    callback(null, {});
}

function getUsers(call, callback) {
    callback(null, { users: users });
}

function getMessages(call, callback) {
    callback(null, { messages: messages });
}

const server = new grpc.Server();

server.addService(protoDescriptor.ChatService.service, {
    join,
    sendMessage,
    getMessages,
    getUsers
})

server.bindAsync(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure(), (err, port) => {
    assert.ifError(err);
    server.start();
    console.log("Server is running!");
});
