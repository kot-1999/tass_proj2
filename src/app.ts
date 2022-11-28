import express from 'express'
import router from './api'
import config from 'config'
import {IServerConfig} from './types/interfaces'

const serverConfig: IServerConfig = config.get('server')

const app = express()

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/api', router())
app.use(`/${serverConfig.urlFilePath}`, express.static(`${serverConfig.filesPath}/${serverConfig.urlFilePath}`))


export default app