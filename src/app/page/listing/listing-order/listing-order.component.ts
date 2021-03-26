import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ITableCol, ConfigService } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';
import { StatisticsService } from 'src/app/service/statistics.service';

@Component({
  selector: 'app-listing-order',
  templateUrl: './listing-order.component.html',
  styleUrls: ['./listing-order.component.scss']
})
export class ListingOrderComponent implements OnInit {

  numberOfAllOrders$: BehaviorSubject<number> = this.statisticsService
    .numberOfAllOrders$;

  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  cols: ITableCol[] = this.configService.orderTableCols;
  phrase: string = '';
  filterKey: string = 'amount';
  filterKeys: string[] = Object.keys(new Order());
  sorterKey: string = '';
  sorterDirection: number = 1;
  selectedOrderToDelete: Order = new Order();

  constructor(
    private orderService: OrderService,
    private router: Router,
    private configService: ConfigService,
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
    this.statisticsService.subscribeForData();
  }

  setToDelete(order: Order): void {
    this.selectedOrderToDelete = order;
  }

  onRemove(): void {
    this.orderService.remove(this.selectedOrderToDelete)
      .subscribe(
        () => {
          this.orderService.getAll();
          this.router.navigate(['/orders']);
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
