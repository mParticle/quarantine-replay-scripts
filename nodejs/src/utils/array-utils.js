class ArrayUtils {
    static HasItems(array) {
        return !ArrayUtils.IsFalseOrEmpty(array);
    }
    static IsFalseOrEmpty(array) {
        return !array || array.length === 0;
    }
    static RemoveItem(array, item) {
        ArrayUtils.RemoveItems(array, item);
    }
    static RemoveItems(array, ...items) {
        if(ArrayUtils.IsFalseOrEmpty(array) 
            || ArrayUtils.IsFalseOrEmpty(items)) {
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