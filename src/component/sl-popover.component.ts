import { Component } from "@angular/core";
import { PopoverController } from "ionic-angular";
import { SlOptions } from "../pages/shopping-list/sl-options/sl-options";

@Component({
    selector: '.app-sl-popover',
    template: `
    <ion-buttons end>
    <button ion-button icon-only (click)="showOptions()">
    <ion-icon name="more"></ion-icon>
    </button>
    </ion-buttons>
    `

})
export class SLPopover {
    constructor(private popoverCntrl: PopoverController) { }
    showOptions() {
        const popover = this.popoverCntrl.create(SlOptions);
        popover.present();
    }
}