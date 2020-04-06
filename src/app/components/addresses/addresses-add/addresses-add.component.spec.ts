import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresssAddComponent } from './addresses-add.component';

describe('AddresssAddComponent', () => {
  let component: AddresssAddComponent;
  let fixture: ComponentFixture<AddresssAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresssAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresssAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
