import { describe, expect, test } from "vitest";
import { Direction, isOppositeDirection, isValidOption } from "./Direction";

describe("Direction Class", () => {
  test("Set Direction", () => {
    const direction = new Direction(undefined);
    direction.setDirection("right");
    expect(direction.getDirection()).toBe("right");
  });

  test("Is Valid Option", () => {
    expect(isValidOption("right", "1")).toBe(false);
    expect(isValidOption("right", "+")).toBe(true);
  });

  test("Is Opposite Direction", () => {
    expect(isOppositeDirection("left", "right")).toBe(true);

    expect(isOppositeDirection("right", "left")).toBe(true);

    expect(isOppositeDirection("up", "down")).toBe(true);

    expect(isOppositeDirection("down", "up")).toBe(true);

    expect(isOppositeDirection("up", "left")).toBe(false);
  });
});
