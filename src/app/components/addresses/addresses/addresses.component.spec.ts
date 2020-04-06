import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresssComponent } from './addresses.component';

describe('AddresssComponent', () => {
  let component: AddresssComponent;
  let fixture: ComponentFixture<AddresssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
