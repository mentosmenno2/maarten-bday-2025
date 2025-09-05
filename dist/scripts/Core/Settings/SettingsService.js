import { DefaultSettings } from './DefaultSettings.js';
export class SettingsService {
    static STORAGE_KEY = 'gameSettings';
    static settings = SettingsService.load();
    static get() {
        return this.settings;
    }
    static update(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings));
    }
    static load() {
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
        }
        catch (e) {
            return { ...DefaultSettings };
        }
    }
}
