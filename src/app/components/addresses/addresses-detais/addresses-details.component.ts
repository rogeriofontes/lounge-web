import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../services/address/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/shared/Address';

@Component({
  selector: 'app-addresses-details',
  templateUrl: './addresses-details.component.html',
  styleUrls: ['./addresses-details.component.sass']
})
export class AddressesDetailsComponent implements OnInit {

  address = new Address();
  id: number;
  name: string;
  isLoadingResults = true;
  constructor(private api: AddressService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.api.getById(id).subscribe((address: Address) => {
      console.log(address);
      this.address = address;
      this.isLoadingResults = false;
    });
  }
}
