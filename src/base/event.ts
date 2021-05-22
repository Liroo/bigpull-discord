import BigPull from "bigpull";

export default class BaseEvent  {
  protected _bigpull: BigPull;
  public once: boolean = false;

  constructor(bigpull: BigPull) {
    this._bigpull = bigpull;
  }

  exec(...args: any[]): void {}
}
