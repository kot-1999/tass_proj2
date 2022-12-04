import 'dotenv/config'
import { IConfig } from '../src/types/interfaces'

export default <IConfig>{
    server: {
        port: process.env.PORT || 8000,
        domain: process.env.DOMAIN || `http://localhost:${process.env.PORT || 8000}`,
        filesPath: process.env.FILES_PATH,
        urlFilePath: 'public/default'
    },
}