import { DifficultyInterface } from "./DifficultyInterface.js";

export interface SongInterface {
	artist: string;
	backgroundImageBase64: string|null;
	builder: string;
	coverImageBase64: string|null;
	difficulties: DifficultyInterface[];
	fileName: string;
	id: string;
	title: string;
}
