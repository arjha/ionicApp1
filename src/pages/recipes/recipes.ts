import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipiesService } from '../../services/recipes';
import { RecipePage } from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  public recipes: Recipe[]=[];

  constructor (private navCtrl: NavController, private recipesService: RecipiesService) {}

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {
      mode: 'New'
    });
  }

  viewRecipe(recipe,i) {
  this.navCtrl.push(RecipePage,{recipe:recipe,index:i});
  }

}
