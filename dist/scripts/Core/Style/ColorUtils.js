export class ColorUtils {
    static getHex(color) {
        return color;
    }
    static getRgb(color) {
        const { r, g, b } = this.hexToRgb(color);
        return `rgb(${r}, ${g}, ${b})`;
    }
    static getRgba(color, alpha = 1) {
        const { r, g, b } = this.hexToRgb(color);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    static getTextShadow(color, blur) {
        return `0 0 ${blur}px ${this.getRgba(color, 0.8)}`;
    }
    static getGlowEffect(color, blur) {
        const rgba = this.getRgba(color, 0.6);
        return `0 0 ${blur}px ${rgba}, 0 0 ${blur * 2}px ${rgba}`;
    }
    static hexToRgb(hex) {
        const parsed = hex.replace('#', '');
        const bigint = parseInt(parsed, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    }
}
