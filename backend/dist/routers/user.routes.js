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
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const message_1 = __importDefault(require("../models/message"));
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/findUser').post((req, res) => new user_controller_1.UserController().findUser(req, res));
userRouter.route('/getAllUsers').post((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
// PORUKE 
userRouter.post('/send-message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender, receiver, content } = req.body;
    const message = new message_1.default({
        sender,
        receiver,
        content
    });
    try {
        yield message.save();
        res.status(200).json({ message: 'Message sent successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
}));
userRouter.get('/get-messages/:user1', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user1 } = req.params;
    try {
        const messages = yield message_1.default.find({
            $or: [
                { sender: user1 },
                { receiver: user1 }
            ]
        }).sort('timestamp');
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
}));
userRouter.get('/get-messages-2/:user1/:user2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user1, user2 } = req.params;
    try {
        const messages = yield message_1.default.find({
            $or: [
                { sender: user1, receiver: user2 },
                { receiver: user1, sender: user1 }
            ]
        }).sort('timestamp');
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
}));
// DODAVANJE KOMENTARA
userRouter.route('/addComment').post((req, res) => new user_controller_1.UserController().addComment(req, res));
exports.default = userRouter;
