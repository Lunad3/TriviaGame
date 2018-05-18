var qList =
    [
        { question: "1+1=2", answer: true }, { question: "1+1=0", answer: false },
        { question: "1+2=3", answer: true }, { question: "1+2=1", answer: false },
        { question: "1+3=4", answer: true }, { question: "1+3=2", answer: false }
    ];
var countdownMax = 5;
var score = 0;
var qIndex = 0;
var timeId;
var qAnsered = false;
//----------------Timer Obj (counts down during question)-------------
var timer =
    {
        time: countdownMax,
        start: function () {
            $("#time").text(timer.time);
            timeID = setInterval(timer.count, 1000);
        },
        count: function () {
            if (!qAnsered) {
                timer.time--;
                $("#time").text(timer.time);
                if (timer.time == 0) {
                    timer.stop();
                    timer.reset();
                    Qover(-1);
                }
            }
            else {
                timer.stop();
            }
        },
        stop: function () {
            clearInterval(timeID);
        },
        reset: function () {
            timer.time = countdownMax;
            $("#time").text("");
        }
    };

//----------------startQuestion: starts the quiz/recursively iterates through questions-------------
function startQuestion() {
    timer.start();
    Qnext();
    $(".button").on("click", function () {
        if (!qAnsered) {
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
    });
};
//----------------Qnext: clears elements, displayes question-------------
function Qnext() {
    $("#prompt").text("");
    $("#options").empty();
    if (qIndex < qList.length) {
        $("#prompt").text("Q" + (qIndex + 1) + ":" + qList[qIndex].question);
        $("#options").append($("<button class='button' id='true'  style='background-color:#4CAF50'>TRUE</button>"));
        $("#options").append($("<button class='button' id='false' style='background-color:#f44336'>FALSE</button>"));
    }
};
//----------------Qover: displays if user was correct, updates score, calls Qpost-------------
function Qover(answer) {
    var msg = "";
    if (answer == 1) {
        msg = "CORRECT!";
        score++;
    }
    else if (answer == 0) {
        msg = "wrong";
        if (score != 0) {
            score--;
        }
    }
    else if (answer == -1) {
        msg = "Time is UP";
    }
    $("#time").text(msg);
    $("#score").text("Score : " + qList.length.toString() + "/" + score.toString());
    Qpost();
};

//----------------Qpost: displays only correct answer for 3 sec, then calls startQuestion/or stops iterating qList -------------
function Qpost() {
    $("#" + (!qList[qIndex].answer).toString()).remove();
    $("#" + (qList[qIndex].answer)).css("background-color", "#4CAF50");
    $("#options").prepend($("<h2 id='answer'> Answer is : </h2>"));
    $("body").append($("<h1 id='nextQin'></h1>"));
    var t = 3;
    var countdown = setInterval(function () {
        $("#nextQin").text(t);
        t--;
        if (t === -1) {
            clearInterval(countdown);
            $("#nextQin").remove();
            $("#answer").remove();
            qIndex++;
            if (qIndex == qList.length) {
                $("#" + qList[qIndex - 1].answer.toString()).remove();
                $("#prompt").text("QUIZ OVER");
                $("#time").remove();
            }
            else {
                qAnsered = false;
                startQuestion();
            }
        }
    }, 1000);
};
//----------------Waits for user to press START button and initiates quiz-------------
$("#start").on("click", function () {
    $("#score").text("Score : " + qList.length.toString() + "/" + score.toString())
    $("#options").empty();
    startQuestion();

});