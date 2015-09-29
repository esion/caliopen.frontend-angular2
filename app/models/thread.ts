import {Contact} from './contact';
import {Message} from './message';

export class Thread {
  id: String;
  subject: String;
  importance: Number;
  privacy: Number;
  messages: Array<Message>;

  constructor(id: String, subject: String, importance: Number, privacy: Number, messages: Array<Message> = []) {
    this.id = id;
    this.subject = subject;
    this.importance = importance;
    this.privacy = privacy;
    this.messages = messages;
  }

  get contacts(){
    let contacts: Array<Contact> = [];
    this.messages.forEach((message) => {
      if (!!message.sender && !contacts.some((contact) => contact.id === message.sender.id)) {
        contacts.push(message.sender);
      }
    });
    return contacts;
  }
}
