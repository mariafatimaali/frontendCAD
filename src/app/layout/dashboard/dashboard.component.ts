import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserIdleService } from 'angular-user-idle';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public isViewable : boolean;
    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(   public router: Router,
        private _snackBar: MatSnackBar,
        private userIdle: UserIdleService,) {
        
        this.places = [
            {
                imgSrc: 'assets/images/card-1.jpg',
                place: 'Cozy 5 Stars Apartment',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
                charge: '$899/night',
                location: 'Barcelona, Spain'
            },
            {
                imgSrc: 'assets/images/card-2.jpg',
                place: 'Office Studio',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
                charge: '$1,119/night',
                location: 'London, UK'
            },
            {
                imgSrc: 'assets/images/card-3.jpg',
                place: 'Beautiful Castle',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
                charge: '$459/night',
                location: 'Milan, Italy'
            }
        ];
    }

    ngOnInit() {



        

    this.userIdle.startWatching();
    
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => console.log(count));
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {

    
   this.router.navigate(['login'])
   this.openSnackBar('Session Expired', 'Sure');
    console.log('Time is up!')});
//     this.userIdle.ping$.subscribe(() => {
    
//    this.router.navigate(['login'])
//     console.log("PING")});
 
    }
    disable;
    ticklers(){
this.disable ="hi";
    }
    maria(){
    this.disable="he"
    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 9000,
        });
        console.log("this")
          ;
      }
      custrout(){
        this.router.navigate(['/customer-demo']);
    }
    vendor(){
        this.router.navigate(['/vendor-managenment'])
    }

    condMo(){
        this.router.navigate(['/cp-monitoring']);
    }
    
    logbook(){
        this.router.navigate(['/logbook']);
    }
    
    cplogbook(){
        this.router.navigate(['/cp-logbook-approved']);
    }
    
    Document(){
        this.router.navigate(['/documentD']);
    }
    
    conditions(){
        this.router.navigate(['/cp-monitoring'])
    }
    
    sbpwaivers(){
        this.router.navigate(['/sbp-waivers'])
    
    }
    tickler(){
       
      this.isViewable = !this.isViewable; 
    
    }
    stockreport(){  this.router.navigate(['/stock-report'])
}
    stockinspection(){  this.router.navigate(['/stock-hypo'])
}
    stockinspectionPledge(){  this.router.navigate(['/stock-pledge'])
}
    insutancetickler(){  this.router.navigate(['/tickler-insurance'])
}
    vakuationExpiry(){  this.router.navigate(['/valuation-expiry'])
}
    legalReview(){  this.router.navigate(['/documentL'])
}
    creditprposal(){  this.router.navigate(['/credit-proposal'])
}
    Safein(){  this.router.navigate(['/safe-in'])
}
    
          
            jointInspection(){
        this.router.navigate(['/pledge-joint'])
        //this.router.navigate   
            }
            
user(){
    this.router.navigate(['/user'])
}
users(){
    this.router.navigate(['/viewdocs'])
}
}
