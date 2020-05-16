import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { Cart2Component } from "./cart2/cart2.component";
import { AboutComponent } from "./about/about.component";
import { ProductaddComponent } from "./product-add/product-add.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { UserSettingsComponent } from "./user-settings/user-settings.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import {
  canActivate,
  redirectUnauthorizedTo,
  AngularFireAuthGuard,
  redirectLoggedInTo,
} from "@angular/fire/auth-guard";
import { ProfileProductComponent } from "./profile-product/profile-product.component";
import { ProfileProductDetailComponent } from "./profile-product-detail/profile-product-detail.component";
import { LogisticPannelComponent } from "./logistic-pannel/logistic-pannel.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: Cart2Component },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "products", component: ProductsComponent },
  { path: "about", component: AboutComponent },
  { path: "sell", component: ProductaddComponent },
  { path: "products/:productId", component: ProductDetailsComponent },
  { path: "usersettings", component: UserSettingsComponent },
  { path: "userprofile/:userId", component: UserSettingsComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "userproducts", component: ProfileProductComponent },
  {
    path: "userproductsdetail/:productId",
    component: ProfileProductDetailComponent,
  },
  { path: "logistic", component: LogisticPannelComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
