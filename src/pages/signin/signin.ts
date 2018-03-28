import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
    private alertCntrl: AlertController, private loadingCntrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  onSignin(f: NgForm) {
    const loading = this.loadingCntrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authService.signin(f.value.email, f.value.password)
      .then(data => {
        loading.dismiss();
    
      })
      .catch(err => {
        loading.dismiss();
        const alert = this.alertCntrl.create({
          message: err.message,
          title: 'Signin Falied',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
