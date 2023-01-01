import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Bloc } from '../bloc';
import { DeleteGatewayEvent, GatewayListEvent, GatewayListInitiateEvent } from '../bloc-event';
import {
  GatewayDeletedState,
  GatewayListLoadingState,
  GatewayListReadyState,
  GatewayListState,
} from '../bloc-state';
import { GatewayRepository } from '../data/repository';

@Injectable()
export class GatewayListBloc extends Bloc<GatewayListEvent, GatewayListState> {
  constructor(private gatewayRepository: GatewayRepository) {
    super();
  }

  protected onIncomingEvents(event: GatewayListEvent) {
    if (event instanceof GatewayListInitiateEvent) {
      this.onState$.next(new GatewayListLoadingState());

      this.gatewayRepository
        .getAllGateways()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (gateways) =>
            setTimeout(() => {
              this.onState$.next(new GatewayListReadyState(gateways));
            }, 500),
        });
    } else if (event instanceof DeleteGatewayEvent) {
      this.onState$.next(new GatewayListLoadingState());

      this.gatewayRepository
        .deleteGateway(event.gatewayId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          complete: () =>
            setTimeout(() => {
              this.onState$.next(new GatewayDeletedState());
            }, 500),
        });
    }
  }
}
