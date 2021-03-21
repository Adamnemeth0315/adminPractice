import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-listing-customer',
  templateUrl: './listing-customer.component.html',
  styleUrls: ['./listing-customer.component.scss']
})
export class ListingCustomerComponent implements OnInit {

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  cols: ITableCol[] = this.configService.customerTableCols;
  phrase: string = '';
  filterKey: string = 'firstName';
  filterKeys: string[] = Object.keys(new Customer());
  sorterKey: string = '';
  sorterDirection: number = 1;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
  }

  onRemove(customer: Customer): void {
    this.customerService.remove(customer)
      .subscribe(() => {
        this.customerService.getAll();
        this.router.navigate(['/customers']);
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
