describe("JSONCasing object", function ()
{
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
