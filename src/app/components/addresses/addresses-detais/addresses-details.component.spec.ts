import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresssDetailsComponent } from './addresses-details.component';

describe('AddresssDetailsComponent', () => {
  let component: AddresssDetailsComponent;
  let fixture: ComponentFixture<AddresssDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresssDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresssDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
