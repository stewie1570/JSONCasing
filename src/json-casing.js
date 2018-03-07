class Casing {

    toCamel(jsonObj) {
        return this._reCasedObjectFrom({
            jsonObj,
            casingChange: this.toCamel,
            firstCharModifier: firstChar => firstChar.toLowerCase()
        });
    }

    toPascal(jsonObj) {
        return this._reCasedObjectFrom({
            jsonObj,
            casingChange: this.toPascal,
            firstCharModifier: firstChar => firstChar.toUpperCase()
        });
    }

    _reCasedObjectFrom({jsonObj, casingChange, firstCharModifier}) {
        var replacementObj = this._isArray(jsonObj) ? [] : {};

        if (jsonObj == null)
            return jsonObj;
        if (this._isPrimitive(jsonObj))
            return jsonObj;

        for (var key in jsonObj) {
            var properKey = this._properKeyFrom({ key, firstCharModifier });
            replacementObj[properKey] = this._processedObjectFrom({ obj: jsonObj[key], casingChange });
        }

        return replacementObj;
    }

    _isArray(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
    }

    _isPrimitive(obj) {
        return typeof (obj) != "object" || obj instanceof Date;
    }

    _processedObjectFrom({obj, casingChange}) {
        return typeof (obj) == "object" ? casingChange.call(this, obj) : obj;
    }

    _properKeyFrom({key, firstCharModifier}) {
        return firstCharModifier(key.charAt(0)) + key.substr(1, key.length - 1);
    }
};

export var JSONCasing = new Casing();