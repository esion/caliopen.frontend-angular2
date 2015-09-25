import {Component, View} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'caliopen-app'
})
@View({
  template: '<h1>Hello {{ name }}</h1>'
})
// Component controller
export class CaliopenAppComponent {
  name: string;
  constructor() {
    this.name = 'Alice';
  }
}
