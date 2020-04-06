import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule} from "@angular/material/dialog";
import { MatDividerModule} from "@angular/material/divider";
import { MatExpansionModule} from "@angular/material/expansion";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatGridListModule} from "@angular/material/grid-list";
import { MatIconModule} from "@angular/material/icon";
import { MatInputModule} from "@angular/material/input";
import { MatListModule} from "@angular/material/list";
import { MatMenuModule} from "@angular/material/menu";
import { MatNativeDateModule} from "@angular/material/core";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatProgressBarModule} from "@angular/material/progress-bar";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MatRadioModule} from "@angular/material/radio";
import { MatRippleModule} from "@angular/material/core";
import { MatSelectModule} from "@angular/material/select";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatSliderModule} from "@angular/material/slider";
import { MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { MatSortModule} from "@angular/material/sort";
import { MatStepperModule} from "@angular/material/stepper";
import { MatTabsModule} from "@angular/material/tabs";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatTooltipModule} from "@angular/material/tooltip";

import { LayoutModule } from '@angular/cdk/layout';
import { AuthComponent } from './components/auth/auth.component';
import { CompanyTypesComponent } from './components/company-types/company-types/company-types.component';
import { CompanyTypesAddComponent } from './components/company-types/company-types-add/company-types-add.component';
import { CompanyTypesEditComponent } from './components/company-types/company-types-edit/company-types-edit.component';
import { CompanyTypesDetailsComponent } from './components/company-types/company-types-detais/company-types-details.component';
import { CompanysComponent } from './components/companys/companys/companys.component';
import { CompanysAddComponent } from './components/companys/companys-add/companys-add.component';
import { CompanysEditComponent } from './components/companys/companys-edit/companys-edit.component';
import { CompanysDetailsComponent } from './components/companys/companys-detais/companys-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfessionalsComponent } from './components/professionals/professionals/professionals.component';
import { ProfessionalsAddComponent } from './components/professionals/professionals-add/professionals-add.component';
import { ProfessionalsEditComponent } from './components/professionals/professionals-edit/professionals-edit.component';
import { ProfessionalsDetailsComponent } from './components/professionals/professionals-detais/professionals-details.component';

import { DepartmentsComponent } from './components/departments/departments/departments.component';
import { DepartmentsAddComponent } from './components/departments/departaments-add/departments-add.component';
import { DepartmentsEditComponent } from './components/departments/departaments-edit/departments-edit.component';
import { DepartmentsDetailsComponent } from './components/departments/departaments-detais/departments-details.component';

import { AddressesComponent } from './components/addresses/addresses/addresses.component';
import { AddressesAddComponent } from './components/addresses/addresses-add/addresses-add.component';
import { AddressesEditComponent } from './components/addresses/addresses-edit/addresses-edit.component';
import { AddressesDetailsComponent } from './components/addresses/addresses-detais/addresses-details.component';

import { ManagersComponent } from './components/managers/managers/managers.component';
import { ManagersAddComponent } from './components/managers/managers-add/managers-add.component';
import { ManagersEditComponent } from './components/managers/managers-edit/managers-edit.component';
import { ManagersDetailsComponent } from './components/managers/managers-detais/managers-details.component';

import { TeamsComponent } from './components/teams/teams/teams.component';
import { TeamsAddComponent } from './components/teams/teams-add/teams-add.component';
import { TeamsEditComponent } from './components/teams/teams-edit/teams-edit.component';
import { TeamsDetailsComponent } from './components/teams/teams-detais/teams-details.component';

import { JobsComponent } from './components/jobs/jobs/jobs.component';
import { JobsAddComponent } from './components/jobs/jobs-add/jobs-add.component';
import { JobsEditComponent } from './components/jobs/jobs-edit/jobs-edit.component';
import { JobsDetailsComponent } from './components/jobs/jobs-detais/jobs-details.component';

import { ClientsComponent } from './components/clients/clients/clients.component';
import { ClientsAddComponent } from './components/clients/clients-add/clients-add.component';
import { ClientsEditComponent } from './components/clients/clients-edit/clients-edit.component';
import { ClientsDetailsComponent } from './components/clients/clients-detais/clients-details.component';

import { ProfessionalCompetencesComponent } from './components/professional-competences/professional-competences/professional-competences.component';
import { ProfessionalCompetencesAddComponent } from './components/professional-competences/professional-competences-add/professional-competences-add.component';
import { ProfessionalCompetencesEditComponent } from './components/professional-competences/professional-competences-edit/professional-competences-edit.component';
import { ProfessionalCompetencesDetailsComponent } from './components/professional-competences/professional-competences-detais/professional-competences-details.component';

import { PositionsComponent } from './components/positions/positions/positions.component';
import { PositionsAddComponent } from './components/positions/positions-add/positions-add.component';
import { PositionsDetailsComponent } from './components/positions/positions-detais/positions-details.component';
import { PositionsEditComponent } from './components/positions/positions-edit/positions-edit.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TableOverviewExampleComponent } from './components/table-overview-example/table-overview-example.component';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { BarraComponent } from './components/barra/barra.component';
import { TasksComponent } from './components/tasks/tasks/tasks.component';
import { TasksAddComponent } from './components/tasks/tasks-add/tasks-add.component';
import { TasksDetailsComponent } from './components/tasks/tasks-detais/tasks-details.component';
import { TasksEditComponent } from './components/tasks/tasks-edit/tasks-edit.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CompanyTypesComponent,
    CompanyTypesAddComponent,
    CompanyTypesEditComponent,
    CompanyTypesDetailsComponent,
    CompanysComponent,
    CompanysAddComponent,
    CompanysEditComponent,
    CompanysDetailsComponent,
    DashboardComponent,
    ProfessionalsComponent,
    ProfessionalsAddComponent,
    ProfessionalsEditComponent,
    ProfessionalsDetailsComponent,
    TableOverviewExampleComponent,
    MatConfirmDialogComponent,
    BarraComponent,
    DepartmentsComponent,
    DepartmentsAddComponent,
    DepartmentsEditComponent,
    DepartmentsDetailsComponent,
    AddressesComponent,
    AddressesAddComponent,
    AddressesEditComponent,
    AddressesDetailsComponent,
    ManagersComponent,
    ManagersAddComponent,
    ManagersEditComponent,
    ManagersDetailsComponent,
    TeamsComponent,
    TeamsAddComponent,
    TeamsEditComponent,
    TeamsDetailsComponent,
    ClientsComponent,
    ClientsAddComponent,
    ClientsEditComponent,
    ClientsDetailsComponent,
    ProfessionalCompetencesComponent,
    ProfessionalCompetencesAddComponent,
    ProfessionalCompetencesEditComponent,
    ProfessionalCompetencesDetailsComponent,
    PositionsComponent,
    PositionsAddComponent,
    PositionsDetailsComponent, 
    PositionsEditComponent,
    JobsComponent,
    JobsAddComponent,
    JobsEditComponent,
    JobsDetailsComponent,
    TasksComponent,
    TasksAddComponent,
    TasksDetailsComponent,
    TasksEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
