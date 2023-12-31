song1="";
song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() 
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide;

    poseNet= ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialised');
}

function draw()
{
    image(video , 0 , 0 , 600 , 500);    
    fill("#FF0000");
    stroke("#FF0000");

    status_1 = song_status_1.isPlaying(music.mp3);
    status_2 = song_status_2.isPlaying(music2.mp3);

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY,20);
    song_status_2.stop(music2.mp3);
    }

    if(status_1 == false)
    {
    song1.play();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("song_name").innerHTML = "Song Name is Harry Potter Theme";
    }

    if(scoreRightWrist > 0.2)
    {
    circle(rightWristX, rightWristY,20);
    song_status_1.stop(music2.mp3);
    }

    if(status_2 == false)
    {
    song2.play();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("song_name").innerHTML = "Song Name is Peter Pan Theme";
    }

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1)
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('leftWristX = ' + leftWristX + 'leftWristY = ' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('rightWristX = ' + rightWristX + 'rightWristY = ' + rightWristY);
    }
}
