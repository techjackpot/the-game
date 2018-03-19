export default {
	status: {
		intro: {
		    title: 'title', // What is the title of your stack?
		    core4: 'Body', // What area of the Core 4 are you stacking ?
		    who: 'Some Mother FUCKER', // Who or what are you stacking ?
		    feeling: ['darkness'], // What best describes your current state of being?
		},
		dark: {
		    trigger: 'they fucked up shit', // In this moment, what/who has triggered you to drift, feel angry, frustrated, pissed off, hurt, upset, or disappointed and why?
		    scream: 'Fuck you' ,//In this moment, if you could scream at [intro.who] what would you say?
		    force: 'see my side', //In this moment, if you could force [intro.who] to think, say, feel, or do anything what would it be?
		    think: 'One dimensional Douchebag', // In this moment, with no filter nor constraints what do you truly think about [intro.who]?
		    experience: 'feel dumb', // In this moment, what is it that you don't ever want to experience in the future with [intro.who]?
		},
		drift: {
		    facts: 'I fucked up', // What are the Facts about the Situation that Triggered You?
		    story: 'This person is a fucker', // What is the Story, created by the Trigger that you're telling yourself and others?
		    feelings: 'sad', // What Feelings come up for you when you Believe this story to be true? (Make a List)
		    thoughts: 'destruction', // What specific Thoughts or Desired Actions arise in your mind because of those feelings?
		    evidence: 'shit is fucked up', // What evidence do you have to prove the Current Story is True?
		    possibilities: 'Shit could be better', // [intro.username], What might be possible for you in this situation if the Current Story was False?
		    truth: '', // Boolean Type, Is this Story True?
		    truth100: '', // Boolean Type, [intro.username], Are You 100% Sure that this Story Is True?
		    clear: 'INFO', // Okay [intro.username], time to get clear about what you want!
		    you: 'peace', // Regardless of the emotional trigger and the current story what do you truly WANT in this situation?
		    them: 'perspective', // What do you want for the other person/s involved in this Situation?
		    relationship: 'harmony' // What do you want for the both of you in relationship?
		},
		shift: {
		    meStory: 'I fucked this shit up', // What is the ME Version?
		    meEvidence: 'I was unaware', // What evidence do you have to prove that this Story is True?
		    oppositeStory: 'they did not fuck this shit up', // What is the OPPOSITE Version?
		    oppositeEvidence: 'I was selfish', // What evidence do you have to prove that this Story is True?
		    desiredStory: 'I will do this shit.', // What is the DESIRED Version?
		    desiredEvidence: 'because I can', // What evidence do you have to prove that this Story is True?
		    originalWant: '', // Boolean Type, Will the original story give you what you want ?
		    meWant: '', // Boolean Type, Will the me story give you what you want ?
		    oppositeWant: '', // Boolean Type, Will the opposite story give you what you want ?
		    desiredWant: '', // Boolean Type, Will the desired story give you what you want ?
		    choice: '', // Which version of the stroy are you choosing ?
		    chosen: '',
		    why: 'because it serves me' // Why are you choosing this story ?
		},
		lift: {
		    situation: 'INFO', // info type
		    why: 'I saw some new shit', // Why is that positive?
		    what: 'Shit is not as bad as I thought',  // What is the Lesson you learned?
		    body: 'Do more pushups', // [intro.username], How does this lesson apply to your Body?
		    being: 'Be more aware of shit', // [intro.username], How does this lesson apply to your Being
		    balance: 'Be nicer and realize how much of a dick I can be', // [intro.username], How does this lesson apply to your Balance?
		    business: 'Commit and get the fuck after it' // [intro.username], How does this lesson apply to your Business?
		},
		light: {
		    revelation: 'Shit is way doper than I thought', // What is the Most Significant Insight/Revelation you’re leaving this stack experience with?
		    why: 'I just kept moping like a little bitch, and I am not a bitch, I fuck shit up!', // Why do you feel that Insight/Revelation is significant?
		    what: 'Do not complain, just fucking build', //  [intro.username], Now Seeing what You see, What is the ONE THING You MUST take Action On in the next 48 hours?
		    must: 'The only way to get there is to work here', // Why is this Action a MUST for you?
		    how: 'Be the badass that I am, and show the results all wrapped up pretty as fuck.', // How Will You Know You Have Completed This Action?
		    power: 4, // Selector Type
		    feeling: ['aware', 'gratitude', 'open'] // Grid Selector Type, [intro.username], at the end of this Stack what level of power are you feeling ?
		},
	},
	date: new Date(),
	currentStep: 0,
};
