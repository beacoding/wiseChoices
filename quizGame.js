var prompt = require('prompt');

var x = 0;
var y = 0.5;
var target;

var questions = {
  0: {
    prompt: 'You just started the school year with a perfect 4.0 GPA',
    choices: [{
      reply: 'Awesome',
      val: [250, 0.2],
    }, {
      reply: 'Sweet',
      val: [250, 0.2]
    }]
  },
  1: {
    prompt: 'Should you get health insurance?',
    choices: [{
      reply: 'Yes',
      val: [-250, 0.1],
    }, {
      reply: 'No',
      val: [0, -0.5],
      consequence: 'All your employees are dead'
    }]
  },
  3: {
    prompt: 'You cannot get into a course. Should you use AnEyeOut?',
    choices:
      [{
        reply: 'Yes',
        val: [10, 0.3],
        prompt: 'AnEyeout got into your Course!',
        choices: [{
          reply: 'Awesome',
          val: [50, 0.2]
        }]
      },
      {
        reply: 'No',
        val: [10, -10],
        consequence: "You couldn't get into your course"
      }]
  },
  4: {
    prompt: 'Do you think Chris is buff?',
    choices:
      [{
        reply: 'Eh I guess',
        val: [-100, -0.5],
        consequence: 'How dare you lie. You are sentenced to bad grades for the rest of the year.'
      },
      {
        reply: 'Duh',
        val: [-100, -0.5],
        consequence: 'How dare you lie. You are sentenced to bad grades for the rest of the year.'
      }
      ]
  }
}

var Node = function(prompt, reply, val, consequence) {
  this.prompt = prompt;
  this.reply = reply;
  this.val = val;
  this.consequence = consequence;
  this.left = null;
  this.right = null;
}

var buildTree = function(json) {
  var res = [];
  var recurseThrough = function(node) {
    if (!node) {
      return;
    }
    var newNode = new Node(node.prompt, node.reply, node.val, node.consequence);
    if (!node.choices) {
      return newNode;
    }


    newNode.left = !!node ? recurseThrough(node.choices[0]) : null;
    newNode.right = !!node ? recurseThrough(node.choices[1]) : null;
    return newNode;
  }

  for (var key in json) {
    res.push(recurseThrough(json[key]));
  }
  return res;
}

var decisionSet = buildTree(questions);

var getChoiceString = function(choices) {
  return choices.join(" or ") + '?';
}

var initialize = function(decisionSet) {
  var start = decisionSet[0];
  prompt.start();

  console.log('GPA: ' + x, 'Happiness: ' + y);
  console.log(start.prompt);
  console.log(getChoiceString([start.left.reply, start.right.reply]));

  prompt.get(['response'], function(err, res) {
    x += start.left.val[0];
    y += start.left.val[1];
    decisionSet.splice(0, 1);
    startGame(decisionSet);
  })
}

var startGame = function(decisionSet) {
  var index = Math.floor(Math.random() * decisionSet.length);
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

  console.log('GPA: ' + x, 'Happiness: ' + y);
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
    startGame(decisionSet);
  })
}

initialize(decisionSet);
