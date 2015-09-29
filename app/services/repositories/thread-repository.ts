import { Injectable } from 'angular2/angular2';
import { status, json } from '../../utils/fetch';
import { ThreadSerializer } from '../serializers/thread-serializer';
import { MessageRepository } from './message-repository';

@Injectable()
export class ThreadRepository {
  serializer: ThreadSerializer;
  constructor(serializer: ThreadSerializer) {
    this.serializer = serializer;
  }
  findAll() {
    return window.fetch('api/threads', {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    }).then(status).then(json).then((rawThreads: any) => {
      return rawThreads.threads.map((data: any) => this.serializer.unserialize(data));
    });
  }
}
