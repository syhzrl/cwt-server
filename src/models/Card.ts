import mongoose, { Document, Schema } from "mongoose";

export interface ICard {
    avatarId: string;
    title: string;
    desc: string;
}

export interface ICardModel extends ICard, Document { }

const CardSchema: Schema = new Schema({
    avatarId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
}, {
    timestamps: true,
});

export default mongoose.model<ICardModel>('Card', CardSchema);