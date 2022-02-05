import {factorial} from "./factorial";

export const sin = (n: number): number => {
    const steps = 10;
    let result = 0;
    for (let i = 1; i <= steps; i++) {
        result += (-1)**(i - 1) * (n ** (2*i - 1)) / factorial(2 * i - 1);
    }
    return result;
}
