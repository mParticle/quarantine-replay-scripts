const ArrayUtils = require("../utils/array-utils");
const ObjectUtils = require("../utils/object-utils");
const IdentityUtils = require("../utils/identity-utils");

class V001ToJsonBatchAdapter {
    convertFromQuarantine(quarantineBatch) {
        if(!batch
            || !batch.context
            || !batch.context.data_plan
            || !batch.context.data_plan.block_metadata) {
            return quarantineBatch;
        }
        V001ToJsonBatchAdapter.AccessBlockedUserIdentities(quarantineBatch);
        V001ToJsonBatchAdapter.AccessBlockedUserAttributes(quarantineBatch);
        V001ToJsonBatchAdapter.AccessBlockedEventAttributes(quarantineBatch);
        V001ToJsonBatchAdapter.AccessBlockedEvents(quarantineBatch);
        return quarantineBatch;
    }
    static PrefixedObjKeyValueCallbackFn(prefix) {
        return (parentObj, propertyName, propertyValue) => {
            console.log(`${prefix}`)
            console.log(`  parentObj: ${JSON.stringify(parentObj)},`);
            console.log(`  propertyName: ${propertyName},`);
            console.log(`  propertyValue: ${propertyValue})`);
        }
    }
    static AccessBlockedEventAttributes(batch) {
        if(ArrayUtils.IsFalseOrEmpty(batch.context.data_plan.block_metadata.blocked_event_attributes)) return;
        for(const blockedEventAttribute of batch.context.data_plan.block_metadata.blocked_event_attributes) {
            const blockedEventId = blockedEventAttribute.event_id;
            const blockedEventPath = blockedEventAttribute.event_attributes;
            const referencedEvent = batch.events.find(e => e.id === blockedEventId);
            ObjectUtils.AccessPropertyByPath(referencedEvent, blockedEventPath, 
                V001ToJsonBatchAdapter.PrefixedObjKeyValueCallbackFn("event attribute"));
        }
    }
    static AccessBlockedEvents(batch) {
        if(ArrayUtils.IsFalseOrEmpty(batch.context.data_plan.block_metadata.blocked_event_ids)) return;
        for(let i = 0; i < batch.blocked_event_ids.length; i++) {
            const blockedEventId = batch.blocked_event_ids[i];
            const blockedEvent = batch.events.find(e => e.id === blockedEventId);
            console.log(`AccessBlockedEvent: ${JSON.stringify(blockedEvent)}`);
        }
    }
    static AccessBlockedUserAttributes(batch) {
        if(ArrayUtils.HasItems(batch.context.data_plan.block_metadata.blocked_user_attributes)) {
            ObjectUtils.AccessProperties(batch.user_attributes, batch.context.data_plan.block_metadata.blocked_user_attributes, 
                V001ToJsonBatchAdapter.PrefixedObjKeyValueCallbackFn("user attribute"));
        }
    }
    static AccessBlockedUserIdentities(batch) {
        if(ArrayUtils.IsFalseOrEmpty(batch.context.data_plan.block_metadata.blocked_user_identities)) return;
        for(const blockedUserIdentity in batch.context.data_plan.block_metadata.blocked_user_identities) {
            let searchObject = batch.user_identities;
            if(IdentityUtils.IsDeviceIdentity(blockedUserIdentity)) {
                searchObject = batch.device_info;
            }
            ObjectUtils.AccessProperty(searchObject, [blockedUserIdentity], 
                V001ToJsonBatchAdapter.PrefixedObjKeyValueCallbackFn("identity"))
        }
    }
}

module.exports = V001ToJsonBatchAdapter;