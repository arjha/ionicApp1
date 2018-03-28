import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Action } from "rxjs/scheduler/Action";

@Component({
    selector: 'page-sl-option',
    template: `
        <ion-grid text-center>
            <ion-row>
                <ion-col>
                    <h3>Store & Load</h3>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <button ion-button outline (click)="onAction('load')">Load List</button>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <button ion-button outline color="danger" (click)="onAction('save')">Save List</button>
                </ion-col>
            </ion-row>
        </ion-grid>
    `
})
export class SlOptions {
    constructor(private viewCntrl:ViewController){

    }
    onAction(action){
        this.viewCntrl.dismiss({action:action});
    }
}