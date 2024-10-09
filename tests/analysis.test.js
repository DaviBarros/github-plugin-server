"use strict";
exports.__esModule = true;
var supertest_1 = require("supertest");
var fs_1 = require("fs");
var app_1 = require("../src/routes/app");
var dataFile = "src/data/analysisOutputs.json";
var analysisExample = JSON.parse(fs_1["default"].readFileSync(dataFile, "utf8"));
var owner = "Vinicius-resende-cin";
var repo = "semantic-conflict";
var pull_number = 59;
var TIMEOUT = 60000;
describe("/analysis route", function () {
    beforeEach(function () {
        analysisExample = JSON.parse(fs_1["default"].readFileSync(dataFile, "utf8"));
    });
    afterEach(function () { });
    // POST tests
    test("POST: should return 400 Bad Request", function () {
        return (0, supertest_1["default"])(app_1["default"])
            .post("/analysis")
            .then(function (response) { return expect(response.statusCode).toBe(400); });
    }, TIMEOUT);
    test("POST: should return 200 OK and the created Analysis", function () {
        return (0, supertest_1["default"])(app_1["default"])
            .post("/analysis")
            .send({ analysis: analysisExample[0] })
            .then(function (response) {
            expect(response.statusCode).toBe(200);
            var analysis = JSON.parse(response.text);
            expect(analysis).toEqual(analysisExample[0]);
        });
    }, TIMEOUT);
    // GET tests
    test("GET: should return 400 Bad Request", function () {
        return (0, supertest_1["default"])(app_1["default"])
            .get("/analysis")
            .then(function (response) { return expect(response.statusCode).toBe(400); });
    });
    test("GET: should return 200 OK and the requested Analysis", function () {
        return (0, supertest_1["default"])(app_1["default"])
            .get("/analysis?owner=".concat(owner, "&repo=").concat(repo, "&pull_number=").concat(pull_number))
            .then(function (response) {
            expect(response.statusCode).toBe(200);
            var analysis = JSON.parse(response.text);
            expect(analysis).toMatchObject(analysisExample[0]);
        });
    }, TIMEOUT);
    test("GET: should return 200 OK and all Analysis from a repo", function () {
        return (0, supertest_1["default"])(app_1["default"])
            .get("/analysis?owner=".concat(owner, "&repo=").concat(repo))
            .then(function (response) {
            expect(response.statusCode).toBe(200);
            var analysis = JSON.parse(response.text);
            expect(analysis).toMatchObject(analysisExample);
        });
    }, TIMEOUT);
    test("GET: should return 200 OK and all Analysis from an owner", function () {
        return (0, supertest_1["default"])(app_1["default"])
            .get("/analysis?owner=".concat(owner))
            .then(function (response) {
            expect(response.statusCode).toBe(200);
            var analysis = JSON.parse(response.text);
            expect(analysis).toMatchObject(analysisExample);
        });
    }, TIMEOUT);
    // PUT tests
    test("PUT: should return 400 Bad Request", function () {
        return (0, supertest_1["default"])(app_1["default"])
            .put("/analysis")
            .then(function (response) { return expect(response.statusCode).toBe(400); });
    }, TIMEOUT);
    test("PUT: should return 200 OK and the updated Analysis", function () {
        return (0, supertest_1["default"])(app_1["default"])
            .put("/analysis")
            .send({ analysis: analysisExample[0] })
            .then(function (response) {
            expect(response.statusCode).toBe(200);
            var analysis = JSON.parse(response.text);
            expect(analysis).toMatchObject(analysisExample[0]);
        });
    }, TIMEOUT);
    // DELETE tests
    test("DELETE: should return 400 Bad Request", function () {
        return (0, supertest_1["default"])(app_1["default"])["delete"]("/analysis")
            .then(function (response) { return expect(response.statusCode).toBe(400); });
    }, TIMEOUT);
    test("DELETE: should return 200 OK", function () {
        return (0, supertest_1["default"])(app_1["default"])["delete"]("/analysis?owner=".concat(owner, "&repo=").concat(repo, "&pull_number=").concat(pull_number))
            .then(function (response) { return expect(response.statusCode).toBe(200); });
    }, TIMEOUT);
    test("DELETE: analysis list should be empty", function () {
        return (0, supertest_1["default"])(app_1["default"])["delete"]("/analysis?owner=".concat(owner, "&repo=").concat(repo, "&pull_number=").concat(pull_number))
            .then(function (response) { return expect(response.statusCode).toBe(200); })
            .then(function () {
            return (0, supertest_1["default"])(app_1["default"])
                .get("/analysis?owner=".concat(owner))
                .then(function (response) {
                expect(response.statusCode).toBe(200);
                var analysis = JSON.parse(response.text);
                expect(analysis).toEqual([]);
            });
        });
    }, TIMEOUT);
});
