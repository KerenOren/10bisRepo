import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-content-loader',
    templateUrl: './content-loader.component.html',
    styleUrls: ['./content-loader.component.scss']
})
export class ContentLoaderComponent implements OnInit {
    
    @Input() width = 100;
    @Input() height = 100;

    _showContentIf = true;
    @Input() set showContentIf(value: boolean) {
        this._showContentIf = value;
        if (!this.showContentIf) {
            this.checkForTimeOut();
        }
    }
    
    timeOutCounter = 0;
    TIME_OUT_MAX = 122225;
    userMsg = null;
    showTimeContent = false;

    get showContentIf(): boolean {
        return this._showContentIf;
    }

    constructor() {
    }

    ngOnInit() {
        this.checkForTimeOut();
    }

    checkForTimeOut() {
        let interval;
        this.showTimeContent = false;
        if (!this._showContentIf) {
            interval = setInterval(() => {
                this.timeOutCounter++;

                if (this._showContentIf) {
                    if (this._showContentIf['userMessage']) {
                        this.userMsg = this._showContentIf['userMessage'];
                        this.showTimeContent = false;
                    }
                    clearInterval(interval);
                }
                if (this.timeOutCounter >= this.TIME_OUT_MAX) {
                    this.showTimeContent = true;
                    clearInterval(interval);
                }
            }, 1000);
        }
    }

}