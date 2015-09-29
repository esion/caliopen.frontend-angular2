export class Contact {
  id: String;
  given_name: String;
  family_name: String;
  title: String;
  adresses: Array<any>;
  phones: Array<any>;
  emails: Array<any>;
  ims: Array<any>;
  identities: Array<any>;
  organizations: Array<any>;
  keys: Array<any>;

  constructor(id: String, given_name: String, family_name: String, title: String, adresses: Array<any> = [],
    phones: Array<any> = [], emails: Array<any> = [], ims: Array<any> = [],
    identities: Array<any> = [], organizations: Array<any> = [], keys: Array<any> = [])
  {
    this.id =           id;
    this.given_name =   given_name;
    this.family_name =  family_name;
    this.title =        title;
    this.adresses =     adresses;
    this.phones =       phones;
    this.emails =       emails;
    this.ims =          ims;
    this.identities =   identities;
    this.organizations = organizations;
    this.keys =         keys;
  }

  get fullname() {
    if (this.firstname && this.lastname) {
      return `${this.firstname} ${this.lastname}`;
    }

    if (this.firstname) {
      return this.firstname;
    }

    if (this.lastname) {
      return this.lastname;
    }
  }

  get firstname() {
    return this.given_name;
  }

  get lastname() {
    return this.family_name;
  }
}
