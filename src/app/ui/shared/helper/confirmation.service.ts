import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Confirmation } from '../model/confirmation';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  public confirmationMessage$: BehaviorSubject<Confirmation> = new BehaviorSubject(null);
  public confirmationCheckboxChecked$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private saveDataResolve: (value?: boolean | PromiseLike<boolean>, checkboxOptionChecked?: boolean | PromiseLike<boolean>) => void;

  constructor() { }

  public confirm(confirmation: Confirmation) {
    return new Promise<boolean>((resolve) => {
      this.saveDataResolve = resolve;
      this.confirmationMessage$.next(confirmation);
    });
  }

  public onConfirmMessageAction(value: boolean, checkboxOptionChecked: boolean) {
    this.confirmationCheckboxChecked$.next(checkboxOptionChecked);
    this.saveDataResolve(value);
  }
}
