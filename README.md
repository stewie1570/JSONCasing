#json-casing

[![Build](https://travis-ci.org/stewie1570/JSONCasing.svg)](https://travis-ci.org/stewie1570/JSONCasing)
[![npm version](https://badge.fury.io/js/json-casing.svg)](https://badge.fury.io/js/json-casing)

Here are a few lines of code taken from a unit test so you can see how to use this very simple JavaScript.

            var camelObj = { prop1: "prop 1", obj1: { deepProp1: "dp1", deepProp2: "dp2" } };
            var pascalObj = { Prop1: "prop 1", Obj1: { DeepProp1: "dp1", DeepProp2: "dp2" } };
            
            var result = JSONCasing.toCamel(pascalObj);

            expect(JSON.stringify(result)).toBe(JSON.stringify(camelObj));
