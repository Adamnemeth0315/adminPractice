import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ListingBillComponent } from './page/listing/listing-bill/listing-bill.component';
import { ListingCustomerComponent } from './page/listing/listing-customer/listing-customer.component';
import { ListingProductComponent } from './page/listing/listing-product/listing-product.component';
import { ListingOrderComponent } from './page/listing/listing-order/listing-order.component';
import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { FilterPipe } from './pipe/filter.pipe';
import { EditProductComponent } from './page/edit/edit-product/edit-product.component';
import { SorterPipe } from './pipe/sorter.pipe';
import { EditBillComponent } from './page/edit/edit-bill/edit-bill.component';
import { EditCustomerComponent } from './page/edit/edit-customer/edit-customer.component';
import { EditOrderComponent } from './page/edit/edit-order/edit-order.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListingBillComponent,
    ListingCustomerComponent,
    ListingProductComponent,
    ListingOrderComponent,
    HomeComponent,
    NotFoundComponent,
    FilterPipe,
    EditProductComponent,
    SorterPipe,
    EditBillComponent,
    EditCustomerComponent,
    EditOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
