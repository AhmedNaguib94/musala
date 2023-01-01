import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSectionComponent } from './state-section.component';

describe('StateSectionComponent', () => {
  let component: StateSectionComponent;
  let fixture: ComponentFixture<StateSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
