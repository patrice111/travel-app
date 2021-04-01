// document.querySelector('#weather-form').addEventListener('click', handleSubmit)

function handleSubmit(event) {
    event.preventDefault();
    console.log('works');
    const destination = document.querySelector('#destination').value;
    const startDate = document.querySelector('#start-date').value;
    const endDate = document.querySelector('#end-date').value;
    const counter = Math.floor((new Date(endDate) - new Date(startDate))/(1000*60*60*24));
    console.log('counter==>>', counter);
        if (destination && startDate && endDate) {
            const data = {
              destination: destination,
              startDate: startDate,
              endDate: endDate,
              counter: counter,
              }; 
            getWeather(data).then(async (res) => {
               try {
                const resultEntry = await res.json();
                if (resultEntry) {
                 document.querySelector('#location').innerHTML = `My Trip to: ${destination}`;
                                document.querySelector('#departing').innerHTML = `Your Trip will start on: ${startDate}`;
                                document.querySelector('#returning').innerHTML = `Your Trip will end on: ${endDate}`;
                                document.querySelector('#days').innerHTML = `Your Trip will be for: ${counter} days`;
                                document.querySelector('#icon').innerHTML = `<img class="icon" src="https://www.weatherbit.io/static/img/icons/${resultEntry.icon}.png" alt="Forecast Icons">`;
                                document.querySelector('#highTemp').innerHTML = `High: ${resultEntry.highTemp}\xB0`;
                                document.querySelector('#lowTemp').innerHTML = `Low: ${resultEntry.lowTemp}\xB0`;
                                document.querySelector('#destination-img').innerHTML = `<img class=“destination-img” height= 250px; width= 250px; src=${resultEntry.image}  alt="City Image">`;
                                document.querySelector('#form-info').style.visibility = 'visible';
                }
              } catch (error) {
                alert("error occoured! try again.");
              }
            });
          } else {
            alert("Please enter city and date!");
          }

    //             })
    //             .catch(err => console.log('er in weatherbit api==>>', err));
    //         })
    //         .catch(err => console.log('er in weatherbit api==>>', err));
    //     }
    // })
    //                 if (firstHit) {
    //                     const imageUrl = firstHit.largeImageURL;
    //                     document.querySelector('#location').innerHTML = destination;
    //                     document.querySelector('#departing').innerHTML = startDate;
    //                     document.querySelector('#returning').innerHTML = endDate;
    //                     document.querySelector('#days').innerHTML = counter;
    //                     document.querySelector('#weather').innerHTML = `High: ${high_temp}F, Low: ${low_temp}F`;
    //                     document.querySelector('#destination-img').src = imageUrl;
    //                     document.querySelector('#form-info').style.visibility = 'visible';
    //                 }
    //             })
    //             .catch(err => console.log('er in weatherbit api==>>', err));
    //         })
    //         .catch(err => console.log('er in weatherbit api==>>', err));
    //     }
    // })

}

const getWeather = async (data) => {
    return await fetch(`http://localhost:8081/getWeather`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };


export { handleSubmit }
