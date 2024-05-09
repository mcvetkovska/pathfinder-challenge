import { PositionState } from "./types";

export class VisitedPositions {
  private visited: PositionState[] = [];

  addVisitedPosition(x: PositionState["x"], y: PositionState["y"]) {
    this.visited.push({ x, y });
  }

  isVisited(x: PositionState["x"], y: PositionState["y"]) {
    return this.visited.find((position) => {
      return position.x == x && position.y == y;
    });
  }
}
