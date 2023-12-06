// import 'dotenv/config';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const form = document.querySelector('form')! as HTMLFormElement;
const userInput = document.getElementById('address')! as HTMLInputElement;

const searchHandler = (event: Event) => {
  event.preventDefault();
  const userInputValue = userInput.value;
  console.log(`user input: ${userInputValue}`);
    const locationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userInputValue}&key=${process.env.GOOGLE_API_KEY}`;
    console.log(locationUrl);
};

form.addEventListener('submit', searchHandler);
