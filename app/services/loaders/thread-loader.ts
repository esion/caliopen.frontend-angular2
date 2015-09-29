import { Injectable } from 'angular2/angular2';
import { MessageRepository } from '../repositories/message-repository';
import { ThreadRepository } from '../repositories/thread-repository';
import { Thread } from '../../models/thread';
import { Message } from '../../models/message';

@Injectable()
export class ThreadLoader {
  ThreadRepository: ThreadRepository;
  MessageRepository: MessageRepository;
  constructor(ThreadRepository: ThreadRepository, MessageRepository: MessageRepository) {
    this.ThreadRepository = ThreadRepository;
    this.MessageRepository = MessageRepository;
  }

  loadAll() {
    //quick'n dirty
    return this.ThreadRepository.findAll().then(threads => {
      let messagesPromises = threads.map((thread: Thread) => {
        return this.MessageRepository.findByThreadId(thread.id).then((messages: Array<Message>) => {
          thread.messages = messages;

          return messages;
        });
      });

      return [threads, messagesPromises];
    }).then(([threads, messagesPromises]) => threads);
  }
}
