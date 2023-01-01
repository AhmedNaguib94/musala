import { BlocEvent } from '../bloc-event';
import { Gateway } from '../data/model';

export abstract class AddGatewayEvent extends BlocEvent { }

export class AddEditGatewayInititateEvent extends AddGatewayEvent {
  constructor(public gatewayId: string) {
    super();
  }
}

// Submit
export class AddGatewaySubmitEvent extends AddGatewayEvent {
  constructor(public gateway: Gateway) {
    super();
  }
}
