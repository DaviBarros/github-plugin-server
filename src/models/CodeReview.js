"use strict";
exports.__esModule = true;
exports.CodeReview = void 0;
var mongoose_1 = require("mongoose");
var CodeReview = /** @class */ (function () {
    function CodeReview(codeReview) {
        this.uuid = codeReview.uuid,
            this.repository = codeReview.repository,
            this.owner = codeReview.owner,
            this.pull_number = codeReview.pull_number,
            this.base_a = codeReview.base_a,
            this.base_b = codeReview.base_b;
        this.base_merge = codeReview.base_merge;
    }
    return CodeReview;
}());
exports.CodeReview = CodeReview;
// Define the schema for the analysis output
var codeReviewSchema = new mongoose_1["default"].Schema({
    uuid: String,
    repository: String,
    owner: String,
    pull_number: Number,
    base_a: String,
    base_b: String,
    base_merge: String // persiste a diferença entre o código do base o merge do branch_a e branch_b  
});
exports["default"] = mongoose_1["default"].models.RevisaodeCodigo || mongoose_1["default"].model("RevisaodeCodigo", codeReviewSchema);
