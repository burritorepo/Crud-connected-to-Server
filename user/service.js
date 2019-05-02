import { Modal } from '../modal/modal.js';

export class DataService {
    constructor() {
        this.apiurl = 'http://localhost:3000/users';
        this.headers = { "Content-type": "application/json; charset=UTF-8" };
    }
    handleError(error) {
        console.log(error);
        throw 'No se pudo completar la accion';
    }

    getUsers() {
        return fetch(this.apiurl)
            .then(response => response.json())
            .then(data => {
                data.forEach(user => {
                    this.addDOM(this.createCard(user));
                    console.log('created user', user.id);
                });
            });
    }

    createCard(user) {
        const card = document.createElement('div');
        card.classList.add('container');
        card.innerHTML = this.makeCardHTML(user);

        card.querySelector('.edit_card').onclick = () => {
            this.editCard(user);
        }

        card.querySelector('.delete_card').onclick = () => {
            this.deleteCard(user.id);
        }
        return card;
    }

    makeCardHTML(user) {
        return `<h3>${user.name}</h3><p>${user.lastname}</p> 
        <button class="edit_card">edit</button>
        <button class="delete_card">delete</button>`
    }

    addDOM(card) {
        const cardContainers = document.querySelector('.users');
        cardContainers.appendChild(card);
    }

    editCard(user) {
        let add = new Modal({
            element: document.querySelector('.js_modal_form'),
        });
        add.openUpdate(add.modalWithValues(user.name, user.lastname));
        add.cancelModal();
        add.updateUserInModal(user);
    }

    deleteCard(id) {
        const url = `${this.apiurl}/${id}`;
        return fetch(url, {
            method: 'DELETE',
        }).then(data => {
            console.log(data);
            let add = new Modal({
                element: document.querySelector('.js_modal_form'),
            });
            add.close();
            this.deleteAll();
            this.addContainer();
            this.getUsers();
        })

    }

    updateUser(formData) {
        const url = `${this.apiurl}/${formData.id}`;
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    addUser(formData) {
        const url = `${this.apiurl}`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    deleteAll() {
        const container = document.querySelector('.users');
        container.remove();
    }

    addContainer() {
        const showUsers = document.createElement('div');
        showUsers.classList.add('users');
        document.querySelector('div.serverData').appendChild(showUsers);
    }

} 