export class Peripheral {
  constructor(
    public id: string = null,
    public uid: number = null,
    public vendor: string = null,
    public created_date: Date = null,
    public status: PeripheralStatus = null
  ) {}

  toJson() {
    return JSON.stringify(this);
  }
}

export enum PeripheralStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
}
