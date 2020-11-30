import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// import { routerTransition } from '../router.animations';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { User } from '../_models/user';
import {MatSnackBar} from '@angular/material/snack-bar';
// import { ToastrService } from 'ngx-toastr';
import { RoleData } from '../_models/global.model'
// import { PersistenceService } from 'angular-persistence';
import  { RestService} from '../services/rest.service';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    // animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    formGroup: FormGroup;
    usernameFormControl = new FormControl('', [ Validators.required]);
    passwordFormControl = new FormControl('', [Validators.required]);
    //authenticationServiceService : AuthenticationServiceService;
    // user : User;
    @Input() users =
        {
            username: '',
            password: ''
        }

    constructor(
        private restService : RestService,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
      //  private toastr: ToastrService,
        private authenticationServiceService: AuthenticationServiceService,
        public router: Router,
        private _snackBar: MatSnackBar,
       // private persistenceService: PersistenceService

    ) {

    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 9000,
        });
        console.log("this")
    ;
      }
      multipleusers(){
localStorage.clear();
        if(localStorage.getItem("userFullName")== null){
      this.onLoggedin();
      }
      else {
        alert("you are already logged in")
      }}    
    ngOnInit() { this.formGroup= this.formBuilder.group({
        'USERNAME':this.usernameFormControl,
        'PASSWORD':this.passwordFormControl,
  
            });
      }
      totalUsers: Number = 1;
    //  totalUsers : Number;
    onLoggedin() {
//alert(this.users.username);
//alert(this.users.password)

        this.authenticationServiceService.login(this.users.username, this.users.password)
            .subscribe((response: any) => {
            //  console.log("login");
            // console.log(response);
               // console.log(response.roledata);
                if (response.message == 'success') {
                  //  alert("you are here");
                    localStorage.setItem('userFullName', response.data.cn);
                    sessionStorage.setItem('userFullName', response.data.cn);
                    sessionStorage.setItem('isLoggedin', 'true');
                    this.router.navigate(['dashboard']);
//                     this.totalUsers ==1
// Number(localStorage.setItem('totalUsersCount', this.totalUsers.toString()));



                    this.openSnackBar('User Logged in successfully','Sure');
                   // this.toastr.success('Successfully Loggedin');
                     RoleData.update = response.roledata.update;
                                 RoleData.delete = response.roledata.delete;
                   RoleData.edit = response.roledata.edit;
                 //  console.log(RoleData);
                  this.restService.setRoleData(response.roledata);
                 localStorage.setItem('Edit',response.roledata.edit);
                 localStorage.setItem('Delete',response.roledata.delete);
                   localStorage.setItem('View',response.roledata.view);
                    
                   // console.log(localStorage.getItem('Roledata'));
                    
                   //    thisrsistenceService.set('delete', response.roledata.delete);
                //    console.log(this.persistenceService.get('edit'));
                }
                else if(response.message="Unauthorized"){
                   // this.toastr.error("You are not authorized to view this page");
                 // alert("you are not authorized");
                  this.openSnackBar('User Id password is incorrect','Sure');
                }
                else {
                  
                  //  this.toastr.error("Incorrect Username or Password");
                    alert("Please enter correct username or password")
                    this.openSnackBar('Please enter correct username or password','Sure');
                }
            },
            

                error => {
                    console.log("Error");
                }
                
      );

                


        //    .subscribe(
        //        data => {
        //            this.router.navigate(['dashboard']);
        //        },
        //        error => { 
        //            console.log("Error");
        //        });
         
    }

}


 //localStorage.setItem('isLoggedin','true');
       // this.router.navigate(['dashboard']);
       // this.authenticationServiceService.login(this.users.username,this.users.password)