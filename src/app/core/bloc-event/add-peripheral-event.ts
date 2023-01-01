import { BlocEvent } from '../bloc-event';
import { Peripheral } from '../data/model';

export abstract class AddPeripheralEvent extends BlocEvent { }

export class AddEditPeripheralInititateEvent extends AddPeripheralEvent {
  constructor(public peripheralId: string) {
    super();
  }
}

// Submit
export class AddPeripheralSubmitEvent extends AddPeripheralEvent {
  constructor(public peripheral: Peripheral) {
    super();
  }
}
