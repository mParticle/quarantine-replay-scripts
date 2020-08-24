class ReplayEngine {
    constructor(quarantineBatchSource, batchPublisher) {
        this.quarantineBatchSource = quarantineBatchSource;
        this.batchPublisher = batchPublisher;
    }

    run() {
        const quarantineBatches = this.quarantineBatchSource.getBatches();
        if(!quarantineBatches) {
            console.log("No quarantine batches found");
            return;
        }
        for(const quarantineBatch of quarantineBatches) {
            this.batchPublisher.publish(quarantineBatch);
        }
    }
}

module.exports = ReplayEngine;