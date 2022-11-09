import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor() {}

  public saveCanvasAsFile(canvas: HTMLCanvasElement, name: string): void {
    const canvasDataUrl = canvas
      .toDataURL()
      .replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    const link = document.createElement('a'); // create an anchor tag

    link.setAttribute('href', canvasDataUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('download', name);

    if (document.createEvent) {
      const evtObj = document.createEvent('MouseEvents');
      evtObj.initEvent('click', true, true);
      link.dispatchEvent(evtObj);
    } else if (link.click) {
      link.click();
    }
  }
}
