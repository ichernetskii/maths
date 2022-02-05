import {sin} from "./trigonometry";
import "./jest/custom-matchers";

const delta = 0.000001;

it("Basic tests", () => {
    expect(sin(0)).toEqualCloseTo(0, delta);
    expect(sin(Math.PI / 6)).toEqualCloseTo(0.5, delta);
    expect(sin(Math.PI / 4)).toEqualCloseTo(Math.sqrt(2) / 2, delta);
    expect(sin(Math.PI / 3)).toEqualCloseTo(Math.sqrt(3) / 2, delta);
    expect(sin(Math.PI / 2)).toEqualCloseTo(1, delta);
    expect(sin(-1 * Math.PI / 4)).toEqualCloseTo(-1 * Math.sqrt(2) / 2, delta);
    expect(sin(5 * Math.PI / 4)).toEqualCloseTo(-1 * Math.sqrt(2) / 2, delta);
});
