import {findAllGames} from '../repositories/game.repository.js';
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