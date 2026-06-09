export class ConvertHelper {
  static rgbToHex(rgbString: string): string {
    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) {
      throw new Error(`Invalid rgb string: ${rgbString}`);
    }
    const toHex = (n: string): string => {
      const hex = parseInt(n, 10).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(match[1])}${toHex(match[2])}${toHex(match[3])}`;
  }
}
