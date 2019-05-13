//Vendors
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'orderBy' })

export class OrderByPipe implements PipeTransform {
  public transform(array: string[], field: string): string[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: string, b: string) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
