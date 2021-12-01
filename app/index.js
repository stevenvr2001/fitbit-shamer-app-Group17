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
const $group = document.getElementById('group');
const $battery = document.getElementById('battery');
const $myMonth = document.getElementById('myMonth');
const $myDay = document.getElementById('myDay');

// define vars for later use;
let time = '';
let hr = '--';
let batteryP = Math.floor(battery.chargeLevel) + '%';
let now = new Date();
let monthnum = now.getMonth();
let day = now.getDate();

$time.onclick = () => {
  $group.style.display = 'none';
};

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
  $battery.text = batteryP;
  $myMonth.text = monthname;
  $myDay.text = day;
  //
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
