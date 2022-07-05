import boom from "./sounds/boom.wav";
import clap from "./sounds/clap.wav";
import hi_hat from "./sounds/hi_hat.wav";
import kick from "./sounds/kick.wav";
import open_hat from "./sounds/open_hat.wav";
import ride from "./sounds/ride.wav";
import snare from "./sounds/snare.wav";
import tink from "./sounds/tink.wav";
import tom from "./sounds/tom.wav";

let app_mode = "";
//let record_mode = "";

//-----------------------Start Button---------------------//
const start_game_btn = document.getElementById("start_game");
start_game_btn.addEventListener("click", () => {
  if (app_mode === "") {
    start_game_btn.textContent = "End Game";
    app_mode = "game";
  } 
  else if (app_mode === "game") {
    start_game_btn.textContent = "Start Game";
    app_mode = "";
  }
});

//------------------Record Button----------------------//
const record_btn = document.getElementById("record");
record_btn.addEventListener("click", () => {
  if (app_mode === "") {

    // Reset Record
    if (record_arr) {
      record_arr = [];
    }

    record_btn.textContent = "Stop Record";
    start_record = Date.now();
    app_mode = "record";

  } 
  else if (app_mode === "record") {
    
    record_btn.textContent = "Record";
    app_mode = "";
    console.log("test: " + record_arr[2].time);
   
  }
});

//------------------Playback Button----------------------//
const playback_btn = document.getElementById("playback");
playback_btn.addEventListener("click", () => {
  if (app_mode === "") {
    playback_btn.textContent = "Stop Playback";
    app_mode = "playback";
    console.log("start playback");
  } 
  else if (app_mode === "playback") {
    playback_btn.textContent = "Playback";
    app_mode = "";
    console.log("stop playback");
  }
});

//------------------Playback Function----------------------//

const playback = () => {

  record_arr.forEach((element) => {

    const audio = new Audio(k.sound);
    audio.play();
  }
);}

//---------------------Keybindings-------------------------//
// Sound key configurations
const key_config = [
  { id: "boom", key: "a", sound: boom },
  { id: "clap", key: "s", sound: clap },
  { id: "hi hat", key: "d", sound: hi_hat },
  { id: "kick", key: "f", sound: kick },
  { id: "open hat", key: "g", sound: open_hat },
  { id: "ride", key: "h", sound: ride },
  { id: "snare", key: "j", sound: snare },
  { id: "tink", key: "k", sound: tink },
  { id: "tom", key: "l", sound: tom },
];

//---------------------Game Logic-------------------------//
const beats = ["f", "d", "f", "d", "f", "f"];
const padding_count = 3;
//const empty_array = ['', '', ''];
const empty_array = Array(3).fill("");

// <div class="card sequence-card">A</div>
const targets = document.getElementById("targets");
let new_array = [...empty_array, ...beats, ...empty_array]; // open up the array?

// Game Mode
let current_index = 0;
let score = 0;
let start_record;

const getActualPosition = () => current_index + padding_count;

const score_element = document.getElementById("score");

const updateTargets = () => {
  targets.innerHTML = "";
  const computed_array = new_array.slice(
    current_index,
    current_index + getActualPosition() + 4
  );
  computed_array.forEach((item, index) => {
    const target_div = document.createElement("div");
    target_div.setAttribute(
      "class",
      `card sequence-card ${index === 3 ? "active" : ""}`
    );
    target_div.textContent = item;
    targets.appendChild(target_div);
  });
  score_element.textContent = score;
};
updateTargets();

//---------------------Record Array-------------------------//
let record_arr = [];


//---------------------------Create HTML Markup---------------------------------//
/* 
    <div id="boom" class="card control">
        <div class="label container">A</div>
        <div class="key container">Boom</div>
    </div>
*/

// Referencing the main/parent HTML markup
const parent = document.getElementById("controls");

//key_config.map() //same as "forEach" but will return a new array
key_config.forEach((k) => {

  // Creating the following HTML markup
  // <div id="boom" class="card control"></div>
  const control_div = document.createElement("div");
  control_div.setAttribute("id", k.id);
  control_div.setAttribute("class", "card control");

  // Creating the following HTML markup
  // <div class="label container">A</div>
  const control_label = document.createElement("div");
  control_label.setAttribute("class", "label container");
  control_label.textContent = k.key;

  // Creating the following HTML markup
  // <div class="key container">Boom</div>
  const control_key = document.createElement("div");
  control_key.setAttribute("class", "key container");
  control_key.textContent = k.id;

  // Appending sub-divs to the main sound div
  control_div.appendChild(control_label);
  control_div.appendChild(control_key);

  // Append the main sound div to the parent div
  parent.appendChild(control_div);

  //-------------------Mouse Click Event----------------------//
  control_div.addEventListener("click", (e) => {
    const audio = new Audio(k.sound);
    audio.play();
  });

  //------------------Keydown Event--------------------------//
  document.addEventListener("keydown", (e) => {
    if (e.key.toLocaleLowerCase() === k.key) {
      const audio = new Audio(k.sound);
      audio.play();

      //---------------------Start-------------------------//
      // If user key matches current target key then we increment
      if (
        app_mode === "game" &&
        new_array[current_index + padding_count] === e.key
      ) {
        current_index++;
        score++;
      }

      if (getActualPosition() >= new_array.length - padding_count - 1) {
      }

      updateTargets();

      //---------------------Record-------------------------//
      if (app_mode === "record") {
        let time_obj = {};
        time_obj.key = e.key.toLocaleLowerCase();
        time_obj.time = Math.abs(start_record - Date.now());
        record_arr.push(time_obj);
        //time_arr.push(Math.abs(start_record - Date.now()));
        console.log(record_arr);
        //console.log(time_arr);
      }
    }
  });
  //console.log(k);
});






















// document.addEventListener("keydown", (e) => {
//   if (e.key === "a") {
//     const audio = new Audio(boom);
//     audio.play();
//   }
// });

// const boom_element = document.getElementById("boom");
// boom_element.addEventListener("click", (e) => {
//   const audio = new Audio(boom);
//   audio.play();
//   //console.log(e);
// });

// const clap_element = document.getElementById("clap");
// clap_element.addEventListener("click", (e) => {
//   const audio = new Audio(clap);
//   audio.play();
// });

// const hi_hat_element = document.getElementById("hi_hat");
// hi_hat_element.addEventListener("click", (e) => {
//   const audio = new Audio(hi_hat);
//   audio.play();
// });

// const kick_element = document.getElementById("kick");
// kick_element.addEventListener("click", (e) => {
//   const audio = new Audio(kick);
//   audio.play();
// });

// const open_hat_element = document.getElementById("open_hat");
// open_hat_element.addEventListener("click", (e) => {
//   const audio = new Audio(open_hat);
//   audio.play();
// });

// const ride_element = document.getElementById("ride");
// ride_element.addEventListener("click", (e) => {
//   const audio = new Audio(ride);
//   audio.play();
// });

// const snare_element = document.getElementById("snare");
// snare_element.addEventListener("click", (e) => {
//   const audio = new Audio(snare);
//   audio.play();
// });

// const tink_element = document.getElementById("tink");
// tink_element.addEventListener("click", (e) => {
//   const audio = new Audio(tink);
//   audio.play();
// });

// const tom_element = document.getElementById("tom");
// tom_element.addEventListener("click", (e) => {
//   const audio = new Audio(tom);
//   audio.play();
// });
