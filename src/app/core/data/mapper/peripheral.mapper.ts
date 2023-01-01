import { Injectable } from '@angular/core';
import { MapperInterface } from '../../interfaces/mapper.interface';
import { Peripheral } from './../model/';

@Injectable({
  providedIn: 'root',
})
export default class PeripheralMapper implements MapperInterface<Peripheral> {

  constructor() { }

  fromJson(json: any): Peripheral {
    return new Peripheral(
      json['id'],
      json['uid'],
      json['vendor'],
      json['created_date'],
      json['status']
    );
  }

  fromList(json: any): Peripheral[] {
    const list: Peripheral[] = [];
    if (json) {
      json.forEach((element) => {
        list.push(this.fromJson(element));
      });
    }
    return list;
  }
}
