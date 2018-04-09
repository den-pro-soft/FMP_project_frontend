import {Component, Input, ViewEncapsulation} from '@angular/core';

import {IUserUpdates} from './updates.model';
import {IJobResponse} from '../../jobs/user-jobs.model';

import {UserJobsService} from '../../jobs/user-jobs.service';
@Component({
  selector: 'fmp-home-updates-component',
  templateUrl: 'updates.html',
  styles: [require('./updates.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class HomeUpdatesComponent {

  @Input()
  updates: IUserUpdates;

  public added_days: number = 0;
  constructor(private jobsService: UserJobsService) {
	
	this.jobsService.getJobs('liked',0)
	.subscribe(
	(response: IJobResponse) => {
	  this.added_days =  response.last_active_days ? response.last_active_days : 1;
	}); 
  }
 
}