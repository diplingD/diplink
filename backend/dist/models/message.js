"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Message = new Schema({
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    content: {
        type: String
    },
    timestamp: { type: Date, default: Date.now }
});
// Pravim model 'MessageModel', nad shemom Message, nad kolekcijom 'messages' (kolekcija u nasoj DB)
exports.default = mongoose_1.default.model('MessageModel', Message, 'messages');
