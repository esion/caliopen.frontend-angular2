import { Injectable } from 'angular2/angular2';
import { Message } from '../../models/message';

@Injectable()
export class MessageSerializer {
  unserialize(data: any) {
    let {message_id, subject, text, importance, privacy, read, date, date_insert} = data;

    return new Message(message_id, subject, text, importance, privacy, read, date, date_insert);
  }
}
