describe("JSONCasing object", function ()
{
    it("should return a new object and have no affect on the original object", function ()
    {
        //Arrange
        var orig = { prop1: "prop 1", Prop2: "prop 2", Prop3: { Dp1: "dp 1" }, prop4: { dp2: "dp2" } };
        var expectedJSON = JSON.stringify(orig);

        //Act
        JSONCasing.toCamel(orig);

        //Assert
        expect(JSON.stringify(orig)).toBe(expectedJSON);
    });

    it("should copy proper and improper case keys", function ()
    {
        //Arrange
        var orig = { Prop1: "prop 1", prop2: { dp1: "dp 1" } };
        var expectedJSON = JSON.stringify({ Prop1: "prop 1", Prop2: { Dp1: "dp 1" } });

        //Act
        var result = JSONCasing.toCamel(orig);

        //Assert
        expect(JSON.stringify(result)).toBe(expectedJSON);
    });

    describe("Camel Case conversion", function ()
    {
        it("should support a shallow conversion", function ()
        {
            //Arrange
            var pascalObj = { prop1: "prop 1", prop2: "prop 2" };
            var camelObj = { Prop1: "prop 1", Prop2: "prop 2" };
            actAndAssert(pascalObj, camelObj);
        });

        it("should support a deep conversion", function ()
        {
            //Arrange
            var pascalObj = { prop1: "prop 1", obj1: { deepProp1: "dp1", deepProp2: "dp2" } };
            var camelObj = { Prop1: "prop 1", Obj1: { DeepProp1: "dp1", DeepProp2: "dp2" } };
            actAndAssert(pascalObj, camelObj);
        });

        function actAndAssert(pascalObj, camelObj)
        {
            //Act
            var result = JSONCasing.toCamel(pascalObj);

            //Assert
            expect(JSON.stringify(result)).toBe(JSON.stringify(camelObj));
        }
    });

    describe("Pascal Case conversion", function ()
    {
        it("should support a shallow conversion", function ()
        {
            //Arrange
            var pascalObj = { prop1: "prop 1", prop2: "prop 2" };
            var camelObj = { Prop1: "prop 1", Prop2: "prop 2" };
            actAndAssert(pascalObj, camelObj);
        });

        it("should support a deep conversion", function ()
        {
            //Arrange
            var pascalObj = { prop1: "prop 1", obj1: { deepProp1: "dp1", deepProp2: "dp2" } };
            var camelObj = { Prop1: "prop 1", Obj1: { DeepProp1: "dp1", DeepProp2: "dp2" } };
            actAndAssert(pascalObj, camelObj);
        });

        function actAndAssert(pascalObj, camelObj)
        {
            //Act
            var result = JSONCasing.toPascal(camelObj);

            //Assert
            expect(JSON.stringify(result)).toBe(JSON.stringify(pascalObj));
        }
    });
});
