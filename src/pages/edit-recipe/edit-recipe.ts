import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { RecipiesService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode: string = "New";
  selectOption: Array<String> = ['Easy', 'Medium', 'hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionCntrl: ActionSheetController, private alertCntrl: AlertController,
    private toastCntrl: ToastController, private recipeService: RecipiesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode === "Edit") {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  private initializeForm() {
    let title = 'Ashu';
    let description = 'Jha';
    let difficulty = 'Medium';
    let ingredients = [];
    if (this.mode === "Edit") {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let i of this.recipe.ingredients) {
        ingredients.push(new FormControl(i.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onSubmit() {
    const val = this.recipeForm.value;
    let ingr = [];
    if (val.ingredients.length > 0) {
      ingr = val.ingredients.map(name => {
        return { name: name, amount: 1, id: Math.floor(Math.random() * 100) };
      });
    }
    if(this.mode==="Edit"){
      this.recipeService.updateRecipe(this.index,val.title, val.description, val.difficulty, ingr);
    }else{
      this.recipeService.addRecipe(val.title, val.description, val.difficulty, ingr);
    }
    
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  mngIngr() {
    const aSheet = this.actionCntrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert();
          }

        }, {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len: number = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }

              const toast = this.toastCntrl.create({
                message: 'Removed successfully.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    aSheet.present();

  }

  private createNewIngredientAlert() {
    const newIngredientAlert = this.alertCntrl.create({
      title: 'Add Ingredint',
      inputs: [{
        name: 'name',
        placeholder: 'Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Add',
        handler: data => {
          if (data.name.trim() === "" || data.name === null) {
            const toast = this.toastCntrl.create({
              message: 'Please enter a valid value!',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
            return;
          } else {
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name,
              Validators.required));
            const toast = this.toastCntrl.create({
              message: 'Item successfully added.',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      }]
    });
    newIngredientAlert.present();
  }



}
