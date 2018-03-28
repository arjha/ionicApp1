import { Ingredient } from "../models/ingredient";
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Token } from "@angular/compiler";
import { AuthService } from "./auth";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor(private http:Http, private authService:AuthService){}

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
    storeList(token:Token){
        const userId=this.authService.getActiveUser().uid;
        return this.http.put('https://ionapp3.firebaseio.com/'+userId+'/shpooing-list.json?auth='+token
        ,this.ingredients)
        .map((response:Response)=>{
            return response.json();
        });
    }
    fetchList(token:Token){
        const userId=this.authService.getActiveUser().uid;
        return this.http.get('https://ionapp3.firebaseio.com/'+userId+'/shpooing-list.json?auth='+token
        ).map((response:Response)=>{
            return response.json();
        }).do((data)=>{
            this.ingredients=data;
        });
    }
}