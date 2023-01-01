import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SectionStateStatus } from 'src/app/core/common/enum';

@Component({
  selector: 'app-base-component',
  template: ``,
})
export class BaseComponent implements OnInit {
  protected destroy$ = new Subject();
  public sectionState: SectionStateStatus = SectionStateStatus.Ready;

  constructor() {}
  ngOnInit(): void {}
}
