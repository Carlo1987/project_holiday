import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

///  index
import { IndexComponent } from './components/index/index.component';

///  rotte User
import { UserAcountComponent } from './components/user/user-acount/user-acount.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { ImageUpdateComponent } from './components/user/image-update/image-update.component';
import { PasswordEditComponent } from './components/user/password-edit/password-edit.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { EditRoleComponent } from './components/user/edit-role/edit-role.component';
import { UserReserveComponent } from './components/user/user-reserve/user-reserve.component';
import { AllReservesClientsComponent } from './components/user/all-reserves-clients/all-reserves-clients.component';
import { EditHousesComponent } from './components/user/edit-houses/edit-houses.component';

/// rotte Home
import { HomesComponent } from './components/home/homes/homes.component';
import { SingleHomeComponent } from './components/home/single-home/single-home.component';

/// rotte Strumenti
import { InstrumentsComponent } from './components/instruments/instruments/instruments.component';

/// rotte Recensioni
import { CreateReviewComponent } from './components/review/create-review/create-review.component';
import { ModifyReviewComponent } from './components/review/modify-review/modify-review.component';

/// rotte generali
import { ErrorsComponent } from './components/errors/errors.component';
import { AppComponent } from './app.component';
import { SaveComponent } from './components/home/save/save.component';
import { UpdateDeleteComponent } from './components/home/update-delete/update-delete.component';

///  rotte prenotazioni
import { ExtraServiceComponent } from './components/reserve/extra-service/extra-service.component';
import { ReserveSuccessComponent } from './components/reserve/reserve-success/reserve-success.component';
import { CompleteReserveComponent } from './components/reserve/complete-reserve/complete-reserve.component';

///  rotte risarcimenti
import { RefundComponent } from './components/refund/refund/refund.component';




const routes: Routes = [
  //// index
  {path:'', component:IndexComponent},
  //// user
  {path:'acount', component:UserAcountComponent},
  {path:'acount-edit/:id', component:UserEditComponent},
  {path:'image-update/:id', component:ImageUpdateComponent},
  {path:'password-edit/:id', component:PasswordEditComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
 /*  {path:'edit-role', component:EditRoleComponent}, */
  {path:'user-reserve/:id', component:UserReserveComponent},
  {path:'clients-reserves', component:AllReservesClientsComponent},
  {path:'edit-homes', component:EditHousesComponent},
  //// home
  {path:'save-home', component:SaveComponent},
  {path:'home/:id', component:SingleHomeComponent},
  {path:'home-update&delete/:id', component:UpdateDeleteComponent},
  //// recensioni
  {path:'create-review/:id', component:CreateReviewComponent},
  {path:'modify-review/:id', component:ModifyReviewComponent},
  ////  prenotazioni
  {path:'reserve', component:ExtraServiceComponent},
  {path:'reserve-success/:id', component:ReserveSuccessComponent},
  {path:'reserve-complete/:id', component:CompleteReserveComponent},
  ////  risarcimento
  {path:'refund/:id', component:RefundComponent},
  //// strumenti
  {path:'instruments', component:InstrumentsComponent},
  //// errors
  {path: '**', component: ErrorsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
