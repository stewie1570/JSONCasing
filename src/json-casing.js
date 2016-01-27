class Casing {
    
    toCamel(jsonObj) {
        return this._reCasedObjectFrom({
            jsonObj,
            keyModifier: this.toCamel,
            firstCharModifier: firstChar => firstChar.toLowerCase()
        });
    }

    toPascal(jsonObj) {
        return this._reCasedObjectFrom({
            jsonObj,
            keyModifier: this.toPascal,
            firstCharModifier: firstChar => firstChar.toUpperCase()
        });
    }

    _reCasedObjectFrom({jsonObj, keyModifier, firstCharModifier}) {
        var replacementObj = this._isArray(jsonObj) ? [] : {};

        if (this._isPrimitive(jsonObj))
            return jsonObj;

        for (var key in jsonObj) {
            var properKey = this._properKeyFrom(key, firstCharModifier);
            replacementObj[properKey] = this._processedObjectFrom(jsonObj[key], keyModifier);
        }

        return replacementObj;
    }

    _isArray(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
    }

    _isPrimitive(obj) {
        return typeof (obj) != "object";
    }

    _processedObjectFrom(jsonObj, keyModifier) {
        return typeof (jsonObj) == "object" ? keyModifier.call(this, jsonObj) : jsonObj;
    }

    _properKeyFrom(key, properFirstCharFunc) {
        return properFirstCharFunc(key.charAt(0)) + key.substr(1, key.length - 1);
    }
};

export var JSONCasing = new Casing();