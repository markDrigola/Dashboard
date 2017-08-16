"use strict";
function modal() {
    let directive = {
        restrict: 'E',
        scope: {
            gTitle: '='
        },
        transclude: true,
        templateUrl: 'javascripts/components/modal/modal.html',

        link(scope, element) {
            element.addClass('modal');
            // let modal = scope.$parent.modal;
        },
    };
    return directive;
}

export {modal};