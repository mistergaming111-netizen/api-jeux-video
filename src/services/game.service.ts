import {findAllGames, findGameById, createGame, updateGame, deleteGame} from '../repositories/game.repository.js';
import type {Game, CreateGameInput} from '../models/game.model.js';

export class HttpError extends Error {
    status: number;
    details?: string[];

    constructor(status: number, message: string, details?: string[]) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

export function parseId(value: string): number {
    const id = Number(value);

    if (!Number.isInteger(id) || id <= 0) {
        throw new HttpError(400, 'Identifiant invalide');
    }

    return id;
}

function isNonEmptyText(value: unknown): boolean {
    return typeof value === 'string' && value.trim() !== '';
}

export function validateGameInput(body: unknown): CreateGameInput {
    if (typeof body !== 'object' || body === null || Array.isArray(body)) {
        throw new HttpError(400, 'Données invalides', ['Le corps de la requête doit être un objet JSON']);
    }

    const data = body as Record<string, unknown>;
    const errors: string[] = [];

    if (!isNonEmptyText(data.title)) {
        errors.push('Le titre est obligatoire');
    }
    if (!isNonEmptyText(data.editor)) {
        errors.push("L'éditeur est obligatoire");
    }
    if (!isNonEmptyText(data.genre)) {
        errors.push('Le genre est obligatoire');
    }
    if (typeof data.releaseYear !== 'number' || !Number.isInteger(data.releaseYear) || data.releaseYear < 1950 || data.releaseYear > 2100) {
        errors.push("L'année de sortie doit être un entier entre 1950 et 2100");
    }
    if (typeof data.rating !== 'number' || !Number.isFinite(data.rating) || data.rating < 0 || data.rating > 10) {
        errors.push('La note doit être comprise entre 0 et 10');
    }

    if (errors.length > 0) {
        throw new HttpError(400, 'Données invalides', errors);
    }

    return {
        title: (data.title as string).trim(),
        editor: (data.editor as string).trim(),
        releaseYear: data.releaseYear as number,
        genre: (data.genre as string).trim(),
        rating: data.rating as number
    };
}

export function getAllGames(): Game[] {
    return findAllGames();
}

export function getGameById(id: number): Game {
    const game = findGameById(id);

    if (game === undefined) {
        throw new HttpError(404, 'Jeu introuvable');
    }

    return game;
}

export function addGame(body: unknown): Game {
    const input = validateGameInput(body);
    return createGame(input);
}

export function editGame(id: number, body: unknown): Game {
    getGameById(id);
    const input = validateGameInput(body);
    const game = updateGame(id, input);

    if (game === undefined) {
        throw new HttpError(404, 'Jeu introuvable');
    }

    return game;
}

export function removeGame(id: number): void {
    getGameById(id);
    deleteGame(id);
}