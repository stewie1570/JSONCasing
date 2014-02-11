describe("JSONCasing object", function ()
{
    it("should return a new object and have no affect on the original object", function ()
    {
        //Arrange
        var orig = { prop1: "prop 1", Prop2: "prop 2", Prop3: { Dp1: "dp 1" }, prop4: { dp2: "dp2" } };
        var expectedJSON = JSON.stringify(orig);

        //Act
        JSONCasing.toPascal(orig);
        JSONCasing.toCamel(orig);

        //Assert
        expect(JSON.stringify(orig)).toBe(expectedJSON);
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
        expect(JSON.stringify(resultPascal)).toBe(expectedPascalJSON);
        expect(JSON.stringify(resultCamel)).toBe(expectedCamelJSON);
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
        expect(JSON.stringify(resultPascal)).toBe(expectedResult);
        expect(JSON.stringify(resultCamel)).toBe(expectedResult);
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
        expect(JSON.stringify(resultPascal)).toBe(expectedPascalResult);
        expect(JSON.stringify(resultCamel)).toBe(expectedCamelResult);
    });

    describe("Pascal Case conversion", function ()
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
            expect(JSON.stringify(result)).toBe(JSON.stringify(pascalObj));
        }
    });

    describe("Camel Case conversion", function ()
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
            expect(JSON.stringify(result)).toBe(JSON.stringify(camelObj));
        }
    });
});
