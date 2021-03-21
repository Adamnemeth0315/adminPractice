import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ITableCol, ConfigService } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-listing-order',
  templateUrl: './listing-order.component.html',
  styleUrls: ['./listing-order.component.scss']
})
export class ListingOrderComponent implements OnInit {

  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  cols: ITableCol[] = this.configService.orderTableCols;
  phrase: string = '';
  filterKey: string = 'amount';
  filterKeys: string[] = Object.keys(new Order());
  sorterKey: string = '';
  sorterDirection: number = 1;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  onRemove(order: Order): void {
    this.orderService.remove(order)
      .subscribe(() => {
        this.orderService.getAll();
        this.router.navigate(['/orders']);
      });
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
