import {Router} from 'express';
import {listGames, getGame, postGame, putGame, deleteGameById} from '../controllers/game.controller.js';

export const gameRoutes = Router();

gameRoutes.get('/', listGames);
gameRoutes.get('/:id', getGame);
gameRoutes.post('/', postGame);
gameRoutes.put('/:id', putGame);
gameRoutes.delete('/:id', deleteGameById);