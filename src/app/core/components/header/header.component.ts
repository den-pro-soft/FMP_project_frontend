//tuoi69
import {
    Component, Input, EventEmitter, Output, OnChanges, OnDestroy, ViewEncapsulation, ViewChild
} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {UserService} from '../../services/user.service';
import {IUser} from '../../models/user.model';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {IArticleType} from "../../../lazy/career-advice/career-advice.model";
require('../../../../assets/images/logo-blue.png');
require('../../../../assets/images/logo-light.png');

@Component({
  selector: 'fmp-header-component',
  templateUrl: 'header.component.html',
  styles: [require('./styles/header.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnDestroy, OnChanges {

  @ViewChild('searchInputBox')
  searchInputBox: any;

  @Input()
  isAppLoading: boolean = true;

  @Output()
  onSearchArticle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  isScrolled: boolean = false;

  @Input()
  scrolledStop: boolean = false;

  @Input()
  isCareerAdvicePage: boolean = false;

  @Input()
  isHomeUrl: boolean;

  public isHome: boolean = false;
  public transition: boolean = false;
  public isQuoteClosed: boolean = false;
  public isUserAuth: boolean;
  public user: IUser;
  public menuState: boolean = false;
  public dropdownState: boolean = false;
  private menuMask: boolean = true;

  public isHeaderAlive: boolean = true;
  public isSearch: boolean = false;
  private destroyed$: Subject<any> = new Subject<any>();
  
  private searchStr: string = '';

  public articleCategories: Array<IArticleType> = [
      {
          title: 'All Articles',
          link: 'career-advice'
      },
      {
          title: 'LinkedIn',
          link: 'linkedin'
      },
      {
          title: 'Resume + Cover Letter',
          link: 'resume-cover-letter'
      },
      {
          title: 'Interviewing',
          link: 'interviewing'
      },
      {
          title: 'Job Search',
          link: 'job-search'
      }
  ];

    public serviceTypes: Array<IArticleType> = [
        {
            title: 'Career Finder',
            link: 'career-finder'
        },
        {
            title: 'Resume Makeover',
            link: 'resume-makeover'
        },
        {
            title: 'Cover Letter Service',
            link: 'cover-letter-service'
        },
        {
            title: 'LinkedIn Profile Makeover',
            link: 'linkedin-profile-makeover'
        },
        {
            title: 'Job Interview Prep',
            link: 'job-interview-prep'
        }
    ];


    public ngOnChanges() {
    this.menuState = false;
  }

  public toggleMenu(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }

    this.menuState = !this.menuState;
    
  } 

  public closeMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuState = false;
  }

  public showDropDown(openDropDown: NgbDropdown): void {
    if (openDropDown ) { 
      openDropDown.open();
      this.menuMask = true;
    }
  }

  public openDropDown(openDropDown: NgbDropdown): void {
    if (openDropDown && this.menuMask) { 
      openDropDown.open();
    }
  }

  public closeDropDown(openDropDown: NgbDropdown): void {
    if (openDropDown) { 
      openDropDown.close();
    }
  }

  public hideDropDown(openDropDown: NgbDropdown): void {
    if (openDropDown) { 
      this.menuMask = false;
      openDropDown.close();
    }
  }

  public toggleDropdown(): void {
    this.dropdownState = !this.dropdownState; 
  }

  constructor(private router: Router,
              private userService: UserService) {
    this.userService.isAuth$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: boolean) => this.isUserAuth = state
      );

    this.userService.user$
      .takeUntil(this.destroyed$)
      .subscribe(
        (user: IUser) => this.user = user
      );

    this.router.events
      .takeUntil(this.destroyed$)
      .filter((event) => event instanceof NavigationEnd)
      .subscribe(
        (event: NavigationEnd) => this.isHome = event.urlAfterRedirects === '/'
      );
  }

  public logOut(): void {
    this.userService.logOut();    
    localStorage.setItem('career-finder-intro-1', 'show');
  }

  public openHome(): void {
    this.menuState = false;
    if (this.isUserAuth) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }

  public searchBar(): void {
    this.isSearch = !this.isSearch;
    this.onSearchArticle.emit( this.isSearch );
    if( this.isSearch )
    {
      this.searchStr = '';
      if (this.searchInputBox && this.searchInputBox.nativeElement)
        (<HTMLButtonElement>this.searchInputBox.nativeElement).focus();
    }
  }

  public keyEntered(event: KeyboardEvent): any {
    if (event.key === 'Enter') {
      this.searchBlog();
    }
  }

  public searchBlog(): void {
    this.router.navigate(['/career-advice'], { queryParams: { searchStr:  this.searchStr}});
    this.isSearch = false;
  }

  public reOpenPage(): void{
    this.router.navigate(['/career-advice']);
    window.scrollTo(0, 0);
  }
  /**
   * There are page where no header (Checkout page)
   */
  public ngOnDestroy(): void {
    this.isHeaderAlive = false;
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public openLink(url: string): void{
      if(url){
          this.router.navigate([url]);
      }
  }


}
