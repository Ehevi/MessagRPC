const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "../chat.proto";
const SERVER_URI = "0.0.0.0:9090";

const usersInChat = [];
const allMessages = [];

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// we'll implement the handlers here
const join = (call, callback) => {
  const user = call.request;

  // check username already exists.
  const userExiist = usersInChat.find((_user) => _user.name == user.name);
  if (!userExiist) {
    usersInChat.push(user);
    callback(null, {
      error: 0,
      msg: "Success",
    });
  } else {
    callback(null, { error: 1, msg: "user already exist." });
  }
};

const sendMsg = (call, callback) => {
  const message = call.request;
  allMessages.push(message);

  callback(null, {});
};

const getAllUsers = (call, callback) => {
  callback(null, { users: usersInChat });
};

const getMessages = (call, callback) => {
  callback(null, { messages: allMessages });
}

const server = new grpc.Server();

server.addService(protoDescriptor.ChatService.service, {
  join,
  sendMsg,
  getAllUsers,
  getMessages
});

server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure());

server.start();
console.log("Server is running!");
