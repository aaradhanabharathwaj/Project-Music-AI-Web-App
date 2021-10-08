var dragons="";
var katyperry="";
var l_x=0;
var l_y=0;
var r_x=0;
var r_y=0;
score=0;
status_dragons="";
status_katyperry="";
score_right=0;
function setup(){
    canvas=createCanvas(450,400);
    canvas.center();
    canvas.position(550, 280);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function preload(){
    dragons=loadSound("Imagine Dragons.mp3");
    katyperry=loadSound("Katy Perry.mp3");
}
function draw(){
image(video,0,0,450,400);
fill("#ffffff");
stroke("#ffffff");
status_dragons=dragons.isPlaying();
status_katyperry=katyperry.isPlaying();
if(score>0.2){
    circle(l_x,l_y,20);
    dragons.stop();
}
    if(status_dragons==false){
    katyperry.play();
    document.getElementById("song_name").innerHTML="The Song's Name = Katy Perry Roar";
    }
    if(score_right>0.2){
        circle(r_x.r_y,20)
        katyperry.stop();
        if(status_katyperry==false){
           dragons.play();
            document.getElementById("song_name").innerHTML="The Song's Name = Imagine Dragons - Believer";
        }
    }
}
function modelLoaded(){
    console.log("PoseNet is initialized !!")
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_right=results[0].pose.keypoints[10].score;
        score=results[0].pose.keypoints[9].score;
        l_x=results[0].pose.leftWrist.x;
        l_y=results[0].pose.leftWrist.y;
        r_x=results[0].pose.rightWrist.x;
        r_y=results[0].pose.rightWrist.y;
        console.log("Left Wrist X = "+l_x+"Left Wrist Y = "+l_y);
        console.log("Right Wrist X = "+r_x+"Right Wrist Y = "+r_y);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}