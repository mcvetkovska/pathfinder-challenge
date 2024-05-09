export class Collections {
  private collectedPath: string[] = [];
  private collectedChars: string[] = [];

  addToPath(char: string) {
    this.collectedPath.push(char);
  }

  addToChars(char: string) {
    this.collectedChars.push(char);
  }

  getLastCollected() {
    return this.collectedPath[this.collectedPath.length - 1];
  }

  getPath() {
    return this.collectedPath;
  }

  getChars() {
    return this.collectedChars;
  }
}
