export interface IServerConfig {
    port?: number
    domain?: string
    subdirs?: string[]
    filesPath?: string
    urlFilePath?: string
}

export interface IConfig {
    server?: IServerConfig
}