import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from 'src/app/model/customer';
import { ConfigService, ITableCol } from 'src/app/service/config.service';
import { CustomerService } from 'src/app/service/customer.service';
import { StatisticsService } from 'src/app/service/statistics.service';

interface IPageBtn {
  page: number;
}

@Component({
  selector: 'app-listing-customer',
  templateUrl: './listing-customer.component.html',
  styleUrls: ['./listing-customer.component.scss']
})
export class ListingCustomerComponent implements OnInit {

  //Paginator

  customersNum: number = 0;  //Hány vásárló van összesen
  maxSize: number = 0;
  pageSize: number = 10;  //Oldal méret egy oldalon hány vásárló jelenik meg
  pageStart: number = 1;  //Ez pedig azt mondja meg, hogy a gombok közül melyik az első. 
  currentPage: number = 1; //Jelenleg melyik oldalon vagyok.
  get paginator(): IPageBtn[] {
    const pages: IPageBtn[] = [];
    for (let i = 0; i < this.customersNum / this.pageSize && pages.length < 10; i++) {
      const page = this.pageStart + i;
      pages.push({ page });
    }
    return pages;
  }

  get pageSliceStart(): number {
    const index = this.currentPage - 1;
    return index === 0 ? 0 : (index * this.pageSize)
  }

  get pageSliceEnd(): number {
    return this.pageSliceStart + this.pageSize;
  }



  numberOfAllCustomers$: BehaviorSubject<number> = this.statisticsService
    .numberOfAllCustomers$;

  customerList$: Observable<Customer[]> = this.customerService.list$.pipe(
    tap(customers => this.customersNum = customers.length),
    tap(customers => this.maxSize = Math.round(customers.length / 10))
  );
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

  onPaginate(ev: Event, btn: IPageBtn): void {
    ev.preventDefault();
    this.currentPage = btn.page;
    this.pageStart = (btn.page - 5) < 1 ? 1 : (btn.page - 5);
  }

  onStepPage(ev: Event, step: number): void {
    ev.preventDefault();
    /* const pageNext = document.querySelector('.next');
    if (this.currentPage === 4) {
      pageNext?.classList.add('disabled');
    } else
      pageNext?.classList.remove('disabled'); */
    this.currentPage += step;
    this.pageStart = (this.currentPage - 5) < 1 ? 1 : (this.currentPage - 5);
  }

}
