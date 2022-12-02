import http from 'http'
import config from 'config'
import 'colors'
import app from './app'
import { models } from './db/models'
import { IServerConfig } from './types/interfaces'

const httpServer = http.createServer(app)
const serverConfig: IServerConfig = config.get('server')

// Init database models
models.sync().catch((err) => console.log(err))

httpServer.listen(serverConfig.port).on('listening', () => {
    console.log(`Server started in ${process.env.NODE_ENV} mode at port ${serverConfig.port}`.green)
})

export default httpServer