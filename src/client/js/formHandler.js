// document.querySelector('#weather-form').addEventListener('click', handleSubmit)

function handleSubmit(event) {
    event.preventDefault();
    console.log('works');
    const destination = document.querySelector('#destination').value;
    const date = document.querySelector('#start-date').value;
    const counter = Math.floor((new Date(date) - new Date())/(1000*60*60*24));
    console.log('counter==>>', counter);
    fetch(`http://api.geonames.org/searchJSON?q=${destination}&username=patkel123_`).
    then(res => res.json())
    .then(data => {
        const result = data.geonames[0];
        console.log('results==>>', result);
        if (result) {
            const {lat, lng} = result
            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?units=I&lat=${lat}&lon=${lng}&key=24d9db5c095b44058759893673f52450`).
            then(res => res.json())
            .then(data => {
                console.log('result waetherbit==>>', data);
                const {low_temp, high_temp} = data.data[0];
                fetch(`https://pixabay.com/api?key=20848612-37c1bada72f829ffcc89afd88&q=${destination}`).
                then(res => res.json())
                .then(data => {
                    console.log('result pixabay==>>', data);
                    const firstHit = data.hits[0];
                    if (firstHit) {
                        const imageUrl = firstHit.largeImageURL;
                        document.querySelector('#location').innerHTML = destination;
                        document.querySelector('#departing').innerHTML = date;
                        document.querySelector('#days').innerHTML = counter;
                        document.querySelector('#weather').innerHTML = `High: ${high_temp}F, Low: ${low_temp}F`;
                        document.querySelector('#destination-img').src = imageUrl;
                        document.querySelector('#form-info').style.visibility = 'visible';
                    }
                })
                .catch(err => console.log('er in weatherbit api==>>', err));
            })
            .catch(err => console.log('er in weatherbit api==>>', err));
        }
    })
    .catch(err => console.log('err==>>', err));
}

    
export { handleSubmit }
