module.exports = {
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
	    consequence: 'You ran out of money cause insurance cost too much'
	  }, {
	    reply: 'No',
	    val: [0, -0.5],
	    consequence: 'You missed 3 days of school due to pneumonia.'
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
	      consequence: "Woops. You couldn't get into your course. So you now have to drop out of school"
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