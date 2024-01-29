const grpc = require("@grpc/grpc-js")
const PROTO_PATH = "./data.proto"
var protoLoader = require("@grpc/proto-loader")
const DATABASE = require('./data')

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: String,
    oneofs: String,
}

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options)
const dataProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()
server.addService(dataProto.DataService.service, {
    getAll: async (_, callback) => {
        console.log("Get all called")
        // simulate asynchronous process
        const datas = await DATABASE.getAll()
        console.log(datas)

        // simulate asynchronous waiting
        setTimeout(() => {
            callback(null, {
                datas
            })
        }, 1500)
    },
    add: async (call, callback) => {
        console.log("Add called", call.request)
        await DATABASE.add(call.request)

        setTimeout(() => {
            callback(null, {})
        }, 1500)
    }
})

server.bindAsync('127.0.0.1:6666', grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log('Server Started', port)
    server.start()
})