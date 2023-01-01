import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AddEditPeripheralInititateEvent, AddPeripheralSubmitEvent } from 'src/app/core/bloc-event';
import { AddEditPeripheralInititateState, AddPeripheralLoadingState, AddPeripheralState, AddPeripheralSubmittedState } from 'src/app/core/bloc-state';
import { AddPeripheralBloc } from 'src/app/core/bloc/add-peripheral-bloc';
import { Constants } from 'src/app/core/common/constants';
import { SectionStateStatus } from 'src/app/core/common/enum';
import { Peripheral } from 'src/app/core/data/model';
import { BaseComponent } from '../shared/base-component/base-component.component';

@Component({
  selector: 'app-add-edit-peripheral',
  templateUrl: './add-edit-peripheral.component.html',
  styleUrls: ['./add-edit-peripheral.component.scss'],
  providers: [AddPeripheralBloc]
})
export class AddEditPeripheralComponent extends BaseComponent implements OnInit, OnDestroy{
  Constants = Constants;
  public form: FormGroup = null;
  public peripheral: Peripheral = new Peripheral();
  public peripheralId: string = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bloc: AddPeripheralBloc,
  ) {
    super();
    this.bloc.onState.pipe(takeUntil(this.destroy$)).subscribe((state) => this.handleBlocStates(state));
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.peripheralId = params.id;

        if (this.peripheralId) {
          this.bloc.setEvent.next(
            new AddEditPeripheralInititateEvent(this.peripheralId)
          );
        } else {
          this.initForm();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  onSubmit() {
    this.peripheral.uid = this.form.get('uid').value;
    this.peripheral.vendor = this.form.get('vendor').value;
    this.peripheral.status = this.form.get('status').value;

    this.bloc.setEvent.next(new AddPeripheralSubmitEvent(this.peripheral));
  }

  // private methods
  private initForm(): void {
    this.form = new FormGroup({
      uid: new FormControl(this.peripheral.uid, [Validators.required]),
      vendor: new FormControl(this.peripheral.vendor, [Validators.required]),
      status: new FormControl(this.peripheral.status, [Validators.required])
    })
  }

  private handleBlocStates(state: AddPeripheralState) {
    if (!state) {
      return;
    }
    this.sectionState = SectionStateStatus.Ready;
    if (state instanceof AddPeripheralLoadingState) {
      this.sectionState = SectionStateStatus.LoadingTransparent;
    } else if (state instanceof AddPeripheralSubmittedState) {
      this.router.navigate([`/${Constants.PERIPHERALS_LIST_PATH}`]);
    } else if (state instanceof AddEditPeripheralInititateState) {
      this.peripheral = state.peripheral;
      this.initForm();
    }
  }

}
