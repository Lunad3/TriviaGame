var qList =
    [
        {question: "1+1=2", answer :true}, {question: "1+1=0", answer: false},
        {question: "1+2=3", answer: true}, {question: "1+2=1", answer: false},
        {question: "1+3=4", answer: true}, {question: "1+3=2", answer: false}
    ];
var countdownMax = 5;
var score = 0;
var qIndex = 0;
var timeId;
var qAnsered = false;
var timeUp = false;

var timer =
    {
        time: countdownMax,
        start: function () {
            console.log("timer.start");
            $("#time").text(timer.time);
            timeID = setInterval(timer.count, 1000);
        },
        count: function () {
            if (!qAnsered) {
                timer.time--;
                $("#time").text(timer.time);
                if (timer.time == 0) {
                    timer.stop();
                    Qover(-1);
                }
            }
            else {
                timeUp = true;
                timer.stop();
            }
        },
        stop: function () {
            clearInterval(timeID);
        },
        reset: function () {
            timeUp = false;
            timer.time = countdownMax;
            $("#time").text("");
        }
    };



function startQuestion() {
    Qnext();
    
    $(".button").on("click", function () {
        if (!qAnsered && !timeUp) {
            timer.stop();
            timer.reset();
            if ($(this).attr("id") == qList[qIndex].answer.toString()) {
                Qover(1);
            }
            else {
                Qover(0);
            }
            qAnsered = true;
        }
    Qpost();
    //Qpost what to do after q answered
    
    });
    }


function Qover(answer) {
    var msg = "";
    if (answer == 1) {
        msg = "CORRECT!";
        score++;
    }
    else if (answer == 0) {
        msg = "wrong";
        if (score != 0){
            score--;
        }
    }
    else if (answer == -1) {
        msg = "Time is UP"; 
    }
    $("#time").text(msg);
    $("#score").text(qList.length.toString() + "/" + score.toString())



    
}

function Qnext()
    {
        $("#prompt").text("");
        $("#options").empty();
        if (qIndex < qList.length){
            $("#prompt").text(qList[qIndex].question);
            $("#options").append($("<button class='button' id='true'  style='background-color:#4CAF50'>TRUE</button>"));
            $("#options").append($("<button class='button' id='false' style='background-color:#f44336'>FALSE</button>"));
            timer.start();
        }
    }

function Qpost ()
    {
        $("#"+(!qList[qIndex].answer).toString()).remove()
        console.log("WAITING AFTER QUESTION");
        setTimeout(function(){
            console.log("FINISHED WAITING");    
        },5000)
    }



$("#start").on("click", function () {
    $("#score").text(qList.length.toString() + "/" + score.toString())
    $("#options").empty();
    startQuestion();
});