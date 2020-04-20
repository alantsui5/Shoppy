import { Component } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-product-picture',
  templateUrl: './product-picture.component.html',
  styleUrls: ['./product-picture.component.css']
})
export class ProductPictureComponent {
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  fileList = [

  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor() { }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };
}
