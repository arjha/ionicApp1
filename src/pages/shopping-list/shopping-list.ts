import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shoppingList';
import { Ingredient } from '../../models/ingredient';
import { SlOptions } from './sl-options/sl-options';
import { AuthService } from '../../services/auth';
import { Token } from '@angular/compiler';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  public listItem: Ingredient[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private slService: ShoppingListService, private popoverCntrl: PopoverController,
    private authService: AuthService, private loadingCntrl: LoadingController,
    private alertCntrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  addItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.ingredientAmount, +new Date());
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

  showOptions(event: MouseEvent) {
    const loading = this.loadingCntrl.create({
      content: 'Please wait...'
    });

    const popover = this.popoverCntrl.create(SlOptions);
    popover.present({ ev: event });
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        loading.present();
        if (data.action === "load") {
          this.authService.getActiveUser().getToken().then(
            (token: Token) => {
              this.slService.fetchList(token).subscribe(
                (list: Ingredient[]) => {
                  loading.dismiss();
                  if (list) {
                    this.listItem = list;
                  } else {
                    this.listItem = [];
                  }
                },
                (error) => {
                  loading.dismiss();
                  this.handleAlert(error.json().error, 'e');
                }
              );
            }
          );
        } else if (data.action === "save") {
          this.authService.getActiveUser().getToken()
            .then(
              (token: Token) => {
                this.slService.storeList(token)
                  .subscribe(
                    () => {
                      loading.dismiss();
                      this.handleAlert('Data saved successfully.', 's');
                    },
                    error => {
                      loading.dismiss();
                      this.handleAlert(error.json().error, 'e');
                    }
                  );
              }
            );
        }
      }
    );
  }

  private handleAlert(error: string, title: string) {
    title = title === 's' ? 'Success!!!' : 'An error occoured';
    const alert = this.alertCntrl.create({
      message: error,
      title: title,
      buttons: ['Ok']
    });
    alert.present();
  }

}
