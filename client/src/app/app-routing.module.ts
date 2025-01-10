import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth/auth.guard';
import { adminGuard } from './guards/admin/admin.guard';

///  index
import { IndexComponent } from './components/index/index.component';

////   contatti
import { ContactComponent } from './components/contact/contact.component';

///  rotte User
import { UserAcountComponent } from './components/user/user-acount/user-acount.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { ImageUpdateComponent } from './components/user/image-update/image-update.component';
import { PasswordEditComponent } from './components/user/password-edit/password-edit.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { EditRoleComponent } from './components/user/edit-role/edit-role.component';
import { UserReserveComponent } from './components/user/user-reserve/user-reserve.component';
import { AllReservesClientsComponent } from './components/admin/all-reserves-clients/all-reserves-clients.component';
import { EditHousesComponent } from './components/home/edit-houses/edit-houses.component';

/// rotte Home
import { HomesComponent } from './components/home/homes/homes.component';
import { SingleHomeComponent } from './components/home/single-home/single-home.component';

/// rotte Strumenti
import { InstrumentsComponent } from './components/admin/instruments/instruments.component';

/// rotte Recensioni
import { CreateReviewComponent } from './components/review/create-review/create-review.component';
import { ModifyReviewComponent } from './components/review/modify-review/modify-review.component';
import { ReviewNoLoginComponent } from './components/review/review-no-login/review-no-login.component';

/// rotte generali
import { ErrorsComponent } from './components/errors/errors.component';
import { AppComponent } from './app.component';
import { SaveComponent } from './components/admin/home/save/save.component';
import { UpdateDeleteComponent } from './components/admin/home/update-delete/update-delete.component';

///  rotte prenotazioni
import { ExtraServiceComponent } from './components/reserve/extra-service/extra-service.component';
import { ReserveSuccessComponent } from './components/reserve/reserve-success/reserve-success.component';
import { CompleteReserveComponent } from './components/reserve/complete-reserve/complete-reserve.component';
import { ReserveNoLoginComponent } from './components/reserve/reserve-no-login/reserve-no-login.component';
import { SearchReserveComponent } from './components/reserve/search-reserve/search-reserve.component';
import { ReserveSingleComponent } from './components/reserve/reserve-single/reserve-single.component';
import { ReserveBlockedComponent } from './components/reserve/reserve-blocked/reserve-blocked.component';
import { ReserveRejectedComponent } from './components/reserve/reserve-rejected/reserve-rejected.component';

///  rotte risarcimenti
import { RefundComponent } from './components/refund/refund.component';




const routes: Routes = [
  //// index
  {path:'', component:IndexComponent},
  /// contatti
  {path:'contact', component:ContactComponent},

  //// user
  {path:'acount', component:UserAcountComponent},
  {path:'acount-edit/:id',  component:UserEditComponent , canActivate : [authGuard] },
  {path:'image-update/:id', component:ImageUpdateComponent , canActivate : [authGuard] },
  {path:'password-edit/:id', component:PasswordEditComponent , canActivate : [authGuard] },
  {path:'forgot-password', component:ForgotPasswordComponent },

  {path:'edit-role', component:EditRoleComponent, canActivate : [authGuard,adminGuard]}, 
  
  {path:'user-reserve/:id', component:UserReserveComponent , canActivate : [authGuard] },
  {path:'clients-reserves', component:AllReservesClientsComponent, canActivate : [authGuard,adminGuard] },   
  {path:'edit-homes', component:EditHousesComponent , canActivate : [authGuard,adminGuard]},
  //// home
  {path:'save-home', component:SaveComponent , canActivate : [authGuard,adminGuard]},
  {path:'home/:id', component:SingleHomeComponent},
  {path:'home-update&delete/:id', component:UpdateDeleteComponent , canActivate : [authGuard,adminGuard]},
  //// recensioni
  {path:'create-review/:id', component:CreateReviewComponent},
  {path:'modify-review/:id', component:ModifyReviewComponent, canActivate : [authGuard] },
  {path:'review-noLogin/:id', component:ReviewNoLoginComponent},
  ////  prenotazioni
  {path:'reserve', component:ExtraServiceComponent },     
  {path:'reserve-success/:id', component:ReserveSuccessComponent },
  {path:'reserve-complete/:id', component:CompleteReserveComponent },
  {path:'reserve-noLogin', component:ReserveNoLoginComponent },
  {path:'search-reserve', component:SearchReserveComponent},
  {path:'reserve-single/:id', component:ReserveSingleComponent },
  {path:'reserve-blocked/:home_id', component:ReserveBlockedComponent},
  {path:'reserve-rejected/:home_id' , component:ReserveRejectedComponent},
  ////  risarcimento
  {path:'refund/:id', component:RefundComponent },
  //// strumenti
  {path:'instruments', component:InstrumentsComponent , canActivate : [authGuard,adminGuard]},
  //// errors
  {path: '**', component: ErrorsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
