$(document).ready(function() {
  // const app = new Vue({
  //   el: '#startButton',
  //   data: {
  //     playing: true
  //   }, 
  //   mounted() {
  //     $(this).on('click', startGame);
  //   }
  // })
  // console.log(app.playing);
  // app.playing = false;
  // console.log(app.playing);
  
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

  function startGame() {
    console.log("GAME STARTED");
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    $('body').addClass('cursor');
    $('#startButton').removeClass('visible').addClass('invisible');
    const cursorActivate = function () {
      $('body').removeClass('cursor').addClass('cursor-hit');
      setTimeout(() => {
        $('body').addClass('cursor').removeClass('cursor-hit');
      }, 50);
    }
    $(holes).on('click', cursorActivate);
    setTimeout(() => {
      timeUp = true;
      
      setTimeout(() => {
        $(holes).off('click', cursorActivate);
        $('body').removeClass('cursor');
        $('#startButton').removeClass('invisible').addClass('visible');
      }, 1000);
      
    }, 5000);
  };

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
