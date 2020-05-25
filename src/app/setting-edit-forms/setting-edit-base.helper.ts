import { Injectable } from "@angular/core";
import { ICrudService } from "../icrud-service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RootURLS } from "../root-urls";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { environment } from "src/environments/environment";
import { Store, Action } from "@ngrx/store";
import { MatDialog } from "@angular/material";

@Injectable({
  providedIn: "root",
})
export class SettingEditHelper {
  static getFormBuilder(fb: FormBuilder, template: any, currentObject: any) {
    let group = {};
    template.forEach((input_template) => {
      group[input_template.label] = new FormControl(currentObject[input_template.label]);
    });

    var _FormGroup = new FormGroup(group);  
    console.log("template",template)
    return _FormGroup; 
  }

  static getActionName(formData: any): string {
    var actionName =
      formData["id"] == environment.EmptyGuid ? "Create" : "Update";
    console.log("actionName", actionName);
    return actionName;
  }
}
