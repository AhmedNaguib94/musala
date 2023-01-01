import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gateway } from 'src/app/core/data/model';

import { GatewayListComponent } from './gateway-list.component';

describe('GatewayListComponent', () => {
  let component: GatewayListComponent;
  let fixture: ComponentFixture<GatewayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GatewayListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Gateways List');
  });

  it('should render buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[0].textContent).toContain(
      'Peripheral devices'
    );
    expect(compiled.querySelectorAll('button')[1].textContent).toContain(
      'Add Gateway'
    );
  });

  it('should render the table ', () => {
    let tableRows = fixture.nativeElement.querySelectorAll('tr');

    expect(tableRows.length).toBe(1);
    fixture.detectChanges();

    // Header row
    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toBe('Serial number');
    expect(headerRow.cells[1].innerHTML).toBe('Name');
    expect(headerRow.cells[2].innerHTML).toBe('IPv4');
    expect(headerRow.cells[3].innerHTML).toBe('Peripheral devices count');
  });
});
