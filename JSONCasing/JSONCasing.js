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
        var newObj = {};
        for (var key in obj)
        {
            var properKey = properFirstChar(key) + key.substr(1, key.length - 1);

            if (typeof (obj[key]) == "object")
                newObj[properKey] = caller.call(this, obj[key]);
            else
                newObj[properKey] = obj[key];
        }
        return newObj;
    }
};