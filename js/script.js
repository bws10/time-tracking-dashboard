//animation duration + 100ms
var timeout = 2100;
//data object to store data from JSON file
var data;

//-----GET DATA FROM JSON FILE AND ASSIGN TO OBJECT-----
var httpRequest = new XMLHttpRequest(); // asynchronous request

httpRequest.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);

    //---SETS DEFAULT STATE (Daily)
    onLoad();
  }
};

httpRequest.open("GET", "./data/data.json", true);
httpRequest.send();

//----SELECTORS----
//-----------------
const body = document.getElementsByTagName("MAIN")[0];
const dailyBtn = document.querySelector(".daily");
const weeklyBtn = document.querySelector(".weekly");
const monthlyBtn = document.querySelector(".monthly");
const ellipsisBtn = document.getElementsByClassName("ellipsis");
const cards = document.getElementsByClassName("card");

dailyBtn.addEventListener("click", updateToDaily);
weeklyBtn.addEventListener("click", updateToWeekly);
monthlyBtn.addEventListener("click", updateToMonthly);
for (let i = 0; i < ellipsisBtn.length; i++) {
  ellipsisBtn[i].addEventListener("click", selectedCard);
}

//----FUNCTIONS----
//-----------------
function selectedCard(event) {
  let parent = event.target.parentElement;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].children[1] === parent) {
      cards[i].children[1].classList.toggle("selected");
      if (parent.classList.contains("selected")) {
        body.addEventListener("click", clearSelected);
      }
    } else {
      cards[i].children[1].classList.remove("selected");
    }
  }
  //   parent.classList.toggle("selected");
  return;
}
function clearSelected(event) {
  if (!event.target.classList.contains("ellipsis")) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].children[1].classList.remove("selected");
    }
    body.removeEventListener("click", clearSelected);
  }
}
//Update card wih Daily figures when Daily buton clicked
function updateToDaily(event) {
  //Set active class on Daily button
  if (!event.target.classList.contains("active")) {
    dailyBtn.classList.add("active");
    weeklyBtn.classList.remove("active");
    monthlyBtn.classList.remove("active");
  }
  //update current
  for (let i = 0; i < cards.length; i++) {
    let hrs = "hrs";
    if (data[i].timeframes.daily.current === 1) {
      hrs = "hr";
    }
    cards[i].children[1].classList.add("animate");

    //wait half of animation time before updating card
    //at this point in animation the card is hidden from view
    setTimeout(() => {
      cards[i].children[1].children[2].textContent =
        data[i].timeframes.daily.current + hrs;
    }, timeout / 2);
    //remove animate class at end of animation
    setTimeout(() => {
      cards[i].children[1].classList.remove("animate");
    }, timeout);
  }
  //update previous
  for (let i = 0; i < cards.length; i++) {
    let hrs = "hrs";
    if (data[i].timeframes.daily.previous === 1) {
      hrs = "hr";
    }
    //wait half of animation time before updating card
    //at this point in animation the card is hidden from view
    setTimeout(() => {
      cards[i].children[1].children[3].textContent =
        "Yesterday - " + data[i].timeframes.daily.previous + hrs;
    }, timeout / 2);
  }
}
//Update card wih Weekly figures when Weekly buton clicked
function updateToWeekly(event) {
  //Set active class on Weekly button
  if (!event.target.classList.contains("active")) {
    weeklyBtn.classList.add("active");
    dailyBtn.classList.remove("active");
    monthlyBtn.classList.remove("active");
  }
  //update current
  for (let i = 0; i < cards.length; i++) {
    let hrs = "hrs";
    if (data[i].timeframes.weekly.current === 1) {
      hrs = "hr";
    }
    cards[i].children[1].classList.add("animate");

    //wait half of animation time before updating card
    //at this point in animation the card is hidden from view
    setTimeout(() => {
      cards[i].children[1].children[2].textContent =
        data[i].timeframes.weekly.current + hrs;
    }, timeout / 2);
    //remove animate class at end of animation
    setTimeout(() => {
      cards[i].children[1].classList.remove("animate");
    }, timeout);
  }
  //update previous
  for (let i = 0; i < cards.length; i++) {
    let hrs = "hrs";
    if (data[i].timeframes.weekly.previous === 1) {
      hrs = "hr";
    }
    //wait half of animation time before updating card
    //at this point in animation the card is hidden from view
    setTimeout(() => {
      cards[i].children[1].children[3].textContent =
        "Last Week - " + data[i].timeframes.weekly.previous + hrs;
    }, timeout / 2);
  }
}
//Update card wih Monthly figures when Monthly buton clicked
function updateToMonthly(event) {
  //Set active class on Monthly button
  if (!event.target.classList.contains("active")) {
    monthlyBtn.classList.add("active");
    weeklyBtn.classList.remove("active");
    dailyBtn.classList.remove("active");
  }
  //update current
  for (let i = 0; i < cards.length; i++) {
    let hrs = "hrs";
    if (data[i].timeframes.monthly.current === 1) {
      hrs = "hr";
    }

    cards[i].children[1].classList.add("animate");
    //wait half of animation time before updating card
    //at this point in animation the card is hidden from view
    setTimeout(() => {
      cards[i].children[1].children[2].textContent =
        data[i].timeframes.monthly.current + hrs;
    }, timeout / 2);
    //remove animate class at end of animation
    setTimeout(() => {
      cards[i].children[1].classList.remove("animate");
    }, timeout);
  }
  //update previous
  for (let i = 0; i < cards.length; i++) {
    let hrs = "hrs";
    if (data[i].timeframes.monthly.previous === 1) {
      hrs = "hr";
    }
    //wait half of animation time before updating card
    //at this point in animation the card is hidden from view
    setTimeout(() => {
      cards[i].children[1].children[3].textContent =
        "Last Month - " + data[i].timeframes.monthly.previous + hrs;
    }, timeout / 2);
  }
}

//Load default view of Daily bsaed on data from JSON file
function onLoad() {
  dailyBtn.classList.add("active");
  weeklyBtn.classList.remove("active");
  monthlyBtn.classList.remove("active");

  //update current
  for (let i = 0; i < cards.length; i++) {
    let hrs = "hrs";
    if (data[i].timeframes.daily.current === 1) {
      hrs = "hr";
    }
    cards[i].children[1].children[2].textContent =
      data[i].timeframes.daily.current + hrs;
  }
  //update previous
  for (let i = 0; i < cards.length; i++) {
    let hrs = "hrs";
    if (data[i].timeframes.daily.previous === 1) {
      hrs = "hr";
    }
    cards[i].children[1].children[3].textContent =
      "Yesterday - " + data[i].timeframes.daily.previous + hrs;
  }
}
