"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Card_1 = __importDefault(require("../models/Card"));
const createCard = (req, res, next) => {
    const { avatarId, title, desc } = req.body;
    const card = new Card_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        avatarId,
        title,
        desc,
    });
    return card
        .save()
        .then((card) => res.status(201).json({ card }))
        .catch((error) => res.status(500).json({ error }));
};
const readCard = (req, res, next) => {
    const cardId = req.params.cardId;
    return Card_1.default.findById(cardId)
        .then((card) => (card ? res.status(200).json({ card }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Card_1.default.find()
        .then((cards) => res.status(200).json({ cards }))
        .catch((error) => res.status(500).json({ error }));
};
const updateCard = (req, res, next) => {
    const cardId = req.params.cardId;
    return Card_1.default.findById(cardId)
        .then((card) => {
        if (card) {
            card.set(req.body);
            return card
                .save()
                .then((card) => res.status(201).json({ card }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteCard = (req, res, next) => {
    const cardId = req.params.cardId;
    return Card_1.default.findByIdAndDelete(cardId)
        .then((card) => (card ? res.status(201).json({ card, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createCard, readCard, readAll, updateCard, deleteCard };
