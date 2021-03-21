import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingCustomerComponent } from './page/listing/listing-customer/listing-customer.component';
import { ListingOrderComponent } from './page/listing/listing-order/listing-order.component';
import { ListingProductComponent } from './page/listing/listing-product/listing-product.component';
import { ListingBillComponent } from './page/listing/listing-bill/listing-bill.component';

import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { EditProductComponent } from './page/edit/edit-product/edit-product.component';
import { EditBillComponent } from './page/edit/edit-bill/edit-bill.component';
import { EditCustomerComponent } from './page/edit/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/edit/edit-order/edit-order.component';

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
    path: 'bills/:id',
    component: EditBillComponent
  },
  {
    path: 'customers',
    component: ListingCustomerComponent
  },
  {
    path: 'customers/:id',
    component: EditCustomerComponent
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
    path: 'orders/:id',
    component: EditOrderComponent
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
