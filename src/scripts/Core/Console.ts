export class Console {
	public static log(message: string): void {
		// eslint-disable-next-line no-console
		console.log(
			`%c ${message}`,
			'background: #0f0f23; color: #00cc00; font-size: 14px; font-weight: normal; border-radius: 10px; padding: 10px; line-height: 40px;',
		);
	}
}
