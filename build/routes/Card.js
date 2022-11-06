"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Card_1 = __importDefault(require("../controllers/Card"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = (0, express_1.default)();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.card.create), Card_1.default.createCard);
router.get('/get/:cardId', Card_1.default.readCard);
router.get('/get/', Card_1.default.readAll);
router.patch('/update/:cardId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.card.update), Card_1.default.updateCard);
router.delete('/delete/:cardId', Card_1.default.deleteCard);
module.exports = router;
