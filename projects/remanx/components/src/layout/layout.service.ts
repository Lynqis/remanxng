import { Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  readonly state = {
    sidebarVisible: signal(false),
    sidebarShrink: signal(false),
    isShrink: signal(false),
  }

  toggleSidebar() {
    if (!this.state.sidebarShrink()) {
      this.setSidebarVisible(!this.state.sidebarVisible());
    } else {
      this.setIsShrink(!this.state.isShrink());
    }
  }

  getSidebarVisible() {
    return this.state.sidebarVisible();
  }

  setSidebarVisible(value: boolean) {
    this.state.sidebarVisible.set(value);
  }

  getSidebarShrink() {
    return this.state.sidebarShrink();
  }

  setSidebarShrink(value: boolean) {
    this.state.sidebarShrink.set(value);
  }

  getIsShrink() {
    return this.state.isShrink();
  }

  setIsShrink(value: boolean) {
    this.state.isShrink.set(value);
  }
}
