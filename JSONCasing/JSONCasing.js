JSONCasing = {
    toCamel: function (obj)
    {
        return this.processObj(obj, this.toCamel, function (key) { return key.charAt(0).toUpperCase(); });
    },

    toPascal: function (obj)
    {
        return this.processObj(obj, this.toPascal, function (key) { return key.charAt(0).toLowerCase(); });
    },

    processObj: function (obj, caller, properFirstChar)
    {
        for (var key in obj)
        {
            if (typeof (obj[key]) == "object")
                obj[key] = caller.call(this, obj[key]);
            this.processObjectKey(obj, key, properFirstChar(key) + key.substr(1, key.length - 1));
        }
        return obj;
    },

    processObjectKey: function (obj, key, proper)
    {
        if (key != proper)
        {
            obj[proper] = obj[key];
            delete obj[key];
        }
    }
};