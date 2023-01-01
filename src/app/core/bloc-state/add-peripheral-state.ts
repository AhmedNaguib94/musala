import { BlocState } from '../bloc-state';
import { Peripheral } from '../data/model';

export abstract class AddPeripheralState extends BlocState {}

// Inititate
export class AddEditPeripheralInititateState extends AddPeripheralState {
  constructor(public peripheral: Peripheral) {
    super();
  }
}

// Loading
export class AddPeripheralLoadingState extends AddPeripheralState {
  constructor(public isTransparent = true) {
    super();
  }
}

// Submitted
export class AddPeripheralSubmittedState extends AddPeripheralState {}
