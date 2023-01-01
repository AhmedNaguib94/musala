import { BlocState } from '../bloc-state';
import { Gateway } from '../data/model';

export abstract class GatewayListState extends BlocState {}

// Ready
export class GatewayListReadyState extends GatewayListState {
  constructor(public gatewayList: Gateway[] = []) {
    super();
  }
}

// Loading
export class GatewayListLoadingState extends GatewayListState {
  constructor(public isTransparent = false) {
    super();
  }
}

// Deleted Gateway List
export class GatewayDeletedState extends GatewayListState {}
