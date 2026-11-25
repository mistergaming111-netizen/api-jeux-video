import type {Request, Response} from 'express';
import {getAllGames, getGameById, parseId} from '../services/game.service.js';

export function listGames(_req: Request, res: Response) {
    const games = getAllGames();
    res.status(200).json(games);
}

export function getGame(req: Request<{id: string}>, res: Response) {
    const id = parseId(req.params.id);
    const game = getGameById(id);
    res.status(200).json(game);
}