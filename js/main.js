$(document).ready(function() {
  
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  let lastHole;
  let timeUp = false;
  let score = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if (hole === lastHole) {
      console.log('Ah nah thats the same one');
      return randomHole(holes);
    }
    console.log(hole);
    lastHole = hole;
    return hole;
  }

  function peep() {
    const time = randomTime(300, 1000);
    const hole = randomHole(holes);
    $(hole).addClass('up');
    setTimeout(() => {
      $(hole).removeClass('up');
      if (!timeUp) peep();
    }, time)
  }

  console.log($('body'));
  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    $('body').addClass('cursor');
    const cursorActivate = function () {
      $('body').removeClass('cursor').addClass('cursor-hit');
      setTimeout(() => {
        $('body').addClass('cursor').removeClass('cursor-hit');
      }, 50);
    }
    $(holes).on('click', cursorActivate);
    setTimeout(() => {
      timeUp = true;
      $('body').removeClass('cursor');
      $(holes).off('click', cursorActivate);
    }, 5000);
  }

  $('#startButton').on('click', startGame);

  function bonk(e) {
    if (!e.originalEvent.isTrusted) return; // cheater!
    // clickEffect();
    $('body').on('click', clickEffect);
    score++;
    $(this).removeClass('up');
    $(scoreBoard).text(score);
    setTimeout(() => $('body').off('click', clickEffect), 200);
  }

  moles.forEach(mole => $(mole).on('click', bonk));

  function clickEffect(e){
    console.log(e);
    const element = $('<div></div>');
    console.log(element);
      element.addClass("clickEffect");
      element.css('top', e.clientY + "px");
      element.css('left',e.clientX+"px");
      $('body').append(element);
      element.on('animationend',function(){$(element).remove()});
  }
})
