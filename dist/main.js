(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_services/branches/branches.service.ts":
/*!********************************************************!*\
  !*** ./src/app/_services/branches/branches.service.ts ***!
  \********************************************************/
/*! exports provided: BranchService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BranchService", function() { return BranchService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var BranchService = /** @class */ (function () {
    function BranchService(http) {
        this.http = http;
        this.apiURL = 'http://localhost:3000/branch';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    BranchService.prototype.createCustomerDemorgaphics = function (branches) {
        console.log(JSON.stringify(branches));
        return this.http.post(this.apiURL, JSON.stringify(branches), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch cplogbookDraft list
    BranchService.prototype.getCustomerDemographics = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    BranchService.prototype.getCustomerDemographic = function (primeNumber) {
        return this.http.get(this.apiURL + '/' + primeNumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    BranchService.prototype.setCustomerDemographicData = function (data) {
        return this.branchdata = data;
    };
    BranchService.prototype.getCustomerDemographicData = function () {
        return this.branchdata;
    };
    // HttpClient API put() method => Update employee
    BranchService.prototype.updateCustomerDemorgaphics = function (BranchCode, branches) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + branches.BranchCode, JSON.stringify(branches), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    BranchService.prototype.deleteCustomersdemographic = function (BranchCode) {
        return this.http.delete(this.apiURL + '/employees/' + BranchCode, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    BranchService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    BranchService.ngInjectableDef = undefined;
    BranchService.ɵfac = function BranchService_Factory(t) { return new (t || BranchService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    BranchService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BranchService, factory: BranchService.ɵfac, providedIn: 'root' });
    return BranchService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BranchService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/cplogbookApproved/cplogbook-Approved.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/_services/cplogbookApproved/cplogbook-Approved.service.ts ***!
  \***************************************************************************/
/*! exports provided: CplogbookApprovedService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CplogbookApprovedService", function() { return CplogbookApprovedService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var CplogbookApprovedService = /** @class */ (function () {
    function CplogbookApprovedService(http) {
        this.http = http;
        //apiURL = 'http://localhost:3000/cplogbook';
        this.apiURL = 'http://172.18.7.29:3000/cplogbook';
        this.apiurl = 'http://172.18.7.29:3000/cplogbookabc';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    CplogbookApprovedService.prototype.createCplogbookApproved = function (cplogbookApproved) {
        console.log(JSON.stringify(cplogbookApproved));
        return this.http.post(this.apiURL, JSON.stringify(cplogbookApproved), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch customerDemorgaphics list
    CplogbookApprovedService.prototype.getCplogbookApproveds = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    CplogbookApprovedService.prototype.getCplogbookApproved = function (primenumber) {
        return this.http.get(this.apiURL + '/' + primenumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    CplogbookApprovedService.prototype.setCplogbookApprovedData = function (data) {
        return this.cplogbookApproveddata = data;
    };
    CplogbookApprovedService.prototype.getCplogbookApprovedData = function () {
        return this.cplogbookApproveddata;
    };
    // HttpClient API put() method => Update employee
    CplogbookApprovedService.prototype.updateCplogbookApproved = function (primenumber, cplogbookApproved) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + cplogbookApproved.primenumber, JSON.stringify(cplogbookApproved), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    CplogbookApprovedService.prototype.deleteCplogbookApproved = function (primenumber) {
        return this.http.delete(this.apiURL + '/' + primenumber, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    CplogbookApprovedService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    CplogbookApprovedService.prototype.findOneCustomerDemographics = function (primeNumber) {
        // console.log (JSON.stringify(primeNumber))
        console.log(primeNumber);
        var data = { "primeNumber": primeNumber };
        return this.http.post(this.apiurl, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    CplogbookApprovedService.ngInjectableDef = undefined;
    CplogbookApprovedService.ɵfac = function CplogbookApprovedService_Factory(t) { return new (t || CplogbookApprovedService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    CplogbookApprovedService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CplogbookApprovedService, factory: CplogbookApprovedService.ɵfac, providedIn: 'root' });
    return CplogbookApprovedService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CplogbookApprovedService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/cplogbookDraft/cplogbook-draft.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/_services/cplogbookDraft/cplogbook-draft.service.ts ***!
  \*********************************************************************/
/*! exports provided: CplogbookDraftService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CplogbookDraftService", function() { return CplogbookDraftService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var CplogbookDraftService = /** @class */ (function () {
    function CplogbookDraftService(http) {
        this.http = http;
        //apiURL = 'http://localhost:3000/cpConditionMonitoring';
        this.apiURL = 'http://172.18.7.29:3000/cpConditionMonitoring';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    CplogbookDraftService.prototype.createCustomerDemorgaphics = function (cplogbookDraft) {
        console.log("addfunction called");
        return this.http.post(this.apiURL, JSON.stringify(cplogbookDraft), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch cplogbookDraft list
    CplogbookDraftService.prototype.getCustomerDemographics = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    CplogbookDraftService.prototype.getCustomerDemographic = function (primeNumber) {
        return this.http.get(this.apiURL + '/' + primeNumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    CplogbookDraftService.prototype.setCustomerDemographicData = function (data) {
        return this.cplogbookDraftdata = data;
    };
    CplogbookDraftService.prototype.getCustomerDemographicData = function () {
        return this.cplogbookDraftdata;
    };
    // HttpClient API put() method => Update employee
    CplogbookDraftService.prototype.updateCustomerDemorgaphics = function (primeNumber, cplogbookDraft) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + cplogbookDraft.primeNumber, JSON.stringify(cplogbookDraft), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    CplogbookDraftService.prototype.deleteCustomersdemographic = function (primeNumber) {
        var p_json = '{"primeNumber":"' + primeNumber + '"}';
        console.log(JSON.stringify(primeNumber));
        return this.http.put(this.apiURL, p_json, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    CplogbookDraftService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    CplogbookDraftService.ngInjectableDef = undefined;
    CplogbookDraftService.ɵfac = function CplogbookDraftService_Factory(t) { return new (t || CplogbookDraftService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    CplogbookDraftService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CplogbookDraftService, factory: CplogbookDraftService.ɵfac, providedIn: 'root' });
    return CplogbookDraftService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CplogbookDraftService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/customerDemographic/customer-demographic.service.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/_services/customerDemographic/customer-demographic.service.ts ***!
  \*******************************************************************************/
/*! exports provided: CustomerDemographicService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerDemographicService", function() { return CustomerDemographicService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var CustomerDemographicService = /** @class */ (function () {
    function CustomerDemographicService(http) {
        this.http = http;
        // apiURL = 'http://localhost:3000/customerDemographic';
        this.apiURL = 'http://172.18.7.29:3000/customerDemographic';
        this.apiurl = 'http://172.18.7.29:3000/customerDemographicabc';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    CustomerDemographicService.prototype.createCustomerDemorgaphics = function (customerDemorgaphics) {
        console.log(JSON.stringify(customerDemorgaphics));
        return this.http.post(this.apiURL, JSON.stringify(customerDemorgaphics), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch customerDemorgaphics list
    CustomerDemographicService.prototype.getCustomerDemographics = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    CustomerDemographicService.prototype.findOneCustomerDemographics = function (primeNumber) {
        // console.log (JSON.stringify(primeNumber))
        console.log(primeNumber);
        var data = { "primeNumber": primeNumber };
        return this.http.post(this.apiurl, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    CustomerDemographicService.prototype.getCustomerDemographic = function (primenumber) {
        return this.http.get(this.apiURL + '/' + primenumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    CustomerDemographicService.prototype.setCustomerDemographicData = function (data) {
        return this.customerDemographicdata = data;
    };
    CustomerDemographicService.prototype.getCustomerDemographicData = function () {
        return this.customerDemographicdata;
    };
    // HttpClient API put() method => Update employee
    CustomerDemographicService.prototype.updateCustomerDemorgaphics = function (primenumber, customerDemorgaphics) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + customerDemorgaphics.primenumber, JSON.stringify(customerDemorgaphics), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    CustomerDemographicService.prototype.deleteCustomersdemographic = function (primenumber) {
        return this.http.put(this.apiURL, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    CustomerDemographicService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    CustomerDemographicService.ngInjectableDef = undefined;
    CustomerDemographicService.ɵfac = function CustomerDemographicService_Factory(t) { return new (t || CustomerDemographicService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    CustomerDemographicService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CustomerDemographicService, factory: CustomerDemographicService.ɵfac, providedIn: 'root' });
    return CustomerDemographicService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CustomerDemographicService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/defanddeferral/defand-deferral.service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/_services/defanddeferral/defand-deferral.service.ts ***!
  \*********************************************************************/
/*! exports provided: DefandDeferralService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefandDeferralService", function() { return DefandDeferralService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var DefandDeferralService = /** @class */ (function () {
    function DefandDeferralService(http) {
        this.http = http;
        //apiURL = 'http://localhost:3000/defanddeferral';
        this.apiURL = 'http://172.18.7.29:3000/defanddeferral';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    DefandDeferralService.prototype.createCustomerDemorgaphics = function (defanddeferral) {
        console.log(JSON.stringify(defanddeferral));
        return this.http.post(this.apiURL, JSON.stringify(defanddeferral), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch customerDemorgaphics list
    DefandDeferralService.prototype.getCustomerDemographics = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    DefandDeferralService.prototype.getCustomerDemographic = function (primeNumber) {
        return this.http.get(this.apiURL + '/' + primeNumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    DefandDeferralService.prototype.setCustomerDemographicData = function (data) {
        return this.defanddeferraldata = data;
    };
    DefandDeferralService.prototype.getCustomerDemographicData = function () {
        return this.defanddeferraldata;
    };
    // HttpClient API put() method => Update employee
    DefandDeferralService.prototype.updateCustomerDemorgaphics = function (primeNumber, defanddeferral) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + defanddeferral.primeNumber, JSON.stringify(defanddeferral), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // deleteCustomersdemographic(primeNumber){
    //   var p_json = '{"primeNumber":"'+ primeNumber + '"}';
    //   console.log(JSON.stringify(primeNumber));
    //   return this.http.delete<defanddeferral>(this.apiURL , p_json)
    //   .pipe(
    //     retry(1),
    //     catchError(this.handleError)
    //   )
    // }
    DefandDeferralService.prototype.deleteCustomersdemographic = function (primenumber) {
        return this.http.delete(this.apiURL + '/employees/' + primenumber, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    DefandDeferralService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    DefandDeferralService.ngInjectableDef = undefined;
    DefandDeferralService.ɵfac = function DefandDeferralService_Factory(t) { return new (t || DefandDeferralService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    DefandDeferralService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DefandDeferralService, factory: DefandDeferralService.ɵfac, providedIn: 'root' });
    return DefandDeferralService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DefandDeferralService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/logBookDraft/logBookDraft.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/_services/logBookDraft/logBookDraft.service.ts ***!
  \****************************************************************/
/*! exports provided: logBookDraftService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logBookDraftService", function() { return logBookDraftService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var logBookDraftService = /** @class */ (function () {
    function logBookDraftService(http) {
        this.http = http;
        //apiURL = 'http://localhost:3000/cplogbookdraft';
        this.apiURL = 'http://172.18.7.29:3000/cplogbookdraft';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    logBookDraftService.prototype.createlogbookdrafts = function (logbookdraft) {
        console.log(JSON.stringify(logbookdraft));
        return this.http.post(this.apiURL, JSON.stringify(logbookdraft), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch customerDemorgaphics list
    logBookDraftService.prototype.getlogBookDrafts = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    logBookDraftService.prototype.getlogBookDraft = function (primenumber) {
        return this.http.get(this.apiURL + '/' + primenumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    logBookDraftService.prototype.setlogBookDraft = function (data) {
        return this.logBookDraftdata = data;
    };
    logBookDraftService.prototype.getlogBookDraftData = function () {
        return this.logBookDraftdata;
    };
    // HttpClient API put() method => Update employee
    logBookDraftService.prototype.updatelogBookDrafts = function (primenumber, logBookDrafts) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + logBookDrafts.primenumber, JSON.stringify(logBookDrafts), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    logBookDraftService.prototype.deletelogBookDraft = function (primenumber) {
        console.log(primenumber);
        return this.http.delete(this.apiURL + '/' + primenumber, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    logBookDraftService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    logBookDraftService.ngInjectableDef = undefined;
    logBookDraftService.ɵfac = function logBookDraftService_Factory(t) { return new (t || logBookDraftService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    logBookDraftService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: logBookDraftService, factory: logBookDraftService.ɵfac, providedIn: 'root' });
    return logBookDraftService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](logBookDraftService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/pledgejoint/pledge-joint.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/_services/pledgejoint/pledge-joint.service.ts ***!
  \***************************************************************/
/*! exports provided: pledgejointService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pledgejointService", function() { return pledgejointService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var pledgejointService = /** @class */ (function () {
    function pledgejointService(http) {
        this.http = http;
        //apiURL = 'http://localhost:3000/pledgejointstockInspectionTickler';
        this.apiURL = 'http://172.18.7.29:3000/pledgejointstockInspectionTickler';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    pledgejointService.prototype.createCustomerDemorgaphics = function (pledgejoint) {
        console.log(JSON.stringify(pledgejoint));
        return this.http.post(this.apiURL, JSON.stringify(pledgejoint), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch customerDemorgaphics list
    pledgejointService.prototype.getCustomerDemographics = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    pledgejointService.prototype.getCustomerDemographic = function (primeNumber) {
        return this.http.get(this.apiURL + '/' + primeNumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    pledgejointService.prototype.setCustomerDemographicData = function (data) {
        return this.pledgejointdata = data;
    };
    pledgejointService.prototype.getCustomerDemographicData = function () {
        return this.pledgejointdata;
    };
    // HttpClient API put() method => Update employee
    pledgejointService.prototype.updateCustomerDemorgaphics = function (primeNumber, pledgejoint) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + pledgejoint.primeNumber, JSON.stringify(pledgejoint), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    pledgejointService.prototype.deleteCustomersdemographic = function (primeNumber) {
        var p_json = '{"primeNumber":"' + primeNumber + '"}';
        console.log(JSON.stringify(primeNumber));
        return this.http.put(this.apiURL, p_json, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    pledgejointService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    pledgejointService.ngInjectableDef = undefined;
    pledgejointService.ɵfac = function pledgejointService_Factory(t) { return new (t || pledgejointService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    pledgejointService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: pledgejointService, factory: pledgejointService.ɵfac, providedIn: 'root' });
    return pledgejointService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](pledgejointService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/roles/roles-service.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/_services/roles/roles-service.service.ts ***!
  \**********************************************************/
/*! exports provided: RoleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleService", function() { return RoleService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var RoleService = /** @class */ (function () {
    function RoleService(http) {
        this.http = http;
        //apiURL = 'http://localhost:3000/user';
        this.deleteURL = 'http://172.18.7.29:3000/maria';
        //deleteURL= 'http://localhost:3000/maria';
        this.apiURL = 'http://172.18.7.29:3000/user';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    RoleService.prototype.createUser = function (roles) {
        console.log(JSON.stringify(roles));
        return this.http.post(this.apiURL, JSON.stringify(roles), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1));
    };
    ;
    // HttpClient API get() method => Fetch Roles list
    RoleService.prototype.getRoles = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // deleteRoles(userid): Observable<roles[]> {
    //   console.log('Delete called', userid);
    //   return this.http.put<roles[]>(this.deleteURL, userid, this.httpOptions)
    //     .pipe(
    //       retry(1),
    //       catchError(this.handleError)
    //     );
    // }
    RoleService.prototype.deleteRoles = function (userid) {
        console.log('Delete called', userid);
        var Userid = JSON.stringify;
        return this.http.delete(this.deleteURL, userid)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    RoleService.prototype.updateRoles = function (userid, roles) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL, JSON.stringify(roles), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    RoleService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    RoleService.ngInjectableDef = undefined;
    RoleService.ɵfac = function RoleService_Factory(t) { return new (t || RoleService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    RoleService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RoleService, factory: RoleService.ɵfac, providedIn: 'root' });
    return RoleService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RoleService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/sbpWaiver/sbp-Waiver.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/_services/sbpWaiver/sbp-Waiver.service.ts ***!
  \***********************************************************/
/*! exports provided: sbpWaiverService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sbpWaiverService", function() { return sbpWaiverService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var sbpWaiverService = /** @class */ (function () {
    function sbpWaiverService(http) {
        this.http = http;
        //apiURL = 'http://localhost:3000/sbpWaiver';
        this.url = 'http://localhost:3000/v1/wsdl/encryptQuery/';
        this.apiURL = 'http://172.18.7.29:3000/sbpWaiver';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    sbpWaiverService.prototype.createCustomerDemorgaphics = function (sbpWaiver) {
        console.log(JSON.stringify(sbpWaiver));
        return this.http.post(this.apiURL, JSON.stringify(sbpWaiver), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    //doc service
    // docservice(sbpWaiver): Observable<sbpWaiver> {
    //   console.log(JSON.stringify(sbpWaiver));
    //   return this.http.post<sbpWaiver>(this.url, JSON.stringify(sbpWaiver), this.httpOptions)
    //     .pipe(
    //       retry(1),
    //       catchError(this.handleError)
    //     )
    // };
    // post(relativePath: string, model: any): Observable<object> {
    //   //this.loaderService.show();
    //   // let headers = new HttpHeaders();
    //   // headers = headers.set('Content-Type', 'application/json');
    //   return this.httpClient.post(this.url + relativePath, model, {
    //   //  headers: headers
    //   }).pipe(
    //     tap(data => {
    //       //this.loaderService.hide(); 
    //     })
    //   );
    // }
    // HttpClient API get() method => Fetch customerDemorgaphics list
    sbpWaiverService.prototype.getCustomerDemographics = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    // getCustomerDemographic(primeNumber): Observable<sbpWaiver> {
    //   console.log("this called.............")
    //   console.log(primeNumber)
    //   return this.http.get<sbpWaiver>(this.apiURL + '/' +primeNumber)
    //     .pipe(
    //       retry(1),
    //       catchError(this.handleError)
    //     )
    // };
    // HttpClient API get() single data method => Fetch employee
    sbpWaiverService.prototype.getCustomerDemographic = function (primeNumber) {
        return this.http.get(this.apiURL + '/' + primeNumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    sbpWaiverService.prototype.getCustomerDemographicc = function (primeNumber) {
        console.log("this called.............");
        console.log(primeNumber);
        return this.http.get(this.apiURL + '/' + ':' + primeNumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    sbpWaiverService.prototype.setCustomerDemographicData = function (data) {
        return this.sbpWaiverdata = data;
    };
    sbpWaiverService.prototype.getCustomerDemographicData = function () {
        return this.sbpWaiverdata;
    };
    // HttpClient API put() method => Update employee
    sbpWaiverService.prototype.updateCustomerDemorgaphics = function (primeNumber, sbpWaiver) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + sbpWaiver.primeNumber, JSON.stringify(sbpWaiver), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    sbpWaiverService.prototype.deleteCustomersdemographic = function (primeNumber) {
        var p_json = '{"primeNumber":"' + primeNumber + '"}';
        console.log(JSON.stringify(primeNumber));
        return this.http.put(this.apiURL, p_json, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    sbpWaiverService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    sbpWaiverService.ngInjectableDef = undefined;
    sbpWaiverService.ɵfac = function sbpWaiverService_Factory(t) { return new (t || sbpWaiverService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    sbpWaiverService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: sbpWaiverService, factory: sbpWaiverService.ɵfac, providedIn: 'root' });
    return sbpWaiverService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](sbpWaiverService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/stockInspection/stock-Inspection.service.ts":
/*!***********************************************************************!*\
  !*** ./src/app/_services/stockInspection/stock-Inspection.service.ts ***!
  \***********************************************************************/
/*! exports provided: stockInspectionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stockInspectionService", function() { return stockInspectionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var stockInspectionService = /** @class */ (function () {
    function stockInspectionService(http) {
        this.http = http;
        //apiURL = 'http://localhost:3000/stockInspectionTickler';
        this.apiURL = 'http://172.18.7.29:3000/stockInspectionTickler';
        this.apiurl = 'http://172.18.7.29:3000/stockInspectionTicklerabc';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    stockInspectionService.prototype.createCustomerDemorgaphics = function (stockInspection) {
        console.log(JSON.stringify(stockInspection));
        return this.http.post(this.apiURL, JSON.stringify(stockInspection), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch customerDemorgaphics list
    stockInspectionService.prototype.getCustomerDemographics = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    stockInspectionService.prototype.findOneCustomerDemographics = function (primeNumber) {
        // console.log (JSON.stringify(primeNumber))
        console.log(primeNumber);
        var data = { "primeNumber": primeNumber };
        return this.http.post(this.apiurl, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    stockInspectionService.prototype.getCustomerDemographic = function (primeNumber) {
        return this.http.get(this.apiURL + '/' + primeNumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    stockInspectionService.prototype.setCustomerDemographicData = function (data) {
        return this.stockInspectiondata = data;
    };
    stockInspectionService.prototype.getCustomerDemographicData = function () {
        return this.stockInspectiondata;
    };
    // HttpClient API put() method => Update employee
    stockInspectionService.prototype.updateCustomerDemorgaphics = function (primeNumber, stockInspection) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + stockInspection.primeNumber, JSON.stringify(stockInspection), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    stockInspectionService.prototype.deleteCustomersdemographic = function (primeNumber) {
        var p_json = '{"primeNumber":"' + primeNumber + '"}';
        console.log(JSON.stringify(primeNumber));
        return this.http.put(this.apiURL, p_json, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    stockInspectionService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    stockInspectionService.ngInjectableDef = undefined;
    stockInspectionService.ɵfac = function stockInspectionService_Factory(t) { return new (t || stockInspectionService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    stockInspectionService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: stockInspectionService, factory: stockInspectionService.ɵfac, providedIn: 'root' });
    return stockInspectionService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](stockInspectionService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/stockReport/stockReport.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/_services/stockReport/stockReport.service.ts ***!
  \**************************************************************/
/*! exports provided: stockReportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stockReportService", function() { return stockReportService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var stockReportService = /** @class */ (function () {
    function stockReportService(http) {
        this.http = http;
        //apiURL = 'http://localhost:3000/stockReportTickler';
        this.apiURL = 'http://172.18.7.29:3000/stockReportTickler';
        this.apiurl = 'http://172.18.7.29:3000/stockReportTicklerabc';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    stockReportService.prototype.createCustomerDemorgaphics = function (stockReport) {
        console.log(JSON.stringify(stockReport));
        return this.http.post(this.apiURL, JSON.stringify(stockReport), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch customerDemorgaphics list
    stockReportService.prototype.getCustomerDemographics = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    stockReportService.prototype.getCustomerDemographic = function (primeNumber) {
        return this.http.get(this.apiURL + '/' + primeNumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    stockReportService.prototype.findOneCustomerDemographics = function (primeNumber) {
        // console.log (JSON.stringify(primeNumber))
        console.log(primeNumber);
        var data = { "primeNumber": primeNumber };
        return this.http.post(this.apiurl, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    stockReportService.prototype.setCustomerDemographicData = function (data) {
        return this.stockReportdata = data;
    };
    stockReportService.prototype.getCustomerDemographicData = function () {
        return this.stockReportdata;
    };
    // HttpClient API put() method => Update employee
    stockReportService.prototype.updateCustomerDemorgaphics = function (primeNumber, stockReport) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + stockReport.primeNumber, JSON.stringify(stockReport), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    stockReportService.prototype.deleteCustomersdemographic = function (primeNumber) {
        var p_json = '{"primeNumber":"' + primeNumber + '"}';
        console.log(JSON.stringify(primeNumber));
        return this.http.put(this.apiURL, p_json, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    stockReportService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    stockReportService.ngInjectableDef = undefined;
    stockReportService.ɵfac = function stockReportService_Factory(t) { return new (t || stockReportService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    stockReportService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: stockReportService, factory: stockReportService.ɵfac, providedIn: 'root' });
    return stockReportService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](stockReportService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/vendorManagement/vendorManagement.service.ts":
/*!************************************************************************!*\
  !*** ./src/app/_services/vendorManagement/vendorManagement.service.ts ***!
  \************************************************************************/
/*! exports provided: vendorManagementService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vendorManagementService", function() { return vendorManagementService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






var vendorManagementService = /** @class */ (function () {
    function vendorManagementService(http) {
        this.http = http;
        // apiURL = 'http://localhost:3000/vendorManagment';
        this.apiURL = 'http://172.18.7.29:3000/vendorManagment';
        /*========================================
           CRUD Methods for consuming RESTful API
         =========================================*/
        // Http Options
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
    }
    // HttpClient API post() method => Create customerDemorgaphics
    vendorManagementService.prototype.createCustomerDemorgaphics = function (vendorManagement) {
        console.log(JSON.stringify(vendorManagement));
        return this.http.post(this.apiURL, JSON.stringify(vendorManagement), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() method => Fetch customerDemorgaphics list
    vendorManagementService.prototype.getCustomerDemographics = function () {
        return this.http.get(this.apiURL)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // HttpClient API get() single data method => Fetch employee
    vendorManagementService.prototype.getCustomerDemographic = function (primeNumber) {
        return this.http.get(this.apiURL + '/' + primeNumber)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    vendorManagementService.prototype.setCustomerDemographicData = function (data) {
        return this.vendorManagementdata = data;
    };
    vendorManagementService.prototype.getCustomerDemographicData = function () {
        return this.vendorManagementdata;
    };
    // HttpClient API put() method => Update employee
    vendorManagementService.prototype.updateCustomerDemorgaphics = function (primeNumber, vendorManagement) {
        console.log('updateCustomerDemographic() called');
        return this.http.put(this.apiURL + '/' + vendorManagement.primeNumber, JSON.stringify(vendorManagement), this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    vendorManagementService.prototype.deleteCustomersdemographic = function (vendorCategory) {
        var p_json = '{"vendorCategory":"' + vendorCategory + '"}';
        console.log(p_json);
        console.log(JSON.stringify(vendorCategory));
        return this.http.put(this.apiURL, p_json, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    vendorManagementService.prototype.handleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        window.alert(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
    };
    ;
    vendorManagementService.ngInjectableDef = undefined;
    vendorManagementService.ɵfac = function vendorManagementService_Factory(t) { return new (t || vendorManagementService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    vendorManagementService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: vendorManagementService, factory: vendorManagementService.ɵfac, providedIn: 'root' });
    return vendorManagementService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](vendorManagementService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _shared_guard_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/guard/auth.guard */ "./src/app/shared/guard/auth.guard.ts");





var routes = [
    {
        path: '',
        loadChildren: function () { return Promise.all(/*! import() | layout-layout-module */[__webpack_require__.e("default~layout-layout-module~login-login-module"), __webpack_require__.e("layout-layout-module")]).then(__webpack_require__.bind(null, /*! ./layout/layout.module */ "./src/app/layout/layout.module.ts")).then(function (m) { return m.LayoutModule; }); },
        canActivate: [_shared_guard_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
    },
    {
        path: 'login',
        loadChildren: function () { return Promise.all(/*! import() | login-login-module */[__webpack_require__.e("default~layout-layout-module~login-login-module"), __webpack_require__.e("default~dashboard-dashboard-module~login-login-module"), __webpack_require__.e("login-login-module")]).then(__webpack_require__.bind(null, /*! ./login/login.module */ "./src/app/login/login.module.ts")).then(function (m) { return m.LoginModule; }); }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, providers: [_shared_guard_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]], imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, {
                    paramsInheritanceStrategy: 'always'
                })],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
    return AppRoutingModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, {
                        paramsInheritanceStrategy: 'always'
                    })],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
                providers: [_shared_guard_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/__ivy_ngcc__/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");





var AppComponent = /** @class */ (function () {
    function AppComponent(translate) {
        this.translate = translate;
        translate.setDefaultLang('en');
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateService"])); };
    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
        } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
    return AppComponent;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: createTranslateLoader, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslateLoader", function() { return createTranslateLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm5/layout.js");
/* harmony import */ var _services_roles_roles_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/roles/roles-service.service */ "./src/app/_services/roles/roles-service.service.ts");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm5/overlay.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _services_branches_branches_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_services/branches/branches.service */ "./src/app/_services/branches/branches.service.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/__ivy_ngcc__/fesm5/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/__ivy_ngcc__/fesm5/ngx-translate-http-loader.js");
/* harmony import */ var _services_customerDemographic_customer_demographic_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_services/customerDemographic/customer-demographic.service */ "./src/app/_services/customerDemographic/customer-demographic.service.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _services_rest_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/rest.service */ "./src/app/services/rest.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _services_cplogbookDraft_cplogbook_draft_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./_services/cplogbookDraft/cplogbook-draft.service */ "./src/app/_services/cplogbookDraft/cplogbook-draft.service.ts");
/* harmony import */ var _services_cplogbookApproved_cplogbook_Approved_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./_services/cplogbookApproved/cplogbook-Approved.service */ "./src/app/_services/cplogbookApproved/cplogbook-Approved.service.ts");
/* harmony import */ var _services_defanddeferral_defand_deferral_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./_services/defanddeferral/defand-deferral.service */ "./src/app/_services/defanddeferral/defand-deferral.service.ts");
/* harmony import */ var _services_logBookDraft_logBookDraft_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./_services/logBookDraft/logBookDraft.service */ "./src/app/_services/logBookDraft/logBookDraft.service.ts");
/* harmony import */ var _services_sbpWaiver_sbp_Waiver_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./_services/sbpWaiver/sbp-Waiver.service */ "./src/app/_services/sbpWaiver/sbp-Waiver.service.ts");
/* harmony import */ var _services_pledgejoint_pledge_joint_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./_services/pledgejoint/pledge-joint.service */ "./src/app/_services/pledgejoint/pledge-joint.service.ts");
/* harmony import */ var _services_vendorManagement_vendorManagement_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./_services/vendorManagement/vendorManagement.service */ "./src/app/_services/vendorManagement/vendorManagement.service.ts");
/* harmony import */ var _services_stockReport_stockReport_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./_services/stockReport/stockReport.service */ "./src/app/_services/stockReport/stockReport.service.ts");
/* harmony import */ var _services_stockInspection_stock_Inspection_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./_services/stockInspection/stock-Inspection.service */ "./src/app/_services/stockInspection/stock-Inspection.service.ts");


























var createTranslateLoader = function (http) {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_9__["TranslateHttpLoader"](http, './assets/i18n/', '.json');
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]] });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_services_customerDemographic_customer_demographic_service__WEBPACK_IMPORTED_MODULE_10__["CustomerDemographicService"], _services_sbpWaiver_sbp_Waiver_service__WEBPACK_IMPORTED_MODULE_19__["sbpWaiverService"], _services_cplogbookDraft_cplogbook_draft_service__WEBPACK_IMPORTED_MODULE_15__["CplogbookDraftService"], _services_rest_service__WEBPACK_IMPORTED_MODULE_13__["RestService"], _services_cplogbookApproved_cplogbook_Approved_service__WEBPACK_IMPORTED_MODULE_16__["CplogbookApprovedService"], _services_defanddeferral_defand_deferral_service__WEBPACK_IMPORTED_MODULE_17__["DefandDeferralService"], _services_logBookDraft_logBookDraft_service__WEBPACK_IMPORTED_MODULE_18__["logBookDraftService"], _services_pledgejoint_pledge_joint_service__WEBPACK_IMPORTED_MODULE_20__["pledgejointService"], _services_vendorManagement_vendorManagement_service__WEBPACK_IMPORTED_MODULE_21__["vendorManagementService"],
            _services_stockReport_stockReport_service__WEBPACK_IMPORTED_MODULE_22__["stockReportService"], _services_stockInspection_stock_Inspection_service__WEBPACK_IMPORTED_MODULE_23__["stockInspectionService"], _services_branches_branches_service__WEBPACK_IMPORTED_MODULE_4__["BranchService"], _services_roles_roles_service_service__WEBPACK_IMPORTED_MODULE_1__["RoleService"]], imports: [[
                _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ReactiveFormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_11__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["LayoutModule"],
                _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["OverlayModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateLoader"],
                        useFactory: createTranslateLoader,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"]]
                    }
                })
            ]] });
    return AppModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]], imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ReactiveFormsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_11__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
        _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["LayoutModule"],
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["OverlayModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"],
        args: [{
                declarations: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]],
                imports: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ReactiveFormsModule"],
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_11__["AppRoutingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                    _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["LayoutModule"],
                    _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["OverlayModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                    _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"].forRoot({
                        loader: {
                            provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateLoader"],
                            useFactory: createTranslateLoader,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"]]
                        }
                    })
                ],
                providers: [_services_customerDemographic_customer_demographic_service__WEBPACK_IMPORTED_MODULE_10__["CustomerDemographicService"], _services_sbpWaiver_sbp_Waiver_service__WEBPACK_IMPORTED_MODULE_19__["sbpWaiverService"], _services_cplogbookDraft_cplogbook_draft_service__WEBPACK_IMPORTED_MODULE_15__["CplogbookDraftService"], _services_rest_service__WEBPACK_IMPORTED_MODULE_13__["RestService"], _services_cplogbookApproved_cplogbook_Approved_service__WEBPACK_IMPORTED_MODULE_16__["CplogbookApprovedService"], _services_defanddeferral_defand_deferral_service__WEBPACK_IMPORTED_MODULE_17__["DefandDeferralService"], _services_logBookDraft_logBookDraft_service__WEBPACK_IMPORTED_MODULE_18__["logBookDraftService"], _services_pledgejoint_pledge_joint_service__WEBPACK_IMPORTED_MODULE_20__["pledgejointService"], _services_vendorManagement_vendorManagement_service__WEBPACK_IMPORTED_MODULE_21__["vendorManagementService"],
                    _services_stockReport_stockReport_service__WEBPACK_IMPORTED_MODULE_22__["stockReportService"], _services_stockInspection_stock_Inspection_service__WEBPACK_IMPORTED_MODULE_23__["stockInspectionService"], _services_branches_branches_service__WEBPACK_IMPORTED_MODULE_4__["BranchService"], _services_roles_roles_service_service__WEBPACK_IMPORTED_MODULE_1__["RoleService"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_12__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/services/rest.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/rest.service.ts ***!
  \******************************************/
/*! exports provided: RestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestService", function() { return RestService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");






var RestService = /** @class */ (function () {
    function RestService(http) {
        this.http = http;
        this.baseUri = 'http://172.18.7.29:3000/users';
        //baseUri:string = 'http://localhost:3000/users';
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]().set('Content-Type', 'application/json');
    }
    RestService.prototype.setRoleData = function (someInput) {
        this.roledata = someInput;
    };
    RestService.prototype.getRoleData = function () {
        console.log(this.roledata);
    };
    // Create
    RestService.prototype.createEmployee = function (data) {
        var url = this.baseUri + "/";
        return this.http.post(url, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorMgmt));
    };
    RestService.prototype.setCustomerDemographicData = function (data) {
        return this.customerDemographicdata = data;
    };
    RestService.prototype.getCustomerDemographicData = function () {
        return this.customerDemographicdata;
    };
    // Get all employees
    RestService.prototype.getEmployees = function () {
        return this.http.get("" + this.baseUri);
    };
    // Get employee
    RestService.prototype.getEmployee = function (id) {
        var url = this.baseUri + "/" + id;
        return this.http.get(url, { headers: this.headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res || {};
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorMgmt));
    };
    // Update employee
    RestService.prototype.updateEmployee = function (id, data) {
        var url = this.baseUri + "/" + id;
        return this.http.put(url, data, { headers: this.headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorMgmt));
    };
    // Delete employee
    RestService.prototype.deleteEmployee = function (id) {
        var url = this.baseUri + "/" + id;
        return this.http.delete(url, { headers: this.headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.errorMgmt));
    };
    // Error handling 
    RestService.prototype.errorMgmt = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        }
        else {
            // Get server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        console.log(errorMessage);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(errorMessage);
    };
    RestService.ɵfac = function RestService_Factory(t) { return new (t || RestService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"])); };
    RestService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RestService, factory: RestService.ɵfac, providedIn: 'root' });
    return RestService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RestService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/app/shared/guard/auth.guard.ts":
/*!********************************************!*\
  !*** ./src/app/shared/guard/auth.guard.ts ***!
  \********************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");




var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (sessionStorage.getItem('isLoggedin')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard.ɵfac = function AuthGuard_Factory(t) { return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
    AuthGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthGuard, factory: AuthGuard.ɵfac });
    return AuthGuard;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthGuard, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Azhar\Downloads\CADFinal-master\CADFinal-master\CreditAdminDepartment-master\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map