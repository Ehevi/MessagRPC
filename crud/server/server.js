const PROTO_PATH = "./customers.proto";

var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

var customersProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();
const customers = [
    {
        id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        name: "John Bolton",
        age: 23,
        address: "Address 1"
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
        name: "Mary Anne",
        age: 45,
        address: "Address 2"
    }
];

const workers = [
    {
        id: "aaaaaaaaa",
        name: "John Bolton Worker",
        age: 23,
        address: "Address 1"
    },
    {
        id: "bbbbbbbbbbbb",
        name: "Mary Anne Worker",
        age: 45,
        address: "Address 2"
    }
];

server.addService(customersProto.WorkerService.service, {
    getAllWorkers: (_, callback) => {
        callback(null, { workers });
    },

    getWorker: (call, callback) => {
        let worker = workers.find(n => n.id == call.request.id);

        if (worker) {
            callback(null, worker);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    insertWorker: (call, callback) => {
        let worker = call.request;
        
        worker.id = uuidv4();
        workers.push(worker);
        callback(null, worker);
    },

    updateWorker: (call, callback) => {
        let existingWorker = workers.find(n => n.id == call.request.id);

        if (existingWorker) {
            existingWorker.name = call.request.name;
            existingWorker.age = call.request.age;
            existingWorker.address = call.request.address;
            callback(null, existingWorker);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    removeWorker: (call, callback) => {
        let existingWorkerIndex = workers.findIndex(
            n => n.id == call.request.id
        );

        if (existingWorkerIndex != -1) {
            workers.splice(existingWorkerIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    }
});

server.addService(customersProto.CustomerService.service, {
    getAll: (_, callback) => {
        callback(null, { customers });
    },

    get: (call, callback) => {
        let customer = customers.find(n => n.id == call.request.id);

        if (customer) {
            callback(null, customer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    insert: (call, callback) => {
        let customer = call.request;
        
        customer.id = uuidv4();
        customers.push(customer);
        callback(null, customer);
    },

    update: (call, callback) => {
        let existingWorker = customers.find(n => n.id == call.request.id);

        if (existingWorker) {
            existingWorker.name = call.request.name;
            existingWorker.age = call.request.age;
            existingWorker.address = call.request.address;
            callback(null, existingWorker);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    remove: (call, callback) => {
        let existingWorkerIndex = customers.findIndex(
            n => n.id == call.request.id
        );

        if (existingWorkerIndex != -1) {
            customers.splice(existingWorkerIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    }
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();
