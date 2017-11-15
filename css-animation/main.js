function switchMood() {
  console.log('event handler switchMood triggered');
  const pg = document.getElementById('fickle');
  if (pg.innerHTML === 'yes please') {
    pg.innerHTML = 'no. way.';
  } else {
    pg.innerHTML = 'yes please';
  }
}

function hideOrShow() {
  console.log('event handler hideOrShow triggered');
  const pg = document.getElementById('sneaky');
  if (pg.getAttribute('class') === 'shown') {
    pg.setAttribute('class', 'hidden');
  } else {
    pg.setAttribute('class', 'shown');
  };
}

const moodButton = document.getElementById('mood-btn');
moodButton.addEventListener('click', switchMood); 

const visButton = document.getElementById('vis-btn');
visButton.addEventListener('click', hideOrShow); 
