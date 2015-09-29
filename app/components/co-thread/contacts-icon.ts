import {Component, View, NgFor, NgClass} from 'angular2/angular2';
import {Thread} from '../../models/thread';
import {Contact} from '../../models/contact';

@Component({
  selector: 'co-thread-contacts-icon',
  properties: [
    'contacts: contacts'
  ]
})

@View({
  //NgClass does'nt work well for now (trnasformed in template but element is missing)
  directives: [NgFor, NgClass],
  template: `
<div class="contact-icon">
  <div class="circle"></div>
  <div class="circle-inner">
    <i *ng-for="#letterClass of lettersStylesheetClass" class="{{ 'contact-icon__letter ' + letterClass + ' ' + iconClass }}"></i>
  </div>
</div>
  `
})

export class CoThreadContactsIconComponent {
  thread: Thread;
  contacts: Array<Contact>;

  get lettersStylesheetClass() {
    if (!this.contacts) {
      return [];
    }

    if (this.contacts.length > 4) {
      let letters = this.contacts.slice(0, 3).map((contact: Contact) => this.getContactStylesheetClass(contact));
      letters.push(this.getStylesheetClass('plus'));

      return letters;
    }

    return this.contacts.slice(0, 4).map((contact: Contact) => this.getContactStylesheetClass(contact));
  }

  get iconClass() {
    if (!this.contacts) {
      return '';
    }
    let length = this.contacts.slice(0, 4).length;

    return `contact-icon__letter--${length}`;
  }

  getContactStylesheetClass(contact: Contact, letter: string = 'none') {
    if (!!contact.title) {
      letter = contact.fullname.substr(0, 1).toUpperCase();
    }

    if ('abcdefghijklmnopqrstuvwxyz'.toUpperCase().indexOf(letter) === -1) {
      letter = 'none';
    }

    return this.getStylesheetClass(letter);
  }

  getStylesheetClass(letter: String = 'none') {
    return `caliopen-letter--${letter}`;
  }
}
