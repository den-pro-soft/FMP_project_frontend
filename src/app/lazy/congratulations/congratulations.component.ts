import {
  AfterViewInit, Component, OnDestroy, Renderer2, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import {IErrorResponse} from '../../core/models/core.model';
import {REGEX_EMAIL_PATTERN} from '../../core/validators/validation-patterns.model';
import {ShowValidationErrors} from '../../core/validators/show-validation-errors.model'; 
import {MetaTags} from '../../core/services/meta-tags.service';
import {APP_CONFIG} from '../../core/models/app.config';
import {PlatformCheckService} from '../../core/services/platform-check.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {SuccessModalComponent} from '../../modules/success-modal/success-modal.component';
 

@Component({
  selector: 'congratulations-component',
  templateUrl: 'congratulations.component.html',
  styles: [require('./congratulations.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class CongratulationsComponent implements AfterViewInit, OnDestroy {
 

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder, 
              private metaService: MetaTags,
              private domRenderer: Renderer2,
              private platformService: PlatformCheckService,
              private modalService: NgbModal) { 
  
     
  }

  public ngAfterViewInit() {
    
  }

  public ngOnDestroy() { 
  }
  
}