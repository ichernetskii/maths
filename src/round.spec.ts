import {round} from "./round";

it("with 10^-2", () => {
    expect(round(3.14159, 2)).toBe(3.14);
});
