import { Component, Directive, Input, NgModule, TemplateRef, inject } from "@angular/core";

@Component({
  selector: 'rx-header',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class Header {}

@Component({
  selector: 'rx-footer',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class Footer {}


@Directive({
  selector: '[rxTemplate]',
  standalone: true,
  host: {}
})
export class RxTemplate {
  @Input('rxTemplate') name: string | undefined;

  public template: TemplateRef<any> = inject(TemplateRef);

  getType(): string {
    return this.name!;
  }
}

@NgModule({
  imports: [RxTemplate],
  exports: [RxTemplate]
})
export class SharedModule {}
