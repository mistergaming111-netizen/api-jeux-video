import {db} from '../database/database.js';
import {Game, type CreateGameInput} from '../models/game.model.js';

interface GameRow {
    id: number;
    title: string;
    editor: string;
    release_year: number;
    genre: string;
    rating: number;
}

function toGame(row: GameRow): Game {
    return new Game(row.id, row.title, row.editor, row.release_year, row.genre, row.rating);
}

export function findAllGames(): Game[] {
    const rows = db.prepare('SELECT * FROM games').all() as GameRow[];
    return rows.map(toGame);
}

export function findGameById(id: number): Game | undefined {
    const row = db.prepare('SELECT * FROM games WHERE id = ?').get(id) as GameRow | undefined;

    if (row === undefined) {
        return undefined;
    }

    return toGame(row);
}

export function createGame(input: CreateGameInput): Game {
    const result = db
        .prepare('INSERT INTO games (title, editor, release_year, genre, rating) VALUES (@title, @editor, @releaseYear, @genre, @rating)')
        .run({
            title: input.title,
            editor: input.editor,
            releaseYear: input.releaseYear,
            genre: input.genre,
            rating: input.rating
        });

    const id = Number(result.lastInsertRowid);
    return new Game(id, input.title, input.editor, input.releaseYear, input.genre, input.rating);
}

export function updateGame(id: number, input: CreateGameInput): Game | undefined {
    const result = db
        .prepare('UPDATE games SET title = @title, editor = @editor, release_year = @releaseYear, genre = @genre, rating = @rating WHERE id = @id')
        .run({
            id: id,
            title: input.title,
            editor: input.editor,
            releaseYear: input.releaseYear,
            genre: input.genre,
            rating: input.rating
        });

    if (result.changes === 0) {
        return undefined;
    }

    return new Game(id, input.title, input.editor, input.releaseYear, input.genre, input.rating);
}

export function deleteGame(id: number): boolean {
    const result = db.prepare('DELETE FROM games WHERE id = ?').run(id);

    return result.changes > 0;
}