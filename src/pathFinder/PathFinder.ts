import { Collections } from "./Collections";
import { Position } from "./Position";
import {
  Direction,
  DIRECTIONS_OFFSET,
  isOppositeDirection,
  isValidOption,
  Directions,
  DirectionType,
} from "./Direction";
import { VisitedPositions } from "./VisitedPositions";
import { START_CHAR, END_CHAR, TURN_CHAR, VALID_CHARS, VALID_TURN, convertMapToMatrix } from "./utils";
import { PositionState } from "./types";

export class PathFinder {
  private position: Position;
  private visited: VisitedPositions = new VisitedPositions();
  private direction: Direction = new Direction(undefined);
  private collections: Collections = new Collections();
  private matrix: string[][];

  constructor(private map: string) {
    this.matrix = convertMapToMatrix(this.map);
    const { start } = findStartAndEnd(this.matrix);
    const { x, y } = start;
    this.position = new Position(x, y);
    this.addToCollections(this.matrix[y][x]);
  }

  private moveForward() {
    const direction = this.direction.getDirection();

    const validOptions = getValidOptions(this.matrix, direction, this.position.getPosition());

    const { x, y } = this.position.getPosition();

    if (this.collections.getLastCollected() === TURN_CHAR) {
      validOptions.delete(direction);
      if (validOptions.size === 0) {
        throw new Error(`Fake turn at x: ${x}, y: ${y}`);
      }
    }

    if (direction && validOptions.has(direction)) {
      this.position.setPosition(validOptions.get(direction).x, validOptions.get(direction).y);
      this.addToCollections(validOptions.get(direction).value);
      return;
    }

    if (validOptions.size === 0) {
      throw new Error(`Broken path at x: ${x}, y: ${y}`);
    }

    if (validOptions.size > 1) {
      if (this.collections.getLastCollected() === START_CHAR) {
        throw new Error(`Multiple starting paths x: ${x}, y: ${y}`);
      }
      throw new Error(`Fork in path at x: ${x}, y: ${y}`);
    }

    if (!this.collections.getLastCollected().match(VALID_TURN) && this.collections.getLastCollected() !== START_CHAR) {
      throw new Error(`Invalid turn character at x: ${x}, y: ${y}`);
    }

    const newDirection = validOptions.keys().next().value;
    this.direction.setDirection(newDirection);

    this.position.setPosition(validOptions.get(newDirection).x, validOptions.get(newDirection).y);
    this.addToCollections(validOptions.get(newDirection).value);
  }

  private addToCollections(value: string) {
    this.collections.addToPath(value);

    const { x, y } = this.position.getPosition();

    if (!this.visited.isVisited(x, y) && value.match(VALID_CHARS)) {
      this.collections.addToChars(value);
    }

    this.visited.addVisitedPosition(x, y);
  }

  findPath() {
    while (this.collections.getLastCollected() !== END_CHAR) {
      this.moveForward();
    }

    const collected = {
      path: this.collections.getPath(),
      chars: this.collections.getChars(),
    };
    console.log("COLLECTED PATH", collected.path);
    console.log("COLLECTED CHARS", collected.chars);

    return collected;
  }
}

export function findStartAndEnd(matrix: string[][]) {
  let start: PositionState | null = null;
  let end = null;
  matrix.forEach((line, y) => {
    line.forEach((char, x) => {
      if (char === "@") {
        if (start) {
          throw new Error("Multiple start characters");
        }
        start = { x, y };
      }

      if (char === "x") {
        end = { x, y };
      }
    });
  });

  if (!start) {
    throw new Error("Missing start character");
  }
  if (!end) {
    throw new Error("Missing end character");
  }

  return { start, end };
}

export function getValidOptions(
  matrix: string[][],
  currentDirection: DirectionType | undefined,
  position: PositionState
) {
  const { up, down, left, right } = DIRECTIONS_OFFSET;
  const { x: currentX, y: currentY } = position;

  const positions: Directions = {
    up: { x: currentX + up.xOffset, y: currentY + up.yOffset },
    down: { x: currentX + down.xOffset, y: currentY + down.yOffset },
    left: { x: currentX + left.xOffset, y: currentY + left.yOffset },
    right: { x: currentX + right.xOffset, y: currentY + right.yOffset },
  };

  const validOptions = new Map();

  Object.entries(positions).forEach(([direction, { x, y }]) => {
    const value = matrix[y]?.[x];

    if (
      value &&
      !isOppositeDirection(currentDirection, direction as DirectionType) &&
      isValidOption(direction as DirectionType | undefined, value)
    ) {
      validOptions.set(direction, {
        x,
        y,
        value,
      });
    }
  });

  return validOptions;
}
