import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';

@Component({
  selector: 'app-listing-bill',
  templateUrl: './listing-bill.component.html',
  styleUrls: ['./listing-bill.component.scss']
})
export class ListingBillComponent implements OnInit {

  @Input() id: number = 0;

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  cols: ITableCol[] = this.configService.billTableCols;

  constructor(
    private billService: BillService,
    private router: Router,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
  }

  onRemove(bill: Bill): void {
    this.billService.remove(bill)
      .subscribe(() => {
        this.billService.getAll();
        this.router.navigate(['/bills']);
      });
  }

}
