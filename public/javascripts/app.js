import { myCoreComponents } from './components/core-components.module';
import {myCoreServices} from './services/core-services.module.js';

import { appRoutes } from './index.route';

angular.module('nameApp', [
    'ui.router',
    'ngTouch',
    'ngMap',
    'mgcrea.ngStrap',
    'jQueryScrollbar',
    'cfp.loadingBar',
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