const PROTO_PATH = "../customers.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService;
const WorkerService = grpc.loadPackageDefinition(packageDefinition).WorkerService;
const cService = new CustomerService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

const wService = new WorkerService(
    "localhost:30043",
    grpc.credentials.createInsecure()
)

const client = {
    cService: cService,
    wService: wService
};

module.exports = client;
