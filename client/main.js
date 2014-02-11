

Template.loginScreen.events({

    'click #start':function(event){
        var p_name = $('#p_name').val();
        var o_name = $('#o_name').val();
        var o_email = $('#o_email').val();      
        event.preventDefault();    
        if(p_name != "" && o_name != ""){

            if(o_email != ""){
                
                console.log("create user");
                var prof = {
                                p_name: p_name, 
                                o_name: o_name,
                                p_un: p_name + generateRandomString(5),
                                o_un: o_name + generateRandomString(5)
                               };

                      

                Accounts.createUser({username: prof.p_un, password: "123456", profile: prof });
            }
         }
                
     }

});

Handlebars.registerHelper('isPlaying', function(){return Session.get('isPlaying')});

function generateRandomString(num){
       
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < num; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    //console.log(text);
    return text;

   
};

function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
}; 

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
 
    if(result){ 
         var content = JSON.parse(result.content);
         Session.set("result", content.word);
    }else{
        console.log(error);    
    }
         
 }

Template.result.rendered = function(){
   
     $('#result').hide(); 
     $('#result').animate({ height: 'show'});     
    
}

Template.main.events({
    
    'click #rword':function(){
       Session.set("flag", Math.random()); //triggers a render
       $('#result').animate({ height: 'hide'}, 'slow', RandomWord);      
         
     }
    
 });



Template.result.result = function(){return Session.get("result"); }
