import { isMaster } from 'cluster'
import { masterProcess } from './modules/master.process'
import { workerProcess } from './modules/worker.process'
import { IOptions, IPassedOptions, logError } from './modules/utils/utils'

export class ClusterWS {
    constructor(configurations: IPassedOptions) {
        if (!configurations.worker || {}.toString.call(configurations.worker) !== '[object Function]')
            return logError('Worker must be provided and it must be a function \n \n')

        const options: IOptions = {
            port: configurations.port || 80,
            worker: configurations.worker,
            workers: configurations.workers || 1,
            brokerPort: configurations.brokerPort || 9346,
            pingInterval: configurations.pingInterval || 20000,
            restartWorkerOnFail: configurations.restartWorkerOnFail || false,
            useBinary: configurations.useBinary || false,
            machineScale: configurations.machineScale
        }

        isMaster ? masterProcess(options) : workerProcess(options)
    }
}