currentGame = {
    inGame: false,
    inResults: false,

    questionNumber: 0,

    numberCorrect: 0,
    numberIncorrect: 0,
    numberUnanswered: 0,

    questionBank: [
        [
            "Which of the following cities is not an Alpha world city, according to the Globalization and World Rankings Research Institute?",
            ['Berlin', 'Chicago', 'Mexico City', 'Moscow'],
            0
        ],

        [
            "Why do urban planners want gated communities?",
            ['To make census data easier to collect', 'To better organize transportation', 'To reduce crime in low-income neighborhoods', 'To reduce automobile traffic'],
            2
        ],

        [
            "What is a 'shock city'?",
            ['A city undergoing a rapid increase in wealth', 'A city whose recent urbanization has caused infrastructural challenges', 'A city recently affected by a power outage', 'A city whose recent urbanization has caused a spike in the cost of living'],
            1
        ],

        [
            "What is a 'primate city'?",
            ['A city with abnormally high cultural influence', 'A city with a high rate of retention of its citizens', 'A city whose organization and infrastructure is considered primitive', 'A city ranked first in its nation in terms of population and economy'],
            3
        ],

        [
            "Which of these cities has the highest population?",
            ['Tokyo', 'Seoul', 'Istanbul', 'New York'],
            2
        ]
    ],

    loadQuestion(i) {
        $('#currentQuestion').html(this.questionBank[i][0]);
        $('#option0').html(this.questionBank[i][1][0]);
        $('#option1').html(this.questionBank[i][1][1]);
        $('#option2').html(this.questionBank[i][1][2]);
        $('#option3').html(this.questionBank[i][1][3]);
    },

    startGame: function() {
        // reset game data
        this.inGame = true;
        this.inResults = false;
        this.numberCorrect = 0;
        this.numberIncorrect = 0;
        this.numberUnanswered = 0;
        this.questionNumber = 0;
        $('#correctAnswers').html(0);
        $('#incorrectAnswers').html(0);
        $('#unansweredQuestions').html(0);

        // display question panel
        $('#currentQuestionPanel').show();

        // hide unnecessary panels
        $('#startGamePanel').hide();
        $('#gameResultsPanel').hide();
        $('#gifPanel').show();
        
        // load the first question
        this.loadQuestion(0);
    },

    endGame: function() {
        // switch in-game booleans
        this.inGame = false;
        this.inResults = true;

        // display results panel
        $('#correctAnswers').html(this.numberCorrect);
        $('#incorrectAnswers').html(this.numberIncorrect);
        $('#unansweredQuestions').html(this.numberUnanswered);
        $('#gameResultsPanel').show();

        // hide unnecessary panels
        $('#currentQuestionPanel').hide();
        $('#gifPanel').hide();

    },

    answerQuestion(choice) {

        // check whether this is correct using an if statement
        if (choice == this.questionBank[this.questionNumber][2]) {
        // modify points accordingly
            this.numberCorrect++;
        } else {
            this.numberIncorrect++;
        }

        console.log(this);
        // load next question if there is one
        if (this.questionNumber < this.questionBank.length - 1) {
            this.questionNumber++;
            this.loadQuestion(this.questionNumber);
        // otherwise end the game
        } else {
            this.endGame();
        }
    }
}

$(document).ready(function() {
    // Initial settings: Hidd all panels except for the Start Game Button

    // When a quiz choice is clicked, answer the question asked

    $('#optionList').on('click', '.option', function( event ) {
        var idGet = $(this).attr('id');
        var index = idGet[idGet.length - 1];
        currentGame.answerQuestion(index);
    })

    // When either the 'Start Game' or 'Restart Game' buttons are clicked, start the game
    $('button').click(function() {
        currentGame.startGame();
        })
});