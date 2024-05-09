import { test, expect } from "vitest";
import { convertMapToMatrix } from "./utils";

test("Convert map to matrix", () => {
  const map = `
@-A--+
     |
     +-B--x-C--D
`;
  const mapToMatrix = [
    ["@", "-", "A", "-", "-", "+"],
    [" ", " ", " ", " ", " ", "|"],
    [" ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"],
  ];

  const matrix = convertMapToMatrix(map);

  expect(matrix).toEqual(mapToMatrix);
});
