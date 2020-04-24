import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AboutComponent } from './about/about.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ProductaddComponent } from './product-add/product-add.component';
import { NavigationbarComponent } from './navigation-bar/navigationbar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ProductPictureComponent } from './product-picture/product-picture.component';
import { Cart2Component } from './cart2/cart2.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { SummaryComponent } from './summary/summary.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProfileProductComponent } from './profile-product/profile-product.component';
import { UserEditProductComponent } from './user-edit-product/user-edit-product.component';
import { ProfileProductDetailComponent } from './profile-product-detail/profile-product-detail.component';
import { SalesFigureComponent } from './sales-figure/sales-figure.component';
registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CarouselComponent,
    ProductsComponent,
    AboutComponent,
    ProductaddComponent,
    NavigationbarComponent,
    ProductDetailsComponent,
    NotFoundComponent,
    UserSettingsComponent,
    ProductPictureComponent,
    Cart2Component,
    CheckoutComponent,
    ShippingAddressComponent,
    SummaryComponent,
    UploadPictureComponent,
    ProfileProductComponent,
    UserEditProductComponent,
    ProfileProductDetailComponent,
    SalesFigureComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [ AngularFireAuthGuardModule, ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AngularFireStorageModule, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
