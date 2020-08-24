const PassthroughBatchAdapter = require("../batch-adapters/passthrough-batch-adapter");

class SdkBatchAdapterFactory {
    static passthroughBatchAdapter = new PassthroughBatchAdapter();
    static get(batch) {
        return SdkBatchAdapterFactory.passthroughBatchAdapter;
    }
}

module.exports = SdkBatchAdapterFactory;