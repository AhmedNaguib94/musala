import { Injectable } from "@angular/core";
import { takeUntil } from "rxjs";
import { AddEditPeripheralInititateEvent, AddPeripheralEvent, AddPeripheralSubmitEvent } from "../bloc-event";
import { AddEditPeripheralInititateState, AddPeripheralLoadingState, AddPeripheralState, AddPeripheralSubmittedState } from "../bloc-state";
import { PeripheralRepository } from "../data/repository";
import { Bloc } from "./bloc";

@Injectable()
export class AddPeripheralBloc extends Bloc<AddPeripheralEvent, AddPeripheralState> {
  constructor(
    private peripheralRepository: PeripheralRepository
  ) {
    super();
  }

  protected onIncomingEvents(event: AddPeripheralEvent, currentState: AddPeripheralState) {
    if (event instanceof AddPeripheralSubmitEvent) {
      this.onState$.next(new AddPeripheralLoadingState());
      
      this.peripheralRepository.addPeripheral(event.peripheral).pipe(takeUntil(this.destroy$)).subscribe({
        complete: () => setTimeout(() => {this.onState$.next(new AddPeripheralSubmittedState())}, 500)
      });
    } else if (event instanceof AddEditPeripheralInititateEvent) {
      this.onState$.next(new AddPeripheralLoadingState());

      this.peripheralRepository.getPeripheralById(event.peripheralId).pipe(takeUntil(this.destroy$)).subscribe({
        next: (Peripheral) => setTimeout(() => {this.onState$.next(new AddEditPeripheralInititateState(Peripheral))}, 500)
      });
    }
  }
}
