import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ThankyouPageModule } from './control-and-view/thankyou-page/thankyou-page.module';

const routes: Routes = [

  {
    path: '',
    loadChildren: './control-and-view/dashboard/login/login.module#LoginModule' // varun- first page to load for lazy loading.... 
  },
  {
    path: 'Reviews/:Facility_Key/:Floor_Key/:Zone_Key/:RoomType_Key/:rev_orgid/:room_key',// user review page
    loadChildren: './control-and-view/reviews/reviews.module#ReviewsModule'
  },
  {
    path: 'thankYou/:type',// thank you page 
    loadChildren: './control-and-view/thankyou-page/thankyou-page.module#ThankyouPageModule'
  },
  {
    path: 'UserWorkRequest/:Facility_Key/:Floor_Key/:Zone_Key/:RoomType_Key/:rev_orgid/:room_key',// user request page
    loadChildren: './control-and-view/user-work-request/user-work-request.module#UserWorkRequestModule' 
  },
];


@NgModule({
  imports: [
    CommonModule, RouterModule,
    RouterModule.forRoot(routes, {
      // Tell the router to use the HashLocationStrategy.
      useHash: true
    })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
