import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { CompanyTypesComponent } from './components/company-types/company-types/company-types.component';
import { CompanyTypesAddComponent } from './components/company-types/company-types-add/company-types-add.component';
import { CompanyTypesEditComponent } from './components/company-types/company-types-edit/company-types-edit.component';
import { CompanyTypesDetailsComponent } from './components/company-types/company-types-detais/company-types-details.component';
import { CompanysComponent } from './components/companys/companys/companys.component';
import { CompanysAddComponent } from './components/companys/companys-add/companys-add.component';
import { CompanysEditComponent } from './components/companys/companys-edit/companys-edit.component';
import { CompanysDetailsComponent } from './components/companys/companys-detais/companys-details.component';
import { ProfessionalsComponent } from './components/professionals/professionals/professionals.component';
import { ProfessionalsAddComponent } from './components/professionals/professionals-add/professionals-add.component';
import { ProfessionalsEditComponent } from './components/professionals/professionals-edit/professionals-edit.component';
import { ProfessionalsDetailsComponent } from './components/professionals/professionals-detais/professionals-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { TableOverviewExampleComponent } from './components/table-overview-example/table-overview-example.component';
import { DepartmentsComponent } from './components/departments/departments/departments.component';
import { DepartmentsAddComponent } from './components/departments/departaments-add/departments-add.component';
import { DepartmentsEditComponent } from './components/departments/departaments-edit/departments-edit.component';
import { DepartmentsDetailsComponent } from './components/departments/departaments-detais/departments-details.component';

import { AddressesComponent } from './components/addresses/addresses/addresses.component';
import { AddressesAddComponent } from './components/addresses/addresses-add/addresses-add.component';
import { AddressesEditComponent } from './components/addresses/addresses-edit/addresses-edit.component';
import { AddressesDetailsComponent } from './components/addresses/addresses-detais/addresses-details.component';

import { ClientsComponent } from './components/clients/clients/clients.component';
import { ClientsAddComponent } from './components/clients/clients-add/clients-add.component';
import { ClientsEditComponent } from './components/clients/clients-edit/clients-edit.component';
import { ClientsDetailsComponent } from './components/clients/clients-detais/clients-details.component';

import { ManagersComponent } from './components/managers/managers/managers.component';
import { ManagersAddComponent } from './components/managers/managers-add/managers-add.component';
import { ManagersEditComponent } from './components/managers/managers-edit/managers-edit.component';
import { ManagersDetailsComponent } from './components/managers/managers-detais/managers-details.component';
import { Team } from './shared/Team';
import { TeamsAddComponent } from './components/teams/teams-add/teams-add.component';
import { TeamsDetailsComponent } from './components/teams/teams-detais/teams-details.component';
import { TeamsEditComponent } from './components/teams/teams-edit/teams-edit.component';
import { TeamsComponent } from './components/teams/teams/teams.component';
import { ProfessionalCompetencesComponent } from './components/professional-competences/professional-competences/professional-competences.component';
import { ProfessionalCompetencesAddComponent } from './components/professional-competences/professional-competences-add/professional-competences-add.component';
import { ProfessionalCompetencesDetailsComponent } from './components/professional-competences/professional-competences-detais/professional-competences-details.component';
import { ProfessionalCompetencesEditComponent } from './components/professional-competences/professional-competences-edit/professional-competences-edit.component';
import { PositionsComponent } from './components/positions/positions/positions.component';
import { PositionsAddComponent } from './components/positions/positions-add/positions-add.component';
import { PositionsDetailsComponent } from './components/positions/positions-detais/positions-details.component';
import { PositionsEditComponent } from './components/positions/positions-edit/positions-edit.component';

const routes: Routes = [
  {
    path: 'company-types',
    component: CompanyTypesComponent,
    data: { title: 'List companys'},
    canActivate: [AuthGuardService]
  },
  {
   path:'company-types-add',
   component: CompanyTypesAddComponent,
   data: { title: 'Add companys'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'company-types-details/:id',
    component: CompanyTypesDetailsComponent,
    data: { title: 'Details of companys'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'company-types-edit/:id',
    component: CompanyTypesEditComponent,
    data: { title: 'Edit companys'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'companys',
    component: CompanysComponent,
    data: { title: 'List companys'},
    canActivate: [AuthGuardService]
  },
  {
   path:'companys-add',
   component: CompanysAddComponent,
   data: { title: 'Add companys'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'companys-details/:id',
    component: CompanysDetailsComponent,
    data: { title: 'Details of companys'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'companys-edit/:id',
    component: CompanysEditComponent,
    data: { title: 'Edit companys'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'addresses',
    component: AddressesComponent,
    data: { title: 'List addresses'},
    canActivate: [AuthGuardService]
  },
  {
   path:'addresses-add',
   component: AddressesAddComponent,
   data: { title: 'Add addresses'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'addresses-details/:id',
    component: AddressesDetailsComponent,
    data: { title: 'Details of addresses'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'addresses-edit/:id',
    component: AddressesEditComponent,
    data: { title: 'Edit addresses'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    data: { title: 'List departments'},
    canActivate: [AuthGuardService]
  },
  {
   path:'departments-add',
   component: DepartmentsAddComponent,
   data: { title: 'Add departments'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'departments-details/:id',
    component: DepartmentsDetailsComponent,
    data: { title: 'Details of departments'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'departments-edit/:id',
    component: DepartmentsEditComponent,
    data: { title: 'Edit departments'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'teams',
    component: TeamsComponent,
    data: { title: 'List teams'},
    canActivate: [AuthGuardService]
  },
  {
   path:'teams-add',
   component: TeamsAddComponent,
   data: { title: 'Add teams'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'teams-details/:id',
    component: TeamsDetailsComponent,
    data: { title: 'Details of teams'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'teams-edit/:id',
    component: TeamsEditComponent,
    data: { title: 'Edit teams'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'professionals',
    component: ProfessionalsComponent,
    data: { title: 'List professionals'},
    canActivate: [AuthGuardService]
  },
  {
   path:'professionals-add',
   component: ProfessionalsAddComponent,
   data: { title: 'Add professionals'},
   canActivate: [AuthGuardService]
  },
  {
    path: 'professionals-details/:id',
    component: ProfessionalsDetailsComponent,
    data: { title: 'Details of professionals'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'professionals-edit/:id',
    component: ProfessionalsEditComponent,
    data: { title: 'Edit professionals'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'managers',
    component: ManagersComponent,
    data: { title: 'List managers'},
    canActivate: [AuthGuardService]
  },
  {
    path:'managers-add',
    component: ManagersAddComponent,
    data: { title: 'Add managers'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'managers-details/:id',
    component: ManagersDetailsComponent,
    data: { title: 'Details managers'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'managers-edit/:id',
    component: ManagersEditComponent,
    data: { title: 'Edit managers'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    data: { title: 'List clients'},
    canActivate: [AuthGuardService]
  },
  {
    path:'clients-add',
    component: ClientsAddComponent,
    data: { title: 'Add clients'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'clients-details/:id',
    component: ClientsDetailsComponent,
    data: { title: 'Details clients'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'clients-edit/:id',
    component: ClientsEditComponent,
    data: { title: 'Edit clients'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'professional-competences',
    component: ProfessionalCompetencesComponent,
    data: { title: 'List professional-competences'},
    canActivate: [AuthGuardService]
  },
  {
    path:'professional-competences-add',
    component: ProfessionalCompetencesAddComponent,
    data: { title: 'Add professional-competences'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'professional-competences-details/:id',
    component: ProfessionalCompetencesDetailsComponent,
    data: { title: 'Details professional-competences'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'professional-competences-edit/:id',
    component: ProfessionalCompetencesEditComponent,
    data: { title: 'Edit professional-competences'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'positions',
    component: PositionsComponent,
    data: { title: 'List positions'},
    canActivate: [AuthGuardService]
  },
  {
    path:'positions-add',
    component: PositionsAddComponent,
    data: { title: 'Add positions'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'positions-details/:id',
    component: PositionsDetailsComponent,
    data: { title: 'Details positions'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'positions-edit/:id',
    component: PositionsEditComponent,
    data: { title: 'Edit positions'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Alteração de Tipo de Servicos'},
    canActivate: [AuthGuardService]
  },
  {
    path: 'table',
    component: TableOverviewExampleComponent,
    data: { title: 'Teste de Tabela'},
    canActivate: [AuthGuardService]
  },
  //auth
  {path: 'auth', component: AuthComponent, runGuardsAndResolvers: 'always'},
  {path: '', component: AuthComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
