
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { MDBSpinningPreloader, MDBBootstrapModulesPro, ToastModule } from 'ng-uikit-pro-standard';
import { MdbCalendarModule } from 'mdb-calendar';
import { MdbColorPickerModule } from 'mdb-color-picker';
import { MdbDraggableModule } from 'mdb-draggable';
import { MdbFileUploadModule } from 'mdb-file-upload';
import { MdbSortableModule } from 'mdb-sortable';
import { MdbTableEditorModule } from 'mdb-table-editor';
import { MdbWysiwygModule } from 'mdb-wysiwyg';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './modal/modal.component';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { SidebarComponent } from './proyectos/sidebar/sidebar.component';
import {  HashLocationStrategy, LocationStrategy  } from '@angular/common';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProyectosComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    MdbCalendarModule,
    MdbColorPickerModule,
    MdbDraggableModule,
    MdbFileUploadModule,
    MdbSortableModule,
    MdbTableEditorModule,
    MdbWysiwygModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
  ],
  entryComponents: [ ModalComponent ],
  providers: [MDBSpinningPreloader,{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
