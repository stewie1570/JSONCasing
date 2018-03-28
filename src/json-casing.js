import { reCasedObjectFrom } from './domain'

export var JSONCasing = {
    toCamel: function toCamel(jsonObj){
        return reCasedObjectFrom({
            jsonObj,
            casingChange: this.toCamel.bind(this),
            firstCharModifier: firstChar => firstChar.toLowerCase()
        });
    },

    toPascal: function toPascal(jsonObj) {
        return reCasedObjectFrom({
            jsonObj,
            casingChange: this.toPascal.bind(this),
            firstCharModifier: firstChar => firstChar.toUpperCase()
        });
    }
}