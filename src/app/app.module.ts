import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './services/cliente.service';
import { OrdenService } from './services/orden.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdenesmesComponent } from './ordenes/ordenesmes.component';


const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form/:idCliente', component: FormComponent},
  {path: 'ordenes/:idCliente', component: OrdenesComponent},
  {path: 'ordenes-mes/:idCliente', component: OrdenesmesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    OrdenesComponent,
    OrdenesmesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AutocompleteLibModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [
    ClienteService,
    OrdenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
