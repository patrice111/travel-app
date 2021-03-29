//import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'

//import scss files
import "../client/styles/form.scss";
import "../client/styles/background.scss";

document.getElementById('weather-form').addEventListener('submit', handleSubmit);

export {
    handleSubmit
   }

//console.log(checkForName);

//alert("I EXIST")
//console.log("CHANGE!!");

