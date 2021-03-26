import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';
import { StatisticsService } from 'src/app/service/statistics.service';

@Component({
  selector: 'app-listing-customer',
  templateUrl: './listing-customer.component.html',
  styleUrls: ['./listing-customer.component.scss']
})
export class ListingCustomerComponent implements OnInit {

  numberOfAllCustomers$: BehaviorSubject<number> = this.statisticsService
    .numberOfAllCustomers$;

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  cols: ITableCol[] = this.configService.customerTableCols;
  phrase: string = '';
  filterKey: string = 'firstName';
  filterKeys: string[] = Object.keys(new Customer());
  sorterKey: string = '';
  sorterDirection: number = 1;
  selectedCustomerToDelete: Customer = new Customer();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private configService: ConfigService,
    private statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
    this.statisticsService.subscribeForData();
  }
  setToDelete(customer: Customer): void {
    this.selectedCustomerToDelete = customer;
  }

  onRemove(): void {
    this.customerService.remove(this.selectedCustomerToDelete)
      .subscribe(
        () => {
          this.customerService.getAll();
          this.router.navigate(['/customers']);
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
