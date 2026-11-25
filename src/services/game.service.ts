import {findAllGames, findGameById} from '../repositories/game.repository.js';
import type {Game} from '../models/game.model.js';

export class HttpError extends Error {
    status: number;
    details?: string[];

    constructor(status: number, message: string, details?: string[]) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

export function getAllGames(): Game[] {
    return findAllGames();
}

export function parseId(value: string): number {
    const id = Number(value);

    if (!Number.isInteger(id) || id <= 0) {
        throw new HttpError(400, 'Identifiant invalide');
    }

    return id;
}

export function getGameById(id: number): Game {
    const game = findGameById(id);

    if (game === undefined) {
        throw new HttpError(404, 'Jeu introuvable');
    }

    return game;
}