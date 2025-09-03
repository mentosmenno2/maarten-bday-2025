import { ResponseInterface } from './ResponseInterface.js';
import { SongInterface } from './SongInterface.js';

export interface ParseSongResponseInterface extends ResponseInterface {
	song: SongInterface;
}
