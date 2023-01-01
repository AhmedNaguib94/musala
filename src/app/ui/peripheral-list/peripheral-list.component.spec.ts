import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripheralListComponent } from './peripheral-list.component';

describe('GatewayListComponent', () => {
  let component: PeripheralListComponent;
  let fixture: ComponentFixture<PeripheralListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeripheralListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeripheralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Peripherals List');
  });

  it('should render buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[0].textContent).toContain(
      'Gateways'
    );
    expect(compiled.querySelectorAll('button')[1].textContent).toContain(
      'Add Peripheral'
    );
  });

  it('should render the table ', () => {
    let tableRows = fixture.nativeElement.querySelectorAll('tr');

    expect(tableRows.length).toBe(1);
    fixture.detectChanges();

    // Header row
    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toBe('UID');
    expect(headerRow.cells[1].innerHTML).toBe('Vendor');
    expect(headerRow.cells[2].innerHTML).toBe('Created date');
    expect(headerRow.cells[3].innerHTML).toBe('Status');
  });
});
