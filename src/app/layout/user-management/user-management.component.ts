import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { roles } from '../../_models/roles.model';
import { Router } from '@angular/router';
import { RoleService } from "../../_services/roles/roles-service.service";
//import { ToastrService } from 'ngx-toastr';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  displayedColumns = ['userid','roles','region','view','edit','delete','Edit'];
dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  allRolesData : roles[];
  checkboxVal="";
  @Input() roles = {
    object_id: "",
    userid: "",
    view : "",
    edit: "",
    delete: "",
    role: "",
    active:"1",
    region : "",
    creationBy : "",
    creationDate : "",
  };
  deleteuserid : String;
  viewgiven : boolean = true;
  viewnotgiven : boolean = false;
  userManagementData: any = [];
  constructor(
    public router: Router,
      private _snackBar: MatSnackBar,
   // private toastr: ToastrService,
    private rolesService: RoleService
  ) { }

  ngOnInit(){
    
    this.loadRolesData();
    console.log(this.allRolesData);   
    
  }
 openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
  }
  addRoles() {
    if (this.roles.object_id =="") {
      console.log("into data");
      this.rolesService.createUser(this.roles).subscribe((data)=>{
        console.log("into data");
          this.clearform();

      },
      (err) => {
        console.log('Error while adding same user ::::: ',err);
        //this.roles.active="1";
          this.openSnackBar('User Already Exist','Sure');
      //  this.toastr.error ('User Already Exsist ');
      });
     location.reload();
    }
    else {
          if (window.confirm('Are you sure, you want to update?')) {
            this.rolesService.updateRoles(this.roles.userid,this.roles).subscribe((data: {}) => {
            //        this.toastr.success('Customer Updated Successfully');
                  })
           //  location.reload();
         }
    }
  }
  loadRolesData() {
    this.rolesService.getRoles().subscribe((data : roles[]) => {
      console.log(data);
      this.allRolesData = data;
        this.dataSource = new MatTableDataSource(this.allRolesData);
       this.dataSource.paginator = this.paginator;
       console.log("maria",this.dataSource);
      console.log(this.allRolesData);
    });
  }
  onEdit(rolesData)
  {
    console.log(rolesData)
    
    this.roles = rolesData;
    
    console.log(this.roles.view,'Values for View' , rolesData.view);
  }


  onDelete(userid){
    console.log("hereeeeeeeeeeeeeeeeeeeeeeee")
    // UserRole.active = "0";
    console.log(userid);
    if (window.confirm('Are you sure, you want to delete?')){
      console.log(userid);
      this.rolesService.deleteRoles(userid).subscribe(data => {
        console.log("API response", data);
        this.openSnackBar('User deleted Successfully','Sure');
       // this.toastr.success('Customer deleted Successfully');
        console.log("user deleted");
      },
      (err)=>{
        console.log(err);
      });
    }
   // location.reload();
  } 
  clearform() {
    this.roles.userid = "",
      this.roles.view = "",
      this.roles.edit = "",
      this.roles.delete = "",
      this.roles.role = "",
      this.roles.region = "",
      this.roles.creationBy = "",
      this.roles.creationDate = ""
  }
}



