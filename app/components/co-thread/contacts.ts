import {Component, View, NgFor} from 'angular2/angular2';
import {Contact} from '../../models/contact';

@Component({
  selector: 'co-thread-contacts',
  properties: [
    'contacts:contacts'
  ]
})

@View({
  directives: [NgFor],
  template: `
<span *ng-for="#name of contactNames">{{ name }}, </span>
`
})

export class CoThreadContactsComponent {
  contacts: Array<Contact>;
  // contactNames: Array<String>;
  constructor() {
  }

  get contactNames() {
    if (!this.contacts) {
      return [];
    }

    if (this.contacts.length > 4) {
      let contactNames = this.contacts.slice(0, 3).map((contact: Contact) => contact.fullname);
      contactNames.push(`+${this.contacts.length - 3}`);

      return contactNames;
    }

    return this.contacts.slice(0, 4).map((contact: Contact) => contact.fullname);
  }
}
