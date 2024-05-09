import { PositionState } from "./types";

export type DirectionType = "up" | "down" | "left" | "right";

export type Directions = {
  [key in DirectionType]: PositionState;
};

export type DirectionsOffset = {
  [key in DirectionType]: { xOffset: number; yOffset: number };
};

const ALLOWED_CHARS = /[A-Z]|\x|\+|-|\|/g;

const OPPOSITE_DIRECTION = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export const DIRECTIONS_OFFSET: DirectionsOffset = {
  up: { xOffset: 0, yOffset: -1 },
  down: { xOffset: 0, yOffset: +1 },
  left: { xOffset: -1, yOffset: 0 },
  right: { xOffset: +1, yOffset: 0 },
};

export class Direction {
  constructor(private direction: DirectionType | undefined) {}

  setDirection(direction: DirectionType) {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }
}

export function isValidOption(direction: DirectionType | undefined, value: string | undefined) {
  return Boolean(direction && value && value.match(ALLOWED_CHARS));
}

export function isOppositeDirection(currentDirection: DirectionType | undefined, direction: DirectionType) {
  return currentDirection && OPPOSITE_DIRECTION[currentDirection] === direction;
}
