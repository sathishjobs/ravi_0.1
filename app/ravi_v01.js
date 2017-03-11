/**
 * Author : sathish kumar;
 * Project Name : Jos (Jarvish On Stage);
 * Project Description: Control the keynote/speech/presentation e-slides over voice
 * Version : jos_v01.js
 * Licence : jos_with_me 
 **/

(function(global,$){

var logFunction = function(log){
   throw new Error(log);
};

var doAction = function(action,config){
   action(config);
}

//Check dependencies loaded or not 
if(!$){
    doAction(logFunction,"No Data found");
} else {

    /* 
       dependencies included fine 
       start the speech recognition api 
    */
    

    var ravi = function(){
        return new raviInit();
    };

    var customError = function(errorMsg){
        throw new Error(errorMsg);
    }

    ravi.prototype = {

        addSlides : function(slideInfo){ 

            //Validate slideInfo 
            //Empty or not
            if(!slideInfo){
                customError("Addslides param is empty");
            } 
            else if(!$.isArray(slideInfo)){
                customError("AddSlides param is except array type");
            } else if(!slideInfo.length > 0){
                customError("Slide Info param is empty");
            }

            //Array of slideInfo param expect

            /* slideNo type: string
               slideName type : string 
               slideSrc  type : img
               slideDescription type : string 
             */

            var filteredSlideInfo = [];

            slideInfo.forEach(function(info){
                var collectSlideData = {};
                //check everything in side the array .
                //define the basic structure .
               
                collectSlideData.slideNo = info.slideNo || 'Null';
                collectSlideData.slideName = info.slideName || 'Null';
                collectSlideData.slideSrc = info.slideSrc || 'Null';
                collectSlideData.slideDescription = info.slideDescription || 'Null';

                //push the set of slide info to filteredSlideInfo array of object
                filteredSlideInfo.push(collectSlideData);

                //clear the collectSlideData array
                collectSlideData = {}; 

            
            });

            this.slideShowInfo = filteredSlideInfo ;

            return this;

        },
        addSlide : function(){

        },
        updateSlide : function(){

        },
        deleteSlide : function(){

        },
        addRootCmd : function(){

        },
        showSlideCount : function(){

        },
        goto : function(){

        },
        renderSlide : function(){

        },
        speechListen : function(){

        },
        startSlideshow : function(){

        },
        speechReply : function(){

        },
        renderlog: function(recognitiedWord,slideShowInitObj){
            var viewhelper = '<p>You said :&nbsp';
                viewhelper += recognitiedWord
                viewhelper += '</p>';
            $(".speechloger").css('display','initial').html(viewhelper);
            
            
            console.log("slideshow end");
            //this.slideShowInit();
          
        },
        renderAvailableOptions : function(options){
            var view = "<ul><li><b>Available Options are : </b></li>";
            options.forEach(function(a){
                view+="<li>"+a+"</li>";
            });
            view += "</ul>";
            $(".renderAvailableOptions").text("sathsih");
            $(".renderAvailableOptions").html(view);
            console.log("render function is triggered");
        },
        getSlidesInfo : function(){
            var slideInfo = (this.slideShowInfo.length > 0) ? this.slideShowInfo :  "Nothing found";
            return slideInfo;
        },
        slideShowInit : function(){
            
            //Initial Intro Text 
           
           this.introTextEffect("Say Hi Ravi");

            var slideShowInit = new webkitSpeechRecognition();
            slideShowInit.onresult = evt =>{
                     if(result = /(hi|Ravi|ravi|who are) (you|dummy|hi|ravi|Ravi|help)$/g.exec(evt.results[evt.results.length-1][0].transcript)){
                         if(result[0] == "hi Ravi"){
                            //$("#typewriter").text("Hi Human");
                            this.introTextEffect("Hi Human . I am Ravi version 0.01. I just born on this Month. My available options are :  (Ravi) + Help | Who are you | Slideshow info | Start Slideshow");
                            
                         }else if(result[0]=="who are you"){
                             this.renderAvailableOptions(["hi Ravi"," | help |","slideshow info", "|slideshow start"]);
                             this.introTextEffect("I am made by simply 600 lines javascript code now.Now i am help you present your thoughts. In futute i am the virtual human to help u");
                             
                        } else if(result[0]=="Ravi help"){
                             this.introTextEffect("help triggered");
                             this.renderAvailableOptions(["hi Ravi |"," who are you"]);
                         }

                         
                    }
                var transcript = evt.results[evt.results.length-1][0].transcript;
                this.renderlog(evt.results[evt.results.length-1][0].transcript);
                console.log(this.renderlog(transcript));
                //this.renderlog(transcript,slideShowInit);
                 //  console.log(transcript); 
            };
            slideShowInit.maxAlternatives = 1;
            //slideShowInit.interimResults=true;
            //console.log(slideShowInit.interimResults=true);
            slideShowInit.continuous = true;
            slideShowInit.start();
            slideShowInit.onsoundstart = function(){
                console.log("speech start");
            };
        },
        startKeyNote : function(){

            //Common configuration
            setInterval(function(){
                var raviAi = new webkitSpeechRecognition();
                raviAi.onresult = evt => {
                    if(result =/(hi|Hi|Ravi|ravi) (sayhi|previous|next|ravi|Ravi)$/g.exec(evt.results[evt.results.length-1][0].transcript)){
                        (result[0]=="previous")?r.renderlog("Next function is triggered"):"k";
                        (result[0]=="next")? console.log("next function is triggered"):"k";
                    } 
                    console.log(evt.results[evt.results.length-1][0].transcript);
                }
                raviAi.interimResults = false;
                raviAi.continuous = true;
                raviAi.start();
                
                console.log("This is from test");
                
            },16000);
        },
        introTextEffect : function(animateText){
            var main = this;
            var animateString = animateText ;
            var myArray = animateString.split("");
            console.log(myArray);
            var loopTimer;
            //Clear previews animation text 
            document.getElementById("raviResponse").innerHTML ="";
            
            frameLooper = function(){

                if(myArray.length>0){
                    document.getElementById("raviResponse").innerHTML += myArray.shift();
                } else {
                    clearTimeout(loopTimer);
                }
                loopTimer = setTimeout(frameLooper,120);
            }
            frameLooper();   	    
        }    
    }

    function raviInit(){
        this.slideShowInfo = [];
        this.rootCmd = false;
        this.commends = [];        
    }




    //Assign ravi.prototype to raviInit.prototype
    raviInit.prototype = ravi.prototype;
    
    //Assign ravi to global object 
    global.ravi = global.$r = ravi;   
 

}

})(
/* Get the global object for local access */
window,
/* Get the jquery library for dom manipulation */
$

);


