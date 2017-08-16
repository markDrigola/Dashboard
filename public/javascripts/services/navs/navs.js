const symbol = Symbol();

class Navs {
    constructor ($http) {
        this.swipeAction = false;
    }

    menuActive() {
        this.swipeAction = !this.swipeAction;

        if(this.swipeAction) {
            $('body').addClass('active-menu');
            if($(window).width() < 768) {
                $('.fake-bg').css({'z-index':3})
            }
        } else {
            $('body').removeClass('active-menu');
            if($(window).width() < 768) {
                setTimeout(()=> {
                    $('.fake-bg').css({'z-index':0})
                },300)
            }
        }
    }
}

Navs.$inject = ['$http'];

export {Navs};