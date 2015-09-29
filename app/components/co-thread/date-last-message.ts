import {Component, View, NgFor} from 'angular2/angular2';
import {Message} from '../../models/message';

@Component({
  selector: 'co-thread-date-last-message',
  properties: [
    'messages: messages'
  ]
})

@View({
  directives: [],
  template: `
<span class="caliopen-threads__thread__last-message-date'">{{dateLastMessage}}</span>
  `
})

export class CoThreadDateLastMessageComponent {
  messages: Array<Message>;
  get dateLastMessage() {
    if (!!this.messages.length) {
      return this.messages.sort((a, b) => {
        if (!a.date || !b.date) {
          return 0;
        }

        let aDate = new Date(a.date);
        let bDate = new Date(b.date);

        return bDate.getTime() - aDate.getTime();
      })[0].date;
    }
  }
}
