import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { isNullOrUndefined } from 'util';
import { EmployerSearch } from '../models/employersearch.model';

@Injectable()
export class HttpService {
  employersearch = new EmployerSearch();
  private jsonheader = 'application/json';
  private host = environment.hostUrl;
   private clientID  = environment.client_id;
   private clientSecret  = environment.client_secret; 
  
  constructor(private http: Http) { }

  public SetUrl(url: string) {
    return this.host + url;
  }

  public Post<T>(body: any, organizationid: any, url: string): Promise<Response> {
    return this.http.post(url, JSON.stringify(body), this.getRequestOptions(organizationid)).toPromise();
  }

  public Get<T>(url: string, employer: EmployerSearch): Promise<Response> {
    let builturl = this.buildUrl(url, employer);
    return this.http.get(builturl, this.getRequestOptionsForGet()).toPromise();
  }
 
  private buildUrl(url: string, employer: EmployerSearch): string {

    if (employer.name !== "" && employer.name !== undefined && (employer.zip == null || employer.zip == "")) {
      url = url + "?partytype=organization&roletype=client&name=" + employer.name;
    }
    else if (employer.contactphonenumber !== "" && employer.contactphonenumber !== undefined && (employer.contactemail === "" || employer.contactemail === undefined) && (employer.name === "" || employer.name === undefined) && (employer.zip === "" || employer.zip === undefined) && (employer.state === "" || employer.state === undefined)) {
      url = url + "?partytype=organization&roletype=client&phone=" + employer.contactphonenumber;
    }
    else if (employer.contactemail !== "" && employer.contactemail !== undefined && (employer.contactphonenumber === "" || employer.contactphonenumber === undefined) && (employer.name === "" || employer.name === undefined) && (employer.zip === "" || employer.zip === undefined) && (employer.state === "" || employer.state === undefined)) {
      url = url + "?partytype=organization&roletype=client&email=" + employer.contactemail;
    }
    else if (employer.zip !== "" && employer.zip !== undefined && (employer.contactemail === "" || employer.contactemail === undefined) && (employer.contactphonenumber === "" || employer.contactphonenumber === undefined) && (employer.name === "" || employer.name === undefined) && (employer.state === "" || employer.state === undefined)) {
      url = url + "?partytype=organization&roletype=client&zipCode=" + employer.zip;
    }
    else if (employer.name !== null && employer.name !== undefined && (employer.zip !== null || employer.zip !== undefined)) {
      url = url + "?partytype=organization&roletype=client&name=" + employer.name + "&zipCode=" + employer.zip;
    }
    else {
      url = "";
    }
    console.log(url);
    return url;

  }

  public GetEmployerById<T>(url: string): Promise<Response> {
    console.log(url);
    return this.http.get(url, this.getRequestOptionsForGet()).toPromise();

  }

  private getRequestOptions(organizationid: any): RequestOptions {
    const options = new RequestOptions();
    options.headers = this.getHeaders();
    if (isNullOrUndefined(organizationid) || organizationid == '') {
      options.method = "POST";
    } else {
      options.method = "PUT";
    }
    return options;
  }

  private getRequestOptionsForGet(): RequestOptions {
    const options = new RequestOptions();
    options.headers = this.getHeaders();
    options.method = "GET";

    return options;
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', this.jsonheader);
    
    if(environment.env !='dev')
    {
    headers.append('client_id', this.clientID);
    headers.append('client_secret', this.clientSecret); 
    }
    return headers;
  }
}