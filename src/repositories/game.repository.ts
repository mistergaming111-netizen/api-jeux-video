import {db} from '../database/database.js';
import {Game} from '../models/game.model.js';

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