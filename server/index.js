const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "../chat.proto";
const SERVER_ADDRESS = "0.0.0.0:9090";

const users = [];
const messages = [];

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const join = (call, callback) => {
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

const sendMessage = (call, callback) => {
    const message = call.request;
    messages.push(message);
    callback(null, {});
}

const getUsers = (call, callback) => {
    callback(null, { users: users });
}

const getMessages = (call, callback) => {
    callback(null, { messages: messages });
}

const server = new grpc.Server();

server.addService(protoDescriptor.ChatService.service, {
    join,
    sendMessage,
    getMessages,
    getUsers
})

server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());

server.start();
console.log("Server is running!");
