// Vendors
import { AuthorModel } from '@app/shared/models';
import { SafeResourceUrl } from "@angular/platform-browser";
import { BookTypeEnum } from "@app/shared/enums";

export class BookModel {
    id: string;
    name: string;
    img: SafeResourceUrl;
    description: string;
    type: BookTypeEnum;
    author: AuthorModel[];
}