import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  order: Order = new Order();
  orderId: number = 0;
  updating: boolean = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => this.orderId = params.id
    );
    this.orderService.get(this.orderId).subscribe(
      order => this.order = order
    );
  }

  setOrderToDatabase(order: Order): void {
    this.updating = true;
    if (order.id === 0) {
      this.orderService.create(order).subscribe(
        () => {
          this.updating = false;
          this.router.navigate(['orders']);
        }
      );
    } else {
      this.orderService.update(order).subscribe(
        () => {
          this.updating = false;
          this.router.navigate(['orders']);
        }
      );
    }
  }
}
