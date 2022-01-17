import { battery } from 'power';
//import { charger } from "power";
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
const $battery = document.getElementById('battery');
const $hrIcon = document.getElementById('hricon');
const $stepsIcon = document.getElementById('stepsicon');
const $caloriesIcon = document.getElementById('calicon');
//const $batteryIcon = document.getElementById('bicon');
const $myMonth = document.getElementById('myMonth');
const $myDay = document.getElementById('myDay');
const $sequenceImage = document.getElementById('sequence-image');
const $myAnimation = document.getElementById('myAnimation');
const $anim = document.getElementById('anim');
const $circ = document.getElementById('circ');
const $closeMenu = document.getElementById('closeMenu');
const $orangeTheme = document.getElementById('orangeTheme');
const $pinkTheme = document.getElementById('pinkTheme');
const $blueTheme = document.getElementById('blueTheme');
const $redTheme = document.getElementById('redTheme');
const $purpleTheme = document.getElementById('purpleTheme');
const $oceanTheme = document.getElementById('oceanTheme');
const $yellowTheme = document.getElementById('yellowTheme');
const $greenTheme = document.getElementById('greenTheme');
const $sandTheme = document.getElementById('sandTheme');
const batLabel = document.getElementById('batLabel');
const $batBar = document.getElementById('batBar');

// define vars for later use;
let time = '';
let hr = '--';
let now = new Date();
let monthnum = now.getMonth();
let day = now.getDate();
let batteryLevel;
let color = 'white';

// get heart rate
if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener('reading', () => {
    hr = hrm.heartRate;

    //heart rate memes here

    if (hr > 90 && hr < 110) {
      //sequence definieren
      $sequenceImage.href = `Heartbeat100/Frame_01.png`;

      //aantal frames anpassen//
      $anim.to = 22;

      //animatie activeren//
      setTimeout(startMeme, 1000);

      //close sprite
      setTimeout(closeMeme, 5000);
    }
  });
  hrm.start();
}

//Battery
const batSize = document.getElementById('batBar');
//const batPic = document.getElementById("batIcon");
const batCharging = document.getElementById('chargingIcon');

battery.onchange = () => {
  if (battery.chargeLevel > 90) {
    batSize.width = 24;
  } else if (battery.chargeLevel > 78) {
    batSize.width = 22;
  } else if (battery.chargeLevel > 65) {
    batSize.width = 19;
  } else if (battery.chargeLevel > 53) {
    batSize.width = 16;
  } else if (battery.chargeLevel > 40) {
    batSize.width = 13;
  } else if (battery.chargeLevel > 28) {
    batSize.width = 10;
  } else if (battery.chargeLevel > 15) {
    batSize.width = 7;
  } else if (battery.chargeLevel > 8) {
    batSize.width = 4;
    batSize.style.fill = 'white';
    //batPic.href="img/bat_icon_e.png";
    batLabel.style.fill = 'white';
    //batCharging.href="img/charging_icon_w.png";
  } else if (battery.chargeLevel > 0) {
    batSize.width = 2;
    batSize.style.fill = 'firebrick';
    //batPic.href="img/bat_icon_e_r.png";
    batLabel.style.fill = 'firebrick';
    //batCharging.href="img/charging_icon_red.png";
  } else {
    batSize.width = 0;
  }
};

if (battery.charging ? true : false) {
  batCharging.style.display = 'inline';
} else {
  batCharging.style.display = 'none';
}
//console.log("The battery " + (battery.charging ? "is" : "is not") + " charging");

function closeMeme() {
  $myAnimation.style.display = 'none';
  $time.y = 70 + 120;
  $time.style.fontSize = 90;
  $myMonth.y = 65;
  $myDay.y = 65;
  $time.x = 336 / 2;
  $myMonth.x = 336 / 2 - 22.5;
  $myDay.x = 336 / 2 + 22.5;
  $time.style.fontSize = 90;
}

function startMeme() {
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
    //if ($time.className = 'time') {
    $myMonth.style.display = 'none';
    $myDay.style.display = 'none';
    $hrIcon.style.display = 'none';
    $stepsIcon.style.display = 'none';
    $caloriesIcon.style.display = 'none';
    $batBar.style.display = 'none';
    $hr.style.display = 'none';
    $steps.style.display = 'none';
    $calories.style.display = 'none';
    $battery.style.display = 'none';
    $circ.style.display = 'inline';
    $time.y = 70;
    $time.style.fontSize = 50;
    $time.className = 'menu';
    //console.log($time.className);
    //}
  });

  $closeMenu.addEventListener('click', function () {
    //if ($time.className = 'menu') {
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    $time.className = 'time';
    //console.log($time.className);
    //console.log('close menu');
    //}
  });

  //GET THEM COLORS GOING//

  $orangeTheme.addEventListener('click', function () {
    //reorganise
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    //define color
    color = '#F8CDC1';
    //change colors
    $myMonth.style.fill = color;
    $myDay.style.fill = color;
    $hrIcon.style.fill = color;
    $stepsIcon.style.fill = color;
    $caloriesIcon.style.fill = color;
    $batBar.style.fill = color;
    $hr.style.fill = color;
    $steps.style.fill = color;
    $calories.style.fill = color;
    $battery.style.fill = color;
    $time.style.fill = color;
    //console.log(color);
    //classfix
    $time.className = 'time';
  });

  $pinkTheme.addEventListener('click', function () {
    //reorganise
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    //define color
    color = '#F7CBF7';
    //change colors
    $myMonth.style.fill = color;
    $myDay.style.fill = color;
    $hrIcon.style.fill = color;
    $stepsIcon.style.fill = color;
    $caloriesIcon.style.fill = color;
    $batBar.style.fill = color;
    $hr.style.fill = color;
    $steps.style.fill = color;
    $calories.style.fill = color;
    $battery.style.fill = color;
    $time.style.fill = color;
    //classfix
    $time.className = 'time';
  });

  $blueTheme.addEventListener('click', function () {
    //reorganise
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    //define color
    color = '#C3D9FC';
    //change colors
    $myMonth.style.fill = color;
    $myDay.style.fill = color;
    $hrIcon.style.fill = color;
    $stepsIcon.style.fill = color;
    $caloriesIcon.style.fill = color;
    $batBar.style.fill = color;
    $hr.style.fill = color;
    $steps.style.fill = color;
    $calories.style.fill = color;
    $battery.style.fill = color;
    $time.style.fill = color;
    //classfix
    $time.className = 'time';
  });

  $redTheme.addEventListener('click', function () {
    //reorganise
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    //define color
    color = '#F4B7B6';
    //change colors
    $myMonth.style.fill = color;
    $myDay.style.fill = color;
    $hrIcon.style.fill = color;
    $stepsIcon.style.fill = color;
    $caloriesIcon.style.fill = color;
    $batBar.style.fill = color;
    $hr.style.fill = color;
    $steps.style.fill = color;
    $calories.style.fill = color;
    $battery.style.fill = color;
    $time.style.fill = color;
    //classfix
    $time.className = 'time';
  });

  $purpleTheme.addEventListener('click', function () {
    //reorganise
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    //define color
    color = '#D8D4FC';
    //change colors
    $myMonth.style.fill = color;
    $myDay.style.fill = color;
    $hrIcon.style.fill = color;
    $stepsIcon.style.fill = color;
    $caloriesIcon.style.fill = color;
    $batBar.style.fill = color;
    $hr.style.fill = color;
    $steps.style.fill = color;
    $calories.style.fill = color;
    $battery.style.fill = color;
    $time.style.fill = color;
    //classfix
    $time.className = 'time';
  });

  $oceanTheme.addEventListener('click', function () {
    //reorganise
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    //define color
    color = '#CBFDFA';
    //change colors
    $myMonth.style.fill = color;
    $myDay.style.fill = color;
    $hrIcon.style.fill = color;
    $stepsIcon.style.fill = color;
    $caloriesIcon.style.fill = color;
    $batBar.style.fill = color;
    $hr.style.fill = color;
    $steps.style.fill = color;
    $calories.style.fill = color;
    $battery.style.fill = color;
    $time.style.fill = color;
    //classfix
    $time.className = 'time';
  });

  $yellowTheme.addEventListener('click', function () {
    //reorganise
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    //define color
    color = '#FEF9D0';
    //change colors
    $myMonth.style.fill = color;
    $myDay.style.fill = color;
    $hrIcon.style.fill = color;
    $stepsIcon.style.fill = color;
    $caloriesIcon.style.fill = color;
    $batBar.style.fill = color;
    $hr.style.fill = color;
    $steps.style.fill = color;
    $calories.style.fill = color;
    $battery.style.fill = color;
    $time.style.fill = color;
    //classfix
    $time.className = 'time';
  });

  $greenTheme.addEventListener('click', function () {
    //reorganise
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    //define color
    color = '#DAFCCE';
    //change colors
    $myMonth.style.fill = color;
    $myDay.style.fill = color;
    $hrIcon.style.fill = color;
    $stepsIcon.style.fill = color;
    $caloriesIcon.style.fill = color;
    $batBar.style.fill = color;
    $hr.style.fill = color;
    $steps.style.fill = color;
    $calories.style.fill = color;
    $battery.style.fill = color;
    $time.style.fill = color;
    //classfix
    $time.className = 'time';
  });

  $sandTheme.addEventListener('click', function () {
    //reorganise
    $myMonth.style.display = 'inline';
    $myDay.style.display = 'inline';
    $hrIcon.style.display = 'inline';
    $stepsIcon.style.display = 'inline';
    $caloriesIcon.style.display = 'inline';
    $batBar.style.display = 'inline';
    $hr.style.display = 'inline';
    $steps.style.display = 'inline';
    $calories.style.display = 'inline';
    $battery.style.display = 'inline';
    $circ.style.display = 'none';
    $time.y = 70 + 120;
    $time.style.fontSize = 90;
    //define color
    color = '#F1F1F1';
    //change colors
    $myMonth.style.fill = color;
    $myDay.style.fill = color;
    $hrIcon.style.fill = color;
    $stepsIcon.style.fill = color;
    $caloriesIcon.style.fill = color;
    $batBar.style.fill = color;
    $hr.style.fill = color;
    $steps.style.fill = color;
    $calories.style.fill = color;
    $battery.style.fill = color;
    $time.style.fill = color;
    //classfix
    $time.className = 'time';
  });
}

//battery memes
battery.onchange = () => {
  //meme 1

  if (batteryLevel > 49 && batteryLevel < 50) {
    $sequenceImage.href = `Battery50/Frame_01.png`;

    //aantal frames anpassen//
    $anim.to = 27;

    //animatie activeren//
    setTimeout(startMeme, 1000);

    //close sprite
    setTimeout(closeMeme, 5000);

    console.log('battery memeeeeeeee');
  }
};

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
