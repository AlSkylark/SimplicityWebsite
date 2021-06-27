import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    //override hammerjs default config
    'swipe': { direction: Hammer.DIRECTION_HORIZONTAL } 
  }
}

export const firebaseConfig = {
  apiKey: "AIzaSyAk0YRHZ1UKRiyTm6TAeoYqR-_hgAVa1YU",
  authDomain: "simplicitywebapp.firebaseapp.com",
  databaseURL: "https://simplicitywebapp-default-rtdb.firebaseio.com",
  projectId: "simplicitywebapp",
  storageBucket: "simplicitywebapp.appspot.com",
  messagingSenderId: "325175642532",
  appId: "1:325175642532:web:e0750c355bcad04549d931",
  measurementId: "G-ZV0181BWFX"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    HammerModule
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: CustomHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
