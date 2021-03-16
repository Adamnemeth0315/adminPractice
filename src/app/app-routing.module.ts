import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingCustomerComponent } from './page/listing/listing-customer/listing-customer.component';
import { ListingOrderComponent } from './page/listing/listing-order/listing-order.component';
import { ListingProductComponent } from './page/listing/listing-product/listing-product.component';
import { ListingBillComponent } from './page/listing/listing-bill/listing-bill.component';

import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { EditProductComponent } from './page/edit/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'bills',
    component: ListingBillComponent
  },
  {
    path: 'customers',
    component: ListingCustomerComponent
  },
  {
    path: 'products',
    component: ListingProductComponent
  },
  {
    path: 'products/:id',
    component: EditProductComponent
  },
  {
    path: 'orders',
    component: ListingOrderComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
