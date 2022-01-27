const searchForm = document.querySelector('#searchForm');
const addressInput = document.querySelector('#addressInput');
const locationElement = document.querySelector('#location');
const forecastElement = document.querySelector('#forecast');
const errorElement = document.querySelector('#error');

searchForm.addEventListener('submit', (e) => {
  !!e && e.preventDefault();
  const address = addressInput.value;
  if (address) {
    locationElement.textContent = undefined;
    forecastElement.textContent = 'Loading...';
    errorElement.textContent = undefined;
    fetch(`/api/weather?address=${address}`)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) {
            forecastElement.textContent = undefined;
            errorElement.textContent = data.error;
          } else {
            locationElement.textContent = data.location;
            forecastElement.textContent = data.summary;

            addressInput.value = '';
            addressInput.blur();
          }
        });
      })
      .catch((error) => {
        forecastElement.textContent = undefined;
        errorElement.textContent = error.toString();
      });
  } else {
    forecastElement.textContent = undefined;
    errorElement.textContent = 'Address is required.';
  }
});
