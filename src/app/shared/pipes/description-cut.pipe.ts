//Vendors
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'descriptionCut' })

export class DescriptionCutPipe implements PipeTransform {
  public transform(text: string | string[]): string {
    if (typeof text !== 'string') {
      text = text.join(',');
    }
    if (text.length > 20) {
      text = text.slice(0, 20);
      return text + '...';
    }
    return text;
  }
}
