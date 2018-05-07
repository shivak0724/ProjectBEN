import {Contact} from './contact.model';
import {Address} from './address.model';




export class Employer{

public organizationid:string;
public employeridentificationnumber:string;
public name:string;

public addressline1:string;
public addressline2:string;
public city:string;
public state:string;
public zip:string;
public plus4:string;

public contactfirstname:string;
public contactlastname:string;
public contacttitle:string;    
public contactemail:string;
public contactphonenumber:string;
public contactphoneextension:string;
public contactfaxnumber:string;

public responsetime:string;
public comments:string;
public createddate:string;
public creatorid:string;

public lastupdateddate:string;
public lastupdatedby:string;

public certandauthrequired:boolean;
public emailrequesteligible:boolean;
public phoneverifiedby:string;
public links:object;


}

export class EmployerNew{
    phone?:string
    email?:string
    zip?:string
    state?:string
    name?:string
}