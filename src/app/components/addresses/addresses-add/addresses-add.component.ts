import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../services/address/address.service';
import { Address } from '../../../shared/Address';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-addresses-add',
  templateUrl: './addresses-add.component.html',
  styleUrls: ['./addresses-add.component.sass']
})
export class AddressesAddComponent implements OnInit {

  @Input() address = new Address();
  addresssForm: FormGroup;
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();
  
  constructor(private api: AddressService, 
              private router: Router,
              private formBuilder: FormBuilder) { }
  
onFormSubmit(form:NgForm) {
  this.isLoadingResults = true;
  
  const { description } = this.addresssForm.value;
  this.address = new Address();
  this.address.description = description;

  this.api.add(this.address)
    .subscribe(res => {
        console.log(res);
        let id = res['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/addresses-details', id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  } 

  add() {
    this.api.add(this.address).subscribe((res) => {
      this.router.navigate['/addresses'];
    }, (err) => {
        console.log(err);
    });
  }
  
  ngOnInit() {
    this.addresssForm = this.formBuilder.group({
      'description' : [null, Validators.required]
    });
  }
}
