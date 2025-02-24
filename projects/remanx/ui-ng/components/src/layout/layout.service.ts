import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  sidebarVisible = signal(false);
  sidebarShrink = signal(false);
  isShrink = signal(false);

  toggleSidebar() {
    if (!this.sidebarShrink()) {
      this.setSidebarVisible(!this.sidebarVisible());
    } else {
      this.setIsShrink(!this.isShrink());
    }
  }

  setSidebarVisible(value: boolean) {
    this.sidebarVisible.set(value);
  }

  setSidebarShrink(value: boolean) {
    this.sidebarShrink.set(value);
  }

  setIsShrink(value: boolean) {
    this.isShrink.set(value);
  }
}
