import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticPannelComponent } from './logistic-pannel.component';

describe('LogisticPannelComponent', () => {
  let component: LogisticPannelComponent;
  let fixture: ComponentFixture<LogisticPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
