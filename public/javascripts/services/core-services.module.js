'use strict';
import {Task} from './task/task';
import {Profile} from './profile/profile';
import {Location} from './locationService/location';

const myCoreServices = angular.module('won.core.services', []);

myCoreServices
	.service('taskService', Task)
	.service('locationService', Location)
	.service('profileService', Profile)


export {myCoreServices};