'use strict';

const myCoreComponents = angular.module('won.core.components', []);
import {header} from './header/header.js';
import {profile} from './profile/profile.js';
import {task} from './task/task.js';

myCoreComponents
    .directive('gTask', task)
    .directive('gProfile', profile)
    .directive('gHeader', header);


export {myCoreComponents};