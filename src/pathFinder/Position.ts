import { PositionState } from "./types";

export class Position {
  constructor(private x: PositionState["x"], private y: PositionState["y"]) {}

  setPosition(x: PositionState["x"], y: PositionState["y"]) {
    this.x = x;
    this.y = y;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}
