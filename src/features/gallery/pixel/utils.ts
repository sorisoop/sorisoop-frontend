export function distance(x1: number, y1: number, x2: number, y2: number): number {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function collide(x1: number, y1: number, x2: number, y2: number, radius: number): boolean {
  return distance(x1, y1, x2, y2) <= radius;
}

export function getBWValue(red: number, green: number, blue: number, isReversed: boolean): number {
  const detect = 2;
  if (!isReversed) {
    return 255 - Math.floor((red + green + blue) / detect);
  } else {
    return Math.floor((red + green + blue) / detect);
  }
}
