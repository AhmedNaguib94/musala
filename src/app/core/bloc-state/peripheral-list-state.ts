import { BlocState } from '../bloc-state';
import { Peripheral } from '../data/model';

export abstract class PeripheralListState extends BlocState {}

// Ready
export class PeripheralListReadyState extends PeripheralListState {
  constructor(public peripheralList: Peripheral[] = []) {
    super();
  }
}

// Loading
export class PeripheralListLoadingState extends PeripheralListState {
  constructor(public isTransparent = false) {
    super();
  }
}

// Deleted Peripheral List
export class PeripheralDeletedState extends PeripheralListState {}
