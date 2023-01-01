import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { SectionStateStatus } from 'src/app/core/common/enum';

@Component({
  selector: 'app-state-section',
  templateUrl: './state-section.component.html',
  styleUrls: ['./state-section.component.scss'],
})
export class StateSectionComponent implements OnInit {

  @Input() state: SectionStateStatus;
  @Input() loadingLabel: string;
  @Input() errorLabel: string;
  @Input() emptyLabel: string;
  @Input() emptyImagePath: string;
  @Input() isPageSection = false;
  @Input() flexibleHeight = false;
  @Input() transparentBackground = false;
  @Output() reload = new EventEmitter();

  SectionState = SectionStateStatus;

  constructor() { }

  ngOnInit(): void {
  }

  onReload() {
    this.reload.emit(null);
  }

}
