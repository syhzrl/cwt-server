import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Card, { ICard } from '../models/Card';

const createCard = (req: Request<{}, {}, ICard>, res: Response, next: NextFunction) => {
    const { avatarId, title, desc } = req.body;

    const card = new Card({
        _id: new mongoose.Types.ObjectId(),
        avatarId,
        title,
        desc,
    });

    return card
        .save()
        .then((card) => res.status(201).json({ card }))
        .catch((error) => res.status(500).json({ error }));
};

const readCard = (req: Request, res: Response, next: NextFunction) => {
    const cardId = req.params.cardId;

    return Card.findById(cardId)
        .then((card) => (card ? res.status(200).json({ card }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Card.find()
        .then((cards) => res.status(200).json({ cards }))
        .catch((error) => res.status(500).json({ error }));
};

const updateCard = (req: Request, res: Response, next: NextFunction) => {
    const cardId = req.params.cardId;

    return Card.findById(cardId)
        .then((card) => {
            if (card) {
                card.set(req.body);

                return card
                    .save()
                    .then((card) => res.status(201).json({ card }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteCard = (req: Request, res: Response, next: NextFunction) => {
    const cardId = req.params.cardId;

    return Card.findByIdAndDelete(cardId)
        .then((card) => (card ? res.status(201).json({ card, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createCard, readCard, readAll, updateCard, deleteCard };