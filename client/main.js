
Meteor.startup(function(){
    
    Session.set('isPlaying', false);

});



Template.loginScreen.events({

    'click #start':function(){
        var p_name = $('#p_name').val();
        var o_name = $('#o_name').val();
        var o_email = $('#o_email').val();      
        
        if(p_name != "" && o_name != ""){

            if(o_email != ""){
                Session.set('isPlaying', true);
            }

         }
                
     }

});

Handlebars.registerHelper('isPlaying', function(){return Session.get('isPlaying')});

Template.main.created = function(){

    RandomWord();
   
}

function RandomWord() {
  

    var options = {
        hasDictionaryDef: false, 
                      includePartOfSpeech: "noun",
                      minCorpus: 500000,
                      maxCorpus: 1000000,
                      minLength: 5,
                      maxLength: -1,
                      api_key: "a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
    }

    var requestStr = "http://api.wordnik.com:80/v4/words.json/randomWord?" + 

    //the options

    "hasDictionaryDef=" + options.hasDictionaryDef + 
    "&includePartOfSpeech=" + options.includePartOfSpeech + 
    "&minCorpusCount=" + options.minCorpus + 
    "&maxCorpusCount=" + options.maxCorpus + 
    "&minDictionaryCount=" + "1" +
    "&maxDictionaryCount=" + "-1" +
    "&minLength=" + options.minLength + 
    "&maxLength=" + options.maxLength + 
    "&api_key=" + options.api_key;

    HTTP.call("GET", requestStr, {}, RandomWordComplete);

}

function RandomWordComplete(error, result) {
  
    var content = JSON.parse(result.content);
    Session.set("result", content.word);
         
 }

Template.result.rendered = function(){
   
     $('#result').hide(); 
     $('#result').animate({ height: 'show'});     
    
}

Template.main.events({
    
    'click a#rword':function(){
       Session.set("flag", Math.random()); //triggers a render
       $('#result').animate({ height: 'hide'}, 'slow', RandomWord);      
         
     }
    
 });



Template.result.result = function(){return Session.get("result"); }
