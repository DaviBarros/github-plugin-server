"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var app_1 = require("./routes/app");
app_1["default"].listen(config_1.serverPort, function () {
    console.log("Server is running on port ".concat(config_1.serverPort));
});
