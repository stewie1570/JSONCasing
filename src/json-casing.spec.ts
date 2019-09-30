import { JSONCasing } from './json-casing';

describe("JSONCasing", () =>
{
    describe("Primitives", () =>
    {
        it("should not throw exception", () =>
        {
            //Arrange
            var string = "a string (a primitive)";
            var number = 2;

            //Act
            var exception = null;
            try
            {
                JSONCasing.toPascal(string);
                JSONCasing.toPascal(number);
                JSONCasing.toCamel(string);
                JSONCasing.toCamel(number);
            } catch (ex) { exception = ex;}

            //Assert
            expect(exception).toEqual(null);
        });

        it("should return the original", () =>
        {
            //Arrange
            var string = "a string (a primitive)";
            var number = 2;
            var nullObj = null;
            var date = new Date();

            //Act
            //Assert
            expect(JSONCasing.toPascal(string)).toEqual(string);
            expect(JSONCasing.toPascal(number)).toEqual(number);
            expect(JSONCasing.toPascal(nullObj)).toEqual(nullObj);
            expect(JSONCasing.toPascal(date)).toEqual(date);

            expect(JSONCasing.toCamel(string)).toEqual(string);
            expect(JSONCasing.toCamel(number)).toEqual(number);
            expect(JSONCasing.toCamel(nullObj)).toEqual(nullObj);
            expect(JSONCasing.toCamel(date)).toEqual(date);
        });
    });

    it("should return a new object and have no affect on the original object", () =>
    {
        //Arrange
        var orig = { prop1: "prop 1", Prop2: "prop 2", Prop3: { Dp1: "dp 1" }, prop4: { dp2: "dp2" }, prop5: null };
        var expectedJSON = JSON.stringify(orig);

        //Act
        JSONCasing.toPascal(orig);
        JSONCasing.toCamel(orig);

        //Assert
        expect(JSON.stringify(orig)).toEqual(expectedJSON);
    });

    it("should copy proper and improper case keys", () =>
    {
        //Arrange
        var orig = { Prop1: "prop 1", prop2: { dp1: "dp 1" } };
        var expectedPascalJSON = JSON.stringify({ Prop1: "prop 1", Prop2: { Dp1: "dp 1" } });
        var expectedCamelJSON = JSON.stringify({ prop1: "prop 1", prop2: { dp1: "dp 1" } });

        //Act
        var resultPascal = JSONCasing.toPascal(orig);
        var resultCamel = JSONCasing.toCamel(orig);

        //Assert
        expect(JSON.stringify(resultPascal)).toEqual(expectedPascalJSON);
        expect(JSON.stringify(resultCamel)).toEqual(expectedCamelJSON);
    });

    it("should support simple JSON arrays", () =>
    {
        //Arrange
        var orig = [1, 2, 3];
        var expectedResult = JSON.stringify(orig);

        //Act
        var resultPascal = JSONCasing.toPascal(orig);
        var resultCamel = JSONCasing.toCamel(orig);

        //Assert
        expect(JSON.stringify(resultPascal)).toEqual(expectedResult);
        expect(JSON.stringify(resultCamel)).toEqual(expectedResult);
    });

    it("should support complex JSON arrays", () =>
    {
        //Arrange
        var origCamel = [1, 2, [1, 2, 3], { prop1: "p1", prop2: { dp1: "dp1" } }];
        var origPascal = [1, 2, [1, 2, 3], { Prop1: "p1", Prop2: { Dp1: "dp1" } }];
        var expectedCamelResult = JSON.stringify(origCamel);
        var expectedPascalResult = JSON.stringify(origPascal);

        //Act
        var resultPascal = JSONCasing.toPascal(origCamel);
        var resultCamel = JSONCasing.toCamel(origPascal);

        //Assert
        expect(JSON.stringify(resultPascal)).toEqual(expectedPascalResult);
        expect(JSON.stringify(resultCamel)).toEqual(expectedCamelResult);
    });

    describe("To Pascal", () =>
    {
        it("should support a shallow conversion", () =>
        {
            //Arrange
            var camelObj = { prop1: "prop 1", prop2: "prop 2" };
            var pascalObj = { Prop1: "prop 1", Prop2: "prop 2" };
            actAndAssert(camelObj, pascalObj);
        });

        it("should support a deep conversion with a date", () =>
        {
            //Arrange
            var date = new Date();
            var camelObj = { prop1: "prop 1", obj1: { deepProp1: "dp1", deepProp2: "dp2", date } };
            var pascalObj = { Prop1: "prop 1", Obj1: { DeepProp1: "dp1", DeepProp2: "dp2", Date: date } };
            actAndAssert(camelObj, pascalObj);
        });

        function actAndAssert(camelObj, pascalObj)
        {
            //Act
            var result = JSONCasing.toPascal(camelObj);

            //Assert
            expect(JSON.stringify(result)).toEqual(JSON.stringify(pascalObj));
        }
    });

    describe("To Camel", () =>
    {
        it("should support a shallow conversion", () =>
        {
            //Arrange
            var camelObj = { prop1: "prop 1", prop2: "prop 2" };
            var pascalObj = { Prop1: "prop 1", Prop2: "prop 2" };
            actAndAssert(camelObj, pascalObj);
        });

        it("should support a deep conversion with a date", () =>
        {
            //Arrange
            var date = new Date();
            var camelObj = { prop1: "prop 1", obj1: { deepProp1: "dp1", deepProp2: "dp2", date } };
            var pascalObj = { Prop1: "prop 1", Obj1: { DeepProp1: "dp1", DeepProp2: "dp2", Date: date } };
            actAndAssert(camelObj, pascalObj);
        });

        function actAndAssert(camelObj, pascalObj)
        {
            //Act
            var result = JSONCasing.toCamel(pascalObj);

            //Assert
            expect(JSON.stringify(result)).toEqual(JSON.stringify(camelObj));
        }
    });
});
