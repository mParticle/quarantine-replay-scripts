const ArrayUtils = require("../utils/array-utils");
const ObjectUtils = require("../utils/object-utils");

class V001ToJsonBatchAdapter {
    convertFromQuarantine(batch) {
        V001ToJsonBatchAdapter.removeBlockedUserIdentities(batch);
        V001ToJsonBatchAdapter.removeBlockedUserAttributes(batch);
        // remove blocked event attributes first, since removing blocked events
        // first could result in the event indices changing
        V001ToJsonBatchAdapter.removeBlockedEventAttributes(batch);
        V001ToJsonBatchAdapter.removeBlockedEvents(batch);
        return batch;
    }
    static removeBlockedEventAttributes(batch) {
        if(ArrayUtils.isFalseOrEmpty(batch.blocked_event_attributes)) return;
        for(const blockedEventAttribute of batch.blocked_event_attributes) {
            const blockedEventIndex = blockedEventAttribute.event_index;
            const blockedEventPath = blockedEventAttribute.event_attributes;
            const referencedEvent = batch.events[blockedEventIndex];
            ObjectUtils.removePropertyByPath(referencedEvent, blockedEventPath);
        }
    }
    static removeBlockedEvents(batch) {
        if(ArrayUtils.isFalseOrEmpty(batch.blocked_event_indices)) return;
        // remove from the end first
        batch.blocked_event_indices.sort();
        for(let i = batch.blocked_event_indices.length - 1; i >= 0; i--) {
            const blockedEventIndex = batch.blocked_event_indices[i];
            batch.events.splice(blockedEventIndex, 1);
        }
    }
    static removeBlockedUserAttributes(batch) {
        if(ArrayUtils.hasItems(batch.blocked_user_attributes)) {
            ObjectUtils.removeProperties(batch.user_attributes, batch.blocked_user_attributes);
        }
    }
    static removeBlockedUserIdentities(batch) {
        if(ArrayUtils.isFalseOrEmpty(batch.blocked_user_identities)) return;
        for(const blockedUserIdentity in batch.blocked_user_identities) {
            switch(blockedUserIdentity) {
                case "mp-deviceid": 
                    // handle differently?
                default: 
                    ObjectUtils.removeProperty(batch.user_identities, blockedUserIdentity);
            }
        }
    }
}

module.exports = V001ToJsonBatchAdapter;