JSONCasing = {
    toCamel: function (obj)
    {
        return this.processObj(obj, this.toCamel, function (firstChar) { return firstChar.toUpperCase(); });
    },

    toPascal: function (obj)
    {
        return this.processObj(obj, this.toPascal, function (firstChar) { return firstChar.toLowerCase(); });
    },

    processObj: function (obj, caller, firstChar)
    {
        var newObj = Object.prototype.toString.call(obj) == "[object Array]" ? [] : {};
        for (var key in obj)
        {
            var properKey = firstChar(key.charAt(0)) + key.substr(1, key.length - 1);
            newObj[properKey] = typeof (obj[key]) == "object" ? caller.call(this, obj[key]) : obj[key];
        }
        return newObj;
    }
};