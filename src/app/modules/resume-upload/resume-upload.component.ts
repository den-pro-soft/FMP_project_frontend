import {Component, OnInit, Renderer2, ViewEncapsulation} from "@angular/core";

@Component({
    selector: 'fmp-resume-upload-component',
    templateUrl: 'resume-upload.html',
    styles: [require('./resume-upload.scss').toString()],
    encapsulation: ViewEncapsulation.None
})

export class ResumeUploadComponent implements OnInit {


    constructor(private domRenderer: Renderer2) {}


    public ngOnInit(): void {
        this.loadRequiredScript();
        this.loadCritiqueScript();
    }

    private loadRequiredScript(): void {
        if (window) {
            const script: HTMLScriptElement = this.domRenderer.createElement('script');
            script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
            script.async = false;
            script.onload = () => {
                console.log('Required scripts loaded successfully.');
            };
            document.body.appendChild(script);
        }
    }

    private loadCritiqueScript(): void {
        if (window) {
            const script: HTMLScriptElement = this.domRenderer.createElement('script');
            script.src = 'https://widgets.talentinc.com/critique/v1/?partner_key=tYEyR0zYCkn9H&utm_source=testcampaign';
            script.async = false;
            script.onload = () => {
                console.log('Critique script loaded successfully.');
            };
            document.body.appendChild(script);
        }
    }
}