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
exports.CodeReviewMongoRepository = void 0;
var CodeReview_1 = require("../models/CodeReview");
var CodeReviewMongoRepository = /** @class */ (function () {
    function CodeReviewMongoRepository() {
        this.db = CodeReview_1["default"];
    }
    CodeReviewMongoRepository.prototype.getCodeReview = function (repo, owner, pull_number) {
        return __awaiter(this, void 0, void 0, function () {
            var analysis;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.findOne({ repository: repo, owner: owner, pull_number: pull_number }, { projection: { _id: 0 } })];
                    case 1:
                        analysis = _a.sent();
                        if (!analysis)
                            throw new Error("Analysis output not found");
                        console.log("Found: ", analysis);
                        return [2 /*return*/, analysis];
                }
            });
        });
    };
    CodeReviewMongoRepository.prototype.createCodeReview = function (analysisOutput) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.create(analysisOutput)];
                    case 1:
                        _a.sent();
                        console.log("Created: ", analysisOutput);
                        return [2 /*return*/, analysisOutput];
                }
            });
        });
    };
    CodeReviewMongoRepository.prototype.updateCodeReview = function (newCodeReview) {
        return __awaiter(this, void 0, void 0, function () {
            var repository, owner, pull_number, a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repository = newCodeReview.repository, owner = newCodeReview.owner, pull_number = newCodeReview.pull_number;
                        return [4 /*yield*/, this.db.updateOne({ repository: repository, owner: owner, pull_number: pull_number }, { $set: newCodeReview })];
                    case 1:
                        a = _a.sent();
                        if (!a.acknowledged)
                            throw new Error("Failed to update analysis output");
                        console.log("Updated: ", newCodeReview);
                        return [2 /*return*/, newCodeReview];
                }
            });
        });
    };
    CodeReviewMongoRepository.prototype.deleteCodeReview = function (repo, owner, pull_number) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.deleteOne({ repository: repo, owner: owner, pull_number: pull_number })];
                    case 1:
                        _a.sent();
                        console.log("Deleted: ", { repository: repo, owner: owner, pull_number: pull_number });
                        return [2 /*return*/];
                }
            });
        });
    };
    CodeReviewMongoRepository.prototype.listAllAnalysisFromRepo = function (repo, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var analyses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.find({ repository: repo, owner: owner }, { projection: { _id: 0 } })];
                    case 1:
                        analyses = _a.sent();
                        console.log("Found: ", analyses);
                        return [2 /*return*/, analyses];
                }
            });
        });
    };
    CodeReviewMongoRepository.prototype.listAllAnalysisFromOwner = function (owner) {
        return __awaiter(this, void 0, void 0, function () {
            var analyses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.find({ owner: owner }, { projection: { _id: 0 } })];
                    case 1:
                        analyses = _a.sent();
                        console.log("Found: ", analyses);
                        return [2 /*return*/, analyses];
                }
            });
        });
    };
    return CodeReviewMongoRepository;
}());
exports.CodeReviewMongoRepository = CodeReviewMongoRepository;
