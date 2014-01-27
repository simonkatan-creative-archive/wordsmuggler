Template.main.created = function(){

    Session.set("result", "a test " + Math.round(Math.random() * 200));
   
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
    console.log(result.content);
    Session.set("result", result.content);
     $('#result').animate({ height: 'show'}); 
     

}

Template.main.events({
    
    'click a#rword':function(){
        Session.set("flag", Math.random());
       $('#result').animate({ height: 'hide'});      
        RandomWord();   
     }
    
 });



Template.result.result = function(){return Session.get("result"); }
