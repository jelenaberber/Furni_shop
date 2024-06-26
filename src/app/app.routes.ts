import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout/layout.component";
import {NotFoundComponent} from "./notFound/not-found/not-found.component";

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
      },
      {
        path: "home",
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
      },
      {
        path: "shop",
        loadChildren: () => import("./shop/shop.module").then(m => m.ShopModule)
      },
      {
        path: "aboutUs",
        loadChildren: () => import("./about-us/about-us.module").then(m => m.AboutUsModule)
      },
      {
        path: "support",
        loadChildren: () => import("./support/support.module").then(m => m.SupportModule)
      },
      {
        path: "contact",
        loadChildren: () => import("./contact/contact.module").then(m => m.ContactModule)
      },
      {
        path: "cart",
        loadChildren: () => import("./cart/cart.module").then(m => m.CartModule)
      },
      {
        path: "checkout",
        loadChildren: () => import("./checkout/checkout.module").then(m => m.CheckoutModule)
      },
      {
        path: "thankYou",
        loadChildren: () => import("./thank-you/thank-you.module").then(m => m.ThankYouModule)
      },
      {
        path: "login",
        loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
      },
      {
        path: "register",
        loadChildren: () => import("./register/register.module").then(m => m.RegisterModule)
      },
      {
        path: "adminPanel",
        loadChildren: () => import("./admin-panel/admin-panel.module").then(m => m.AdminPanelModule)
      },
      {
        path: "**",
        pathMatch: "full",
        component: NotFoundComponent,
      },
    ]
  },
];
