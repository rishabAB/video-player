document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var player=document.getElementById('video_player');
var x;
var oldVal = 0;
var progress = document.getElementById("progress");
let timer=null;
const playButton=document.querySelector(".fa-play");

const currentTimeElement=document.querySelector(".current");
const durationTimeElement=document.querySelector(".duration");

const body=document.getElementById("body_id");

const device_not_valid=document.getElementById("device_not_valid");
let isDeviceValid=false;

let message="This website can be viewed only on a laptop";
console.log(window?.clientInformation?.userAgentData?.platform);

(function() {
  
  if(window.clientInformation && window.clientInformation 
    && window.clientInformation.userAgentData && window.clientInformation.userAgentData.platform)
  {
    if(window.clientInformation.userAgentData.platform === 'Windows' 
    || window.clientInformation.userAgentData.platform === 'macOs' || window.clientInformation.userAgentData.platform === 'Linux'
    || window.clientInformation.userAgentData.platform === 'Chrome Os')
    {
       isDeviceValid=true;

     
    }
   
  }
  else{
    message="Please try on a different device";
  }
  if(!isDeviceValid)
  {
    console.log("raechg");
    body.style.display="none"; 
    device_not_valid.classList.add("only_on_laptop");
  device_not_valid.innerHTML=`<i class="fa-solid fa-triangle-exclamation" style="font-size: 20em;
  text-align: center;
  display: block;"></i><h1 style="width:100%;text-align: center;">${message}</h1>`;
  console.log("test");
  }

})();



function startplayer() 
{
player = document.getElementById('video_player');
player.controls = false;

}

const timeUpdateEvent=() =>{
 
let currentMinutes=Math.floor(player.currentTime/60);
let currentseconds=Math.floor(player.currentTime-currentMinutes *60);
let durattionMinute=Math.floor(player.duration / 60);
let durationSeconds=Math.floor(player.duration-durattionMinute *60);

currentTimeElement.innerHTML=`${currentMinutes}:${currentseconds<10 ?'0' +currentseconds: currentseconds}`;
durationTimeElement.innerHTML=`${durattionMinute}:${durationSeconds}`;

 if(currentTimeElement.innerHTML == durationTimeElement.innerHTML)
 {
  video_Ended();
 }

}
 player.addEventListener('timeupdate',timeUpdateEvent);


function progressLoop() {
  const progress = document.getElementById("progress");
  
  setInterval(function () {      
  progress.value = Math.round((player.currentTime / player.duration) * 100);
  });

  }
    

progress.addEventListener('click', (e) =>{
  const progressTime = (e.offsetX / progress.offsetWidth) * player.duration;  
  player.currentTime = progressTime;
  const percentage = (player.currentTime / player.duration) * 100;
    
    })
     

function video_Ended()
  {
    player.currentTime = 0;
    player.pause();
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
  }

function stop_vol()
{
    player.currentTime = 0;
  
    if(player.paused || player.ended){
      playButton.classList.remove("fa-play");
      playButton.classList.add("fa-pause");
      player.play();
     
    }
    
   progressLoop();
  }
     


function change_vol()
{
  player.volume=document.getElementById("change_vol").value;
}
    
    
function enableMute(x) { 
  
    x.classList.toggle("fa-volume-xmark");

   if(player.muted==true)
    {
      document.getElementById("change_vol").value = oldVal;
      player.muted=false;
      change_vol();
    }
    else
    {
      oldVal =  document.getElementById("change_vol").value;
      document.getElementById("change_vol").value = 0;
      player.muted=true;
    }
  }

  
  function buttonPlayOrPause(x) {
    
    if(player.paused || player.ended){
    
      x.classList.remove("fa-play");
      x.classList.add("fa-pause");
      
      player.play();
     
    }
    else 
    {
      player.pause()
      x.classList.add("fa-play");
      
    }
    
     progressLoop();
   
  }


  function screen(){
   
   if(player.paused || player.ended)
    {
      player.play();
      playButton.classList.remove("fa-play");
      playButton.classList.add("fa-pause");

    }
    else{
      player.pause();
      playButton.classList.add("fa-play");
      
    }
    
    progressLoop();
  }






    


    

  
 





  




