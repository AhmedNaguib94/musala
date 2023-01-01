import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GeneralResponse } from "../../common/enum";
import { PeripheralApi } from "../api/peripheral-api";
import { Peripheral } from "../model";

@Injectable({
  providedIn: 'root',
})
export class PeripheralRepository  {
  constructor(private perpheralApi: PeripheralApi) { }

  addPeripheral(peripheral: Peripheral): Observable<GeneralResponse> {
    return this.perpheralApi.addPeripheral(peripheral);
  }

  getAllPeripherals(): Observable<Peripheral[]> {
    return this.perpheralApi.getAllperipheralDevices();
  }

  getPeripheralById(peripheralId: string): Observable<Peripheral> {
    return this.perpheralApi.getPeripheralById(peripheralId);
  }

  deletePeripheral(peripheralId: string): Observable<GeneralResponse> {
    return this.perpheralApi.deletePeripheral(peripheralId);
  }
}
