import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { AddEditPeripheralComponent } from './add-edit-peripheral.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddGatewayComponent', () => {
  let component: AddEditPeripheralComponent;
  let fixture: ComponentFixture<AddEditPeripheralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditPeripheralComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPeripheralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render labels', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-label')[0].textContent).toContain(
      'UID'
    );
    expect(compiled.querySelectorAll('mat-label')[1].textContent).toContain(
      'Vendor'
    );
    expect(compiled.querySelectorAll('mat-label')[2].textContent).toContain(
      'Status'
    );
  });

  it('should render inputs', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('#uid').querySelector('input')
    ).toBeTruthy();
    expect(compiled.querySelector('#vendor').querySelector('input')).toBeTruthy();
    expect(
      compiled.querySelector('#status').querySelector('mat-select')
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
