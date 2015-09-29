import {Contact} from './contact';
import {Thread} from './thread';

export class Message {
  id: String;
  subject: String;
  text: String;
  importance: Number
  privacy: Number;
  read: Boolean;
  date: Date;
  date_insert: Date;
  sender: Contact;

  constructor(id: String, subject: String, text: String, importance: Number, privacy: Number, read: Boolean, date: Date,
    date_insert: Date, sender: Contact = undefined)
  {
    this.id = id;
    this.subject = subject;
    this.text = text;
    this.importance = importance;
    this.privacy = privacy;
    this.read = read;
    this.date = date;
    this.date_insert = date_insert;
    this.sender = sender;
  }
}
