import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { ProductComponent } from './product/product.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { SellerDashboardComponent } from './customer/seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { AdminAuthGuardService, AuthGuardLogin, BuyerAuthGuardService, SellerAuthGuardService, SellerBuyerAuthGuardService } from './shared/services/auth-guard.service';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "my-profile", component: UserProfileComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "header", component: HeaderComponent},
  {
    path: "", canActivate:[AuthGuardLogin], children: [
      { path: "admin-login", component: AdminLoginComponent }
    ]
  },
  {
    path: "", canActivate:[AdminAuthGuardService], children: [
      { path: "admin-dashboard", component: AdminDashboardComponent },
      { path: "admin/user", component: UserCrudComponent },
      { path: "admin/product", component: ProductComponent }
    ]
  },
  {
    path: "", canActivate:[SellerBuyerAuthGuardService], children: [
      { path: "sign-in", component: SigninSignupComponent },
      { path: "sign-up", component: SigninSignupComponent },
    ]
  },
  {
    path: "", canActivate:[SellerAuthGuardService],children: [
      { path: "seller-dashboard", component: SellerDashboardComponent },
      { path: "seller/product", component: ProductComponent },
    ]
  },
  {
    path: "", canActivate:[BuyerAuthGuardService], children: [
      { path: "buyer-dashboard", component: BuyerDashboardComponent },
      { path: "checkout", component: CheckoutComponent },
    ]
  },
  { path: "**", component:PageNotFoundComponent }
];
