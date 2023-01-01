import { Injectable } from "@angular/core";
import { takeUntil } from "rxjs";
import { AddEditGatewayInititateEvent, AddGatewayEvent, AddGatewaySubmitEvent } from "../bloc-event";
import { AddEditGatewayInititateState, AddGatewayLoadingState, AddGatewayState, AddGatewaySubmittedState } from "../bloc-state";
import { GatewayRepository } from "../data/repository";
import { Bloc } from "./bloc";

@Injectable()
export class AddGatewayBloc extends Bloc<AddGatewayEvent, AddGatewayState> {
  constructor(
    private gatewayRepository: GatewayRepository
  ) {
    super();
  }

  protected onIncomingEvents(event: AddGatewayEvent, currentState: AddGatewayState) {
    if (event instanceof AddGatewaySubmitEvent) {
      this.onState$.next(new AddGatewayLoadingState());
      
      this.gatewayRepository.addGateway(event.gateway).pipe(takeUntil(this.destroy$)).subscribe({
        complete: () => setTimeout(() => {this.onState$.next(new AddGatewaySubmittedState())}, 500)
      });
    } else if (event instanceof AddEditGatewayInititateEvent) {
      this.onState$.next(new AddGatewayLoadingState());

      this.gatewayRepository.getGatewayById(event.gatewayId).pipe(takeUntil(this.destroy$)).subscribe({
        next: (gateway) => setTimeout(() => {this.onState$.next(new AddEditGatewayInititateState(gateway))}, 500)
      });
    }
  }
}
