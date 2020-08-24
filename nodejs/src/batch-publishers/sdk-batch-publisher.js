class SdkBatchPublisher {
    eventsApi = null;

    constructor(key, secret) {
        this.key = key;
        this.secret = secret;
    }

    publish(batch) {
        let batchToPublish = batch;
        const batchAdapter = SdkBatchAdapterFactory.get(batch);
        if(batchAdapter) {
            const adaptedBatch = batchAdapter.convertFromQuarantine(batchToPublish);
            if(adaptedBatch) {
                batchToPublish = adaptedBatch;
            }
        }
        if(!this.eventsApi) {
            this.eventsApi = new mParticle.EventsApi(new mParticle.Configuration(this.key, this.secret));
        }
        this.eventsApi.uploadEvents([batch], (error, data, response) => {
            if (error) {
                console.error(error);
            }
        });
    }
}

module.exports = SdkBatchPublisher;