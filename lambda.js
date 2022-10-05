const awsServerlessExpress = require('aws-serverless-express')
const app = require('./index')
const server = awsServerlessExpress.createServer(app)

exports.universal = (event, context) => {
    console.log(server)
    return awsServerlessExpress.proxy(server, event, context)
}