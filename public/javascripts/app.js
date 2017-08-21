import { myCoreComponents } from './components/core-components.module';
import {myCoreServices} from './services/core-services.module.js';

import { appRoutes } from './index.route';

angular.module('nameApp', [
    'ui.router',
    'ngMap',
    'mgcrea.ngStrap',
    myCoreComponents.name,
    myCoreServices.name
    ])
    .config(appRoutes);
    // .run(config);
// .run(run);

angular.element(document).ready(function () {
    angular.bootstrap(document.documentElement, ['nameApp'], {
        strictDi: false
    });
});