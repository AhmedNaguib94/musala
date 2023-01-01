import { Injectable } from '@angular/core';
import { MapperInterface } from '../../interfaces/mapper.interface';
import { Gateway } from './../model/';
import PeripheralMapper from './peripheral.mapper';

@Injectable({
  providedIn: 'root',
})
export default class GatewayMapper implements MapperInterface<Gateway> {

  constructor(
    private peripheralMapper: PeripheralMapper
  ) { }

  fromJson(json: any): Gateway {
    return new Gateway(
      json['id'],
      json['serialNumber'],
      json['name'],
      json['ipv4'],
      json['peripheralDevices'] ? json['peripheralDevices'] : []
    );
  }

  fromList(json: any): Gateway[] {
    const list: Gateway[] = [];
    if (json) {
      json.forEach((element) => {
        list.push(this.fromJson(element));
      });
    }
    return list;
  }
}
