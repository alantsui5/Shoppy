import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadPictureComponent } from './upload-picture.component';

describe('UploadPictureComponent', () => {
  let component: UploadPictureComponent;
  let fixture: ComponentFixture<UploadPictureComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
