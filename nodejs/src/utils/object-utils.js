const ArrayUtils = require("./array-utils");

class ObjectUtils {
    static AccessProperty(obj, propertyName, objKeyValueCallbackFn) {
        if(!obj || !propertyName) return;
        if(objKeyValueCallbackFn) objKeyValueCallbackFn(obj, propertyName, obj[propertyName]);
    }
    static AccessPropertyByPath(obj, propertyPath, objKeyValueCallbackFn) {
        if(!obj || !propertyPath) return;
        if(propertyPath.indexOf('./') === 0) {
            propertyPath = propertyPath.substr(2);
        }
        const propertyNames = propertyPath.split("/");
        if(propertyNames.length === 0) return;
        let leafObject = obj;
        let propertyNameIndex = 0;
        while(leafObject && propertyNameIndex < propertyNames.length - 1) {
            const propertyName = propertyNames[propertyNameIndex];
            leafObject = leafObject[propertyName];
            propertyNameIndex++;
        }
        ObjectUtils.AccessProperty(leafObject, propertyNames[propertyNames.length - 1], objKeyValueCallbackFn);
    }
    static accessProperties(obj, propertyNames, objKeyValueCallbackFn) {
        if(!obj || ArrayUtils.IsFalseOrEmpty(propertyNames)) return;
        for(const propertyName in propertyNames) {
            ObjectUtils.AccessProperty(obj, propertyName, objKeyValueCallbackFn);
        }
    }
}

module.exports = ObjectUtils;