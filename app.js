$(document).ready(function() {
  //Initiate variables to keep track of session and break lengths
  var sessionLength = 25;
  var breakLength = 5;
  //Initiate variables for the minutes and seconds displayed
  var seconds = 0;
  var minutes = 25;
  //Initiate variable to keep track of the text on the button, so when it says 'Start', the timer is not going, and when it says 'Pause', the timer is going
  var currentText = 'Start';
  //Initiate variable to keep track of whether we are in the session of the break
  var inBreak = false;
  //Define the function the change the text of the button
  function changeButtonText() {
    if (currentText === 'Start') {
      currentText = 'Pause';
    } else {
      currentText = 'Start';
    }
    $('#start-pause').html(currentText);
  }
  //Define the function that keeps track of and displays the time left
  var countBackwards;
  function startTimer() {
  countBackwards = setInterval(function() {
    if (seconds === 1) {
      seconds--;
    } else if (seconds > 1) {
    seconds--;
  } else {
    if (minutes > 0) {
    minutes--;
  } else {
    document.getElementById('alarm').play();
    switch (inBreak) {
      case false:
      $('#work-break').text('Break time!');
        minutes = breakLength - 1;
        inBreak = true;
        break;
      case true:
      $('#work-break').text('Work time!');
        minutes = sessionLength - 1;
        inBreak = false;
    }
  }
    $('#minutes').html(minutes);
    seconds = 59;
  }
    if (seconds > 9) {
    $('#seconds').html(seconds);
  } else {
    $('#seconds').html('0' + seconds);
  }
  }, 1000);
}
  //Onclick function for shortening the session length
  $('#shorter-session').click(function() {
    if (sessionLength > 1) {
    sessionLength--;
    $('#session-time').html(sessionLength);
    if (inBreak === false) {
    minutes = sessionLength;
    $('#minutes').html(sessionLength);
      seconds = 0;
    $('#seconds').html('00');
      }
    }
  });
  //Onclick function for adding time to the session length
  $('#longer-session').click(function() {
    sessionLength++;
    $('#session-time').html(sessionLength);
    if (inBreak === false) {
    minutes = sessionLength;
    $('#minutes').html(sessionLength);
      seconds = 0;
    $('#seconds').html('00');
      }
  });
  //Onclick function for shortening the break length
  $('#shorter-break').click(function() {
    if (breakLength > 1) {
    breakLength--;
    $('#break-time').html(breakLength);
    if (inBreak === true) {
      minutes = breakLength;
      seconds = 0;
      $('#seconds').html('00');
      $('#minutes').html(breakLength);
      }
    }
  });
  //Onclick function for adding time to the break length
  $('#longer-break').click(function() {
    breakLength++;
    $('#break-time').html(breakLength);
    if (inBreak === true) {
      minutes = breakLength;
      seconds = 0;
      $('#seconds').html('00');
      $('#minutes').html(breakLength);
      }
  });
  //Onclick function for starting and pausing the timer
  $('#start-pause').click(function() {
    changeButtonText();
    if (currentText === 'Pause') {
      if (inBreak === false) {
      $('#work-break').text('Work time!');
    }
      startTimer();
} else {
  clearInterval(countBackwards);
}
  });
});
