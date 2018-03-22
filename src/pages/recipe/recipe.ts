import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shoppingList';
import { RecipiesService } from '../../services/recipes';


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  public recipe: Recipe;
  public index: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private shoppingListService: ShoppingListService, private toastCntrl: ToastController,
    private recipeService: RecipiesService) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index })
  }

  addIngredient() {
    this.shoppingListService.addItems(this.recipe.ingredients);
    const toast = this.toastCntrl.create({
      message: 'Added successfully.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
