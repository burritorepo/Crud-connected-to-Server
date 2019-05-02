import { DataService } from '../user/service.js';

const service = new DataService();

export class CrudOperations {
    constructor() {
        this.displayData = false;
        /* this.getUsers(); */
    }
    getUsers() {
        service.getUsers();
    }
    
    updateUser(e) {
        e.preventDefault();
        /* FORM VALUES */
        let UserName = document.querySelector('.js_name_update').value;
        let UserLastName = document.querySelector('.js_lastname_update').value;
        let userToUpdate = document.querySelector('.js_userToUpdate').value;

        let formData = {
            name: UserName,
            lastname: UserLastName,
            id: userToUpdate
        }
        console.log(formData);

        /* MAKE HTTP PUT REQUEST AND PAINT UPDATED DB */
        service.updateUser(formData)
            .then(data => {
                console.log(data);
                service.deleteAll();
                service.getUsers();
            });
    }

}

/* CREATE NEW INSTANCE TO USE CRUD FUNCTIONS */
let getUsers = new CrudOperations();

/* UPDATE USER 
const updateUserBtn = document.querySelector('.updateUser');
updateUserBtn.onclick = getUsers.updateUser; */
