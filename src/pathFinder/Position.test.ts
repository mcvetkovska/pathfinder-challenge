import { test, expect, describe } from "vitest";
import { Position } from "./Position";

describe("Position Class", () => {
  test("Set Position", () => {
    const position = new Position(0, 0);
    position.setPosition(1, 1);
    expect(position.getPosition()).toEqual({ x: 1, y: 1 });
  });
});
