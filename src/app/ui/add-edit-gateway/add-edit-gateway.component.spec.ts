import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { AddEditGatewayComponent } from './add-edit-gateway.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AddGatewayComponent', () => {
  let component: AddEditGatewayComponent;
  let fixture: ComponentFixture<AddEditGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditGatewayComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render labels', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-label')[0].textContent).toContain(
      'Serial number'
    );
    expect(compiled.querySelectorAll('mat-label')[1].textContent).toContain(
      'Name'
    );
    expect(compiled.querySelectorAll('mat-label')[2].textContent).toContain(
      'IPv4'
    );
    expect(compiled.querySelectorAll('mat-label')[3].textContent).toContain(
      'Peripheral devices'
    );
  });

  it('should render inputs', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('#serialNumber').querySelector('input')
    ).toBeTruthy();
    expect(compiled.querySelector('#name').querySelector('input')).toBeTruthy();
    expect(compiled.querySelector('#ip').querySelector('input')).toBeTruthy();
    expect(
      compiled.querySelector('#peripheralDevices').querySelector('mat-select')
    ).toBeTruthy();
  });

  it('should render buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.cancel').textContent).toContain('Cancel');
    expect(compiled.querySelector('.insert').textContent).toContain('Insert');
  });

  it('should call onSubmit method when click on insert', () => {
    spyOn(component, 'onSubmit');
    const app = fixture.debugElement.componentInstance;
    const insertButton =
      fixture.debugElement.nativeElement.querySelector('.insert');
    insertButton.click();
    fixture.whenStable().then(() => {
      expect(app.onSubmit).toHaveBeenCalled();
    });
  });

  // it('should navigate to /gateways route when click on cancel', inject([Router], (router: Router) => {
  //   spyOn(router, 'navigate').and.stub();
  //   const cancelButton =
  //     fixture.debugElement.nativeElement.querySelector('.cancel');
  //   cancelButton.click();
  //   expect(router.navigate).toHaveBeenCalledWith(['/geteways']);
  // }));
});
