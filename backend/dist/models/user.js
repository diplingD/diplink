"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    mail: {
        type: String
    },
    password: {
        type: String
    },
    skills: {
        type: [String]
    },
    bio: {
        type: String
    },
    pictureURL: {
        type: String
    },
    videoURL: {
        type: String
    },
    igURL: {
        type: String
    },
    ytURL: {
        type: String
    },
    spotifyURL: {
        type: String
    },
    likesCnt: {
        type: Number
    },
    dislikesCnt: {
        type: Number
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    comments: {
        type: [
            {
                author: {
                    type: String
                },
                comment: {
                    type: String
                }
            }
        ]
    }
});
// Pravim model 'UserModel', nad shemom User, nad kolekcijom 'users' (kolekcija u nasoj DB)
exports.default = mongoose_1.default.model('UserModel', User, 'users');
