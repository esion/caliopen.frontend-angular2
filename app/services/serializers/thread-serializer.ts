import { Injectable } from 'angular2/angular2';
import { Thread } from '../../models/thread';

@Injectable()
export class ThreadSerializer {
  unserialize(data: any) {
    let {thread_id, subject, importance, privacy} = data;

    return new Thread(thread_id, subject, importance, privacy);
  }
}
