const zomatoApi = axios.create({
  baseURL: 'https://developers.zomato.com/api/v2.1/search'
})

function getRestaurantInfo(restaurantId) {
  zomatoApi.get(restaurantId)
  .then(responseFromAPI => {
      console.log('Response from API is: ', responseFromAPI.data);           
})
.catch(err => {
  console.log('Error is: ', err);
  })
}

document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);
