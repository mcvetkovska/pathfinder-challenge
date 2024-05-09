export const START_CHAR = "@";
export const END_CHAR = "x";
export const TURN_CHAR = "+";
export const VALID_CHARS = /[A-Z]/g;
export const VALID_TURN = /[A-Z]|\+/g;

const map1 = `
@---A---+
        |
x-B-+   C
    |   |
    +---+
`;

const map2 = `
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x
`;

const map3 = `
@-A--+
     |
     x-C-D+
`;

const map4 = `
@
| +-C--+
A |    |
+---B--+
  |      x
  |      |
  +---D--+
`;

const map5 = `
@---A---+
        |
x-B-+   |
    |   |
    +---C
`;

const map6 = `
    +-O-N-+
    |     |
    |   +-I-+
@-G-O-+ | | |
    | | +-+ E
    +-+     S
            |
            x
`;

const map7 = `
@-A--+
     |
     +-B--x-C--D
`;

const missingStartCharacter = `
   -A---+
        |
x-B-+   C
    |   |
    +---+
`;
const missingEndCharacter = `
@--A---+
       |
 B-+   C
   |   |
   +---+
`;

const multipleStarts = `
 @--A-@-+
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

const brokenPath = `
@--A-+
     |
         
     B-x
`;

const multipleStartingPaths = `x-B-@-A-x`;

const fakeTurn = `@-A-+-B-x`;

const invalidTurnCharacter = `
@---A----
        |
x-B-+   C
    |   |
    +---+
`;

export const sampleMaps = [
  map1,
  map2,
  map3,
  map4,
  map5,
  map6,
  map7,
  missingStartCharacter,
  missingEndCharacter,
  multipleStarts,
  forkInPath,
  brokenPath,
  multipleStartingPaths,
  fakeTurn,
  invalidTurnCharacter,
];

export function convertMapToMatrix(map: string) {
  const matrix = map
    .split("\n")
    .map((line) => line.split(""))
    .filter((line) => line.length > 0);
  return matrix;
}
