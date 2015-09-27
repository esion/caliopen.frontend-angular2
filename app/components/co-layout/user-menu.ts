import {Component, View, NgIf} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'co-layout-user-menu'
})
@View({
  template: `
<ul class="nav navbar-nav navbar-right">
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown"
        role="button" aria-expanded="false">
      <i class="fa fa-user"></i>
    </a>
    <ul class="dropdown-menu" role="menu">
      <li class="dropdown-header">{{ user.username }}</li>
      <li class="divider"></li>

      <li>
        <a href="settings.account">
          {{ 'header.menu.account' }}
        </a>
      <li>
      <li>
        <a href="settings.app">
          {{ 'header.menu.settings' }}
        </a>
      <li>
      <li class="divider"></li>
      <li>
        <a href="/signout" {{action 'logout'}}>
          {{ 'header.menu.signout' }}
        </a>
      </li>
    </ul>
  </li>
</ul>
  `
})

export class UserMenuComponent {
  user: Object;
  constructor() {
    this.user = { username: 'John Doe' };
  }
}
