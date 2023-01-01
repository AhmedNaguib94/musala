import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import {
  AddEditGatewayInititateEvent,
  AddGatewaySubmitEvent,
} from 'src/app/core/bloc-event';
import {
  AddEditGatewayInititateState,
  AddGatewayLoadingState,
  AddGatewayState,
  AddGatewaySubmittedState,
} from 'src/app/core/bloc-state';
import { AddGatewayBloc } from 'src/app/core/bloc/add-gateway-bloc';
import { Constants } from 'src/app/core/common/constants';
import { SectionStateStatus } from 'src/app/core/common/enum';
import { Gateway, Peripheral } from 'src/app/core/data/model';
import { PeripheralRepository } from 'src/app/core/data/repository';
import { BaseComponent } from '../shared/base-component/base-component.component';

@Component({
  selector: 'app-add-edit-gateway',
  templateUrl: './add-edit-gateway.component.html',
  styleUrls: ['./add-edit-gateway.component.scss'],
  providers: [AddGatewayBloc],
})
export class AddEditGatewayComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  Constants = Constants;
  public form: FormGroup = null;
  public gateway: Gateway = new Gateway();
  public gatewayId: string = null;
  public peripheralDevicesList: Peripheral[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bloc: AddGatewayBloc,
    private peripheralRepository: PeripheralRepository
  ) {
    super();
    this.bloc.onState
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => this.handleBlocStates(state));
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.gatewayId = params.id;

        if (this.gatewayId) {
          this.bloc.setEvent.next(
            new AddEditGatewayInititateEvent(this.gatewayId)
          );
        } else {
          this.initForm();
        }
        this.getPeripheralDevicesList();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  onSubmit() {
    this.gateway.serialNumber = this.form.get('serialNumber').value;
    this.gateway.name = this.form.get('name').value;
    this.gateway.ipv4 = this.form.get('ip').value;
    this.gateway.peripheralDevices = this.form.get('devices').value;

    this.bloc.setEvent.next(new AddGatewaySubmitEvent(this.gateway));
  }

  // private methods
  private initForm(): void {
    this.form = new FormGroup({
      serialNumber: new FormControl(this.gateway.serialNumber, [
        Validators.required,
      ]),
      name: new FormControl(this.gateway.name, [Validators.required]),
      ip: new FormControl(this.gateway.ipv4, [Validators.required]),
      devices: new FormControl(
        this.gateway.peripheralDevices.map((peripheral) => peripheral),
        [Validators.required]
      ),
    });
  }

  private getPeripheralDevicesList(): void {
    this.peripheralRepository
      .getAllPeripherals()
      .pipe(takeUntil(this.destroy$))
      .subscribe((peripherals: Peripheral[]) => {
        this.peripheralDevicesList = peripherals;
      });
  }

  private handleBlocStates(state: AddGatewayState) {
    if (!state) {
      return;
    }
    this.sectionState = SectionStateStatus.Ready;
    if (state instanceof AddGatewayLoadingState) {
      this.sectionState = SectionStateStatus.LoadingTransparent;
    } else if (state instanceof AddGatewaySubmittedState) {
      this.router.navigate([`/${Constants.GATEWAY_LIST_PATH}`]);
    } else if (state instanceof AddEditGatewayInititateState) {
      this.gateway = state.gateway;
      this.initForm();
    }
  }
}
