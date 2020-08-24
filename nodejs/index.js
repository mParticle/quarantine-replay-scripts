const ReplayEngine = require('./src/replay-engine');
const CommandLineBatchSource = require('./src/batch-sources/command-line-batch-source');
const PassthroughBatchAdapter = require('./src/batch-adapters/passthrough-batch-adapter');
const HttpsBatchPublisher = require('./src/batch-publishers/https-batch-publisher');

const mParticleConfig = {
    inputKey: 'cc4d5b2a2e8f914890a9cfb9ca327980',
    inputSecret: '2WHKqg_Dmkwp4K3XSrEHiuoBAx0g0_OOG2-wNYhxaE5BdLMxly4PovuTNRTxXwcY'
};

const quarantineBatchSource = new CommandLineBatchSource();
const batchPublisher = new HttpsBatchPublisher(mParticleConfig.inputKey, mParticleConfig.inputSecret);
const replayEngine = new ReplayEngine(quarantineBatchSource, batchPublisher);
replayEngine.run();


