import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';



let currentMonth = new Date().getMonth();
const startDate = new Date();
startDate.setMonth(currentMonth);





function renderCellHandler({ date, cellType }) {
  if (cellType == 'day') {
    if (Object.keys(activeDates).includes((+date).toString())) {
      let month = date.getMonth() + 1;
      if (month < 10) month = "0" + month;

      return {
        html: `<button data-scroll-to=".day_${date.getDate()}">
        <span class="cell-date">${date.getDate()}</span>
        <span class="cell-city">${activeDates[(+date).toString()]}</span>
        </button>`,
        disabled: false
      }
    }

    return { disabled: true }
  }
}



function handlerChangeMonth({ month: newMonth }) {
  console.log(newMonth);
  currentMonth = newMonth
  let month = newMonth + 1;
  month = month < 10 ? '0' + month : month;

  fetch('?ajax=Y&m=' + month)
    .then((response) => response.text())
    .then((result) => {
      const cover = document.querySelector('#afishahtml');
      cover.innerHTML = result;
      return result
    })

}


document.addEventListener('click', (event) => {
  if (!event.target.closest('[data-scroll-to]')) return
  const selector = event.target.closest('[data-scroll-to]').getAttribute('data-scroll-to');

  var element = document.querySelector(selector);
  const offset = 45;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
})

window.addEventListener('DOMContentLoaded', () => {

  const afishaDatePicker = new AirDatepicker('#afish-datepicker', {
    classes: 'afisha-calendar-datepicker',
    buttons: ['today'],
    startDate: startDate,
    onRenderCell: renderCellHandler,
    onChangeViewDate: handlerChangeMonth,
  })

})