import { Injectable } from 'angular2/angular2';
import { Contact } from '../../models/contact';

@Injectable()
export class ContactSerializer {
  unserialize(data: any) {
    let {contact_id, given_name, family_name, title} = data;

    return new Contact(contact_id, given_name, family_name, title);
  }
}
