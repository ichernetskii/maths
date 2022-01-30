export const round = (n: number, count: number): number => {
    return Math.round(n * 10**count) / 10**count;
}
