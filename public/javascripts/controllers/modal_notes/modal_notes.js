class Modal_notes {
    constructor (value) {
        this.value = value;
    }

    clearPosition(value) {
        return value = 0;
    }
}

Modal_notes.templateUrl = 'javascripts/controllers/modal_notes/modal_notes.html';

Modal_notes.$inject = ['value'];

export {Modal_notes};