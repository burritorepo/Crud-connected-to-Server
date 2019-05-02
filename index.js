import {Modal} from './modal/modal.js';
import {CrudOperations} from './service/main.js';
import { DataService } from './user/service.js';

/* OPEN MODAL */

function buttonOpenModalForm(button) {

  button.addEventListener('click', () => {
    const add = new Modal({
      element: document.querySelector('.js_modal_form'),
    });
    add.open();
    add.cancelModal();
    add.createUserInModal();
  });
}
const addCenter = document.querySelector('.js_open_modal_form1');

buttonOpenModalForm(addCenter);


/* GET DATA  FROM SERVER */
const getDataBtn = document.querySelector('.js_getData')
getDataBtn.onclick = getValuesFromDB

function getValuesFromDB() {
    if(document.querySelector('.users').children.length >= 0){
        addCenter.classList.toggle('withoutData');
        addNav.classList.toggle('withData');
        getDataBtn.classList.toggle('withData');
        const services = new DataService();
        services.getUsers();
    }
}

/* SUBMIT FORM TO CREATE USER */

/* let createUser = new Modal({
        element: document.querySelector('.js_modal_form'),
    });

createUser.createUserInModal()
 */

function buttonUpper(button) {

    button.addEventListener('click', () => {
      const add = new Modal({
        element: document.querySelector('.js_modal_form'),
      });
      add.open();
      add.cancelModal();
      add.createUserInModal();
    });
  }

const addNav = document.querySelector('.js_open_modal_form2');

buttonUpper(addNav);