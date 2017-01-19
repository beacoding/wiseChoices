var prompt = require('prompt');
var questions = require('./questions');
var buildTree = require('./Tree');

var x = 0;
var y = 0.5;
var target;
var decisionSet = buildTree(questions);
var initialized = false;
var questionsPerMonth = Math.floor(Object.keys(decisionSet).length / 9);
var questionsSoFar = 0;
var currentMonthIndex = 0;
var months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October'
}

var getChoiceString = function(choices) {
  return choices.join(" or ") + '?';
}

var startGame = function(decisionSet) {
  var index;
  if (!initialized) {
    index = 0;
    initialized = true;
  } else {
    index =  Math.floor(Math.random() * decisionSet.length);
  }

  prompt.start();

  if (!decisionSet.length) {
    console.log('Game finished');
    return;
  }
  var obj = decisionSet[index];
  var question = obj.prompt;
  var reply = obj.reply;
  var choice1 = obj.left ? obj.left.reply : null;
  var choice2 = obj.right ? obj.right.reply : null;

  console.log('GPA: ' + x, 'Happiness: ' + y, 'Month: ' + months[currentMonthIndex]);
  console.log(obj.prompt);
  console.log(getChoiceString([choice1, choice2]));

  prompt.get(['response'], function(err, res) {
    var response = res['response'];

    if (response === choice1) {
      decisionSet[index] = obj.left;
    } else if (response === choice2) {
      decisionSet[index] = obj.right;
    }

    x += decisionSet[index].val[0];
    y += decisionSet[index].val[1];
    reason = decisionSet[index].consequence

      if (x < 0 || y < 0) {
        console.log(reason);
        return;
      }

    if (decisionSet[index].prompt === undefined) {
      decisionSet.splice(index, 1);
    }
    
    questionsSoFar++;
    if (questionsSoFar > questionsPerMonth) {
      currentMonthIndex++;
      questionsSoFar = 0;
    }

    startGame(decisionSet);
  })
}

startGame(decisionSet);
