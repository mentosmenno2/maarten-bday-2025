import { ColorEnum } from './ColorEnum.js';

export class ColorUtils {
	public static getHex(color: ColorEnum): string {
		return color;
	}

	public static getRgb(color: ColorEnum): string {
		const { r, g, b } = this.hexToRgb(color);
		return `rgb(${r}, ${g}, ${b})`;
	}

	public static getRgba(color: ColorEnum, alpha: number = 1): string {
		const { r, g, b } = this.hexToRgb(color);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	public static getTextShadow(color: ColorEnum, blur: number): string {
		return `0 0 ${blur}px ${this.getRgba(color, 0.8)}`;
	}

	public static getGlowEffect(color: ColorEnum, blur: number): string {
		const rgba = this.getRgba(color, 0.6);
		return `0 0 ${blur}px ${rgba}, 0 0 ${blur * 2}px ${rgba}`;
	}

	private static hexToRgb(hex: string): { r: number; g: number; b: number } {
		const parsed = hex.replace('#', '');
		const bigint = parseInt(parsed, 16);
		return {
			r: (bigint >> 16) & 255,
			g: (bigint >> 8) & 255,
			b: bigint & 255,
		};
	}
}
