import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

export class RecipiesService {
    private recipe: Recipe[] = [];

    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
        this.recipe.push(new Recipe(title, description, difficulty, ingredients));
    }
    getRecipe() {
        console.log(this.recipe.slice());
        return this.recipe.slice();
    }
    updateRecipe(index: number, title: string, description: string, difficulty: string,
        ingredients: Ingredient[]) {
        this.recipe[index] = new Recipe(title, description, difficulty, ingredients);
    }
    removeRecipe(index: number) {
        this.recipe.splice(index, 1);
    }
}