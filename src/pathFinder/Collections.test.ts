import { test, expect, describe } from "vitest";
import { Collections } from "./Collections";

describe("Collections Class", () => {
  test("Add To Path", () => {
    const collections = new Collections();

    collections.addToPath("A");
    expect(collections.getPath()).toEqual(["A"]);

    collections.addToPath("-");
    expect(collections.getPath()).toEqual(["A", "-"]);

    collections.addToPath("B");
    expect(collections.getPath()).toEqual(["A", "-", "B"]);
  });

  test("Add To Chars", () => {
    const collections = new Collections();

    collections.addToChars("A");
    expect(collections.getChars()).toEqual(["A"]);

    collections.addToChars("B");
    expect(collections.getChars()).toEqual(["A", "B"]);
  });

  test("Get Last Collected", () => {
    const collections = new Collections();

    collections.addToPath("A");
    expect(collections.getLastCollected()).toEqual("A");
  });
});
