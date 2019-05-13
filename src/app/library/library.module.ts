//Vendors
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
//Components
import { BookComponent } from "@app/library/book/book.component";
import { LibraryComponent } from "@app/library/library/library.component";
import { MainLibraryComponent } from "@app/shared/containers/library-layout/main-library.component";
//Modules
import { SharedModule } from "@app/shared/shared.module";
//Routing
import { libraryRoutes } from "@app/library/library.routing";

@NgModule({
    declarations: [
        LibraryComponent,
        BookComponent,
        MainLibraryComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forChild(libraryRoutes),
    ],
    exports: [
        LibraryComponent,
        BookComponent,
        MainLibraryComponent
    ]
})

export class LibraryModule {}
