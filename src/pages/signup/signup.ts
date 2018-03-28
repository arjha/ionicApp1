import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
    private loadingCntrl: LoadingController, private alertCntrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(f: NgForm) {
    const loading = this.loadingCntrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.signup(f.value.email, f.value.password)
      .then(data => {
        loading.dismiss()
      }).catch(err => {
        loading.dismiss();
        const alert = this.alertCntrl.create({
          title:'Signup Failed',
          message:err.message,
          buttons:['Ok']
        });
        alert.present();
      });
  }

}
