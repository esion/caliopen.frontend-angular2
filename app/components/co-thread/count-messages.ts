import {Component, View, NgIf} from 'angular2/angular2';
import {Message} from '../../models/message';

@Component({
  selector: 'co-thread-count-messages',
  properties: [
    'messages: messages'
  ]
})

@View({
  directives: [NgIf],
  template: `
<span class="caliopen-threads__thread__nb-messages badge">
  <span *ng-if="nbUnread > 0">{{ nbUnread }}/</span>
  {{nbMessages}}
</span>
  `
})

export class CoThreadCountMessagesComponent {
  messages: Array<Message>;
  get nbMessages() {
    return this.messages.length;
  }

  get nbUnread() {
    return this.messages.filter(message => !message.read).length;
  }
}
