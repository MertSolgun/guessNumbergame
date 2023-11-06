let maxRast = localStorage.getItem("maxRast")
  ? parseInt(localStorage.getItem("maxRast"), 10)
  : 20;
let rastgeleSayi = Math.ceil(Math.random() * maxRast);
let skor = 10;

let enYuksekSkor = 0;

// =================================================
const guess = document.querySelector(".guess");
const checkBtn = document.querySelector(".checkBtn");
const msg = document.querySelector(".msg");
const agBtn = document.querySelector(".againBtn");
const body = document.querySelector("body");
const score = document.querySelector(".score");
const left = document.querySelector(".left");
const numberImg = document.querySelector(".number img");
const randomNumber = document.querySelector(".randomNumber");
const gameStatus = document.querySelector(".gameStatus");
const gameLevel = document.querySelector(".gameLevel");
const gameScale = document.querySelector(".gameScale");
const prevGuess = document.querySelector(".prevGuess");
const statusImg = document.querySelector(".gameStatus img");
const sta = document.querySelector(".sta");
const point = document.querySelector(".top-score");
// =================================================

function checkGameLevel() {
  var maxRast = localStorage.getItem("maxRast");

  if (maxRast === "50") {
    gameLevel.style.backgroundColor = "red";
    gameLevel.textContent = "intermediate";
    gameScale.textContent = "(1-50)";
    rastgeleSayi = Math.ceil(Math.random() * maxRast);
  } else if (maxRast === "20") {
    gameLevel.style.backgroundColor = "green";
    gameLevel.textContent = "Easy";
    gameScale.textContent = "(1-20)";
    rastgeleSayi = Math.ceil(Math.random() * maxRast);
  }
}

guess.addEventListener("input", () => {
  var maxRast = localStorage.getItem("maxRast");
  if ((maxRast == "50" && guess.value > 50) || guess.value == 0) {
    guess.value = guess.value.slice(0, -1);
  } else if ((maxRast == "20" && guess.value > 20) || guess.value == 0) {
    guess.value = guess.value.slice(0, -1);
  }
});

gameLevel.addEventListener("click", () => {
  var maxRast = localStorage.getItem("maxRast");

  if (maxRast === "50") {
    maxRast = "20";
  } else {
    maxRast = "50";
  }
  localStorage.setItem("maxRast", maxRast);
  checkGameLevel();
});

guess.addEventListener("keyup", () => {
  guess.value.includes("e");
  guess.value = guess.value.replace(/e/gi, "");
});

const checkClick = () => {
  checkBtn.addEventListener("click", () => {
    prevGuess.textContent = `previous guess: ${guess.value}`;

    if (guess.value < rastgeleSayi) {
      statusImg.src = "./higher.jpg";
    }
    if (guess.value > rastgeleSayi) {
      statusImg.src = "./less.jpg";
    }
    if (!guess.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The input field cannot be empty.!",
      });
      statusImg.src = "";
    } else if (guess.value == rastgeleSayi) {
      var maxRast = localStorage.getItem("maxRast");
      msg.textContent = "Congratulations, you got it.";
      // score.textContent = --skor;
      agBtn.style.visibility = "visible";
      statusImg.style.display = "none";
      numberImg.src = "";
      randomNumber.textContent = rastgeleSayi;
      left.style.display = "none";
      body.style.backgroundImage =
        "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%";
      guess.value = "";
      point.textContent = maxRast === "50" ? skor * 20 : skor * 10;
    } else if (skor > 1) {
      skor--;
      score.textContent = skor;
      statusImg.style.display = "flex";
    } else {
      body.style.backgroundImage =
        " linear-gradient(147deg, #FFE53B 0%, #FF2525 74%";
      msg.textContent = `Game Over.. The number was ${rastgeleSayi}`;

      guess.value = "";
      score.textContent = 0;
      left.style.display = "none";
      numberImg.src = "";
      emoji.src = "./emoji.png";
      agBtn.style.visibility = "visible";
      gameStatus.textContent = "";
      point.textContent = "0";
    }
  });
};

const emoji = document.querySelector(".emoji");
const againSection = () => {
  agBtn.addEventListener("click", () => {
    let maxRast = localStorage.getItem("maxRast")
      ? parseInt(localStorage.getItem("maxRast"), 10)
      : 20;
    rastgeleSayi = Math.ceil(Math.random() * maxRast);
    point.textContent = "";

    checkBtn.addEventListener("click", () => {
      if (guess.value < rastgeleSayi) {
        statusImg.src = "./higher.jpg";
      } else {
        statusImg.src = "./less.jpg";
      }
    });

    randomNumber.textContent = "";
    emoji.src = "";
    numberImg.src = "./question.jpg";
    msg.textContent = "New player starts..";
    left.style.display = "flex";
    score.textContent = 10;
    skor = 10;
    body.style.backgroundImage =
      "linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%)";
    agBtn.style.visibility = "hidden";
  });
};

guess.addEventListener("click", () => {
  msg.textContent = "Game has started.";
  msg.style.animation = "myAnim 2s ease 0s 1 normal forwards";
});

guess.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    checkBtn.click();
  }
});
checkClick();
againSection();
checkGameLevel();

document.addEventListener("DOMContentLoaded", function () {
  Swal.fire({
    title: "Game Loading..",
    html: '<div class="progress"><div class="color"></div></div></div>',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: function (modalElement) {
      var colorElement = modalElement.querySelector(".color");
      colorElement.style.animationPlayState = "running";
    },
  });

  setTimeout(function () {
    Swal.close();
  }, 4000);
});
