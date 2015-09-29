/// <reference path="./typing.d.ts" />

import { bootstrap } from 'angular2/angular2';
import { CaliopenAppComponent } from './components/caliopen-app';
import {ThreadLoader} from './services/loaders/thread-loader';
import { ThreadRepository } from './services/repositories/thread-repository';
import { ThreadSerializer } from './services/serializers/thread-serializer';
import { MessageRepository } from './services/repositories/message-repository';
import { MessageSerializer } from './services/serializers/message-serializer';
import { ContactRepository } from './services/repositories/contact-repository';
import { ContactSerializer } from './services/serializers/contact-serializer';

bootstrap(CaliopenAppComponent, [
  ThreadLoader,
  ThreadRepository,
  ThreadSerializer,
  MessageRepository,
  MessageSerializer,
  ContactRepository,
  ContactSerializer
]);
