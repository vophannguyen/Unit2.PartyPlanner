"use strick";

const API_URl_GUEST =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/guests";
const API_URL_RSV =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/rsvps";

const API_URl_EVENT =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events";

const party = {
  guests: [],
  rsvps: [],
  events: [],
};
////
const main = document.querySelector(".show");
const addEvent = document.querySelector(".add__event");
const nameEvent = document.querySelector("#name");
const locationEvent = document.querySelector("#location");
const dateTimeEvent = document.querySelector("#date");
const descriptionEvent = document.querySelector("#decription");
//Get data from API
async function getDataFromAPI(url) {
  try {
    const getData = await fetch(url);
    const json = await getData.json();
    return json.data;
  } catch (err) {
    console.error(err);
  }
}
async function dataformURL() {
  party.events = await getDataFromAPI(API_URl_EVENT);
  party.guests = await getDataFromAPI(API_URl_GUEST);
  party.rsvps = await getDataFromAPI(API_URL_RSV);
  // console.log(party);
}
async function render() {
  await dataformURL();
  //waiting data show up
  showEvent();
  deleteEvent();
}
render();
/**
The app contains a list of the names, 
dates, times, locations, and descriptions 
of all parties.
 *
 */
function showEvent() {
  if (party.events.length > 0) {
    const getChild = party.events.map((event) => {
      const li = document.createElement("li");
      // console.log(new Date(event.date));
      li.innerHTML = `<h2>${event.name}</h2>
      <h3>${new Date(event.date).toUTCString()}</h3>
      <h3>${event.location}</h3> 
      <p>${event.description}</p>
      <button class='delete'>Delete</button>`;
      // console.log(event);
      return li;
    });
    main.replaceChildren(...getChild);
  }
}
/**
 The app contains a form 
 allows a user to enter information 
 about a party and add it to the list.
 */
function addEventTo() {
  addEvent.addEventListener("click", async (e) => {
    e.preventDefault();
    d = new Date(dateTimeEvent.value);
    try {
      const reponse = await fetch(API_URl_EVENT, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: nameEvent.value,
          date: d,
          location: locationEvent.value,
          description: descriptionEvent.value,
        }),
      });
      console.log("POST");
      render();
    } catch (err) {
      console.error(err);
    }
  });
}
/**
Each party in the list has a delete 
button which removes the party when clicked.
 */
function deleteEvent() {
  const btnDelete = document.querySelectorAll(".delete");
  console.log(btnDelete);
  if (party.events.length > 0) {
    btnDelete.forEach((btn, i) => {
      btn.addEventListener("click", async () => {
        console.log("fff");
        await deleteToUrl(party.events[i].id);
        render();
      });
    });
  }
}
async function deleteToUrl(id) {
  try {
    // console.log(party.events[i]);
    const reponse = await fetch(`${API_URl_EVENT}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log("delete");
  } catch (err) {
    console.error(err);
  }
}
// deleteEvent();
addEventTo();
