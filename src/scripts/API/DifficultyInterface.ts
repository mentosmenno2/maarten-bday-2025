import { TargetInterface } from "./TargetInterface.js";

export interface DifficultyInterface {
	name: string;
	difficultyRating: number;
	targets: TargetInterface[];
}
