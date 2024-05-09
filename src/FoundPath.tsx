import { PathFinder } from "./pathFinder/PathFinder";

export function FoundPath({ map }: { map: string }) {
  const collected = new PathFinder(map).findPath();

  return (
    <>
      <h3>Collected Path</h3>
      <div>
        {collected.path.map((char, index) => (
          // using index as key is ok in this situation as the user is not editing the list
          <span key={index}>{char}</span>
        ))}
      </div>
      <h3>Collected Chars</h3>
      <div>
        {collected.chars.map((char, index) => (
          // using index as key is ok in this situation as the user is not editing the list
          <span key={index}>{char}</span>
        ))}
      </div>
    </>
  );
}
