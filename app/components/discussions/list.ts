import {Component, View, NgFor} from 'angular2/angular2';
import {ThreadRepository} from '../../services/repositories/thread-repository';
import {ThreadLoader} from '../../services/loaders/thread-loader';
import {Thread} from "../../models/thread";
import {CoThreadContactsComponent} from '../co-thread/contacts';
import {CoThreadContactsIconComponent} from '../co-thread/contacts-icon';
import {CoThreadDateLastMessageComponent} from '../co-thread/date-last-message';
import {CoThreadCountMessagesComponent} from '../co-thread/count-messages';

@Component({
  selector: 'discussions-list',
})

@View({
  directives: [NgFor, CoThreadContactsIconComponent, CoThreadContactsComponent, CoThreadDateLastMessageComponent, CoThreadCountMessagesComponent],
  template: `
<div class="container-fluid">
  <div class="row caliopen-threads__thread" *ng-for="#thread of threads">
    <div class="col-md-1 col-sm-1 col-xs-2"><co-thread-contacts-icon [contacts]="thread.contacts"></co-thread-contacts-icon></div>
    <div class="col-md-6 col-sm-8 col-xs-9">
      <co-thread-contacts [contacts]="thread.contacts"></co-thread-contacts>
      <span class="caliopen-threads__thread__message-summary">
        {{ thread.subject }}
      </span>
    </div>
    <div class="col-md-1 col-sm-1 col-xs-1">
      <i class="fa fa-paperclip"></i>
    </div>
    <div class="col-md-1 hidden-sm hidden-xs">
      <i class="fa fa-exclamation-triangle"></i> {{ thread.importance }}
      <i class="fa fa-eye"></i> {{ thread.privacy }}
    </div>
    <div class="col-md-2 col-sm-2 hidden-xs">
      <co-thread-date-last-message [messages]="thread.messages"></co-thread-date-last-message>
    </div>
    <div class="col-md-1 hidden-sm hidden-xs">
      <co-thread-count-messages [messages]="thread.messages"></co-thread-count-messages>
    </div>
  </div>
</div>

  `
})

export class DiscussionListComponent {
  threads: Array<Thread>;
  constructor(ThreadLoader: ThreadLoader) {
    this.threads = [];
    ThreadLoader.loadAll().then(threads => {
      this.threads = threads;
    });
  }
}
