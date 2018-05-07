import { Employer } from './../../models/employer.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-employer-profile',
  templateUrl: './view-employer-profile.component.html',
  styleUrls: ['./view-employer-profile.component.css']
})

export class ViewEmployerProfileComponent implements OnInit {

  errormsg = false;
  successtype = "success";
  submitDisable = false;
  message = "";

  organizationId: "";
  employername: "";
  addressline1: "";
  addressline2: "";
  city: "";
  state: "";
  zip: "";
  plus4: "";
  contactfirstname: "";
  contactlastname: "";
  contacttitle: "r";
  contactphonenumber: "";
  phoneextension: "";
  contactfaxnumber: "";
  contactemail: '';
  responsetime: '';
  comments: "";
  createddate: "";
  creatorid: '';
  lastupdatedate='';
  lastupdatedby: '';
  ein: "";
  certandauthrequired: '';
  emailrequesteligible: '';
  phoneverifiedby: "";
  searchdataTotal = [];
  parameters = {};
  editedId = "";
  _links: {}
  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService) {

  }

  ngOnInit() {
    this.editedId = this.parameters["organizationId"];
    this.route.params.subscribe(params => this.parameters = params);

    if (this.parameters["organizationId"]) {

      this.searchemployer();
      this.editedId = this.parameters["organizationId"];

    }
  }
  onSubmit() {
    if (this.editedId) {
      this.router.navigate(['/add-employer', { organizationId: this.editedId }]);
      window.scrollTo(0, 0);
    }
  }

  nullcheck(val) {
    return (val != null) ? val : "";
  }
  
  

  searchemployer() {
    this.httpService.GetEmployerById(this.httpService.SetUrl('api/organizations/' + this.parameters["organizationId"])).then(
      (response) => {
        this.submitDisable = false;
        if (response.ok) {
          this.errormsg = true;
          this.message = "Success!";
          this.successtype = "success";
          var employer = response.json();

          // var date = new Date(employer.lastUpdateDate);
          // var year = date.getFullYear();
          // var month = date.getMonth();
          // var dt = date.getDate();
          // var hr = date.getHours();
          // var mins = date.getMinutes();
          // var sec = date.getSeconds();
          // var ampm;
          // var x=  year +'-'+ month +'-'+ dt+ ',' +hr+':'+ mins + ':' + sec;
          // var datetime =x.toString();


          // console.log(year+'-' + month + '-'+dt);

          var boolCertAndAuthRequired;
          var boolEmailRequestEligible;
          var resptime = employer.responseTime;

          if (employer.certAndAuthRequired == true) {
            boolCertAndAuthRequired = "Yes";
          }
          else {
            boolCertAndAuthRequired = "No";
          }
          if (employer.emailRequestEligible == true) {
            boolEmailRequestEligible = "Yes";
          }
          else {
            boolEmailRequestEligible = "No";
          }
          console.log(employer);
          this.organizationId = employer.organizationId;
          this.employername = employer.name;
          this.addressline1 = employer.addressLine1;
          this.addressline2 = employer.addressLine2;
          this.city = employer.city;
          this.state = employer.state;
          this.zip = employer.zip;
          this.plus4 = employer.plus4;
          this.contactfirstname = employer.contactFirstName;
          this.contactlastname = employer.contactLastName;
          this.contacttitle = employer.contactTitle;
          this.contactphonenumber = employer.contactPhoneNumber;
          this.phoneextension = employer.contactPhoneExtension;
          this.contactfaxnumber = employer.contactFaxNumber;
          this.contactemail = employer.contactEmail;
          // this.responsetime = employer.responseTime ;
          this.responsetime = resptime;
          this.comments = employer.comments;
          this.createddate = employer.createdDate;
          this.creatorid = employer.creatorId;
          this.lastupdatedate = (new Date(employer.lastUpdateDate)).toString();
          this.lastupdatedby = employer.lastUpdatedBy;
          this.ein = employer.employerIdentificationNumber;
          this.certandauthrequired = boolCertAndAuthRequired;
          this.emailrequesteligible = boolEmailRequestEligible;
          this.phoneverifiedby = employer.phoneVerifiedBy;


        }
      },
      err => {
        this.errormsg = true;
        this.successtype = "error";
        this.submitDisable = false;
        //Checking if service is up or not, if not then showing message
        if (err.status === 0) {
          this.message = "Error in processing the request, Service is down !";
        }
        //Checking if there is some error occured in service method, if yes then showing message
        else if (err.status === 500) {
          console.log(err);
          // this.alertService.error("Error in processing the request, " + err.statusText + " ! ")
          this.message = "There was an issue with your request.Please try again later.";
        }
      }
    ).catch(error => {
      console.log(error);
      this.successtype = "error";
      this.message = "errors.status";
    })
  }

}
