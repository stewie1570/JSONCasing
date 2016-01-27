class Casing {
    constructor() { }

    toCamel(jsonObj) {
        return this.processJsonObj.call(this, {
            jsonObj: jsonObj,
            keyModifier: this.toCamel,
            properFirstCharFunc: firstChar => firstChar.toLowerCase()
        });
    }

    toPascal(jsonObj) {
        return this.processJsonObj.call(this, {
            jsonObj: jsonObj,
            keyModifier: this.toPascal,
            properFirstCharFunc: firstChar => firstChar.toUpperCase()
        });
    }

    processJsonObj(jsonCasingCommand) {
        var jsonObj = jsonCasingCommand.jsonObj,
            keyModifier = jsonCasingCommand.keyModifier,
            properFirstCharFunc = jsonCasingCommand.properFirstCharFunc,
            replacementObj = this.isArray(jsonObj) ? [] : {};

        if (this.isPrimitive(jsonObj))
            return jsonObj;

        for (var key in jsonObj) {
            var properKey = this.properKeyFrom(key, properFirstCharFunc);
            replacementObj[properKey] = this
                .recursivelyKeyModifiedJsonObjectFrom.call(this, jsonObj[key], keyModifier);
        }

        return replacementObj;
    }

    isArray(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
    }

    isPrimitive(obj) {
        return typeof (obj) != "object";
    }

    recursivelyKeyModifiedJsonObjectFrom(jsonObj, keyModifier) {
        return typeof (jsonObj) == "object" ? keyModifier.call(this, jsonObj) : jsonObj;
    }

    properKeyFrom(key, properFirstCharFunc) {
        return properFirstCharFunc(key.charAt(0)) + key.substr(1, key.length - 1);
    }
};

export var JSONCasing = new Casing();