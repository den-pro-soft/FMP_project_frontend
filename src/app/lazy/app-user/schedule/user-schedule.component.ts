import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CANCEL_STATUS, COMPLETED_STATUS, PENDING_STATUS, IScheduleCallService, IScheduleCallsResponse, IScheduleEvent } from './user-schedule.model';
import { UserScheduleService } from './user-schedule.service';
import { CalendlyComponent } from '../../../modules/calendly/calendly.component';
import { IErrorResponse } from '../../../core/models/core.model';
import { AlertModalComponent } from '../../../modules/alert-modal/alert-modal.component';
import { UserService } from '../../../core/services/user.service';
import { IUser, IUserPackage } from '../../../core/models/user.model';
import { MetaTags } from '../../../core/services/meta-tags.service';

@Component({
  selector: 'fmp-my-schedule-component',
  templateUrl: 'user-schedule.html',
  styles: [require('./user-schedule.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class UserScheduleComponent {

  @ViewChild('fsevent_item_intro') fsevent_item_intro;
  public calls: IScheduleCallsResponse;
  public errorMessage: string;
  private userPackagesMap: Map<number, IUserPackage>;
  public localtime: Date = new Date();
  private linksMap: any = {
    'resume-makeover': {
      'executive': 'resume-makeover-executive',
      'senior': 'resume-makeover-senior'
    },
    'cover-letter-service': {
      'executive': 'cover-letter-writing-executive',
      'senior': 'cover-letter-writing-senior'
    },
    'linkedin-profile-makeover': {
      'executive': 'linkedin-profile-makeover-executive',
      'senior': 'linkedin-profile-makeover-senior'
    },
    'job-interview-prep': {
      'executive': 'interview-training-executive',
      'senior': 'interview-training-senior'
    },
    'career-finder': {
      'plan': 'career-finder-intro-1',
      'plan1': 'quick-chat'
    },
    'quick-chat': {
      'plan1': 'quick-chat'
    }
  };

  constructor(private route: ActivatedRoute,
              private scheduleService: UserScheduleService,
              private modalService: NgbModal,
              private metaService: MetaTags,
              private userService: UserService) {

    var self = this;
    this.metaService.setTitle('My Schedule - Find My Profession');
    this.metaService.removeAllMetaTags();
    setInterval(function() {
      {
        self.localtime = new Date();
        self.scheduleService.getCalls()
          .subscribe(
            ((calls: IScheduleCallsResponse) => self.setCalls(calls))
          );
      }
    }, 5000);
    const calls: IScheduleCallsResponse | null = route.snapshot.data['content'];
    this.calls = calls;
    this.setCalls(calls);
  }

  /**
   * Method to Cancel call
   * @param event
   * @param type
   * @param index
   */
  public cancelEvent(event: IScheduleEvent, type: string, index: number): void {
    if (event && event.id) {
      this.openModal(`Are you sure you want to cancel ${event.link} event?`,
        this.cancelEventRequest.bind(this, {
          id: event.id,
          index: index,
          type: type
        }));
    }
  }

  /**
   * Method to Complete call
   * @param event
   * @param type
   * @param index
   */
  public completeEvent(event: IScheduleEvent, type: string, index: number): void {
  }


  /**
   * Method to open modal with selected service
   * @param event
   */
  public scheduleEventCall(event: any): void {
    const modal: NgbModalRef = this.modalService.open(CalendlyComponent);

    modal.componentInstance.type = event.calendlyLink;
    modal.result.then(
      () => this.reloadCalls(),
      () => this.reloadCalls()
    );

  }

  /**
   * Method to refresh calls
   */
  public reloadCalls(): void {
    this.scheduleService.getCalls()
      .subscribe(
        ((calls: IScheduleCallsResponse) => this.setCalls(calls))
      );
  }

  /**
   * Method to send Http request with complete event
   * @param args
   */
  private completeEventRequest(args: any): void {
  }

  /**
   * Method to send Http request with cancel event
   * @param args
   */
  private cancelEventRequest(args: any): void {
    this.scheduleService.changeEventStatus(args.id, CANCEL_STATUS)
      .subscribe(
        () => this.reloadCalls(),
        (error: IErrorResponse) => this._handleError(error)
      );
  }

  /**
   * Method to open modal and trigger callback
   * @param message
   * @param callback
   */
  private openModal(message: string, callback: Function): void {
    const modal: NgbModalRef = this.modalService.open(AlertModalComponent, {
      backdrop: false
    });
    modal.result.then(() => {
      callback();
    }, () => {
      /*Canceled*/
    });
    modal.componentInstance.message = message;
  }

  private setCalls(calls: IScheduleCallsResponse): void {
    var call_res = {
      pending: [],
      completed: [],
      available: []
    };
    var allow_quick = true;
    var comAllowquick = false;
    var quick_tmp, finder_call, comAllow;
    if (calls && Array.isArray(calls.available)) {
      const user: IUser = this.userService.user$.getValue();

      if (!this.userPackagesMap) {
        this.userPackagesMap = new Map<number, IUserPackage>();
        user.packages.forEach((element: IUserPackage) => {
          this.userPackagesMap.set(element.service.id, element);
        });
      }
      calls.available.forEach((element: IScheduleCallService) => {
        const packageItem: IUserPackage = this.userPackagesMap.get(element.id);

        element.flg_disp = true;
        if (this.linksMap[element.link]) {
          if (element.link === 'career-finder') {
            element.calendlyLink = this.linksMap[element.link].plan;
          } else {
            element.calendlyLink = this.linksMap[element.link][packageItem.plan.toLowerCase()];
          }
        }
      });

      var flg_career = false;

      for (var i = 0; i < calls.available.length; i++){
          if (flg_career && calls.available[i].link === 'career-finder')
              continue;

          var tmp = Object.create(calls.available[i]);
          tmp.flg_disp = true;
          if (calls.available[i].link === 'career-finder'){
              finder_call = calls.available[i];
              call_res.available.push(tmp);
              if (localStorage.getItem('career-finder-intro-1') == 'hide')
                    call_res.available[i].flg_disp = false;
              var tmp1 = Object.create(calls.available[i]);
              flg_career = true;
              allow_quick = false;
              tmp1.flg_disp = false;
              tmp1.calendlyLink = this.linksMap[tmp1.link].plan1;
              call_res.available.push(tmp1);
          }
          else if (calls.available[i].link === 'quick-chat') {
              if (localStorage.getItem('career-finder-intro-1') == 'hide' && allow_quick) {
                  calls.available[i].flg_disp = true;
                  allow_quick = false;
              }
          }
      }
    }
    flg_career = false;

    if (calls) {
      for (var i = 0; i < calls.pending.length; i ++) {
        if ((calls.pending[i].link == 'quick-chat' || calls.pending[i].link == 'career-finder-intro-1' || calls.pending[i].link == 'career-finder') && !flg_career && allow_quick)
        {
          var tmp1 = Object.create(calls.pending[i]);
          tmp1.flg_disp = true;
          tmp1.status = 'available';
          allow_quick = false;
          tmp1.calendlyLink = this.linksMap['career-finder'].plan1;
          quick_tmp = tmp1;
          call_res.available.push(tmp1);
          flg_career = true;
        }
        var endTime = new Date(calls.pending[i].end_time);
        if ( endTime > this.localtime && calls.pending[i].status == 'Pending') {
          var tmp1 = Object.create(calls.pending[i]);
          tmp1.flg_disp = true;
          tmp1.status = 'Pending';
          call_res.pending.push(tmp1);
        }
        else if ( endTime < this.localtime && calls.pending[i].status == 'Pending') {
            var tmp1 = Object.create(calls.pending[i]);
            tmp1.flg_disp = true;
            tmp1.status = 'completed';
            call_res.completed.push(tmp1);
        }
      }
      flg_career = false;
      for (var i = 0; i < calls.completed.length; i ++) {
        if ((calls.completed[i].link == 'quick-chat' || calls.completed[i].link == 'career-finder-intro-1' || calls.completed[i].link == 'career-finder') && !flg_career && allow_quick)
        {
          var tmp1 = Object.create(calls.completed[i]);
          tmp1.flg_disp = true;
          tmp1.status = 'available';
          comAllowquick = true;
          allow_quick = false;
          tmp1.calendlyLink = this.linksMap['career-finder'].plan1;
          comAllow = tmp1;
          call_res.available.push(tmp1);
          flg_career = true;
        }
        var endTime = new Date(calls.completed[i].end_time);
        if ( endTime < this.localtime || calls.completed[i].status == 'Completed' || calls.completed[i].status == 'Canceled') {
          var tmp1 = Object.create(calls.completed[i]);
          tmp1.flg_disp = true;
          tmp1.status = 'Completed';
          call_res.completed.push(tmp1);
        }
      }
    }
    console.log(this.calls);
    for (var i = 0; i < call_res.pending.length; i ++) {
      var time_first =  new Date(call_res.pending[i].start_time);
      call_res.pending[i].order_num = 0;
      for (var j = 0; j < call_res.pending.length; j ++) {
        if (i != j) {
            var time_second = new Date(call_res.pending[j].start_time);

            if (time_first > time_second) {
              call_res.pending[i].order_num = call_res.pending[i].order_num + 1;
            }
          }
        }
    }
    for (var i = 0; i < call_res.completed.length; i ++) {
      var time_first =  new Date(call_res.completed[i].start_time);
      call_res.completed[i].order_num = 0;
      for (var j = 0; j < call_res.completed.length; j ++) {
        if (i != j) {
            var time_second = new Date(call_res.completed[j].start_time);

            if (time_first > time_second) {
              call_res.completed[i].order_num = call_res.completed[i].order_num + 1;
            }
          }
        }
    }
    call_res.pending.sort(this.compare);
    call_res.completed.sort(this.compare);
    this.calls.completed = call_res.completed;
    this.calls.pending = call_res.pending;
    this.calls.available = call_res.available;
  }

  public compare(a,b) {
    if (a.order_num < b.order_num)
      return -1;
    if (a.order_num > b.order_num)
      return 1;
    return 0;
  }


  /**
   * Method to handle http error
   * @param e
   * @private
   */
  private _handleError(e: IErrorResponse): void {
    this.errorMessage = e.message;
  }
}
