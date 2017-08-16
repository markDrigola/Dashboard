'use strict';
import {Navs} from './navs/navs';
import {Task} from './task/task';
import {Profile} from './profile/profile';
import {Settings} from './settings/settings';

const myCoreServices = angular.module('won.core.services', []);

myCoreServices
	.service('taskService', Task)
	.service('settingsService', Settings)
	.service('profileService', Profile)
	.service('navsService', Navs);


export {myCoreServices};