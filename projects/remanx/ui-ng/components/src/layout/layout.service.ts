import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  // sidebarShrink: boolean = false;

  private sidebarVisibleSubject = new BehaviorSubject<boolean>(false);
  private sidebarShrinkSubject = new BehaviorSubject<boolean>(false);
  private isShrinkSubject = new BehaviorSubject<boolean>(false);

  sidebarVisible$ = this.sidebarVisibleSubject.asObservable();
  sidebarShrink$ = this.sidebarShrinkSubject.asObservable();
  isShrink$ = this.isShrinkSubject.asObservable();

  toggleSidebar() {
    console.log(this.sidebarShrink)
    if (!this.sidebarShrink) {
      this.setSidebarVisible(!this.sidebarVisibleSubject.value);
    } else {
      this.setIsShrink(!this.isShrinkSubject.value);
    }
  }

  setSidebarVisible(value: boolean) {
    this.sidebarVisibleSubject.next(value);
  }

  setSidebarShrink(value: boolean) {
    this.sidebarShrinkSubject.next(value);
  }

  setIsShrink(value: boolean) {
    this.isShrinkSubject.next(value);
  }

  get sidebarVisible(): boolean {
    return this.sidebarVisibleSubject.value;
  }

  get isShrink(): boolean {
    return this.isShrinkSubject.value;
  }

  get sidebarShrink(): boolean {
    return this.sidebarShrinkSubject.value;
  }
}
