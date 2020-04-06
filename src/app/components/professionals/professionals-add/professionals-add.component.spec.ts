import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalAddComponent } from './professionals-add.component';

describe('ProfessionalAddComponent', () => {
  let component: ProfessionalAddComponent;
  let fixture: ComponentFixture<ProfessionalAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
