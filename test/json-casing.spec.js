import { JSONCasing } from '../src/json-casing';

describe("JSONCasing", function ()
{
    describe("Primitives", function ()
    {
        it("should not throw exception", function ()
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
            expect(exception).to.equal(null);
        });

        it("should return the original", function ()
        {
            //Arrange
            var string = "a string (a primitive)";
            var number = 2;

            //Act
            //Assert
            expect(JSONCasing.toPascal(string)).to.equal(string);
            expect(JSONCasing.toPascal(number)).to.equal(number);
            expect(JSONCasing.toCamel(string)).to.equal(string);
            expect(JSONCasing.toCamel(number)).to.equal(number);
        });
    });

    it("should return a new object and have no affect on the original object", function ()
    {
        //Arrange
        var orig = { prop1: "prop 1", Prop2: "prop 2", Prop3: { Dp1: "dp 1" }, prop4: { dp2: "dp2" } };
        var expectedJSON = JSON.stringify(orig);

        //Act
        JSONCasing.toPascal(orig);
        JSONCasing.toCamel(orig);

        //Assert
        expect(JSON.stringify(orig)).to.equal(expectedJSON);
    });

    it("should copy proper and improper case keys", function ()
    {
        //Arrange
        var orig = { Prop1: "prop 1", prop2: { dp1: "dp 1" } };
        var expectedPascalJSON = JSON.stringify({ Prop1: "prop 1", Prop2: { Dp1: "dp 1" } });
        var expectedCamelJSON = JSON.stringify({ prop1: "prop 1", prop2: { dp1: "dp 1" } });

        //Act
        var resultPascal = JSONCasing.toPascal(orig);
        var resultCamel = JSONCasing.toCamel(orig);

        //Assert
        expect(JSON.stringify(resultPascal)).to.equal(expectedPascalJSON);
        expect(JSON.stringify(resultCamel)).to.equal(expectedCamelJSON);
    });

    it("should support simple JSON arrays", function ()
    {
        //Arrange
        var orig = [1, 2, 3];
        var expectedResult = JSON.stringify(orig);

        //Act
        var resultPascal = JSONCasing.toPascal(orig);
        var resultCamel = JSONCasing.toCamel(orig);

        //Assert
        expect(JSON.stringify(resultPascal)).to.equal(expectedResult);
        expect(JSON.stringify(resultCamel)).to.equal(expectedResult);
    });

    it("should support complex JSON arrays", function ()
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
        expect(JSON.stringify(resultPascal)).to.equal(expectedPascalResult);
        expect(JSON.stringify(resultCamel)).to.equal(expectedCamelResult);
    });

    describe("To Pascal", function ()
    {
        it("should support a shallow conversion", function ()
        {
            //Arrange
            var camelObj = { prop1: "prop 1", prop2: "prop 2" };
            var pascalObj = { Prop1: "prop 1", Prop2: "prop 2" };
            actAndAssert(camelObj, pascalObj);
        });

        it("should support a deep conversion", function ()
        {
            //Arrange
            var camelObj = { prop1: "prop 1", obj1: { deepProp1: "dp1", deepProp2: "dp2" } };
            var pascalObj = { Prop1: "prop 1", Obj1: { DeepProp1: "dp1", DeepProp2: "dp2" } };
            actAndAssert(camelObj, pascalObj);
        });

        function actAndAssert(camelObj, pascalObj)
        {
            //Act
            var result = JSONCasing.toPascal(camelObj);

            //Assert
            expect(JSON.stringify(result)).to.equal(JSON.stringify(pascalObj));
        }
    });

    describe("To Camel", function ()
    {
        it("should support a shallow conversion", function ()
        {
            //Arrange
            var camelObj = { prop1: "prop 1", prop2: "prop 2" };
            var pascalObj = { Prop1: "prop 1", Prop2: "prop 2" };
            actAndAssert(camelObj, pascalObj);
        });

        it("should support a deep conversion", function ()
        {
            //Arrange
            var camelObj = { prop1: "prop 1", obj1: { deepProp1: "dp1", deepProp2: "dp2" } };
            var pascalObj = { Prop1: "prop 1", Obj1: { DeepProp1: "dp1", DeepProp2: "dp2" } };
            actAndAssert(camelObj, pascalObj);
        });

        function actAndAssert(camelObj, pascalObj)
        {
            //Act
            var result = JSONCasing.toCamel(pascalObj);

            //Assert
            expect(JSON.stringify(result)).to.equal(JSON.stringify(camelObj));
        }
    });
});
