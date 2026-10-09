let poseModelURL = 'https://teachablemachine.withgoogle.com/models/PASTE_YOUR_MODEL_ID_HERE/';

let classifier, video, label = "Scanning Spine...", confidence = 0.0;

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  classifier = ml5.imageClassifier(poseModelURL + 'model.json', video, () => classifyVideo());
}

function classifyVideo() { classifier.classify(gotResult); }

function gotResult(err, res) {
  if (!err && res.length > 0) {
    label = res[0].label;
    confidence = res[0].confidence;
  }
  classifyVideo();
}

function draw() {
  background(20);
  push(); translate(width, 0); scale(-1, 1);
  image(video, 0, 0, width, 440);
  pop();

