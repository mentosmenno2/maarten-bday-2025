import { ResponseInterface } from "./ResponseInterface.js";

export interface ErrorResponseInterface extends ResponseInterface {
	error: string
}
