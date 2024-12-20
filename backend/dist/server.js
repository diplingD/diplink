"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Uspostavljamo konekciju sa bazom podataka
mongoose_1.default.connect('mongodb://localhost:27017/diplinkDB');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('diplinkDB connected');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
