import { Directive, Input, TemplateRef, inject } from "@angular/core";

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
