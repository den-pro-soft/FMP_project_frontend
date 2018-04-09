import {Component, Directive, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {IResume, IResumePage, IResumeSamples} from "./resume-samples.model";
import {ResumeSamplesService} from "./resume-samples.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'resume-samples',
    templateUrl: './resume-samples.component.html',
    styles: [require('./resume-samples.component.scss').toString()],
    encapsulation: ViewEncapsulation.None
})

@Directive({selector: '[resumeSamplesPage]'})
export class ResumeSamplesComponent implements OnInit, OnDestroy {

    public seniorSamples: Array<IResume> = [];
    public entrySamples: Array<IResume> = [];
    public seniorPage: IResumePage;
    public entryPage: IResumePage;

    public error: any;

    constructor(private resumeService: ResumeSamplesService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.loadResumes();
    }

    ngOnDestroy(): void {
    }

    private loadResumes() {
        this.resumeService.getResumeSamples()
            .subscribe(
                (response: IResumeSamples) => {
                    this.setContent(response);
                },
                (error: any) => this.error = error
            );
    }

    private setContent(content: IResumeSamples){
        if(content){
            this.seniorPage = content.senior.page;
            this.entryPage = content.entry.page;
            this.seniorSamples = content.senior.resumes;
            this.entrySamples = content.entry.resumes;
        }
    }
}
