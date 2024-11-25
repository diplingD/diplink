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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let mail = req.body.mail;
            let password = req.body.password;
            user_1.default.findOne({ 'mail': mail, 'password': password }).exec()
                .then(user => {
                res.json(user);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            });
        };
        this.findUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }).exec()
                .then(user => {
                res.json(user);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            });
        };
        this.getAllUsers = (req, res) => {
            let username = req.body.username;
            user_1.default.find({ 'username': { $ne: username } }).exec()
                .then(usersList => {
                res.json(usersList);
            })
                .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Internal server error' });
            });
        };
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = new user_1.default({
                firstname: req.body.firstname,
                lastname: "",
                username: req.body.username,
                mail: req.body.mail,
                password: req.body.password,
                skills: req.body.skills,
                bio: req.body.bio,
                pictureURL: req.body.pictureURL,
                videoURL: req.body.videoURL,
                igURL: req.body.igURL,
                ytURL: req.body.ytURL,
                spotifyURL: req.body.spotifyURL,
                likesCnt: 0,
                dislikesCnt: 0,
                city: req.body.city,
                country: req.body.country,
                comments: []
            });
            user.save()
                .then(resp => {
                res.json({ 'message': 'ok' });
            })
                .catch(err => {
                console.log(err);
                res.json({ 'message': 'error' });
            });
        });
        // DODAVANJE KOMENTARA
        this.addComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let username = req.body.username; // Username korisnika kojem dodajemo komentar
            let author = req.body.author; // Autor komentara
            let commentText = req.body.commentText; // Content komentara
            try {
                // Find the user by username
                let user = yield user_1.default.findOne({ 'username': username }).exec();
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                // Create a new comment object
                let newComment = {
                    author: author,
                    comment: commentText
                };
                // Add the new comment to the user's comments array
                user.comments.push(newComment);
                // Save the updated user document
                yield user.save();
                res.json({ message: "Comment added successfully" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.UserController = UserController;
