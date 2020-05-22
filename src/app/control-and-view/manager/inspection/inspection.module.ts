import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionCreateComponent } from './inspection-create/inspection-create.component';
import { InspectiontemplateCreateComponent } from './inspectiontemplate-create/inspectiontemplate-create.component';
import { InspectiontemplateandquestionsViewComponent } from './inspectiontemplateandquestions-view/inspectiontemplateandquestions-view.component';
import { InspectiontemplateEditComponent } from './inspectiontemplate-edit/inspectiontemplate-edit.component';
import { InspectiontemplatedetailEditComponent } from './inspectiontemplatedetail-edit/inspectiontemplatedetail-edit.component';
import { InspectionViewComponent } from './inspection-view/inspection-view.component';
import { ViewinspectionmanagerComponent } from './viewinspectionmanager/viewinspectionmanager.component';
import { ManagerinspectiontemplateComponent } from './managerinspectiontemplate/managerinspectiontemplate.component';
import { FeedbackManageComponent } from './feedback-manage/feedback-manage.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InspectionCreateComponent, InspectiontemplateCreateComponent, InspectiontemplateandquestionsViewComponent, InspectiontemplateEditComponent, InspectiontemplatedetailEditComponent, InspectionViewComponent, ViewinspectionmanagerComponent, ManagerinspectiontemplateComponent, FeedbackManageComponent]
})
export class InspectionModule { }
