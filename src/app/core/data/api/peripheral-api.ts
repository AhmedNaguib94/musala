import { Injectable } from "@angular/core";
import { map, Observable, Observer } from "rxjs";
import { GeneralResponse } from "../../common/enum";
import { PeripheralMapper } from "../mapper";
import { Peripheral } from "../model";
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class PeripheralApi {
  constructor(private peripheralMapper: PeripheralMapper) { }


  addPeripheral(peripheral: Peripheral): Observable<GeneralResponse> {
    const body = {
      id: uuid.v4(),
      uid: peripheral.uid,
      vendor: peripheral.vendor,
      created_date: new Date(),
      status: peripheral.status
    };

    const storePeripheral = new Observable((observer: Observer<string>) => {
      if (localStorage.getItem('peripheral')) {
        const peripherals = JSON.parse(localStorage.getItem('peripheral'));
        if (peripheral.id) {
          localStorage.setItem('peripheral', JSON.stringify([...peripherals.filter(item => item.id != peripheral.id), body]));
        } else {
          localStorage.setItem('peripheral', JSON.stringify([...peripherals, body]));
        }
      } else {
        localStorage.setItem('peripheral', JSON.stringify([body]))
      }
      observer.complete()
    })

    return storePeripheral.pipe(
      map(res => {
        return GeneralResponse.PERIPHERAL_ADDED;
      })
    )
  }

  getAllperipheralDevices(): Observable<Peripheral[]> {
    const peripheralList = new Observable((observer: Observer<Peripheral[]>) => {
      observer.next(JSON.parse(localStorage.getItem('peripheral')) || []);
      observer.complete();
    });

    return peripheralList.pipe(
      map((peripherals) => {
        return this.peripheralMapper.fromList(peripherals);
      })
    );
  }

  getPeripheralById(peripheralId: string): Observable<Peripheral> {
    const getPeripheral = new Observable((observer: Observer<string>) => {
      const peripherals = JSON.parse(localStorage.getItem('peripheral'));
      observer.next(
        peripherals?.find((peripheral) => peripheral.id == peripheralId)
      );
      observer.complete();
    });

    return getPeripheral.pipe(
      map((peripheral) => {
        return this.peripheralMapper.fromJson(peripheral);
      })
    );
  }

  deletePeripheral(peripheralId: string): Observable<GeneralResponse> {
    const deletePeripheral = new Observable((observer: Observer<string>) => {
      const peripherals = JSON.parse(localStorage.getItem('peripheral'));
      localStorage.setItem(
        'peripheral',
        JSON.stringify(peripherals?.filter((peripheral) => peripheral.id != peripheralId))
      );
      observer.complete();
    });

    return deletePeripheral.pipe(
      map((res) => {
        return GeneralResponse.PERIPHERAL_DELETED;
      })
    );
  }


}
