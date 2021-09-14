'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/////////////
class workOut {
  date = new Date();
  id = (Date.now() + ``).slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}
/////////////

class Running extends workOut {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends workOut {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcspeed;
  }
  calcspeed() {
    this.speed = this.distance / this.duration / 60;
    return;
  }
}
// const run = new Running([39, -13], 5.2, 24, 178);
// const cyc1 = new Cycling([39, -14], 27, 24, 578);
// console.log(run, cyc1);
////////////////////////APp
class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    /////////////////////////
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert(`Couldn't get you location`);
        }
      );
  }

  _loadMap(position) {
    const latitude = position.coords.latitude;
    //   console.log(latitude);
    const longitude = position.coords.longitude;
    const coords = [latitude, longitude];
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');

    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInput = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const allPsitive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();
    /////////////
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    ////////////////
    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInput(distance, duration, cadence) ||
        !allPsitive(distance, duration, cadence)
      )
        return alert('Input have to be positive Number!');
    }
    ////////////////
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInput(distance, duration, elevation) ||
        !allPsitive(distance, duration)
      )
        return alert('Input have to be positive Number!');
    }

    //////////////////
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
        '';
    // L.marker().remove();
    // console.log(this.mapEvent);

    //////////////////////////////

    //////////////////////////////

    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent(`workOUt`)
      .openPopup();
  }
}

const app = new App();

///////////////

// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   inputDistance.value =
//     inputDuration.value =
//     inputElevation.value =
//     inputCadence.value =
//       '';
//   // L.marker().remove();
//   console.log(mapEvent);
//   kmark
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup',
//       })
//     )
//     .setPopupContent(`workOUt`)
//     .openPopup();
// });
// inputType.addEventListener('change', function () {
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');

//   inputC.closest('.form__row').classList.toggle('form__row--hidden');
// });
