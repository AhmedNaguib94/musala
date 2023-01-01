import { BlocState } from '../bloc-state';
import { Gateway } from '../data/model';

export abstract class AddGatewayState extends BlocState {}

// Inititate
export class AddEditGatewayInititateState extends AddGatewayState {
  constructor(public gateway: Gateway) {
    super();
  }
}

// Loading
export class AddGatewayLoadingState extends AddGatewayState {
  constructor(public isTransparent = true) {
    super();
  }
}

// Submitted
export class AddGatewaySubmittedState extends AddGatewayState {}
