import { Peripheral } from "./peripheral";

export class Gateway {
  constructor(
    public id: string = null,
    public serialNumber: number = null,
    public name: string = null,
    public ipv4: string = null,
    public peripheralDevices: string[] = []
  ) {}

  toJson() {
    return JSON.stringify(this);
  }
}
