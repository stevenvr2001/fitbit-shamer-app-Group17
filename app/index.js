import { battery } from 'power';
import document from 'document';
import clock from 'clock';
import { preferences } from 'user-settings';
import { HeartRateSensor } from 'heart-rate';
import { today } from 'user-activity';
import { init as initState, getStateItem, setStateCallback } from './state';
import zeroPad from './utils/zero-pad';

// init state
initState();

// elements
const $letter = document.getElementById('letter');
const $time = document.getElementById('time');
const $hr = document.getElementById('hr');
const $steps = document.getElementById('steps');
const $calories = document.getElementById('calories');
/*const $group = document.getElementById('group');*/
const $battery = document.getElementById('battery');
const $myMonth = document.getElementById('myMonth');
const $myDay = document.getElementById('myDay');
const $sequenceImage = document.getElementById('sequence-image');
const $myAnimation = document.getElementById('myAnimation');
const $anim = document.getElementById('anim');
const $circ = document.getElementById('circ');
/*const $info = document.getElementById('text-info');*/
/*const $cone = document.getElementById('cone');
const $ctwo = document.getElementById('ctwo');*/

// define vars for later use;
let time = '';
let hr = '--';
let now = new Date();
let monthnum = now.getMonth();
let day = now.getDate();
let batteryLevel;

/*$time.addEventListener("click", function () {
	$circ.style.display = "none";
});

$time.addEventListener("click", function () {
	$circ.classList.remove("onzichtbaar");
});*/

// get heart rate
if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener('reading', () => {
    hr = hrm.heartRate;
  });
  hrm.start();
}

// draw
function draw() {
  $time.text = time;
  $letter.text = getStateItem('letter');
  $hr.text = hr;
  $steps.text = today.adjusted.steps;
  $calories.text = today.adjusted.calories;
  batteryLevel = battery.chargeLevel;
  let batteryP = Math.floor(batteryLevel) + '%';
  $battery.text = batteryP;
  $myMonth.text = monthname;
  $myDay.text = day;

  $time.addEventListener('click', function () {
    //$info.style.display = 'none';
    //$myMonth.style.display = 'none';
    //$myDay.style.display = 'none';
    $circ.style.display = 'inline';
    $time.y = 70;
    $time.style.fontSize = 50;
  });

  /*$time.onclick = () => {
    $circ.style.display = 'none';
  };*/

  if (hr > 90 && hr < 110) {
    $sequenceImage.href = `Heartbeat100/Frame_01.png`;

    //aantal frames anpassen//
    $anim.to = 22;

    //animatie activeren//
    $myAnimation.animate('enable');

    //info verzetten//
    $time.y = 65;
    $myMonth.y = 65;
    $myDay.y = 65;
    $time.x = 85;
    $myMonth.x = 265 - 45;
    $myDay.x = 265;
    $time.style.fontSize = 30;
    $myAnimation.style.display = 'inline';
  }

  if (batteryLevel > 49 && batteryLevel < 51) {
    $sequenceImage.href = `Battery50/Frame_01.png`;

    //aantal frames anpassen//
    $anim.to = 54;

    //animatie activeren//
    $myAnimation.animate('enable');

    //time verzetten//
    $time.y = 65;
    $myMonth.y = 65;
    $myDay.y = 65;
    $time.x = 85;
    $myMonth.x = 265 - 45;
    $myDay.x = 265;
    $time.style.fontSize = 30;

    $myAnimation.style.display = 'inline';
  }
  //sprite wegdoen//
  $myAnimation.addEventListener('click', function () {
    /*console.log('click clikc')*/
    $myAnimation.animate('disable');
    $myAnimation.style.display = 'none';
  });
  //trigger sprites
  /* function enable() {
    myAnimation.animate("enable");
  }
  
  function disable() {
    myAnimation.style.display = "none";
  }*/
}

/*datum */
var month = new Array();
month[0] = 'Jan';
month[1] = 'Feb';
month[2] = 'Mar';
month[3] = 'Apr';
month[4] = 'May';
month[5] = 'Jun';
month[6] = 'Jul';
month[7] = 'Aug';
month[8] = 'Sep';
month[9] = 'Oct';
month[10] = 'Nov';
month[11] = 'Dec';

let monthname = month[monthnum];

// time
clock.granularity = 'seconds'; // seconds if you like to show seconds or update stats every second, minutes if you only need it minutely
function updateTime(datetime) {
  const minute = datetime.getMinutes();
  const hour = datetime.getHours();
  let hours = hour;
  if (preferences.clockDisplay === '12h') {
    // 12h format
    hours = zeroPad(hours % 12 || 12);
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  const mins = zeroPad(minute);
  time = `${hours}:${mins}`;

  // draw every second to show time changes
  draw();
}
// use function above on clock tick
clock.ontick = (evt) => updateTime(evt.date);
// use the function on start as well
updateTime(new Date());

// draw whenever a change in state happens
setStateCallback(draw);

// draw when code loaded
draw();
