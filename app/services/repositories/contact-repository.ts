import { Injectable } from 'angular2/angular2';
import { status, json } from '../../utils/fetch';
import { ContactSerializer } from '../serializers/contact-serializer';
import { MessageRepository } from './message-repository';

@Injectable()
export class ContactRepository {
  serializer: ContactSerializer;
  constructor(serializer: ContactSerializer) {
    this.serializer = serializer;
  }

  findById(id: String) {
    return window.fetch('api/contacts/' + id, {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    }).then(status).then(json).then((raw: any) => {
      return this.serializer.unserialize(raw.contacts);
    });
  }
}
