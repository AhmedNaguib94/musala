import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService } from '../../helper/confirmation.service';
import { Confirmation, ConfirmationType } from '../../model/confirmation';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  public confirmData: Confirmation = new Confirmation();
  public isVisible = false;
  public ConfirmationType = ConfirmationType;
  public checkboxValue = false;

  // private fields
  private dispose$ = new Subject();

  constructor(
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.confirmationService.confirmationMessage$.pipe(takeUntil(this.dispose$)).subscribe(confirm => {
      
      if (confirm != null) {
        confirm.mainActionText = confirm.mainActionText ?? 'Confirm';
        confirm.cancelActionText = confirm.cancelActionText ?? 'Discard';
        this.confirmData = confirm;
        this.isVisible = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.dispose$.next(true);
  }

  onActionButtonClicked(value: boolean, checkboxChecked: boolean) {
    this.confirmationService.onConfirmMessageAction(value, checkboxChecked !== null ? checkboxChecked : false);
    this.isVisible = false;
    this.checkboxValue = false;
    this.confirmData.message = '';
  }

}
