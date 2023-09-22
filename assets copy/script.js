
// Function to handle the scoreboard presentation

var highScores = JSON.parse(localStorage.getItem('scores')) || []

function renderScoreboard() {

    highScores.sort(function (a,b) {
        return b.score - a.score
    })

    for (var i=0; i < highScores.length; i++)  {
        console.log(highScores[i].initials, highScores[i].score)
        var liEl = document.createElement('li')
        liEl.textContent = `${highScores[i].initials} | ${highScores[i].score}`
        document.querySelector('ul').append(liEl)
     }
    };
    renderScoreboard();