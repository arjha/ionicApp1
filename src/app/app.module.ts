import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { RecipePage } from '../pages/recipe/recipe';
import { RecipesPage } from '../pages/recipes/recipes';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListService } from '../services/shoppingList';
import { RecipiesService } from '../services/recipes';
import { IngredientComponent } from '../component/ingredients.component';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { sideMenu } from '../component/menu.component';
import { AuthService } from '../services/auth';
import { SLPopover } from '../component/sl-popover.component';
import { SlOptions } from '../pages/shopping-list/sl-options/sl-options';


@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    IngredientComponent,
    SigninPage,
    SignupPage,
    SlOptions,
    sideMenu,
    SLPopover
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptions
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipiesService,
    AuthService,
    
  ]
})
export class AppModule {}
