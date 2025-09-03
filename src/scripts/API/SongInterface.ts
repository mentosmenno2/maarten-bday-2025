import { DifficultyInterface } from './DifficultyInterface.js';

export interface SongInterface {
	artist: string;
	backgroundImageBase64: string | null;
	builder: string | null;
	coverImageBase64: string | null;
	difficulties: DifficultyInterface[];
	fileName: string;
	audioBase64: string | null;
	id: string;
	title: string;
}
