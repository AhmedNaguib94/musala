import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DeletePeripheralEvent, PeripheralListInitiateEvent } from 'src/app/core/bloc-event';
import { PeripheralDeletedState, PeripheralListLoadingState, PeripheralListReadyState, PeripheralListState } from 'src/app/core/bloc-state';
import { PeripheralListBloc } from 'src/app/core/bloc/peripheral-list-bloc';
import { Constants } from 'src/app/core/common/constants';
import { SectionStateStatus } from 'src/app/core/common/enum';
import { Peripheral } from 'src/app/core/data/model';
import { BaseComponent } from '../shared/base-component/base-component.component';
import { ConfirmationService } from '../shared/helper/confirmation.service';
import { Confirmation, ConfirmationType } from '../shared/model/confirmation';

@Component({
  selector: 'app-peripheral-list',
  templateUrl: './peripheral-list.component.html',
  styleUrls: ['./peripheral-list.component.scss'],
  providers: [PeripheralListBloc]
})
export class PeripheralListComponent extends BaseComponent implements OnInit, OnDestroy {
  Constants = Constants;
  public peripherals: Peripheral[] = [];

  constructor(
    private bloc: PeripheralListBloc,
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

  deletePeripheral(PeripheralId: string) {
    this.confirmationService.confirm(
      new Confirmation(
        ConfirmationType.DestructiveAction,
        'You are about to delete Peripheral',
        'Are you sure?'
      )
    ).then(value => {
      if (value) {
        this.bloc.setEvent.next(new DeletePeripheralEvent(PeripheralId));
      }
    });
  }

  // private methods
  private loadData() {
    this.bloc.setEvent.next(new PeripheralListInitiateEvent());
  }

  private handleBlocStates(state: PeripheralListState) {
    if (!state) {
      return;
    }

    this.sectionState = SectionStateStatus.Ready;
    if (state instanceof PeripheralListLoadingState) {
      this.sectionState = SectionStateStatus.Loading;
    }
    if (state instanceof PeripheralListReadyState) {
      if (state.peripheralList.length) {
        this.peripherals = state.peripheralList;
      } else {
        this.sectionState = SectionStateStatus.Empty;
      }
    } else if (state instanceof PeripheralDeletedState) {
      this.loadData()
    }
  }
}
