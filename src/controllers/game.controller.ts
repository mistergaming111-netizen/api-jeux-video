import type {Request, Response} from 'express';
import {getAllGames, getGameById, parseId, addGame, editGame, removeGame} from '../services/game.service.js';

export function listGames(_req: Request, res: Response) {
    const games = getAllGames();
    res.status(200).json(games);
}

export function getGame(req: Request<{id: string}>, res: Response) {
    const id = parseId(req.params.id);
    const game = getGameById(id);
    res.status(200).json(game);
}

export function postGame(req: Request, res: Response) {
    const game = addGame(req.body);
    res.status(201).json(game);
}

export function putGame(req: Request<{id: string}>, res: Response) {
    const id = parseId(req.params.id);
    const game = editGame(id, req.body);
    res.status(200).json(game);
}

export function deleteGameById(req: Request<{id: string}>, res: Response) {
    const id = parseId(req.params.id);
    removeGame(id);
    res.status(204).send();
}