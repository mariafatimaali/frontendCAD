import * as XLSX from 'xlsx';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { vendorManagementService } from "../../_services/vendorManagement/vendorManagement.service";
import { format } from 'url';
import { UserIdleService } from 'angular-user-idle';
import { Observable, observable, from } from 'rxjs';
import { toBase64String } from '@angular/compiler/src/output/source_map';
//import { ToastrService } from 'ngx-toastr';
import { vendorManagement } from 'src/app/_models/vendorManagement.model';
import { RoleData } from '../../_models/global.model';
import { RestService } from '../../services/rest.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
//import{ DateFormatPipe } from '../../shared/pipes/dateFormatPipe';

interface vendorstatus {
  value: string;
  viewValue: string;
}

interface hbl {
  value: string;
  viewValue: string;
}
interface vendorcategory {
  value: string;
  viewValue: string;
}
interface enlistedcity {
  value: string;
  viewvalue: string;
}


@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss'],
  //providers: [DateFormatPipe]
})

export class VendorManagementComponent implements OnInit {
  Enlistedcity: enlistedcity[] = [
  {value:'Abbottabad',	viewvalue:'Abbottabad'},
{value:'	Alpurai	   ',	viewvalue:'	Alpurai	   '},
{value:'	Aliabad	   ',	viewvalue:'	Aliabad	   '},
{value:'	Athmuqam	   ',	viewvalue:'	Athmuqam	   '},
{value:'	Attock City	   ',	viewvalue:'	Attock City	   '},
{value:'	Awaran	   ',	viewvalue:'	Awaran	   '},
{value:'	Badin	   ',	viewvalue:'	Badin	   '},
{value:'	Bahawalnagar	   ',	viewvalue:'	Bahawalnagar	   '},
{value:'	Bahawalpur	   ',	viewvalue:'	Bahawalpur	   '},
{value:'	Bannu	   ',	viewvalue:'	Bannu	   '},
{value:'	Bardar	   ',	viewvalue:'	Bardar	   '},
{value:'	Batgram	   ',	viewvalue:'	Batgram	   '},
{value:'	Bhakkar	   ',	viewvalue:'	Bhakkar	   '},
{value:'	Bagh	   ',	viewvalue:'	Bagh	   '},
{value:'	Barkhan	   ',	viewvalue:'	Barkhan	   '},
{value:'	Chakwal	   ',	viewvalue:'	Chakwal	   '},
{value:'	Chaman	   ',	viewvalue:'	Chaman	   '},
{value:'	Chilas	   ',	viewvalue:'	Chilas	   '},
{value:'	Chiniot	   ',	viewvalue:'	Chiniot	   '},
{value:'	Chitral	   ',	viewvalue:'	Chitral	   '},
{value:'	Charsadda	   ',	viewvalue:'	Charsadda	   '},
{value:'	Daggar	   ',	viewvalue:'	Daggar	   '},
{value:'	Dasu	   ',	viewvalue:'	Dasu	   '},
{value:'	Dera Allahyar	   ',	viewvalue:'	Dera Allahyar	   '},
{value:'	Dera Bugti	   ',	viewvalue:'	Dera Bugti	   '},
{value:'	Dera Ghazi Khan	   ',	viewvalue:'	Dera Ghazi Khan	   '},
{value:'	Dera Ismail Khan	   ',	viewvalue:'	Dera Ismail Khan	   '},
{value:'	Dera Murad Jamali	   ',	viewvalue:'	Dera Murad Jamali	   '},
{value:'	Dadu	   ',	viewvalue:'	Dadu	   '},
{value:'	Dalbandin	   ',	viewvalue:'	Dalbandin	   '},
{value:'	Eidgah	   ',	viewvalue:'	Eidgah	   '},
{value:'	Faisalabad	   ',	viewvalue:'	Faisalabad	   '},
{value:'	Gandava	   ',	viewvalue:'	Gandava	   '},
{value:'	Ghotki	   ',	viewvalue:'	Ghotki	   '},
{value:'	Gilgit	   ',	viewvalue:'	Gilgit	   '},
{value:'	Gujranwala	   ',	viewvalue:'	Gujranwala	   '},
{value:'	Gujrat	   ',	viewvalue:'	Gujrat	   '},
{value:'	Gwadar	   ',	viewvalue:'	Gwadar	   '},
{value:'	Gakuch	   ',	viewvalue:'	Gakuch	   '},
{value:'	Hangu	   ',	viewvalue:'	Hangu	   '},
{value:'	Haripur	   ',	viewvalue:'	Haripur	   '},
{value:'	Hyderabad	   ',	viewvalue:'	Hyderabad	   '},
{value:'	Hafizabad	   ',	viewvalue:'	Hafizabad	   '},
{value:'	Islamabad	   ',	viewvalue:'	Islamabad	   '},
{value:'	Jacobabad	   ',	viewvalue:'	Jacobabad	   '},
{value:'	Jhang City	   ',	viewvalue:'	Jhang City	   '},
{value:'	Jhang Sadr	   ',	viewvalue:'	Jhang Sadr	   '},
{value:'	Jhelum	   ',	viewvalue:'	Jhelum	   '},
{value:'	Jamshoro	   ',	viewvalue:'	Jamshoro	   '},
{value:'	Kalat	   ',	viewvalue:'	Kalat	   '},
{value:'	Kandhkot	   ',	viewvalue:'	Kandhkot	   '},
{value:'	Karachi	   ',	viewvalue:'	Karachi	   '},
{value:'	Karak	   ',	viewvalue:'	Karak	   '},
{value:'	Kasur	   ',	viewvalue:'	Kasur	   '},
{value:'	Khairpur	   ',	viewvalue:'	Khairpur	   '},
{value:'	Khushab	   ',	viewvalue:'	Khushab	   '},
{value:'	Khuzdar	   ',	viewvalue:'	Khuzdar	   '},
{value:'	Khanewal	   ',	viewvalue:'	Khanewal	   '},
{value:'	Kharan	   ',	viewvalue:'	Kharan	   '},
{value:'	Kohlu	   ',	viewvalue:'	Kohlu	   '},
{value:'	Kohat	   ',	viewvalue:'	Kohat	   '},
{value:'	Kotli	   ',	viewvalue:'	Kotli	   '},
{value:'	Kundian	   ',	viewvalue:'	Kundian	   '},
{value:'	Lahore	   ',	viewvalue:'	Lahore	   '},
{value:'	Lakki Marwat	   ',	viewvalue:'	Lakki Marwat	   '},
{value:'	Leiah	   ',	viewvalue:'	Leiah	   '},
{value:'	Lodhran	   ',	viewvalue:'	Lodhran	   '},
{value:'	Loralai	   ',	viewvalue:'	Loralai	   '},
{value:'	Larkana	   ',	viewvalue:'	Larkana	   '},
{value:'	Malakand	   ',	viewvalue:'	Malakand	   '},
{value:'	Mandi Bahauddin	   ',	viewvalue:'	Mandi Bahauddin	   '},
{value:'	Mardan	   ',	viewvalue:'	Mardan	   '},
{value:'	Mastung	   ',	viewvalue:'	Mastung	   '},
{value:'	Masiwala	   ',	viewvalue:'	Masiwala	   '},
{value:'	Matiari	   ',	viewvalue:'	Matiari	   '},
{value:'	Mehra	   ',	viewvalue:'	Mehra	   '},
{value:'	Mianwali	   ',	viewvalue:'	Mianwali	   '},
{value:'	Multan	   ',	viewvalue:'	Multan	   '},
{value:'	Muzaffargarh	   ',	viewvalue:'	Muzaffargarh	   '},
{value:'	Mansehra	   ',	viewvalue:'	Mansehra	   '},
{value:'	Mirpur Khas	   ',	viewvalue:'	Mirpur Khas	   '},
{value:'	Musa Khel Bazar	   ',	viewvalue:'	Musa Khel Bazar	   '},
{value:'	Nankana Sahib	   ',	viewvalue:'	Nankana Sahib	   '},
{value:'	Naushahro Firoz	   ',	viewvalue:'	Naushahro Firoz	   '},
{value:'	Nawabshah	   ',	viewvalue:'	Nawabshah	   '},
{value:'	New Mirpur	   ',	viewvalue:'	New Mirpur	   '},
{value:'	Nowshera	   ',	viewvalue:'	Nowshera	   '},
{value:'	Narowal	   ',	viewvalue:'	Narowal	   '},
{value:'	Okara	   ',	viewvalue:'	Okara	   '},
{value:'	Panjgur	   ',	viewvalue:'	Panjgur	   '},
{value:'	Parachinar	   ',	viewvalue:'	Parachinar	   '},
{value:'	Peshawar	   ',	viewvalue:'	Peshawar	   '},
{value:'	Pishin	   ',	viewvalue:'	Pishin	   '},
{value:'	Pakpattan	   ',	viewvalue:'	Pakpattan	   '},
{value:'	Qila Abdullah	   ',	viewvalue:'	Qila Abdullah	   '},
{value:'	Qila Saifullah	   ',	viewvalue:'	Qila Saifullah	   '},
{value:'	Quetta	   ',	viewvalue:'	Quetta	   '},
{value:'	Rahimyar Khan	   ',	viewvalue:'	Rahimyar Khan	   '},
{value:'	Rajanpur	   ',	viewvalue:'	Rajanpur	   '},
{value:'	Rawala Kot	   ',	viewvalue:'	Rawala Kot	   '},
{value:'	Rawalpindi	   ',	viewvalue:'	Rawalpindi	   '},
{value:'	Saidu Sharif	   ',	viewvalue:'	Saidu Sharif	   '},
{value:'	Sargodha	   ',	viewvalue:'	Sargodha	   '},
{value:'	Serai	   ',	viewvalue:'	Serai	   '},
{value:'	Shahdad Kot	   ',	viewvalue:'	Shahdad Kot	   '},
{value:'	Sheikhupura	   ',	viewvalue:'	Sheikhupura	   '},
{value:'	Shikarpur	   ',	viewvalue:'	Shikarpur	   '},
{value:'	Sibi	   ',	viewvalue:'	Sibi	   '},
{value:'	Sialkot City	   ',	viewvalue:'	Sialkot City	   '},
{value:'	Sukkur	   ',	viewvalue:'	Sukkur	   '},
{value:'	Swabi	   ',	viewvalue:'	Swabi	   '},
{value:'	Sadiqabad	   ',	viewvalue:'	Sadiqabad	   '},
{value:'	Sahiwal	   ',	viewvalue:'	Sahiwal	   '},
{value:'	Sanghar	   ',	viewvalue:'	Sanghar	   '},
{value:'	Tando Allahyar	   ',	viewvalue:'	Tando Allahyar	   '},
{value:'	Tando Muhammad Khan	   ',	viewvalue:'	Tando Muhammad Khan	   '},
{value:'	Thatta	   ',	viewvalue:'	Thatta	   '},
{value:'	Timargara	   ',	viewvalue:'	Timargara	   '},
{value:'	Toba Tek Singh	   ',	viewvalue:'	Toba Tek Singh	   '},
{value:'	Turbat	   ',	viewvalue:'	Turbat	   '},
{value:'	Tank	   ',	viewvalue:'	Tank	   '},
{value:'	Umarkot	   ',	viewvalue:'	Umarkot	   '},
{value:'	Upper Dir	   ',	viewvalue:'	Upper Dir	   '},
{value:'	Uthal	   ',	viewvalue:'	Uthal	   '},
{value:'	Vihari	   ',	viewvalue:'	Vihari	   '},
{value:'	Zhob	   ',	viewvalue:'	Zhob	   '},
{value:'	Ziarat	   ',	viewvalue:'	Ziarat	   '},
];
  vendor: vendorstatus[] = [
    {value: 'Enlisted', viewValue: 'Enlisted'},
    {value: 'De-listed', viewValue: 'De-listed'},
    {value: 'Suspended', viewValue: 'Suspended'},
    {value: 'Re-Enlisted', viewValue: 'Re-Enlisted'},
  ];
  vendorCategory: vendorcategory[] = [
    {value: 'Mucaddam', viewValue :'Mucaddam'},
    {value: 'Stock Inspector', viewValue :'Stock Inspector'},
    {value: 'Valuator', viewValue :'Valuator'},
    {value: 'Legal Counsel', viewValue :'Legal Counsel'},
    {value: 'Surveyor', viewValue :'Surveyor'},

  ];
  hblo: hbl[] = [
  {value: ' Debt Assets Swap', viewValue: ' Debt Assets Swap'},
  {value: 'Settlement', viewValue: 'Settlement'},
  {value: 'General', viewValue: 'General'},
];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  formGroup: FormGroup;
 // primeFormControl =new FormControl('', [Validators.maxLength(6)]);
 vendorCategoryControl = new FormControl('', [ Validators.required,Validators.maxLength(6)]);
 vendorNameFormControl = new FormControl('', [Validators.required]);
 vendorShortNameControl = new FormControl('', [ Validators.required]);
 principalexecutiveFormControl = new FormControl('', [Validators.required]);
 officeAddressFormControl = new FormControl('', [ Validators.required]);

 officeTelephone1FormControl = new FormControl('', [Validators.required]);
 officeTelephone2FormControl = new FormControl('', [ Validators.required]);
 officeMobile1FormControl = new FormControl('', [Validators.required]);
 officeMobile2FormControl = new FormControl('', [ Validators.required]);
 vendorStatusFormControl = new FormControl('', [Validators.required]);
 officeemailFormControl = new FormControl('', [Validators.required]);
 enlistedonpreferredpanelFormControl = new FormControl('', [Validators.required]);
 dateofenlistementFormControl = new FormControl('', [ Validators.required]);
 dateofReenlistementFormControl = new FormControl('', [Validators.required]);
 dateofsuspensionFormControl = new FormControl('', [ Validators.required]);
 dateofdelistmentFormControl = new FormControl('', [Validators.required]);
 categoryofHBLFormControl = new FormControl('', [Validators.required]);
 valutionLimitFormControl = new FormControl('', [ Validators.required]);
 enlistedCityFormControl = new FormControl('', [Validators.required]);
 RemarksFormControl = new FormControl('', [ Validators.required]);
// dateofdelistmentFormControl = new FormControl('', [Validators.required]);
 // matcher = new MyErrorStateMatcher();
displayedColumns = ['select','delete','vendorCategory','vendorName','vendorShortName','principalexecutive','officeAddress','officeTelephone1','officeTelephone2',
'officeMobile1','officeMobile2','officeemail','vendorStatus','enlistedonpreferredpanel','dateofenlistement','dateofReenlistement',
'dateofsuspension','dateofdelistment','categoryofHBL','valutionLimit','enlistedCity','Remarks','createdBy','createdOn','modifiedBy','modifiedOn'];
dataSource = new MatTableDataSource();
places: Array<any> = [];
  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////

  tablevendorCategory: number;

  ///////////////////////////////////Pagination Veriables//////////////////////////////////

  pageSize = 5;
  page: any = 1;
  previousPage: any;
  totalRec: number;

  //////////////////////////////////Data Veriables////////////////////////////////////////

  inputdata: any = [];
  allvendorManagementDetails: any = [];

  //////////////////////////////////Visiblity Veriables///////////////////////////////////
  public VisiblitypNumb: boolean = false;
  public hideEditButton: boolean = false;
  public hideDeleteButton: boolean = false;
  public hideForm: boolean = false;
  public hideDataTable: boolean = false;

  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @Input() vendorManagementDetails = {

    object_id: "",
    vendorCategory : "",
    vendorName : "",
    vendorShortName : "",
    principalexecutive : "",
    officeAddress : "",
    officeTelephone1 : "",
    officeTelephone2 : "",
    officeMobile1 : "",
    officeMobile2 : "",
    officeemail : "",
    vendorStatus : "",
    enlistedonpreferredpanel : "",
    dateofenlistement : "",
    dateofReenlistement : "",
    dateofsuspension : "",
    dateofdelistment : "",
    categoryofHBL : "",
    valutionLimit : "",
    enlistedCity : "",
    Remarks : "",
    dataStatus:"",
    createdBy : "",

    createdOn: "",
     modifiedBy:   "",
     modifiedOn :   "",
     deletedBy:  "",
     deletedOn: "",
    active: ""
  };

  constructor(
    private formBuilder: FormBuilder,
    private userIdle: UserIdleService,
    private vendorManagementService: vendorManagementService,
public actRoute: ActivatedRoute,
//    private toastr: ToastrService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private restservice: RestService ,
   // private _dateFormatPipe: DateFormatPipe,
  ) { }

  hideEdit ="true";
  editrights(){
    if(localStorage.getItem('Edit') == 'true'){
      this.hideEdit="false";
      console.log(this.hideEdit)
    }else{
      this.hideEdit= "true";
    }
  
  }

  ngOnInit(): void {
    this.editrights();
    this. deleterights();
    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {

    
   this.router.navigate(['login'])
   this.openSnackBar('Session Expired', 'Sure');
   localStorage.clear();
    console.log('Time is up!')});
  
 
    this.formGroup= this.formBuilder.group({





   'VENDORCATEGORY' : this.vendorCategoryControl,
    'VENDORNAME': this.vendorNameFormControl,
    'VENDORSHORTNAME': this.vendorShortNameControl,
    'PRINCIPALEXECUITIVE': this.principalexecutiveFormControl,
    'OFFICEADDRESS':this.officeAddressFormControl,
    'OFFICETELEPHONE': this.officeTelephone1FormControl,
    'OFFICE2TEL': this.officeTelephone2FormControl,
   'OFFICEMOBILE':  this.officeMobile1FormControl,
   'OFFICEEMAIL' :this.officeemailFormControl,
    'OFFICEMOBILE2': this.officeMobile2FormControl,
    'VENDORSTATUS': this.vendorStatusFormControl ,

     'ENLISTED':this.enlistedonpreferredpanelFormControl,
    'DATEENLISTED': this.dateofenlistementFormControl ,
    'DATEOFRENSLISTED': this.dateofReenlistementFormControl,
     'DATEOFSUSPENSION':this.dateofsuspensionFormControl ,
     'DATEOFDELISTMENT':this.dateofdelistmentFormControl ,
     'CATEGORYHBL':this.categoryofHBLFormControl ,
    'VALUATIONLIMIT': this.valutionLimitFormControl ,
    'ENSLITEDCITY': this.enlistedCityFormControl ,
    'REMARKS': this.RemarksFormControl




          });
    this.loadCustomerDemographicData();
    console.log("customer Demographics");
    console.log(this.restservice.getRoleData());
    console.log(localStorage.getItem('Edit'));
    console.log(localStorage.getItem('View'));
    console.log(localStorage.getItem('Delete'));





    if (localStorage.getItem('Edit') == 'true' && localStorage.getItem('Delete') == 'false' && localStorage.getItem('View') == 'false') {

      this.hideEditButton = false;

      this.hideForm = false;

      this.hideDeleteButton = true;

      console.log("edit given");

    }

    else if (localStorage.getItem('Edit') == 'true' && localStorage.getItem('Delete') == 'true' && localStorage.getItem('View') == 'false') {

      this.hideEditButton = false;

      this.hideForm = false;

      this.hideDeleteButton = false;

      console.log("edit and delete given");

    }

    else if (localStorage.getItem('Edit') == 'true' && localStorage.getItem('Delete') == 'false' && localStorage.getItem('View') == 'true') {

      this.hideEditButton = false;

      this.hideForm = false;

      this.hideDeleteButton = true;

      console.log("all rights given");

    }

    else if (localStorage.getItem('Edit') == 'false' && localStorage.getItem('Delete') == 'true' && localStorage.getItem('View') == 'true') {

      this.hideEditButton = true;

      this.hideForm = true;

      this.hideDeleteButton = false;

      console.log("delete and view given");

    }

    else if (localStorage.getItem('Edit') == 'false' && localStorage.getItem('Delete') == 'false' && localStorage.getItem('View') == 'true') {

      this.hideEditButton = true;

      this.hideForm = true;

      this.hideDeleteButton = true;



      console.log("NONE given");

    }



  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
;
  }
  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
}
  goback(){
    console.log("goback")
    this.router.navigate(['dashboard'])
  }
  alphanumeric(searchValue: string)
    { 
    var letters = /^[0-9a-zA-Z]+$/;
    if(searchValue.match(letters))
    {
   // alert('Your registration number have accepted : you can try another');
    return true;
    }
    else
    {
    alert('Please input alphanumeric characters only');
    return false;
    }
    }
  addCustomerDemographic() {
    // this.vendorManagementDetails.dateofenlistement = this._dateFormatPipe.transform(this.vendorManagementDetails.dateofenlistement);
    // this.vendorManagementDetails.dateofReenlistement = this._dateFormatPipe.transform(this.vendorManagementDetails.dateofReenlistement);
    // this.vendorManagementDetails.dateofsuspension = this._dateFormatPipe.transform(this.vendorManagementDetails.dateofsuspension);
    // this.vendorManagementDetails.dateofdelistment = this._dateFormatPipe.transform(this.vendorManagementDetails.dateofdelistment);
    console.log(this.vendorManagementDetails);
    var today = new Date();
    var user= localStorage.getItem('userFullName')
    this.vendorManagementDetails.createdBy= user;
    if (this.vendorManagementDetails.object_id == "") {
      this.vendorManagementDetails.createdBy= user;
      this.vendorManagementDetails.modifiedOn =today.toString();
      if (this.vendorManagementDetails) {

        this.vendorManagementService.createCustomerDemorgaphics(this.vendorManagementDetails).subscribe((data: {}) => {
          this.vendorManagementDetails.createdBy= user;
          //this.toastr.success('Customer Added Successfully');
          this.openSnackBar('Vendor Added Successfully','Sure');

          this.clearform();

          this.loadCustomerDemographicData();

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.vendorManagementDetails.modifiedBy= user;
        this.vendorManagementService.updateCustomerDemorgaphics(this.vendorManagementDetails.vendorCategory, this.vendorManagementDetails).subscribe((data: {}) => {

        //  this.toastr.success('Customer Updated Successfully');

        this.openSnackBar('Vendor Updated Successfully','Sure');

        })

        location.reload();

      }



    }

  }

  fetchByTab() {

    if (!this.vendorManagementDetails.vendorCategory) {

      return this.vendorManagementService.getCustomerDemographic(this.vendorManagementDetails.vendorCategory).subscribe((data: {}) => { })

    }

  }

  onFocusOut() {

    console.log("Inside Focus");

    var data = this.vendorManagementService.getCustomerDemographicData()

    console.log('data ka zero index : ', data[0]);

    this.vendorManagementDetails = {

      object_id: data[0]._id,
     // vendorCategory: data[0].vendorCategory,
      vendorCategory : data[0].vendorCategory,
      vendorName : data[0].vendorCategory,
      vendorShortName : data[0].vendorCategory,
      principalexecutive : data[0].vendorCategory,
      officeAddress : data[0].vendorCategory,
      officeTelephone1 : data[0].vendorCategory,
      officeTelephone2 : data[0].vendorCategory,
      officeMobile1 : data[0].vendorCategory,
      officeMobile2 : data[0].vendorCategory,
      officeemail : data[0].vendorCategory,
      vendorStatus : data[0].vendorCategory,
      enlistedonpreferredpanel : data[0].vendorCategory,
      dateofenlistement : data[0].vendorCategory,
      dateofReenlistement : data[0].vendorCategory,
      dateofsuspension : data[0].vendorCategory,
      dateofdelistment : data[0].vendorCategory,
      categoryofHBL : data[0].categoryofHBL,
      valutionLimit : data[0].valutionLimit,
      enlistedCity : data[0].enlistedCity,
      Remarks : data[0].Remarks,
      dataStatus: data[0].dataStatus,
      createdBy:data[0].createdBy,
      modifiedBy: data[0].modifiedBy,
     // createdBy : "",

  createdOn: data[0].createdOn,
  // modifiedBy:   data[0].modifiedBy,
   modifiedOn :   data[0].modifiedOn,
   deletedBy: data[0].deletedBy,
   deletedOn: data[0].deletedOn,
      active: data[0].active



    };

  }



  onSearchChange(searchValue: string) {

    console.log(searchValue);

    return this.vendorManagementService.getCustomerDemographic(this.vendorManagementDetails.vendorCategory).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.vendorManagementService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadCustomerDemographicData() {
 return this.vendorManagementService.getCustomerDemographics().subscribe((data: {}) => {
      this.allvendorManagementDetails = data;
      this.dataSource = new MatTableDataSource(this.allvendorManagementDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }
  isDisabled: boolean = false;
  disable() {
    this.isDisabled = true
  }
  validaions(){

    if(!this.vendorManagementDetails.vendorCategory){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.vendorName){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.dateofReenlistement){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.dateofdelistment){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.dateofenlistement){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.officeAddress){this.openSnackBar('please enter all the required fields','Sure');}

   else if(!this.vendorManagementDetails.officeMobile1){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.officeMobile2){this.openSnackBar('please enter all the required fields','Sure');}

   else if(!this.vendorManagementDetails.officeTelephone1){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.officeTelephone2){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.officeMobile2){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.dateofsuspension){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.principalexecutive){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.valutionLimit){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.vendorShortName){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.vendorStatus){this.openSnackBar('please enter all the required fields','Sure');}
  
   else if(!this.vendorManagementDetails.enlistedCity){this.openSnackBar('please enter all the required fields','Sure');}
   else if(!this.vendorManagementDetails.Remarks){this.openSnackBar('please enter all the required fields','Sure');}
   //     !this.vendorManagementDetails.vendorShortName || !this.vendorManagementDetails.principalexecutive
  //     || !this.vendorManagementDetails.officeAddress || !this.vendorManagementDetails.officeTelephone1
  //     || !this.vendorManagementDetails.officeTelephone2 || this.vendorManagementDetails.officeMobile1
  //     ||this.vendorManagementDetails.officeMobile2|| this.vendorManagementDetails.officeemail||
  //     this.vendorManagementDetails.vendorStatus
  //     ||this.vendorManagementDetails.enlistedonpreferredpanel||this.vendorManagementDetails.dateofenlistement
  //     || this.vendorManagementDetails.dateofdelistment||this.vendorManagementDetails.dateofsuspension
      
  //     ||this.vendorManagementDetails.categoryofHBL ||this.vendorManagementDetails.valutionLimit
  //     ||this.vendorManagementDetails.enlistedCity||this.vendorManagementDetails.Remarks){
  //       this.openSnackBar('please enter all the required fields','Sure');

    
// if(this.pledgejointDetails.primeNumber.length<6){
//   this.openSnackBar('please enter primeNumber of 6 digits','Sure');

// }
    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
   
    return 0;
  }

  editCustomerDemographic(vendorManagementData) {
    window.confirm('Are you sure, you want to edit?')
this.disable();
    this.vendorManagementDetails = vendorManagementData;



    this.VisiblitypNumb = true

  }



  clearform() {

    this.vendorManagementDetails.vendorCategory = "";
    this.vendorManagementDetails.vendorName = "";
    this.vendorManagementDetails.vendorShortName = "";
    this.vendorManagementDetails.principalexecutive = "";
    this.vendorManagementDetails.officeAddress = "";
    this.vendorManagementDetails.officeTelephone1 = "";
    this.vendorManagementDetails.officeTelephone2="";
    this.vendorManagementDetails.officeMobile1="";
    this.vendorManagementDetails.officeMobile2="";
    this.vendorManagementDetails.officeemail ="",
    this.vendorManagementDetails.vendorStatus ="",
    this.vendorManagementDetails.enlistedonpreferredpanel ="",
    this.vendorManagementDetails.dateofenlistement ="",
    this.vendorManagementDetails.dateofReenlistement ="",

    this.vendorManagementDetails.dateofsuspension ="",
    this.vendorManagementDetails.dateofdelistment ="",
    this.vendorManagementDetails.categoryofHBL ="",
    this.vendorManagementDetails.valutionLimit ="",

    this.vendorManagementDetails.enlistedCity ="",
    //this.vendorManagementDetails.enlistedCity ="",


    this.vendorManagementDetails.dataStatus ="",
    this.vendorManagementDetails.createdBy = "";

    this.vendorManagementDetails.createdOn= "";
    this.vendorManagementDetails.modifiedBy= "";
    this.vendorManagementDetails.modifiedOn = "";
    this.vendorManagementDetails.deletedBy= "";
     this.vendorManagementDetails.deletedOn= "";

    // this.vendorManagementDetails.dataStatus = "";

    // this.vendorManagementDetails.customerType = "";

  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.vendorManagementService.getCustomerDemographic(this.tablevendorCategory).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.allvendorManagementDetails = this.inputdata;

      this.vendorManagementService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });

  }

  hideDelete ="true";

  deleterights(){
    if(localStorage.getItem('Delete') == 'true'){
      this.hideDelete="false";
      console.log(this.hideDelete)
    }else{
      this.hideDelete= "true";
    }

  }

  deleteCustomer(vendorCategory) {
    console.log(vendorCategory)
     if (window.confirm('Are you sure, you want to delete?')) {
      var user= localStorage.getItem('userFullName')
      this.vendorManagementDetails.deletedBy = user;
      var today = new Date();
      this.vendorManagementService.deleteCustomersdemographic(vendorCategory).subscribe(data => {
       //this.toastr.success('Customer deleted Successfully');
       this.openSnackBar('Vendor deleted Successfully','Sure');

        this.loadCustomerDemographicData();

      })

    }

  }

}
