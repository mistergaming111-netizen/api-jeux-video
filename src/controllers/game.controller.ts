import type {Request, Response} from 'express';
import {getAllGames} from '../services/game.service.js';

export function listGames(_req: Request, res: Response) {
    const games = getAllGames();
    res.status(200).json(games);
}