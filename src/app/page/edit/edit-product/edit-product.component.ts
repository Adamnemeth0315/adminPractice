import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();
  productId: number = 0;
  updating: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => this.productId = params.id
    );
    this.productService.get(this.productId).subscribe(
      product => this.product = product
    );
  }

  setProductToDatabase(product: Product): void {
    this.updating = true;
    product.catId = Number(product.catId);
    if (product.id === 0) {
      this.productService.create(product).subscribe(
        () => {
          this.updating = false;
          this.router.navigate(['products']);
        }
      );
    } else {
      this.productService.update(product).subscribe(
        () => {
          this.updating = false;
          this.router.navigate(['products']);
        }
      );
    }
  }

}
