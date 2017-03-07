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
            if($(".logtxt").text().trim().toLowerCase() == "say hi ravi")
            {
                $(".logtxt").html("You Said : "+recognitiedWord);
                $(".nxt").css("display","block");        
            }
            else{
                $(".logtxt").append(" "+recognitiedWord);
                $(".nxt").css("display","none");        

            }
        },
        getSlidesInfo : function(){
            var slideInfo = (this.slideShowInfo.length > 0) ? this.slideShowInfo :  "Nothing found";
            return slideInfo;
        },
        slideShowInit : function(){
            var slideShowInit = new webkitSpeechRecognition();
            slideShowInit.onresult = evt =>{
                    if(result = /(hi|Ravi|ravi) (dummy|hi|ravi|Ravi)$/g.exec(evt.results[evt.results.length-1][0].transcript)){
                        if(result[0] == "hi Ravi"){
                            
                        }
                    }
                   var transcript = evt.results[evt.results.length-1][0].transcript;
                   this.renderlog(evt.results[evt.results.length-1][0].transcript);
                   //console.log(ravi.call(this,renderlog2));
                   console.log(this);
                   console.log(evt.results[evt.results.length-1][0].transcript); 
            };
            slideShowInit.continuous = true;
            slideShowInit.start();
        },
        startKeyNote : function(){

            //Common configuration
            setInterval(function(){
                var raviAi = new webkitSpeechRecognition();
                raviAi.onresult = evt => {
                    if(result =/(Ravi|ravi) sayhi|previous|next/g.exec(evt.results[evt.results.length-1][0].transcript)){
                        (result[0]=="previous")?console.log("previous function is triggered"):"k";
                        (result[0]=="next")? console.log("next function is triggered"):"k";
                    } 
                    console.log(evt.results[evt.results.length-1][0].transcript);
                }
                raviAi.interimResults = false;
                raviAi.continuous = true;
                raviAi.start();
                console.log("This is from test");
                
            },20000);
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


