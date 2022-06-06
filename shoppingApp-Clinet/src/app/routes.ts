import { Routes } from "@angular/router";
import { AdminNavComponent } from "./admin/components/admin-nav/admin-nav.component";
import { AdminProductsMangementComponent } from "./admin/components/admin-products-mangement/admin-products-mangement.component";
import { CategoriesMangementComponent } from "./admin/components/categories-mangement/categories-mangement.component";
import { PhotoMangementComponent } from "./admin/components/photo-mangement/photo-mangement.component";
import { UserListComponent } from "./admin/components/user-list/user-list.component";
import { UsersMangementComponent } from "./admin/components/users-mangement/users-mangement.component";
import { CheckoutComponent } from "./cart/components/checkout/checkout.component";
import { OrderDetailsComponent } from "./cart/components/order/order-details/order-details.component";
import { CategoryListComponent } from "./categories/components/category-list/category-list.component";
import { ProductDetailsComponent } from "./products/components/product-details/product-details.component";
import { ProductsListComponent } from "./products/components/products-list/products-list.component";

import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./guards/auth.guard";
import { OrderDetailsResolver } from "./cart/resolvers/order-details.resolver";
import { ProductListResolver } from "src/app/products/resolvers/product-list.resolver";
import { ProductDetailsResolver } from "src/app/products/resolvers/product-details.resolver";
import { HomeComponent } from "./home/home.component";
import { AboutusComponent } from "./aboutus/aboutus.component";







export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path:'aboutus' ,component:AboutusComponent},
  {path:'sinup' ,component:RegisterComponent},

   {path: '',
  runGuardsAndResolvers: 'always',
  canActivate : [AuthGuard],
  children: [
      {path: 'categorylist',
            children: [
              {path:'' , component:CategoryListComponent},
              {path:':id' ,
                  children:[
                    {path:'products' ,
                  children: [
                    {path:'', component:ProductsListComponent , resolve: {products: ProductListResolver}},
                    {path:':productId',component:ProductDetailsComponent , resolve: {product:ProductDetailsResolver}}
                  ]}
                  ]}
            ]},
            {path:'cart' ,
                children:[
                  {path:'' , component:OrderDetailsComponent , resolve: {order:OrderDetailsResolver}},
                  {path:':id' ,component:CheckoutComponent}
                ]
            },
            {path:'admin' ,  component: AdminNavComponent , children: [
              { path: '', redirectTo: 'productsmangement', pathMatch: 'full' },
              {path: 'productsmangement' , component: AdminProductsMangementComponent, data: {roles: ['Admin', 'Moderator']}},
              {path: 'photoAproval', component: PhotoMangementComponent , data: {roles: ['Admin', 'Moderator']}},
              {path: 'userslist', component: UserListComponent , data: {roles: ['Admin', 'Moderator']}},
              { path: 'userRoles', component: UsersMangementComponent , data: {roles: ['Admin']}},
              {path: 'categorylist', component: CategoriesMangementComponent , data: {roles: ['Admin', 'Moderator']}}
            ]}





  ]
  },

  {path: '**', redirectTo: '', pathMatch: 'full'}
];
