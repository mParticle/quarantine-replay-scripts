const ArrayUtils = require("./array-utils");

class ObjectUtils {
    static removeProperty(obj, propertyName) {
        if(!obj || !propertyName) return;
        delete obj[propertyName];
    }
    static removePropertyByPath(obj, propertyPath) {
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
        ObjectUtils.removeProperty(leafObject, propertyNames[propertyNames.length - 1]);
    }
    static removeProperties(obj, ...propertyNames) {
        if(!obj || ArrayUtils.isFalseOrEmpty(propertyNames)) return;
        for(const propertyName in propertyNames) {
            ObjectUtils.removeProperty(obj, propertyName);
        }
    }
}

module.exports = ObjectUtils;