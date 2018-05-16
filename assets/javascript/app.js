var questions = 
    [
        ["1+1=2",true],["2+1=2",false],
        ["4+1=5",true],["1+7=9",false],
        ["5-2=3",true],["0+0=1",false]
    ];
var questionIndex = 0;
var timeId;
var qAnsered = false;

var timer = 
    {
        time  : 15,
        start : function()
                    {
                        console.log("timer.start");
                        $("#time").text(timer.time);
                        timeID=setInterval(timer.count,1000);
                    },
        count: function()
                    {
                        timer.time--;
                        $("#time").text(timer.time);
                        if (timer.time == 0)
                            {
                                timer.stop();
                                $("#prompt").text("Times Up!");
                            }
                    },
        stop : function()
                    {
                        clearInterval(timeID);
                    },
        reset: function()
                    {
                        timer.time = COUNT_DOWN_Seconds;
                        $("#time").text(timer.time);
                    }
    };



$("#start").on("click",function()
    {
        $("#options").empty();
        $("#options").append($("<button class='button' id='true' style='background-color:#4CAF50;'>TRUE</button>"));
        $("#options").append($("<button class='button' id='false' style='background-color:#f44336;'>FALSE</button>"));
        startQuestion();

    });

function startQuestion()
    {
        if (questionIndex < questions.length)
            {
                timer.start();
                var q = questions[questionIndex];
                $("#prompt").text(q[0]);
                questionIndex++;
            }
    }

