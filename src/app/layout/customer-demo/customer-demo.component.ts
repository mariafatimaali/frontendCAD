import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerDemographicService } from "../../_services/customerDemographic/customer-demographic.service";
import { RestService } from '../../services/rest.service';
import { NgForm, MinLengthValidator } from '@angular/forms';
import { BranchService } from '../../_services/branches/branches.service';
import { CustService } from '../../_services/custdemo/custdemo.service';
//import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
// import { CustDemoService } from '../../_service/cust-demo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserIdleService } from 'angular-user-idle';
import * as XLSX from 'xlsx';
export interface PeriodicElement {
  primeNumber: string;

}

interface businessSegment {
  value: string;
  viewValue: string;
}
interface regions {
  value: string;
  viewValue: string;
}
interface customer {
  value: string;
  viewValue: string;
}
@Component({

  selector: 'app-customer-demo',
  templateUrl: './customer-demo.component.html',
  styleUrls: ['./customer-demo.component.css']

})
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
export class CustomerDemoComponent implements OnInit {
//   window.addEventListener("beforeunload", function (e) {
//     exampleService.logout();
//  });
  durationInSeconds = 5;
  business: businessSegment[] = [
    { value: 'Corporate', viewValue: 'Corporate' },
    { value: 'Commercial', viewValue: 'Commercial' },
    { value: 'FI', viewValue: 'FI' },
    { value: 'Islamic', viewValue: 'Islamic' },
    { value: 'Remedial Assets', viewValue: 'Remedial Assets' },
    { value: 'Retail', viewValue: 'Retail' },
    { value: 'Structured Credit', viewValue: 'Structured Credit' },
  
  ];
  status: customer[] = [
    { value: 'Adjusted', viewValue: 'Adjusted' },
     
    { value: 'Litigation', viewValue: 'Litigation' },
 
    { value: 'NPL', viewValue: 'NPL' },
    { value: 'Regular', viewValue: 'Regular' },
    { value: 'Write-off', viewValue: 'Write-off' },

   

  ];
Gujranwala
  Region: regions[] = [
    { value: 'Bahawalpur', viewValue: 'Bahawalpur' },
    { value: 'Faisalabad', viewValue: 'Faisalabad' },
    { value: 'Gujranwala', viewValue: 'Gujranwala' },
    { value: 'Gujrat', viewValue: 'Gujrat' },
    { value: 'Hyderabad', viewValue: 'Hyderabad' },
    { value: 'Islamabad', viewValue: 'Islamabad' },
    { value: 'Jhelum', viewValue: 'Jhelum' },
    { value: 'Karachi', viewValue: 'Karachi' },
   
    { value: 'Lahore', viewValue: 'Lahore' },
    { value: 'Mardan', viewValue: 'Mardan' },
    { value: 'Mirpur', viewValue: 'Mirpur' },
    { value: 'Multan', viewValue: 'Multan' },
    { value: 'Muzaffarabad ', viewValue: 'Muzaffarabad ' },
    { value: 'Peshawar', viewValue: 'Peshawar' },
    { value: 'Quetta', viewValue: 'Quetta' },
    { value: 'Sahiwal', viewValue: 'Sahiwal' },
    { value: 'Sargodha', viewValue: 'Sargodha' },
    { value: 'Sialkot', viewValue: 'Sialkot' },
    { value: 'Sukkur', viewValue: 'Sukkur' },

  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  formGroup: FormGroup;
  primeFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  //primeFormControl = new FormControl('', Validators.compose([Validators.minLength(6), Validators.required]));
  BranchCodeFormControl = new FormControl('', [Validators.required]);
  branchNameControl = new FormControl('', [Validators.required]);
  nameOfBorrowerFormControl = new FormControl('', [Validators.required, Validators.maxLength(35)]);
  groupCodeFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  regionFormControl = new FormControl('', [Validators.required]);
  nameOfGroupFormControl = new FormControl('', [Validators.required]);
  customerStatusFormControl = new FormControl('', [Validators.required]);
  cnicFormControl = new FormControl('', [Validators.required, Validators.minLength(13)]);
  sbpCodeFormControl = new FormControl('', [Validators.required]);
  customerTypeFormControl = new FormControl('', [Validators.required]);
  businessSegmentFormControl = new FormControl('', [Validators.required]);
  // customerStatusFormControl = new FormControl('', [Validators.required]);
  // matcher = new MyErrorStateMatcher();
  displayedColumns = ['select', 'delete','primeNumber', 'businessSegment', 'region', 'branchCode', 'branchName', 'nameOfBorrower', 'groupCode',
    'nameOfGroup', 'customerStatus', 'cnic', 'sbpCode', 'customerType','createdBy','createdOn','modifiedBy','modifiedOn'];
  dataSource = new MatTableDataSource();
  places: Array<any> = [];

  ///////////////////////////////////Table Sesarch Prome Number///////////////////////////
  tableprimenumber: number;
  ///////////////////////////////////Pagination Veriables//////////////////////////////////
  pageSize = 5;
  page: any = 1;
  previousPage: any;
  totalRec: number;
  //////////////////////////////////Data Veriables////////////////////////////////////////
  inputdata: any = [];
  allCustomerDemographicDetails: any = [];
  allBranchesDetails: any = [];
  //selectedBranch :allBranchesDetails[];
  selectedBranch: any;
  form: FormGroup;
  BranchName: string;
  tranList: any;

  //////////////////////////////////Visiblity Veriables///////////////////////////////////
  // indexedArray: {[key: string]: number}
  //   indexedArray: {[key: string]: number} = {
  //     HBLPlaza: 786 ,
  //     Annexe: 785
  // }





  public VisiblitypNumb: boolean = false;
  public hideEditButton: boolean = false;
  public hideDeleteButton: boolean = false;
  public hideForm: boolean = false;
  public hideDataTable: boolean = false;

  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @Input() customerDemographicDetails = {
    object_id: "",
    primeNumber: "",
    businessSegment: "",
    region: "",
    branchCode: "",
    branchName: "",
    nameOfBorrower: "",
    groupCode: "",
    nameOfGroup: "",
    customerStatus: "",
    cnic: "",
    sbpCode: "",
    customerType: "",
    active: "",
    createdBy : "",

    createdOn: "",
     modifiedBy:   "",
     modifiedOn :   "",
     deletedBy:  "",
     deletedOn: "",



  };


  // @Input() users =
  //         {
  //            customerNumber:"CCERRR",

  //         }
  @Input() branchDetails = {
    object_id: "",
    BranchName: "",
    BranchCode: ""

  };

  constructor(
    private formBuilder: FormBuilder,
    private customerdemographicService: CustomerDemographicService,
    private branchService: BranchService,
    public actRoute: ActivatedRoute,
    ///  private toastr: ToastrService,
    public router: Router,
    private userIdle: UserIdleService,
    private _snackBar: MatSnackBar,
    private restservice: RestService,
    private custService: CustService

  ) {


  }

  hideEdit ="true";

  editrights(){
    if(localStorage.getItem('Edit') == 'true'){
      this.hideEdit="false";
      console.log(this.hideEdit)
    }else{
      this.hideEdit= "true";
    }

  }
  // primeFormControl;
  ngOnInit(): void {
    this. deleterights();
    this.editrights();
    //   this.formGroup = new FormGroup({
    //     primeNumber : new FormControl('', [ Validators.required])
    //     // 'PRIMENUMBER'= new FormControl('', [ Validators.required]);
    //  });
    this.formGroup = this.formBuilder.group({
      'PRIMENUMBER': this.primeFormControl,
      'BRANCHCODE': this.BranchCodeFormControl,
      'BRANCHNAME': this.branchNameControl,
      'NAMEOFBORROWER': this.nameOfBorrowerFormControl,
      'GROUPCODE': this.groupCodeFormControl,
      'NAMEOFGROUP': this.nameOfGroupFormControl,
      'CUSTOMERSTATUS': this.customerStatusFormControl,
      'CNIC': this.cnicFormControl,
      'CUSTOMERTYPE': this.customerTypeFormControl,
      'SBPCODE': this.sbpCodeFormControl,
      'REGION': this.regionFormControl,
      'BS': this.businessSegmentFormControl



    });
    this.loadCustomerDemographicData();
    this.onSubmit();


    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {

    
   this.router.navigate(['login'])
   localStorage.clear();
   this.openSnackBar('Session Expired', 'Sure');
    console.log('Time is up!')});
  //   this.userIdle.ping$.subscribe(() => {
    
  //  this.router.navigate(['login'])
  //   console.log("PING")});
 
  // stop() {
  //   this.userIdle.stopTimer();
  // }
 
  // stopWatching() {
  //   this.userIdle.stopWatching();
  // }
 
  // startWatching() {
  //   this.userIdle.startWatching();
  // }
 
  // restart() {
  //   this.userIdle.resetTimer();
  // }




    
   // this.loadBranches();

    //this.custdemo();

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
  // loadBranches(){
  //   return this.branchService.getCustomerDemographics().subscribe((data:{})=>{
  //     this.allBranchesDetails = data;
  //     console.log(this.allBranchesDetails);
  //     this.selectedBranch = this.allBranchesDetails[0];
  //     localStorage.setItem("branchName",this.customerDemographicDetails.branchName);
  // console.log("hiiiiii",this.selectedBranch);

  //    // onChangebranchCode();
  //   });
  // }

  onSubmit() {

    console.log(this.formGroup);

  }
  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');
  
}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 9000,
    });
    console.log("this")
      ;
  }
goback(){
  console.log("goback")
  this.router.navigate(['dashboard'])
}
  validaions(){

    if(!this.customerDemographicDetails.primeNumber ||!this.customerDemographicDetails.businessSegment||
      !this.customerDemographicDetails.cnic || !this.customerDemographicDetails.region
      || !this.customerDemographicDetails.sbpCode || !this.customerDemographicDetails.nameOfGroup
      || !this.customerDemographicDetails.nameOfBorrower || this.customerDemographicDetails.groupCode
      ||this.customerDemographicDetails.sbpCode|| this.customerDemographicDetails.customerType||
      this.customerDemographicDetails.customerStatus){
        this.openSnackBar('please enter all the required fields','Sure');
  
    }
  if(this.customerDemographicDetails.primeNumber.length<6){
  this.openSnackBar('please enter primeNumber of 6 digits','Sure');
  
  }
  if(this.customerDemographicDetails.cnic.length<13){
    this.openSnackBar('please enter cnic of 13 digits','Sure');
    
    }
    else{
      this.addCustomerDemographic();
      console.log('hiii')
      return 0;
    };
   
    return 0;
  }
  
  
  addCustomerDemographic() {
    window.confirm('Want to Save this Record?')
// alert.confirm("Want to Save this Record?” ")
    console.log(this.customerDemographicDetails);
    var user= localStorage.getItem('userFullName')
    var today = new Date();
    if (this.customerDemographicDetails.object_id == "") {

      if (this.customerDemographicDetails) {
        this.customerDemographicDetails.createdBy= user;
        this.customerDemographicDetails.createdOn =today.toString();
        console.log(this.customerDemographicDetails.createdOn)
        //         var branch_code_id = this.customerDemographicDetails.branchCode;
        // this.customerDemographicDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        this.customerdemographicService.createCustomerDemorgaphics(this.customerDemographicDetails).subscribe(() => {
          this.customerDemographicDetails.createdBy= user;
          //   this.toastr.success('Customer Added Successfully');
          this.openSnackBar('Customer Added Successfully', 'Sure');
          this.clearform();

          this.loadCustomerDemographicData();

        })

      }

    }

    else {

      if (window.confirm('Are you sure, you want to update?')) {
        this.customerDemographicDetails.modifiedBy= user;
        this.customerDemographicDetails.modifiedOn =today.toString();
        //  var branch_code_id = this.customerDemographicDetails.branchCode;
        //         this.customerDemographicDetails.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
        console.log(this.customerDemographicDetails.branchCode)
        this.customerdemographicService.updateCustomerDemorgaphics(this.customerDemographicDetails.primeNumber, this.customerDemographicDetails).subscribe(() => {

          // this.toastr.success('Customer Updated Successfully');

          this.openSnackBar('Customer Updated Successfully', 'Sure');

        })

        location.reload();

      }



    }

  }

  fetchByTab() {


    if (!this.customerDemographicDetails.primeNumber) {
      return this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })

    }

  }

  onload() {
    console.log("hiiii");
    localStorage.setItem("branchName", this.customerDemographicDetails.branchName);

  }
  ongetload() {
    localStorage.getItem(this.customerDemographicDetails.branchName)
  }

  // public categoryChange( $event: Category ) {
  //   this.selectedBranch = this.allBranchesDetails.filter( _BranchName => _BranchName.belongsTo( $event));
  // }
  branchCodee;
  branchNamee;
  data;
  onkeyup(){

    this.customerdemographicService.findOneCustomerDemographics(this.customerDemographicDetails.primeNumber).subscribe((datafind :{})=>{
    console.log("mariaaaa",datafind)
    console.log( Object.keys( datafind ).length ) ;
    var length = Object.keys( datafind ).length
    if(length==1){
      alert("Prime Number already exist")
     
    }
    else{
      this.onFocusOut();
    }
    })
  }
  onFocusOut() {
    //this.onkeyup();
    this.customerdemographicService.findOneCustomerDemographics(this.customerDemographicDetails.primeNumber).subscribe((datafind :{})=>{

var data = datafind

   console.log(data)
    // var data = this.customerdemographicService.getCustomerDemographicData()


    if (data == 1) {
      console.log("caddddddd")
      // this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe(() => { })
      //var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);
      this.customerDemographicDetails = {
        object_id: data[0]._id,
        primeNumber: data[0].primeNumber,
        businessSegment: data[0].businessSegment,
        region: data[0].region,
        branchCode: data[0].branchCode,
        branchName: data[0].branchName,
        nameOfBorrower: data[0].nameOfBorrower,
        groupCode: data[0].groupCode,
        nameOfGroup: data[0].nameOfGroup,
        customerStatus: data[0].customerStatus,
        cnic: data[0].cnic,
        sbpCode: data[0].sbpcode,
        customerType: data[0].customerType,
        active: data[0].active,
        createdBy:data[0].createdBy,
        modifiedBy: data[0].modifiedBy,
       // createdBy : "",

    createdOn: data[0].createdOn,
    // modifiedBy:   data[0].modifiedBy,
     modifiedOn :   data[0].modifiedOn,
     deletedBy: data[0].deletedBy,
     deletedOn: data[0].deletedOn,

      };
      console.log(this.customerDemographicDetails);
    }



    else   {
      console.log("here")
      console.log(this.customerDemographicDetails.primeNumber)
      this.custService.cust(this.customerDemographicDetails.primeNumber).subscribe((data: {}) => {
        console.log(data);
        this.custdata = data;
        this.customerTypeName = this.custdata.data.basicDetail.customertTypeName;
        this.cnicdata = this.custdata.data.customerCnicDetails;
      //  this.sbpcode = this.custdata.data.basicDetail["sbpCode "];
    
        this.nameOfBorrower = this.custdata.data.basicDetail.customerFullName;
        console.log(this.custdata.data.customerCnicDetails[0].cnic)
        if(!this.custdata.data.customerCnicDetails[0].cnic){
          console.log("hhhhhhhhhhhhwedhkajdajksdhakhdakjdha")

          this.cnicdata = "Value not in Mysis";
          console.log(this.cnicdata)

        }

        else{
          this.cnicdata = this.custdata.data.customerCnicDetails[0].cnic;
        }
console.log("mariaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffff",this.custdata.data.basicDetail["sbpCode "])
        if(!this.custdata.data.basicDetail["sbpCode "]){
          
          this.sbpcode="Value not in Mysis"
         console.log("hereeeeeeeeeee")
        }
        else{
         // this.sbpcode="Value not in Mysis"
          this.sbpcode= this.custdata.data.basicDetail["sbpCode "];
          console.log("hereeeeeeeeeeeMissys")
        }
        if(!this.custdata.data.customerLimitHeader.groupCode){
 this.groupCode="Value not in Mysis"
         }
         else{
           this.groupCode = this.custdata.data.customerLimitHeader.groupCode;
         }
        if(!this.custdata.data.basicDetail.groupName2){
          this.groupName="Value not in Mysis"
        }
      else{
        this.groupName = this.custdata.data.basicDetail.groupName2;
 
       }
        this.totalFBlimit = this.custdata.data.customerLimitDetail[0]["limitAmount "];
        this.totalNFBlimit = this.custdata.data.customerLimitDetail[1]["limitAmount "];
        this.totalLimit = this.custdata.data.customerLimitDetail[1]["limitAmount "];
//        this.groupName = this.custdata.data.basicDetail.groupName2;
        this.cpExpiryDate= this.custdata.data.customerLimitDetail[0].limitExpiryDate;
        this.branchCodee = this.custdata.data.basicDetail.branchMnemonic;
        this.branchNamee=this.custdata.data.basicDetail.branchName;

        // console.log("sbpcode", this.sbpcode);
        // console.log(this.custdata.data.basicDetail.customertTypeName);//customerType

        // console.log(this.custdata.data.customerCnicDetails);
        // console.log(this.custdata.data.basicDetail["sbpCode "]);//sbpcode
        // console.log(this.custdata.data.basicDetail.customerFullName);//name of borrower
        // console.log(this.custdata.data.basicDetail.groupName2);//groupName
        // console.log(this.custdata.data.customerLimitDetail[0]["limitAmount "])//total FB Limit
        // console.log(this.custdata.data.customerLimitDetail[1]["limitAmount "]);//total NFB Limit
        // console.log(this.custdata.data.customerLimitDetail[1]["limitAmount "]);//total limit
        // console.log(this.custdata.data.customerLimitHeader.groupCode);//groupCode
        // console.log(this.custdata.data.customerLimitDetail[0].limitExpiryDate);//limitExpiryDate

        this.customerDemographicDetails = {
          object_id: "",
          primeNumber: this.customerDemographicDetails.primeNumber,
          businessSegment: "",
          region: "",
          branchCode:this.branchCodee,
          branchName: this.branchNamee,
          nameOfBorrower: this.nameOfBorrower,
          groupCode: this.groupCode,
          nameOfGroup: this.groupName,
          customerStatus: "",
          cnic: this.cnicdata,
          sbpCode: this.sbpcode,
          customerType: this.customerTypeName,
          active: "",
          // createdBy:"",
          // modifiedBy: "",
          createdBy : "",

createdOn:"",
 modifiedBy:  "",
 modifiedOn : "",
 deletedBy: "",
 deletedOn:"",
        };
        
      },
        error => {
          console.log("Error");
        }
      );

      console.log("Inside Focus");
      // var data = this.customerdemographicService.getCustomerDemographicData()
      // console.log('data ka zero index : ', data[0]);

      console.log("hiiiiiiiiii", this.customerDemographicDetails)
    }
  })
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
  onFocusOutBranch() {
    console.log("Inside Focus branch");
    var data = this.branchService.getCustomerDemographicData()
    console.log('data ka zero index : ', data[0]);
    this.branchDetails = {
      object_id: data[0]._id,
      BranchName: data[0].BranchName,
      BranchCode: data[0].BranchCode,
    };

  }





  // CNIC No. (For individual / Proprietorship)	BGPF
  // SBP CIB Code	ZIQ Option
  // Customer type 	CBE
  // Group Code	CBE
  // Name of Group 	CBE
  // Name of Borower / Group	BGPF
  // Total FB Limit	CUE
  // Total NFB Limit	CUE
  // CP Expiry Date	CUE
  // Total Limit	CUE

  // Collateral Type Description

  // CBC9JJ
  // CBF6FA
  // CBNBNK
  // CCAC0A
  // MBZ53H
  custdata;
  cnicdata;
  customerTypeName;
  sbpcode;
  customerFullName;
  groupCode;
  totalFBlimit;
  totalNFBlimit;
  totalLimit;
  cpExpiryDate;
  groupName;
  //var sbpCode = '"sbpcode "'';
  nameOfBorrower;
  custdemo() {
    this.customerDemographicDetails.primeNumber = 'CBC9JJ';
    console.log(this.customerDemographicDetails.primeNumber)
    this.custService.cust(this.customerDemographicDetails.primeNumber).subscribe((data: {}) => {
      console.log(data);
      this.custdata = data;
      this.customerTypeName = this.custdata.data.basicDetail.customertTypeName;
      this.cnicdata = this.custdata.data.customerCnicDetails;
      this.sbpcode = this.custdata.data.basicDetail["sbpCode "];
      this.nameOfBorrower = this.custdata.data.basicDetail.customerFullName;
      this.groupCode = this.custdata.data.customerLimitHeader.groupCode;
      this.totalFBlimit = this.custdata.data.customerLimitDetail[0]["limitAmount "];
      this.totalNFBlimit = this.custdata.data.customerLimitDetail[1]["limitAmount "];
      this.totalLimit = this.custdata.data.customerLimitDetail[1]["limitAmount "];
      this.groupName = this.custdata.data.customerLimitHeader.groupCode;

      console.log(this.custdata.data.basicDetail.customertTypeName);//customerType

      console.log(this.custdata.data.customerCnicDetails);
      console.log(this.custdata.data.basicDetail["sbpCode "]);//sbpcode
      console.log(this.custdata.data.basicDetail.customerFullName);//name of borrower
      console.log(this.custdata.data.basicDetail.groupName2);//groupName
      console.log(this.custdata.data.customerLimitDetail[0]["limitAmount "])//total FB Limit
      console.log(this.custdata.data.customerLimitDetail[1]["limitAmount "]);//total NFB Limit
      console.log(this.custdata.data.customerLimitDetail[1]["limitAmount "]);//total limit
      console.log(this.custdata.data.customerLimitHeader.groupCode);//groupCode
      console.log(this.custdata.data.customerLimitDetail[0].limitExpiryDate);//limitExpiryDate
    },
      error => {
        console.log("Error");
      }
    );
  }
  onSearchChangeBranch(searchValue) {
    console.log("hi mariaaaaa");
    console.log("hi maria", searchValue);
    //console.log(this.allBranchesDetails.BranchCode)
    //console.log(i);
    var branchIndex = -1;
    for (var i = 0; i < this.allBranchesDetails.length; i++) {
      if (this.allBranchesDetails[i].BranchCode == searchValue) { branchIndex = i; }
    }
    this.customerDemographicDetails.branchName = this.allBranchesDetails[branchIndex].BranchName;
    //   if(this.allBranchesDetails.BranchCode == searchValue){
    // console.log("maatches")
    //   }
    //this.customerDemographicDetails.branchCode=this.allBranchesDetails[searchValue].BranchCode;

    console.log("hiiiii", this.customerDemographicDetails.branchName);
    /// console.log ("hiiiii",this.customerDemographicDetails.branchCode);
    localStorage.setItem("branchCode", this.customerDemographicDetails.branchCode);
    // return this.branchService.getCustomerDemographic(this.branchDetails.BranchCode).subscribe((data: {}) => {

    //   this.inputdata = data

    //   console.log(this.inputdata);

    //   this.branchService.setCustomerDemographicData(data);
    // });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSearchChange(searchValue: string) {
    console.log(searchValue);
    return this.customerdemographicService.getCustomerDemographic(this.customerDemographicDetails.primeNumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.customerdemographicService.setCustomerDemographicData(data);

      //  this.restservice.setCustomerDemographicData(data);



    });



  }
  onChangebranchCode() {
    this.selectedBranch = this.allBranchesDetails[0];
    console.log(this.selectedBranch);
  }

  loadBranches() {
    return this.branchService.getCustomerDemographics().subscribe((data: {}) => {
      this.allBranchesDetails = data;
      console.log('maria', this.allBranchesDetails);

      this.selectedBranch = this.allBranchesDetails[0];

      console.log("hiiiiii", this.selectedBranch);

      // onChangebranchCode();
    });
  }

  loadCustomerDemographicData() {
    return this.customerdemographicService.getCustomerDemographics().subscribe((data: {}) => {
      this.allCustomerDemographicDetails = data;
      this.dataSource = new MatTableDataSource(this.allCustomerDemographicDetails);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      // this.totalRec = (this.allCustomerDemographicDetails.length / 5) * 10;
      //console.log(this.totalRec);
    });
  }
  isDisabled: boolean = false;
  disable() {
    this.isDisabled = true
  }
  editCustomerDemographic(customerDemographicData) {
    window.confirm('Are you sure, you want to edit?')
    this.disable();
   // this.onFocusOut();
    // var branch_code_id = this.customerDemographicData.branchCode;
    //     this.customerDemographicData.branchCode = this.allBranchesDetails[branch_code_id].BranchCode;
    //console.log(this.customerDemographicDetails.branchCode)
    this.customerDemographicDetails = customerDemographicData;
    console.log(this.customerDemographicDetails)
    console.log(this.customerDemographicDetails.branchCode)
    //console.log(this.customerDemographicData.branchCode)
    console.log("i am here");

    this.VisiblitypNumb = true

  }



  clearform() {
    this.customerDemographicDetails.primeNumber = "";
    this.customerDemographicDetails.branchCode = "";
    this.customerDemographicDetails.businessSegment = "";
    this.customerDemographicDetails.region = "";
    this.customerDemographicDetails.branchCode = "";
    this.customerDemographicDetails.branchName = "";
    this.customerDemographicDetails.nameOfBorrower = "";
    this.customerDemographicDetails.groupCode = "";
    this.customerDemographicDetails.nameOfGroup = "";
    this.customerDemographicDetails.customerStatus = "";
    this.customerDemographicDetails.cnic = "";
    this.customerDemographicDetails.sbpCode = "";
    this.customerDemographicDetails.customerType = "";
    this.customerDemographicDetails.createdBy = "";

    this.customerDemographicDetails.createdOn= "";
    this.customerDemographicDetails.modifiedBy= "";
    this.customerDemographicDetails.modifiedOn = "";
    this.customerDemographicDetails.deletedBy= "";
     this.customerDemographicDetails.deletedOn= "";

  }

  searchTableData(searchValue: string) {

    console.log(searchValue);

    return this.customerdemographicService.getCustomerDemographic(this.tableprimenumber).subscribe((data: {}) => {

      this.inputdata = data

      console.log(this.inputdata);

      this.allCustomerDemographicDetails = this.inputdata;

      this.customerdemographicService.setCustomerDemographicData(data);

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

  deleteCustomer() {
    if (window.confirm('Are you sure, you want to delete?')) {
      var user= localStorage.getItem('userFullName')
      this.customerDemographicDetails.deletedBy = user;
      var today = new Date();
      this.customerDemographicDetails.deletedOn =today.toString();
      this.customerdemographicService.deleteCustomersdemographic(this.customerDemographicDetails.primeNumber).subscribe(() => {
        //  this.toastr.success('Customer deleted Successfully');


        this.openSnackBar('Customer Deleted  Successfully', 'Sure');
        this.loadCustomerDemographicData();

      });

    }

  }

}
