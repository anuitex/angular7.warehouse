//Vendors
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PropertyNameChangeHelper {
    public changeKeyName<T>(model: T, newName: string, changeName: string): T {
        let temp = Object.assign({}, model);
        temp[`${newName}`] = temp[`${changeName}`];
        delete temp[`${changeName}`];
        return temp;
    }

    public changeKeyNameFromArray<T>(model: T[], newName: string, changeName: string): T[] {
        let temp = []
        model.forEach((item: T) => {
            temp.push(this.changeKeyName(item, newName, changeName));
        });
        return [...temp];
    }
}
