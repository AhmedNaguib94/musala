import { BlocEvent } from '../bloc-event';

export abstract class PeripheralListEvent extends BlocEvent {}

// Initiate
export class PeripheralListInitiateEvent extends PeripheralListEvent {}

// Loading
export class PeripheralListLoadingEvent extends PeripheralListEvent {}

// Delete
export class DeletePeripheralEvent extends PeripheralListEvent {
  constructor(public peripheralId: string) {
    super();
  }
}
