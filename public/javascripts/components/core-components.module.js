'use strict';

const myCoreComponents = angular.module('won.core.components', []);
import {header} from './header/header.js';
import {navs} from './navs/navs.js';

import {modal} from './modal/modal.js';
import {profile} from './profile/profile.js';
import {notes} from './notes/notes.js';
import {navF} from './nav-f/nav-f.js';
import {allNotes} from './allNotes/allNotes.js';
import {settings} from './settings/settings.js';
import {history} from './history/history.js';
import {statistics} from './statistics/statistics.js';
import {maps} from './maps/maps.js';


myCoreComponents
    .directive('gNavs', navs)
    .directive('gNavF', navF)
    .directive('gModal', modal)
    .directive('gMaps', maps)
    .directive('gNotes', notes)
    .directive('gProfile', profile)
    .directive('gAllNotes', allNotes)
    .directive('gStatistics', statistics)
    .directive('gSettings', settings)
    .directive('gHistory', history)
    .directive('gHeader', header);


export {myCoreComponents};