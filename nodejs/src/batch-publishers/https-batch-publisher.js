const https = require('https');
const HttpsBatchAdapterFactory = require('../batch-adapter-factories/https-batch-adapter-factory');

class HttpsBatchPublisher {
    mparticleEventApiOptions = null;
    constructor(key, secret) {
        this.mparticleEventApiOptions = {
            host: 's2s-qa1.qa.corp.mparticle.com',
            port: 443,
            path: '/v2/events',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(key + ':' + secret).toString('base64')
             }    
        }
    }

    publish(batch) {
        let batchToPublish = batch;
        const batchAdapter = HttpsBatchAdapterFactory.get(batch);
        if(batchAdapter) {
            const adaptedBatch = batchAdapter.convertFromQuarantine(batchToPublish);
            if(adaptedBatch) {
                batchToPublish = adaptedBatch;
            }
        }
        const eventRequest = https.request(this.mparticleEventApiOptions, (response) => {
            if(response.statusCode !== 202) {
                console.error(`error status code: ${response.statusCode}`);
            }
        });
        eventRequest.write(JSON.stringify(batch));
        eventRequest.end();
    }
}

module.exports = HttpsBatchPublisher;