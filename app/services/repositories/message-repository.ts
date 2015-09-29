import { Injectable } from 'angular2/angular2';
import { status, json } from '../../utils/fetch';
import { MessageSerializer } from '../serializers/message-serializer';
import { ContactRepository } from './contact-repository';
import {Contact} from '../../models/contact';

@Injectable()
export class MessageRepository {
  serializer: MessageSerializer;
  ContactRepository: ContactRepository;
  constructor(serializer: MessageSerializer, ContactRepository: ContactRepository) {
    this.serializer = serializer;
    this.ContactRepository = ContactRepository;
  }

  findByThreadId(id: String) {
    return window.fetch('api/messages/?thread_id=' + id, {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    }).then(status).then(json).then((rawMessages: any) => {
      // console.log(rawMessages);
      let senderPromises: Array<any> = [];
      let messages = rawMessages.messages.map((data: any) => {

        let message = this.serializer.unserialize(data);

        //quick'n dirty too
        senderPromises.push(this.ContactRepository.findById(data.sender).then((sender: Contact) => {
          message.sender = sender;
        }));

        return message;
      });

      return [messages, senderPromises];
    })
    .then(([messages, senderPromise])=> messages);
  }
}
