import { Ingredient } from "../models/ingredient";

export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    addItem(name: string, amount: number, id: number) {
        this.ingredients.push(new Ingredient(name, amount, id));
        console.log(this.ingredients);
    }
    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }
    getItems() {
        console.log(this.ingredients);
        return this.ingredients.slice();

    }
    removeItem(id: number) {
        let a:number=0;
        let b:any=()=>{
            for (let i = 0; i < this.ingredients.length; i++) {
                if (this.ingredients[i].id === id) {
                  return i;
                }
            }
        }
        a=+b;
        
        this.ingredients.splice(a, 1);
    }
}