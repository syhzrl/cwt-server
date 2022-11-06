import express from 'express';
import controller from '../controllers/Card';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express();

router.post('/create', ValidateSchema(Schemas.card.create), controller.createCard);
router.get('/get/:cardId', controller.readCard);
router.get('/get/', controller.readAll);
router.patch('/update/:cardId', ValidateSchema(Schemas.card.update), controller.updateCard);
router.delete('/delete/:cardId', controller.deleteCard);

export = router;