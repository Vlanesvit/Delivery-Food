const renderItems = (data) => {
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
};

fetch('https://delivery-food-test-default-rtdb.firebaseio.com/db/partners.json')
  .then((response) => response.json())
  .then((data) => {
    renderItems(data);
  })
  .catch((error) => {
    console.log(error);
  });
