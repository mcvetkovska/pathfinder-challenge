import { describe, expect, test } from "vitest";
import { VisitedPositions } from "./VisitedPositions";

describe("VisitedPositions Class", () => {
  test("Add Visited Position", () => {
    const visited = new VisitedPositions();
    visited.addVisitedPosition(1, 1);

    expect(visited.isVisited(1, 1)).toBeTruthy();

    expect(visited.isVisited(0, 1)).toBeFalsy();
  });
});
