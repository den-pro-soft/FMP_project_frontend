import {Component} from '@angular/core'; 
import {ActivatedRoute, Router} from '@angular/router';
import {BACK_URL} from '../../../main.config'

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html'
})

export class AdminComponent { 
  constructor(private route: ActivatedRoute){
    window.location.href=`${BACK_URL}/admin`
  }
}