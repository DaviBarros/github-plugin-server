"use strict";
exports.__esModule = true;
exports.connectionString = exports.persistencePath = exports.persistenceType = exports.serverPort = void 0;
require("dotenv/config");
// Server configuration
var serverPort = process.env.SERVER_PORT || 4000;
exports.serverPort = serverPort;
// Analysis persistence configuration
var persistenceType = process.env.PERSISTENCE_TYPE || "mongo";
exports.persistenceType = persistenceType;
var persistencePath = process.env.PERSISTENCE_PATH || "src/data/analysisOutputs.json";
exports.persistencePath = persistencePath;
// Database configuration
var connectionString = process.env.ATLAS_URI || "";
exports.connectionString = connectionString;
