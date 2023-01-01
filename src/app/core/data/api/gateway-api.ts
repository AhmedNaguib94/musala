import { Injectable } from '@angular/core';
import { map, Observable, Observer } from 'rxjs';
import { GeneralResponse } from '../../common/enum';
import { GatewayMapper } from '../mapper';
import { Gateway } from '../model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class GatewayApi {
  constructor(private gatewayMapper: GatewayMapper) {}

  getAllGateways(): Observable<Gateway[]> {
    const gatewaysList = new Observable((observer: Observer<Gateway[]>) => {
      observer.next(JSON.parse(localStorage.getItem('gateway')) || []);
      observer.complete();
    });

    return gatewaysList.pipe(
      map((gateways) => {
        return this.gatewayMapper.fromList(gateways);
      })
    );
  }

  getGatewayById(gatewayId: string): Observable<Gateway> {
    const getGateway = new Observable((observer: Observer<string>) => {
      const gateways = JSON.parse(localStorage.getItem('gateway'));
      observer.next(
        gateways?.find((gateway) => gateway.id == gatewayId)
      );
      observer.complete();
    });

    return getGateway.pipe(
      map((gateway) => {
        return this.gatewayMapper.fromJson(gateway);
      })
    );
  }

  addGateway(gateway: Gateway): Observable<GeneralResponse> {
    const body = {
      id: uuid.v4(),
      serialNumber: gateway.serialNumber,
      name: gateway.name,
      ipv4: gateway.ipv4,
      peripheralDevices: gateway.peripheralDevices,
    };

    const storeGateway = new Observable((observer: Observer<string>) => {
      if (localStorage.getItem('gateway')) {
        const gateways = JSON.parse(localStorage.getItem('gateway'));
        if (gateway.id) {
          localStorage.setItem('gateway', JSON.stringify([...gateways.filter(item => item.id != gateway.id), body]));
        } else {
          localStorage.setItem('gateway', JSON.stringify([...gateways, body]));
        }
      } else {
        localStorage.setItem('gateway', JSON.stringify([body]));
      }
      observer.complete();
    });

    return storeGateway.pipe(
      map((_) => {
        return GeneralResponse.GATEWAY_ADDED;
      })
    );
  }

  deleteGateway(gatewayId: string): Observable<GeneralResponse> {
    const deleteGateway = new Observable((observer: Observer<string>) => {
      const gateways = JSON.parse(localStorage.getItem('gateway'));
      localStorage.setItem(
        'gateway',
        JSON.stringify(gateways?.filter((gateway) => gateway.id != gatewayId))
      );
      observer.complete();
    });

    return deleteGateway.pipe(
      map((_) => {
        return GeneralResponse.GATEWAY_DELETED;
      })
    );
  }
}
