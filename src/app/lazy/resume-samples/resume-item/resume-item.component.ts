import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IResume} from "../resume-samples.model";

@Component({
    selector: 'resume-item',
    templateUrl: './resume-item.component.html',
    styles: [require('./resume-item.component.scss').toString()],
    encapsulation: ViewEncapsulation.None
})
export class ResumeItemComponent implements OnInit {

  @Input()
  resume: IResume;

  constructor() { }

  ngOnInit() {
  }

}
