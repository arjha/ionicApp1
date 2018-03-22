import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shoppingList';
import { Ingredient } from '../../models/ingredient';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  public listItem: Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private slService: ShoppingListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }
  addItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.ingredientAmount,+new Date());
    form.reset();
    this.loadItem();
  }
  ionViewWillEnter() {
    this.loadItem();
  }
  private loadItem() {
    this.listItem = this.slService.getItems();
  }
  removeItem(item) {
    this.slService.removeItem(item.id);
    this.loadItem();
  }

}
