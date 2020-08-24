class ArrayUtils {
    static hasItems(array) {
        return !ArrayUtils.isFalseOrEmpty(array);
    }
    static isFalseOrEmpty(array) {
        return !array || array.length === 0;
    }
    static removeItem(array, item) {
        ArrayUtils.removeItems(array, item);
    }
    static removeItems(array, ...items) {
        if(ArrayUtils.isFalseOrEmpty(array) 
            || ArrayUtils.isFalseOrEmpty(items)) {
            return;
        }
        for(const item of items) {
            const itemIndex = array.indexOf(itemIndex);
            if(itemIndex >= 0) {
                array.splice(itemIndex, 1);
            }
        }
    }
}

module.exports = ArrayUtils;