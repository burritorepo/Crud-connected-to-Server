import { DataService } from '../user/service.js';

export class Modal {

    constructor(opt) {
        this.element = opt.element;
    }

    open() {
        const form = this.element.querySelector('form');
        this.element.classList.add('show');
        form.reset();
    }

    openUpdate() {
        this.element.classList.add('show');
    }

    close() {
        this.element.classList.remove('show');
    }

    cancelModal() {
        const lowerCloseBtn = this.element.querySelector('.js_close_modal');
        lowerCloseBtn.onclick = this.close.bind(this);
    };

    modalWithValues(name, lastname) {
        let inputName = document.querySelector('.js_name');
        let inputLastName = document.querySelector('.js_lastname');
        inputName.value = name;
        inputLastName.value = lastname;
        console.log(inputName.value, inputLastName.value);
        return { inputName, inputLastName }
    }

    updateUserInModal(user) {
        const form = this.element.querySelector('form');

        function submit(e) {
            e.preventDefault();
            this.close();
            let inputName = document.querySelector('.js_name').value;
            let inputLastName = document.querySelector('.js_lastname').value;
            const formData = {
                name: inputName,
                lastname: inputLastName, id: user.id
            };

            let putRequest = new DataService();
            putRequest.updateUser(formData)
                .then(data => {
                    console.log(data);
                    putRequest.deleteAll();
                    putRequest.addContainer();
                    putRequest.getUsers();
                });


        }

        form.onsubmit = submit.bind(this);
    }

    createUserInModal() {
        const form = this.element.querySelector('form');

        function submit(e) {
            e.preventDefault();
            let inputName = document.querySelector('.js_name').value;
            let inputLastName = document.querySelector('.js_lastname').value;
            const formData = {
                name: inputName,
                lastname: inputLastName
            };
            /* MAKE HTTP POST REQUEST */    
            let postRequest = new DataService();
            postRequest.addUser(formData)
                .then(data => {
                    console.log(data);
                    postRequest.deleteAll();
                    postRequest.addContainer();
                    postRequest.getUsers();
                });
        this.close();

        }
        form.onsubmit = submit.bind(this);
    }

}
