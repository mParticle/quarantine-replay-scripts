const fs = require('fs');
const argv = require('process').argv;
const mParticle = require('mparticle');

/**
 * Get the file
 */
const quarantineBatchFileString = fs.readFileSync(argv[2]);

/**
 * Get block metadata
 */
const batchObj = JSON.parse(quarantineBatchFileString);
const blockMetadata = batchObj.context.data_plan.block_metadata;
if(blockMetadata.dto_version != 1) throw new Error("This example script only works when 'dto_version' is 1.");

/**
 * Create a new object containing the missing events
 */
batchObj.events = batchObj.events.filter(e => blockMetadata.blocked_event_ids.includes(e.data.event_id));

// batchObj.events now contains the events that were blocked
// this is where you might do some event fixup

 //***********************************
// SCENARIO: if you want to fix an event blocked due to an incorrect event name
// and reupload with the correct name
// batchObj.events = batchObj.events.filter(e => e.event_type === "custom_event" && e.data.event_name === "Incorrect Name");
// batchObj.events.forEach(e => e.data.event_name = "Correct Name");

//***********************************
// SCENARIO: if you want to add blocked user_attributes
// batchObj.user_attributes = Object.entries(batchObj.user_attributes || {})
//     .reduce((prev, [key, value]) => {
//         if(!blockMetadata.blocked_user_attributes.includes(key)) {
//             prev[key] = value;
//         }
//         return prev;
//     }, {});

//***********************************
// SCENARIO: if you want to add blocked user_identities
//
// batchObj.user_identities = Object.entries(batchObj.user_identities || {})
//     .reduce((prev, [key, value]) => {
//         if(!mParticle.DeviceInformation.prototype.hasOwnProperty(key) && !blockMetadata.blocked_user_identities.includes(key)) {
//             prev[key] = value;
//         }
//         return prev;
//     }, {});

//***********************************
// SCENARIO: if you want to add blocked device_info values
//
// batchObj.device_info = Object.entries(batchObj.device_info || {})
//     .reduce((prev, [key, value]) => {
//         if(mParticle.DeviceInformation.prototype.hasOwnProperty(key) && !blockMetadata.blocked_device_identities.includes(key)) {
//             prev[key] = value;
//         }
//         return prev;
//     }, {});

/**
 * Send a new batch
 */
const batch = new mParticle.Batch.constructFromObject(batchObj);
batch.events.forEach(batchEvent => batchEvent.data.event_name = batchObj.events.find(e => e.data.event_id == batchEvent.data.event_id).data.event_name);
const api = new mParticle.EventsApi(new mParticle.Configuration(
    'REPLACE WITH API KEY', 
    'REPLACE WITH API SECRET'));
api.uploadEvents(batch, (error, data, response) => {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully.');
    }
});