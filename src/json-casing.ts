import { reCasedObjectFrom } from './domain'

export let JSONCasing = {
    toCamel: function toCamel(jsonObj: any){
        return reCasedObjectFrom({
            jsonObj,
            casingChange: this.toCamel.bind(this),
            firstCharModifier: (firstChar: string) => firstChar.toLowerCase()
        });
    },

    toPascal: function toPascal(jsonObj: any) {
        return reCasedObjectFrom({
            jsonObj,
            casingChange: this.toPascal.bind(this),
            firstCharModifier: (firstChar: string) => firstChar.toUpperCase()
        });
    }
}