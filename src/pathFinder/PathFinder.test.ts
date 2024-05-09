import { test, expect, describe } from "vitest";
import { findStartAndEnd, getValidOptions, PathFinder } from "./PathFinder";
import { convertMapToMatrix } from "./utils";

const map = `
@---A---+
        |
x-B-+   C
    |   |
    +---+
`;

const forkInPath = `
     x-B
       |
@--A---+
       |
  x+   C
   |   |
   +---+
`;

const invalidTurnCharacter = `
@---A----
        |
x-B-+   C
    |   |
    +---+
`;

const missingStartCharacter = `
----A----
        |
x-B-+   C
    |   |
    +---+
`;

const missingEndCharacter = `
@---A----
        |
--B-+   C
    |   |
    +---+
`;

const multipleStartCharacters = `
@---A---@
        |
--B-+   C
    |   |
    +---+
`;

const brokenPath = `
@--A-+
     |
         
     B-x
`;

const multipleStartingPaths = `x-B-@-A-x`;

const fakeTurn = `@-A-+-B-x`;

describe("PathFinder Class", () => {
  test("findStartAndEnd", () => {
    const matrix = convertMapToMatrix(map);
    const {
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
    } = findStartAndEnd(matrix);
    expect(startX).toBe(0);
    expect(startY).toBe(0);
    expect(endX).toBe(0);
    expect(endY).toBe(2);
  });

  test("getValidOptions", () => {
    const matrix = convertMapToMatrix(map);
    const position = { x: 0, y: 0 };
    const expected = new Map();
    const validOptions = getValidOptions(matrix, undefined, position);
    expected.set("right", { x: 1, y: 0, value: "-" });

    expect(validOptions).toEqual(expected);
  });

  test("findPath Success", () => {
    const collected = new PathFinder(map).findPath();

    const expectedPath = [
      "@",
      "-",
      "-",
      "-",
      "A",
      "-",
      "-",
      "-",
      "+",
      "|",
      "C",
      "|",
      "+",
      "-",
      "-",
      "-",
      "+",
      "|",
      "+",
      "-",
      "B",
      "-",
      "x",
    ];

    const expectedChars = ["A", "C", "B"];

    expect(collected.path).toEqual(expectedPath);
    expect(collected.chars).toEqual(expectedChars);
  });

  test("findPath Fork in Path Error", () => {
    expect(() => {
      new PathFinder(forkInPath).findPath();
    }).toThrow(/Fork in path/);
  });

  test("findPath Invalid Turn Character Error", () => {
    expect(() => {
      new PathFinder(invalidTurnCharacter).findPath();
    }).toThrow(/Invalid turn character/);
  });

  test("findPath Missing Start Character Error", () => {
    expect(() => {
      new PathFinder(missingStartCharacter).findPath();
    }).toThrow(/Missing start character/);
  });

  test("findPath Missing End Character Error", () => {
    expect(() => {
      new PathFinder(missingEndCharacter).findPath();
    }).toThrow(/Missing end character/);
  });

  test("findPath Multiple Start Characters Error", () => {
    expect(() => {
      new PathFinder(multipleStartCharacters).findPath();
    }).toThrow(/Multiple start characters/);
  });

  test("findPath Broken Path", () => {
    expect(() => {
      new PathFinder(brokenPath).findPath();
    }).toThrow(/Broken path/);
  });

  test("findPath Multiple Starting Paths", () => {
    expect(() => {
      new PathFinder(multipleStartingPaths).findPath();
    }).toThrow(/Multiple starting paths/);
  });

  test("findPath Fake turn", () => {
    expect(() => {
      new PathFinder(fakeTurn).findPath();
    }).toThrow(/Fake turn/);
  });
});
