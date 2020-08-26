class IdentityUtils {
    static IsDeviceIdentity(identityType) {
        switch(identityType) {
            case "ios_advertising_id":
            case "ios_idfv":
            case "android_advertising_id":
            case "android_uuid":
            case "amp_id":
            case "roku_advertising_id":
            case "roku_publisher_id":
            case "microsoft_advertising_id":
            case "microsoft_publisher_id":
            case "fire_advertising_id":
            case "push_token":
                return true;
            default:
                return false;
        }
    }
}

module.exports = IdentityUtils;