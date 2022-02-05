import {MathsError} from "./_internals/error";

export const factorial = (n: number): number => {
    if (n < 0) throw new MathsError(MathsError.values.NegativeNumberError, n);
    return [0, 1].includes(n) ? 1 : n * factorial(n - 1);
};
