import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer: Customer = new Customer();
  customerId: number = 0;
  updating: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => this.customerId = params.id
    );
    this.customerService.get(this.customerId).subscribe(
      customer => this.customer = customer
    );
  }

  setCustomerToDatabase(customer: Customer): void {
    this.updating = true;
    if (customer.id === 0) {
      this.customerService.create(customer).subscribe(
        () => {
          this.updating = false;
          this.router.navigate(['customers']);
        }
      );
    } else {
      this.customerService.update(customer).subscribe(
        () => {
          this.updating = false;
          this.router.navigate(['customers']);
        }
      );
    }
  }
}
