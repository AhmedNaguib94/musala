import { BlocEvent } from '../bloc-event';

export abstract class GatewayListEvent extends BlocEvent {}

// Initiate
export class GatewayListInitiateEvent extends GatewayListEvent {}

// Loading
export class GatewayListLoadingEvent extends GatewayListEvent {}

// Delete
export class DeleteGatewayEvent extends GatewayListEvent {
  constructor(public gatewayId: string) {
    super();
  }
}
