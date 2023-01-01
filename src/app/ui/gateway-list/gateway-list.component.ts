import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DeleteGatewayEvent, GatewayListInitiateEvent } from 'src/app/core/bloc-event';
import { GatewayDeletedState, GatewayListLoadingState, GatewayListReadyState, GatewayListState } from 'src/app/core/bloc-state';
import { GatewayListBloc } from 'src/app/core/bloc/gateway-list-bloc';
import { Constants } from 'src/app/core/common/constants';
import { SectionStateStatus } from 'src/app/core/common/enum';
import { Gateway } from 'src/app/core/data/model';
import { BaseComponent } from '../shared/base-component/base-component.component';
import { ConfirmationService } from '../shared/helper/confirmation.service';
import { Confirmation, ConfirmationType } from '../shared/model/confirmation';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss'],
  providers: [GatewayListBloc]
})
export class GatewayListComponent extends BaseComponent implements OnInit, OnDestroy {
  Constants = Constants;
  public gateways: Gateway[] = [];

  constructor(
    private bloc: GatewayListBloc,
    private confirmationService: ConfirmationService,
  ) {
    super();
    this.bloc.onState.pipe(takeUntil(this.destroy$)).subscribe((state) => this.handleBlocStates(state));
  }

  ngOnInit(): void {
    this.loadData()
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  deleteGateway(gatewayId: string) {
    this.confirmationService.confirm(
      new Confirmation(
        ConfirmationType.DestructiveAction,
        'You are about to delete Gateway',
        'Are you sure?'
      )
    ).then(value => {
      if (value) {
        this.bloc.setEvent.next(new DeleteGatewayEvent(gatewayId));
      }
    });
  }

  // private methods
  private loadData() {
    this.bloc.setEvent.next(new GatewayListInitiateEvent());
  }

  private handleBlocStates(state: GatewayListState) {
    if (!state) {
      return;
    }

    this.sectionState = SectionStateStatus.Ready;
    if (state instanceof GatewayListLoadingState) {
      this.sectionState = SectionStateStatus.Loading;
    }
    if (state instanceof GatewayListReadyState) {
      if (state.gatewayList.length) {
        this.gateways = state.gatewayList;
      } else {
        this.sectionState = SectionStateStatus.Empty;
      }
    } else if (state instanceof GatewayDeletedState) {
      this.loadData()
    }
  }
}
