import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ITableCol, ConfigService } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-listing-product',
  templateUrl: './listing-product.component.html',
  styleUrls: ['./listing-product.component.scss']
})
export class ListingProductComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  cols: ITableCol[] = this.configService.productTableCols;

  constructor(
    private productService: ProductService,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  onRemove(product: Product): void {
    this.productService.remove(product)
      .subscribe(() => {
        this.productService.getAll();
        this.router.navigate(['/products']);
      })
  }

}