"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var analysisController_1 = require("../controllers/analysisController");
var mongoose_1 = require("mongoose");
var config_1 = require("../config");
// Database connection
mongoose_1["default"].connect(config_1.connectionString, {
    dbName: "analysisOutputs"
});
var db = mongoose_1["default"].connection;
db.on("error", function (err) { return console.log(err); });
db.once("connected", function () { return console.log("Connected to database"); });
var analysisController = new analysisController_1["default"]();
var app = (0, express_1["default"])();
app.use(express_1["default"].json({ limit: "10mb" }));
app.use((0, cors_1["default"])());
app.get("/codeReviewT", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("oi");
        return [2 /*return*/];
    });
}); });
app.get("/codeReview", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var owner, repo, pull_number, analysis, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                owner = req.query.owner;
                repo = req.query.repo;
                pull_number = req.query.pull_number;
                if (!owner)
                    return [2 /*return*/, res.status(400).send("Bad request: owner not provided")];
                if (pull_number && !repo)
                    return [2 /*return*/, res.status(400).send("Bad request: repo not provided")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                analysis = void 0;
                if (!(owner && repo && pull_number)) return [3 /*break*/, 3];
                return [4 /*yield*/, analysisController
                        .getAnalysis(repo, owner, parseInt(pull_number))
                        .then(function (analysis) { return JSON.stringify(analysis); })];
            case 2:
                analysis = _a.sent();
                return [3 /*break*/, 7];
            case 3:
                if (!(owner && repo)) return [3 /*break*/, 5];
                return [4 /*yield*/, analysisController
                        .getAllAnalysisFromRepo(repo, owner)
                        .then(function (analysis) { return JSON.stringify(analysis); })];
            case 4:
                analysis = _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, analysisController
                    .getAllAnalysisFromOwner(owner)
                    .then(function (analysis) { return JSON.stringify(analysis); })];
            case 6:
                analysis = _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, res.send(analysis)];
            case 8:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.status(404).send("Analysis not found")];
            case 9: return [2 /*return*/];
        }
    });
}); });
app.post("/codeReview", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var codeReview, createdAnalysis, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.codeReview)
                    return [2 /*return*/, res.status(400).send("Bad request: analysis not provided")];
                console.log("post aqui");
                codeReview = req.body.codeReview;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, analysisController
                        .createAnalysis(codeReview)
                        .then(function (codeReview) { return JSON.stringify(codeReview); })];
            case 2:
                createdAnalysis = _a.sent();
                res.send(createdAnalysis);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.status(400).send("Analysis not created")];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put("/codeReview", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var analysis, updatedAnalysis, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.analysis)
                    return [2 /*return*/, res.status(400).send("Bad request: analysis not provided")];
                analysis = req.body.analysis;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, analysisController
                        .updateAnalysis(analysis)
                        .then(function (analysis) { return JSON.stringify(analysis); })];
            case 2:
                updatedAnalysis = _a.sent();
                res.send(updatedAnalysis);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, res.status(400).send("Analysis not updated")];
            case 4: return [2 /*return*/];
        }
    });
}); });
app["delete"]("/codeReview", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var owner, repo, pull_number, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                owner = req.query.owner;
                repo = req.query.repo;
                pull_number = req.query.pull_number;
                if (!owner)
                    return [2 /*return*/, res.status(400).send("Bad request: owner not provided")];
                if (pull_number && !repo)
                    return [2 /*return*/, res.status(400).send("Bad request: repo not provided")];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, analysisController
                        .deleteAnalysis(repo, owner, parseInt(pull_number))
                        .then(function (analysis) { return JSON.stringify(analysis); })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.send()];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, res.status(404).send("Analysis not found")];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = app;
