import { DifficultyInterface } from "./DifficultyInterface.js";

export interface SongInterface {
	artist: string;
	backgroundImageBase64: string;
	builder: string;
	coverImageBase64: string;
	difficulties: DifficultyInterface[];
	fileName: string;
	id: string;
	title: string;
}
