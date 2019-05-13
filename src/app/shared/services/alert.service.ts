//Vendors
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
//Models
import { KeyValueModel } from '@app/shared/models/key-value.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<KeyValueModel<string>>();
    private keepAfterNavigationChange = false;

    constructor(public router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    public success(message: string, keepAfterNavigationChange = false): void {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    public error(message: string, keepAfterNavigationChange = false): void {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }

    public getMessage(): Observable<KeyValueModel<string>> {
        return this.subject.asObservable();
    }
}