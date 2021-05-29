import BigPull from "bigpull";

export default abstract class BaseEvent  {
  protected _bigpull: BigPull;
  public once: boolean = false;

  constructor(bigpull: BigPull) {
    this._bigpull = bigpull;
  }

  public abstract exec(...args: any[]): Promise<void>;
}
