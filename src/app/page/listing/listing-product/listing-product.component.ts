import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ITableCol, ConfigService } from 'src/app/service/config.service';
import { ProductService } from 'src/app/service/product.service';
import { StatisticsService } from 'src/app/service/statistics.service';

@Component({
  selector: 'app-listing-product',
  templateUrl: './listing-product.component.html',
  styleUrls: ['./listing-product.component.scss']
})
export class ListingProductComponent implements OnInit {

  numberOfAllProducts$: BehaviorSubject<number> = this.statisticsService
    .numberOfAllProducts$;

  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  cols: ITableCol[] = this.configService.productTableCols;
  phrase: string = '';
  filterKey: string = 'name';
  filterKeys: string[] = Object.keys(new Product());
  sorterKey: string = '';
  sorterDirection: number = 1;
  selectedProductToDelete: Product = new Product();

  constructor(
    private productService: ProductService,
    private router: Router,
    private configService: ConfigService,
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
    this.statisticsService.subscribeForData();
  }

  setToDelete(product: Product): void {
    this.selectedProductToDelete = product;
  }

  onRemove(): void {
    this.productService.remove(this.selectedProductToDelete)
      .subscribe(
        () => {
          this.productService.getAll();
          this.router.navigate(['/products']);
        })
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onSort(key: string): void {
    if (key === this.sorterKey) {
      this.sorterDirection *= -1;
    } else {
      this.sorterDirection = 1;
    }

    this.sorterKey = key;
  }

}
