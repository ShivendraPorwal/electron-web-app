import { Component } from '@angular/core';
import { ElectronService } from 'shared/services';

@Component({
  selector: 'shared-download-progress',
  templateUrl: './download-progress.component.html',
  styleUrls: ['./download-progress.component.scss'],
})
export class DownloadProgressComponent {
  downloadProgress: number = 0;
  transferred: number = 0;
  total: number = 0;
  speed: number = 0;

  constructor(private electronService: ElectronService) {}

  ngOnInit() {
    this.initProgress();
  }

  initProgress = () => {
    // Subscribe to download progress updates
    this.electronService.getDownloadProgress().subscribe((progress) => {
      this.downloadProgress = progress.percent;
      this.transferred = progress.transferred;
      this.total = progress.total;
      this.speed = progress.speed;
    });
  };
}
