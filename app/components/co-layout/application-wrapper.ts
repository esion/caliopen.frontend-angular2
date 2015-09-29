import {Component, View} from 'angular2/angular2';
import {PrivacyIndexComponent} from './privacy-index';
import {DiscussionListComponent} from '../discussions/list';

// Annotation section
@Component({
  selector: 'co-layout-application-wrapper'
})
@View({
  directives: [PrivacyIndexComponent, DiscussionListComponent],
  template: `
<div class="caliopen-layout__main-topbar row">
  <div class="caliopen-layout__main-topbar__block--action col-md-2">
    <div class="co-layout__main-action">
      <a href="compose" class="btn btn-info btn-lg"><i class="fa fa-plus"></i>{{ 'compose' }}</a>
    </div>
  </div>
  <div class="caliopen-layout__main-topbar__block--privacy col-md-10">
    <co-layout-privacy-index-slider></co-layout-privacy-index-slider>
  </div>
</div>

<div class="row">
  <div class="caliopen-layout__block--importance col-md-1 hidden-sm hidden-xs">
    <co-layout-importance-slider></co-layout-importance-slider>
  </div>
  <div class="caliopen-layout__block--container col-md-11 col-sm-12 col-xs-12">
    <co-layout-tab-list></co-layout-tab-list>
    <div class="caliopen-layout__main-content">
      <discussions-list></discussions-list>
    </div>
  </div>
</div>
  `
})

export class ApplicationWrapperComponent {
  constructor() {
  }
}
