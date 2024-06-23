import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { UserAcountComponent } from './components/user/user-acount/user-acount.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { PasswordEditComponent } from './components/user/password-edit/password-edit.component';
import { ImageUpdateComponent } from './components/user/image-update/image-update.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { HomesComponent } from './components/home/homes/homes.component';
import { SaveComponent } from './components/home/save/save.component';
import { IndexComponent } from './components/index/index.component';
import { SingleHomeComponent } from './components/home/single-home/single-home.component';
import { UpdateDeleteComponent } from './components/home/update-delete/update-delete.component';
import { EditRoleComponent } from './components/user/edit-role/edit-role.component';
import { CreateReviewComponent } from './components/review/create-review/create-review.component';
import { ReviewOneHomeComponent } from './components/review/review-one-home/review-one-home.component';
import { ReserveComponent } from './components/reserve/reserve/reserve.component';
import { InstrumentsComponent } from './components/instruments/instruments/instruments.component';
import { ExtraServiceComponent } from './components/reserve/extra-service/extra-service.component';
import { ReserveSuccessComponent } from './components/reserve/reserve-success/reserve-success.component';
import { ModifyReviewComponent } from './components/review/modify-review/modify-review.component';
import { RefundComponent } from './components/refund/refund/refund.component';
import { UserReserveComponent } from './components/user/user-reserve/user-reserve.component';
import { AllReservesClientsComponent } from './components/user/all-reserves-clients/all-reserves-clients.component';
import { CompleteReserveComponent } from './components/reserve/complete-reserve/complete-reserve.component';
import { EditHousesComponent } from './components/user/edit-houses/edit-houses.component';
import { UserService } from './services/user_service';
import { ReserveNoLoginComponent } from './components/reserve/reserve-no-login/reserve-no-login.component';
import { ContactComponent } from './components/contact/contact.component';
import { SearchReserveComponent } from './components/reserve/search-reserve/search-reserve.component';
import { ReserveSingleComponent } from './components/reserve/reserve-single/reserve-single.component';
import { ReviewsComponent } from './components/review/reviews/reviews.component';
import { PaymentComponent } from './components/reserve/payment/payment.component';




@NgModule({
  declarations: [
    AppComponent,
    ErrorsComponent,
    UserAcountComponent,
    UserEditComponent,
    PasswordEditComponent,
    ImageUpdateComponent,
    ForgotPasswordComponent,
    HomesComponent,
    SaveComponent,
    IndexComponent,
    SingleHomeComponent,
    UpdateDeleteComponent,
    EditRoleComponent,
    CreateReviewComponent,
    ReviewOneHomeComponent,
    ReserveComponent,
    InstrumentsComponent,
    ExtraServiceComponent,
    ReserveSuccessComponent,
    ModifyReviewComponent,
    RefundComponent,
    UserReserveComponent,
    AllReservesClientsComponent,
    CompleteReserveComponent,
    EditHousesComponent,
    ReserveNoLoginComponent,
    ContactComponent,
    SearchReserveComponent,
    ReserveSingleComponent,
    ReviewsComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,        
    FormsModule, 
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
