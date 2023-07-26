/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
import createElement from '../../assets/lib/create-element.js';

export default class UserTable {
  elem = null;
  #rows = [];

  constructor(rows) {
    this.#rows = rows || this.#rows;

    this.elem = this.#render();
  }
  
  #template() { 
    return `<table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        ${this.#rows.map((row, number) => `
          <tr>
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.salary}</td>
            <td>${row.city}</td>
            <td><button data-number='${number + 1}'>X</button></td>
          </tr>
        `)
        .join('')}
        </tbody>
      </table>`;
  }

  #render() {
    this.elem = createElement(this.#template());

    this.elem.addEventListener('click', this.#onCloseClick);

    return this.elem;
  }

  #onCloseClick = (event) => {
    const target = event.target;
    if (target.tagName) {
      const rowNumber = parseInt(target.getAttribute('data-number'), 10);
      if (!isNaN(rowNumber)) {
        target.closest('tr').remove();
      }
    }
  }
}
