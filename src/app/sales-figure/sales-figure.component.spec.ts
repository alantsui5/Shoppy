import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFigureComponent } from './sales-figure.component';

describe('SalesFigureComponent', () => {
  let component: SalesFigureComponent;
  let fixture: ComponentFixture<SalesFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
