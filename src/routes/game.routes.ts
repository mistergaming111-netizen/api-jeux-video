import {Router} from 'express';
import {listGames} from '../controllers/game.controller.js';

export const gameRoutes = Router();

gameRoutes.get('/', listGames);