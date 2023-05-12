// Control Start Page
let gameControl = document.getElementById("control-game"),
  inputName = document.querySelector(".control-game input"),
  startButton = document.getElementById("start"),
  nameSpan = document.querySelector(".info-container .name span");

window.onload = (_) => inputName.focus();
startButton.onclick = function () {
  if (inputName.value.trim() !== "" || null) {
    let userName =
      [...inputName.value.trim()][0].toUpperCase() +
      [...inputName.value.trim()].splice(1).join("");
    nameSpan.innerHTML = userName;
  } else {
    nameSpan.innerHTML = "unKnown";
  }
  gameControl.remove();
};

// create Main Variables
let duration = 1000,
  blocksContainer = document.querySelector(".memory-game-blocks"),
  blocks = Array.from(blocksContainer.children),
  orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
});

// shuffling
function shuffle(array) {
  // Settings Vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);
    current--;
    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = Random Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
}

// Flip Block Function
let num = 0;
let tries = document.querySelector(".info-container .tries span");
function flipBlock(clickedBlock) {
  if (!clickedBlock.classList.contains("is-flipped")) {
    clickedBlock.classList.add("is-flipped");
  } else if (!clickedBlock.classList.contains("done")) {
    clickedBlock.classList.remove("is-flipped");
  }

  let allFlippedBlocks = blocks.filter(
    (flippedBlock) =>
      flippedBlock.classList.contains("is-flipped") &&
      !flippedBlock.classList.contains("done")
  );

  if (allFlippedBlocks.length === 2) {
    if (
      allFlippedBlocks[0].getAttribute("data-technology") !==
      allFlippedBlocks[1].getAttribute("data-technology")
    ) {
      num++;
      allFlippedBlocks.forEach((ele) => reFlip(ele));
      allFlippedBlocks.length = 0;
    } else {
      allFlippedBlocks.forEach((ele) => ele.classList.add("done"));
      allFlippedBlocks.length = 0;
    }
  } else if (allFlippedBlocks.length > 2) {
    allFlippedBlocks.forEach((block) => block.classList.remove("is-flipped"));
  }
  tries.innerHTML = num;
}

// Flip All After Start game
startButton.addEventListener("click", function () {
  blocks.forEach((block) => {
    block.classList.add("is-flipped");
    reFlip(block);
    setTimeout(() => {
      block.addEventListener("click", function () {
        flipBlock(block);
      });
    }, duration * 1.5);
  });
});

function reFlip(ele) {
  setTimeout(() => {
    ele.classList.remove("is-flipped");
  }, duration * 1.5);
}
