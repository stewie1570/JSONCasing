import { isArray, isPrimitive } from '../core'

export function reCasedObjectFrom({ jsonObj, casingChange, firstCharModifier }: any) {
    let replacementObj: any = isArray(jsonObj) ? [] : {};

    if (jsonObj == null)
        return jsonObj;
    if (isPrimitive(jsonObj))
        return jsonObj;

    for (var key in jsonObj) {
        var properKey = properKeyFrom({ key, firstCharModifier });
        replacementObj[properKey] = processedObjectFrom({ obj: jsonObj[key], casingChange });
    }

    return replacementObj;
}

function processedObjectFrom({ obj, casingChange }: any) {
    return typeof (obj) == "object" ? casingChange(obj) : obj;
}

function properKeyFrom({ key, firstCharModifier }: any) {
    return firstCharModifier(key.charAt(0)) + key.substr(1, key.length - 1);
}