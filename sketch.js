var mic;
var amp;
var x = 0;
var osc;
var index = 0; //index for the beats are faster condition, to increase sound freq
var index2 = 0; // index for the beats are slower condition, to decrease feq
//var sliderbowl;
var button;

var bowlSoundFiles = ['A.mp3', 'A_sharp.mp3', 'B.mp3', 'C.mp3', 'C_sharp.mp3', 'D.mp3', 'D_sharp.mp3', 'E.mp3', 'F.mp3', 'F_sharp.mp3', 'G.mp3', 'G_sharp.mp3'];
var bowlSounds = [];

var howManyBeatsInLast5 = 0;
var startCounting = false;
var millisWhenStarted;
var millisSinceLastHeartbeat = 0;

var beatshistory = [];
var micOutputVol;

function preload() {
  for (var i = 0; i < bowlSoundFiles.length; i = i + 1) {
    bowlSounds[i] = loadSound(bowlSoundFiles[i]);
  }
}

function setup() {
  createCanvas(1000,600);
  background(200);
  button = createButton("GetBeats");
  button.mousePressed(countHeartbeat);

  bowlSounds[3].loop();
  //  sliderbowl = createSlider(0,100,40);



  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  //amp = new p5.Amplitude();

  // osc = new p5.Oscillator();
  // osc.setType('sine');
  // osc.freq(240);
  // osc.amp(0.5);
  mic.amp(1.0);
  mic.connect();

}

function draw() {
  // 	bowlSounds[0].loop();

  // Get the overall volume (between 0 and 1.0)
  //bowlSounds[i].setVolume(0.01*sliderbowl.value());
  var vol = mic.getLevel();

  if (vol > 0.10) {
    // osc.start();
    // osc.stop(0.2);

    // should we be keeping track?
    if (startCounting && millis() - millisSinceLastHeartbeat > 500) {
      // add 1 to our count
      howManyBeatsInLast5 = howManyBeatsInLast5 + 1;
      // say how long it's been since we started keeping track
      millisSinceLastHeartbeat = millis();
    }

  }
  // var index;

  if (startCounting) { // am I counting?
    // if counting, has it been 10 seconds since I started tracking beats
    if (millis() - millisWhenStarted > 5000) { // it's been 5 seconds since I started counting beats, it's howManyBeatsInLast5 now!
      startCounting = false;
      print(" your BPM is  " + howManyBeatsInLast5 * 12);
      beatshistory.push(howManyBeatsInLast5);
      if (beatshistory.length > 2) {
        //print("ready to test")
        if (beatshistory[beatshistory.length - 1] > beatshistory[beatshistory.length - 2]) {
          print("getting faster");
          // for (var i = 0; i < bowlSounds.length; i = i + 1) {
          //   if (bowlSounds[i].isPlaying()) {
          //     print("stopping play")
          //   // bowlSounds[i].stop();
          //   }
          // }


          for (var i = 0; i < bowlSounds.length; i = i + 1) {
            bowlSounds[i].stop()
          }
          
          index = index + 1;
          
          // did our index get too big?
          if(index > bowlSounds.length - 1) {
            index = bowlSounds.length - 1;
          }
          
          // print( index + " " + bowlSounds[index]);
          
          // make sure our sound isn't already playing
          if(bowlSounds[index].isPlaying() == false) {
            // print(' we play the sound')
            bowlSounds[index].loop();
            
          }


        } else if (beatshistory[beatshistory.length - 1] < beatshistory[beatshistory.length - 2]) {
          print("getting slower");

          for (var j = 0; j < bowlSounds.length; j = j + 1) {
            bowlSounds[j].stop()
          }
          
          index = index - 1;
          
          // did our index get too big?
          if(index < 0) {
            index = 0;
          }
          
          // print(index + " " + bowlSounds[index]);
          
          // make sure our sound isn't already playing
          if(bowlSounds[index].isPlaying() == false) {
            // print(' we play the sound')
            bowlSounds[index].loop();
          }


        } else {
          print(" staying the same");
        }
      }

      // osc.freq(howManyBeatsInLast10 * 100);
    }


    //text(vol, width / 2, height / 2);
    //print (vol);
    
    var y = map(vol, 0, 0.5, height, 0);
    stroke(100);
    strokeWeight(4);
    line(x, height, x, y);
    x = x + 1;
    
    if( x > width) {
      background(200);
      x = 0;
    }

    //volhistory.push(vol);
    //for (var i = 0 ; i < volhistory.length ; i++;){
    //point( i, volhistory[i]);
  }



}


// function keyPressed() {
//   for (var i = 0; i < bowlSounds.length; i = i + 1) {
//     bowlSounds[i].stop()
//   }
//   if (index < bowlSounds.length) {
//     bowlSounds[index].loop();
//   } else {
//     index = 0;
//   }
//   index = index + 1;
// }

function countHeartbeat() {
  startCounting = true;
  howManyBeatsInLast5 = 0;
  millisWhenStarted = millis(); // get the number of milliseconds since I started the program
}