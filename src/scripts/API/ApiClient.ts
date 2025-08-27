import { ParseSongResponseInterface } from "./ParseSongResponseInterface.js";

export class ApiClient {
    async parseSong(file: File): Promise<ParseSongResponseInterface> {
        const formData = new FormData();
        formData.append('file', file);
        const url = `${window.location.href}api/parse-song`;
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

		console.log(response);

        if (!response.ok) {

			const json = await response.json();
			if (json.error) {
				console.error('Error uploading file:', json.error);
			}

            throw new Error('Unknown error uploading file');
        }
       return await response.json() as ParseSongResponseInterface;
    }
}
