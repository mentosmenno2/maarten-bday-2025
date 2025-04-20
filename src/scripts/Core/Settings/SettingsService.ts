import { DefaultSettings } from './DefaultSettings.js';
import { SettingsInterface } from './SettingsInterface.js';

export class SettingsService {
	private static readonly STORAGE_KEY = 'gameSettings';

	private static settings: SettingsInterface = SettingsService.load();

	public static get(): SettingsInterface {
		return this.settings;
	}

	public static update(newSettings: Partial<SettingsInterface>): void {
		this.settings = { ...this.settings, ...newSettings };
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings));
	}

	private static load(): SettingsInterface {
		const raw = localStorage.getItem(this.STORAGE_KEY);
		if (!raw) {
			return { ...DefaultSettings };
		}

		try {
			const parsed = JSON.parse(raw);
			return {
				...DefaultSettings,
				...parsed,
			};
		} catch (e) {
			return { ...DefaultSettings };
		}
	}
}
