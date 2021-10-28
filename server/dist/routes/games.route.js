"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
router.get('/', (req, res) => {
    res.send("game");
});
router.post('/', (req, res) => {
    console.log(req.body);
    res.send({
        data: req.body,
        dummy: "dummy"
    });
});
router.get('/best-of-3', (req, res) => {
    res.send("best of 3");
});
router.get('/best-of-5', (req, res) => {
    res.send("best of 5");
});
