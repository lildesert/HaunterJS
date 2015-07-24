function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe("Lanceur", function () {
    importTest("","./decoCreationDevisTest");
    importTest("","./decoValidationDevisTest");
});