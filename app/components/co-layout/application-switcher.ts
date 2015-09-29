import {Component, View} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'co-layout-application-switcher'
})
@View({
  template: `
<ul class="nav navbar-nav">
  <li class="dropdown">
    <a href="#"  class="dropdown-toggle" data-toggle="dropdown"
       role="button" aria-haspopup="true" aria-expanded="false">
      {{currentApplication}} <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li><a href="discussions"><i class="fa fa-envelope"></i>{{ 'Discussions' }}</a></li>
      <li><a href="contacts"><i class="fa fa-users"></i>{{ 'Contacts' }}</a></li>
    </ul>
  </li>
</ul>
  `
})

export class ApplicationSwitcherComponent {
  currentApplication: string;
  constructor() {
    this.currentApplication = 'Discussions';
  }
}
