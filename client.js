const grpc = require('@grpc/grpc-js')
var protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = "./data.proto"

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const DataService = grpc.loadPackageDefinition(packageDefinition).DataService

const client = new DataService(
  "127.0.0.1:6666",
  grpc.credentials.createInsecure()
);
console.log("Client is Listening")

client.add({
    title: 'New Data',
    short_desc: 'this is short description'
}, (error, _) => {
    console.log("Adding Data")
    if(error) throw error
    console.log(_)
})
client.getAll({}, (error, response) => {
    console.log("Get All")
    if(error) throw error
    console.log(response)
})