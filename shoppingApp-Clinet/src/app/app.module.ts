import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component';
import { appRoutes } from '../app/routes';
import { NavBarComponent } from '../app/nav-bar/nav-bar.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { AuthService } from '../app/services/auth.service';
import { AlertifyService } from '../app/services/alertify.service';
import { RegisterComponent } from '../app/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HasRoleDirective } from '../app/shared/directives/hasRole.directive';
import { UserService } from '../app/member/service/user.service';
import { UniqueUserNameDirective } from '../app/shared/directives/uniqueUserName.directive';
import { ProductCardComponent } from '../app/products/components/product-card/product-card.component';
import { ProductDetailsComponent } from '../app/products/components/product-details/product-details.component';
import { ProductsListComponent } from '../app/products/components/products-list/products-list.component';
import { CategoryCardComponent } from '../app/categories/components/category-card/category-card.component';
import { CategoryListComponent } from '../app/categories/components/category-list/category-list.component';
import { CategoryandproductService } from '../app/products/service/product.service';
import { JwtModule } from '@auth0/angular-jwt';
import { CheckoutComponent } from '../app/cart/components/checkout/checkout.component';
import { CartService } from '../app/cart/services/cart.service';
import { ItemDetailsComponent } from '../app/cart/components/items/item-details/item-details.component';
import { ItemListComponent } from '../app/cart/components/items/item-list/item-list.component';
import { ItemEditComponent } from '../app/cart/components/items/item-edit/item-edit.component';
import { OrderDetailsComponent } from '../app/cart/components/order/order-details/order-details.component';
import { OrderDetailsResolver } from '../app/cart/resolvers/order-details.resolver';
import { MessageService } from '../app/services/message.service';

import { AdminNavComponent } from '../app/admin/components/admin-nav/admin-nav.component';
import { AdminProductsMangementComponent } from '../app/admin/components/admin-products-mangement/admin-products-mangement.component';
import { PhotoMangementComponent } from '../app/admin/components/photo-mangement/photo-mangement.component';
import { UserListComponent } from '../app/admin/components/user-list/user-list.component';
import { UsersMangementComponent } from '../app/admin/components/users-mangement/users-mangement.component';
import { CategoriesMangementComponent } from '../app/admin/components/categories-mangement/categories-mangement.component';
import { CategoryService } from '../app/categories/services/category.service';
import { OrderEditComponent } from '../app/cart/components/order/order-edit/order-edit.component';
import { ProductDetailsResolver } from '../app/products/resolvers/product-details.resolver';
import { ProductListResolver } from '../app/products/resolvers/product-list.resolver';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './guards/auth.interceptor';
import { AboutusComponent } from './aboutus/aboutus.component';



export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
      NavBarComponent,
      RegisterComponent,
      HasRoleDirective,
      UniqueUserNameDirective,
      ProductCardComponent,
      ProductDetailsComponent,
      ProductsListComponent,
      CategoryCardComponent,
      CategoryListComponent,
      CheckoutComponent,
      ItemDetailsComponent,
      ItemListComponent,
      ItemEditComponent,
      OrderDetailsComponent,
      OrderEditComponent,
      AdminNavComponent,
      AdminProductsMangementComponent,
      PhotoMangementComponent,
      UserListComponent,
      UsersMangementComponent,
      CategoriesMangementComponent,
      HomeComponent,
      AboutusComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CreditCardDirectivesModule,
    BsDropdownModule.forRoot(),
    JwtModule.forRoot({
      config: {
         tokenGetter,
         allowedDomains: ['localhost:3000'],
         disallowedRoutes: ['localhost:3000/api/auth']
      }
   })
  ],
  providers: [
    AuthGuard,
    AuthService,
    AlertifyService,
    UserService,
    CategoryandproductService,
    ProductListResolver,
    ProductDetailsResolver,
    CartService,
    OrderDetailsResolver,
    MessageService,
    CategoryService,
    {provide: HTTP_INTERCEPTORS , useClass:AuthInterceptor , multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
