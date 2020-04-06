import { Component, OnInit, Input } from '@angular/core';
import { AddressService } from '../../../services/address/address.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Address } from '../../../shared/Address';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-addresses-edit',
  templateUrl: './addresses-edit.component.html',
  styleUrls: ['./addresses-edit.component.sass']
})
export class AddressesEditComponent implements OnInit {
  @Input() address = new Address();
  addresssForm: FormGroup;
  id:number;
  description:string='';
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private api: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    const { description } = this.addresssForm.value;
    this.address = new Address();
    this.id = this.route.snapshot.params['id'];
    this.address.description = description;

    this.api.update(this.id, this.address)
        .subscribe(res => {
          let id = this.id;
          this.isLoadingResults = false;
          this.router.navigate(['/addresses-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  update() {
    this.api.update(this.route.snapshot.params['id'], this.address).subscribe((addresss) => {
      this.router.navigate(['/addresses-details/' + addresss.id]);
    }, (err) => {
      console.log(err);
    });
  }

  remove(id: number) {
    this.api.remove(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/addresses']);
      }, (err) => {
        console.log(err);
      }
    );  
  }

  addressDetails() {
    this.router.navigate(['/addresses-details', this.address.id]);
  }

  ngOnInit() {
    this.api.getById(this.route.snapshot.params['id'])
    .subscribe((address: Address) => {
      console.log(address);
      this.address.id = address.id;
      this.addresssForm.setValue({
        description: address.description
      });
    });

    this.addresssForm = this.formBuilder.group({
      'description' : [null, Validators.required]
    });
  }


}
