import {MathsError} from "./_internals/error";

export const round = (n: number, precision: number = 0): number => {
    if (Math.abs(precision % 1) !== 0) throw new MathsError(MathsError.values.NotIntegerNumberError, precision);
    return Math.round(n * 10**precision) / 10**precision;
}
