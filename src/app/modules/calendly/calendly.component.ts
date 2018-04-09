import {Component, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {APP_CONFIG} from '../../core/models/app.config';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CoreUtilitiesService} from '../../core/services/core-utilities.service';
import {PlatformCheckService} from '../../core/services/platform-check.service';
import { UserScheduleService } from '../../lazy/app-user/schedule/user-schedule.service';

@Component({
  selector: 'fmp-calendly-component',
  templateUrl: 'calendly.component.html',
  styles: [require('./calendly.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CalendlyComponent implements OnInit {

  @Input()
  type: string;

  isFrameLoaded: boolean = false;
  isIncludeStr = [
      "quick-chat",
      "career-finder-intro-1"
  ];

  public calendlyUrl: string;

  private counter: number = 0;

  constructor(private activeModal: NgbActiveModal,
              private utilitiesService: CoreUtilitiesService,
              private platformCheckService: PlatformCheckService,
              private domRenderer: Renderer2,
              private scheduleService: UserScheduleService) {
    this.isFrameLoaded = false;
    if (utilitiesService.detectEdge() || utilitiesService.detectFirefox()) {
      this.openFrame();
    }
  }

  public ngOnInit(): void {
    this.calendlyUrl = APP_CONFIG.calendly_url;
    for (var i = 0; i < this.isIncludeStr.length; i ++) {
      if (this.isIncludeStr[i] == this.type) {
        this.calendlyUrl = APP_CONFIG.career_url;
        break;
      }
    }
    if (this.platformCheckService.isBrowser) {
      this.loadCalendlyScript();
    }
  }

  public frameLoaded(): void {
    if (this.counter == 1) {
      this.counter = 0;
      this.isFrameLoaded = true;
    } else {
      this.counter = 1;
    }
  }

  private sleep(milliseconds) {
    var start = new Date().getTime();

    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  public cancel(): void {
    this.activeModal.dismiss('Cancel close');
    if (this.isIncludeStr[1] == this.type) {
      localStorage.setItem('career-finder-intro-1', 'show');
    }

    this.sleep(1600);
  }

  private openFrame(): void {
    setTimeout(() => {
      this.isFrameLoaded = true
    }, 1000);
  }

  private loadCalendlyScript(): void {
    if (window && !window['isCalendlyScriptLoaded']) {
      const script = this.domRenderer.createElement('script');
      script.src = 'https://calendly.com/assets/external/widget.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      window['isCalendlyScriptLoaded'] = true;
    }
  }
}
