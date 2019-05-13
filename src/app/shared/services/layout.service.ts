//Vendors
import { Injectable } from "@angular/core";
import { Subject, fromEvent } from "rxjs";

@Injectable({ providedIn: 'root' })

export class LayoutService {
  public mouseEvent: Subject<EventTarget> = new Subject<EventTarget>();

  constructor() {
    fromEvent<EventTarget>(document.body, 'click').subscribe((event: EventTarget) => {
      this.mouseEvent.next(event);
    });
  }
}
