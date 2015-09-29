import {Component, View, NgIf} from 'angular2/angular2';
import { ApplicationSwitcherComponent } from './co-layout/application-switcher';
import { ApplicationWrapperComponent } from './co-layout/application-wrapper';
import { UserMenuComponent } from './co-layout/user-menu';

// Annotation section
@Component({
  selector: 'caliopen-app'
})
@View({
  directives: [NgIf, ApplicationSwitcherComponent, UserMenuComponent, ApplicationWrapperComponent],
  template: `
<header class="caliopen-layout__header">
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed pull-left" data-toggle="collapse"
          data-target="#caliopenLayoutHeaderCollapse" aria-expanded="false" aria-controls="caliopenLayoutHeaderCollapse">
          <span class="sr-only">{{ 'Toggle navigation' }}</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">
          <img class="caliopen-layout__header__navbar-img--brand" src="images/brand.png" alt="CaliOpen" />
        </a>
      </div>
      <div class="collapse navbar-collapse" id="caliopenLayoutHeaderCollapse">
        <div *ng-if="isAuthenticated">
          <co-layout-application-switcher></co-layout-application-switcher>
          <co-layout-user-menu></co-layout-user-menu>
        </div>
        <div *ng-if="!isAuthenticated">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="/login" {{action 'signin'}}>
                {{ 'header.menu.signin' }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</header>

<section role="main" class="container-fluid caliopen-layout__main-container">
  <co-layout-application-wrapper></co-layout-application-wrapper>
</section>
`
})
// Component controller
export class CaliopenAppComponent {
  isAuthenticated: boolean;
  constructor() {
    this.isAuthenticated = true;
  }
}
