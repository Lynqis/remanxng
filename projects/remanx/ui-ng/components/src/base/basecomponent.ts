import { DOCUMENT } from "@angular/common";
import { ChangeDetectorRef, Directive, ElementRef, inject, PLATFORM_ID, Renderer2 } from "@angular/core";

@Directive({})
export class BaseComponent {
  public document: Document = inject(DOCUMENT);

  public platformId: any = inject(PLATFORM_ID);

  public el: ElementRef = inject(ElementRef);

  public readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  public renderer: Renderer2 = inject(Renderer2);
}
