import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Bloc } from '../bloc';
import { DeletePeripheralEvent, PeripheralListEvent, PeripheralListInitiateEvent } from '../bloc-event';
import {
  PeripheralDeletedState,
  PeripheralListLoadingState,
  PeripheralListReadyState,
  PeripheralListState,
} from '../bloc-state';
import { PeripheralRepository } from '../data/repository';

@Injectable()
export class PeripheralListBloc extends Bloc<PeripheralListEvent, PeripheralListState> {
  constructor(private peripheralRepository: PeripheralRepository) {
    super();
  }

  protected onIncomingEvents(event: PeripheralListEvent) {
    if (event instanceof PeripheralListInitiateEvent) {
      this.onState$.next(new PeripheralListLoadingState());

      this.peripheralRepository
        .getAllPeripherals()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (peripherals) =>
            setTimeout(() => {
              this.onState$.next(new PeripheralListReadyState(peripherals));
            }, 500),
        });
    } else if (event instanceof DeletePeripheralEvent) {
      this.onState$.next(new PeripheralListLoadingState());

      this.peripheralRepository
        .deletePeripheral(event.peripheralId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          complete: () =>
            setTimeout(() => {
              this.onState$.next(new PeripheralDeletedState());
            }, 500),
        });
    }
  }
}
