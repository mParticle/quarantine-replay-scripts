const fs = require('fs');
const path = require('path');
const argv = require('process').argv;

class CommandLineBatchSource {
    getBatches() {
        const batches = [];
        for(const arg of argv) {
            let fileString = null;
            if(arg.indexOf(".json") >= 0) {
                try {
                    fileString = fs.readFileSync(arg);
                }
                catch {
                    console.error(`Could not read file ${arg}`);
                }
                if(fileString) {
                    try {
                        batches.push(JSON.parse(fileString));
                    }
                    catch {
                        console.error(`Could not parse json from file ${arg}`);
                    }
                }
            }
        }
        return batches;
    }
}

module.exports = CommandLineBatchSource;