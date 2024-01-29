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
        const datas = await DATABASE.getAll()

        callback(null, {
            message: datas
        })
    },
    add: async (call, callback) => {
        await DATABASE.add(call.request)
        callabck(null, {
            message: true
        })
    }
})

server.bindAsync('0.0.0.0:6666', grpc.ServerCredentials.createInsecure(), () => {
    server.start()
})