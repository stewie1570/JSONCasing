import { reCasedObjectFrom } from './domain'

class Casing {
    toCamel(jsonObj) {
        return reCasedObjectFrom({
            jsonObj,
            casingChange: this.toCamel.bind(this),
            firstCharModifier: firstChar => firstChar.toLowerCase()
        });
    }

    toPascal(jsonObj) {
        return reCasedObjectFrom({
            jsonObj,
            casingChange: this.toPascal.bind(this),
            firstCharModifier: firstChar => firstChar.toUpperCase()
        });
    }
};

export var JSONCasing = new Casing();