import {Router} from 'express';
import {listGames, getGame} from '../controllers/game.controller.js';

export const gameRoutes = Router();

gameRoutes.get('/', listGames);
gameRoutes.get('/:id', getGame);