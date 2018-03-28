import { Component } from "@angular/core";

@Component({
    selector: 'app-ingredient',
    template: `
    <div [formGroup]="recipeForm">
          <ion-label floating>Name</ion-label>
          <ion-input type="text" formControlName="name"></ion-input>
    </div>
    `
})
export class IngredientComponent {

}