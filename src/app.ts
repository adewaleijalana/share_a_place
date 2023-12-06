// import 'dotenv/config';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
// import { google } from 'google-maps';
import { Loader } from '@googlemaps/js-api-loader';

const form = document.querySelector('form')! as HTMLFormElement;
const userInput = document.getElementById('address')! as HTMLInputElement;

// declare var google: google;

type GoogleGeoCodingResponse = {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: 'OK' | 'ZERO_RESULTS';
};

const searchHandler = (event: Event) => {
  event.preventDefault();
  const userInputValue = userInput.value;
  console.log(`user input: ${userInputValue}`);
  const locationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    userInputValue
  )}&key=${process.env.GOOGLE_API_KEY}`;

  axios
    .get<GoogleGeoCodingResponse>(locationUrl)
    .then((response) => {
      // console.log(response);
      const coordinates = response.data.results[0].geometry.location;
      console.log(coordinates);

      //   const map = new google.maps.Map(document.getElementById('map'), {
      //     center: coordinates,
      //     zoom: 8,
      //   });

      //   const marker = new google.maps.AdvancedMarkerElement({
      //     map: map,
      //     position: coordinates,
      //     title: 'Uluru',
      //   });

      const loader = new Loader({
        apiKey: `${process.env.GOOGLE_API_KEY}`,
        version: 'weekly',
      });

      loader.load().then(async () => {
        const { Map } = (await google.maps.importLibrary(
          'maps'
        )) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker'
        )) as google.maps.MarkerLibrary;

        const map = new Map(document.getElementById('map') as HTMLElement, {
          center: coordinates,
          zoom: 8,
          mapId: 'DEMO_MAP_ID',
        });

        const marker = new AdvancedMarkerElement({
          map: map,
          position: coordinates,
          title: 'Owo',
        });
      });
    })
    .catch((err) => console.log(err));
};

form.addEventListener('submit', searchHandler);
