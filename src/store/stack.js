import moment from 'moment';

export default {
	status: {
        intro: {
            title: '', // What is the title of your stack?
            core4: '', // What area of the Core 4 are you stacking ?
            who: '', // Who or what are you stacking ?
            feeling: [], // Which of the Four Feelings Of The Drift Are You Currently Experiencing Right Now?
        },
        dark: {
            trigger: '', // In this moment, what/who has triggered you to drift, feel angry, frustrated, pissed off, hurt, upset, or disappointed and why?
            scream: '' ,//In this moment, if you could scream at [intro.who] what would you say?
            force: '', //In this moment, if you could force [intro.who] to think, say, feel, or do anything what would it be?
            think: '', // In this moment, with no filter nor constraints what do you truly think about [intro.who]?
            experience: '', // In this moment, what is it that you don't ever want to experience in the future with [intro.who]?
        },
        drift: {
            facts: '', // What are the Facts about the Situation that Triggered You?
            story: '', // What is the Story, created by the Trigger that you're telling yourself and others?
            feelings: '', // What Feelings come up for you when you Believe this story to be true? (Make a List)
            thoughts: '', // What specific Thoughts or Desired Actions arise in your mind because of those feelings?
            evidence: '', // What evidence do you have to prove the Current Story is True?
            possibilities: '', // [intro.username], What might be possible for you in this situation if the Current Story was False?
            truth: '', // Boolean Type, Is this Story True?
            truth100: '', // Boolean Type, [intro.username], Are You 100% Sure that this Story Is True?
            clear: '', // Okay [intro.username], time to get clear about what you want!
            you: '', // Regardless of the emotional trigger and the current story what do you truly WANT in this situation?
            them: '', // What do you want for the other person/s involved in this Situation?
            relationship: '' // What do you want for the both of you in relationship?
        },
        shift: {
            meStory: '', // What is the ME Version?
            meEvidence: '', // What evidence do you have to prove that this Story is True?
            oppositeStory: '', // What is the OPPOSITE Version?
            oppositeEvidence: '', // What evidence do you have to prove that this Story is True?
            desiredStory: '', // What is the DESIRED Version?
            desiredEvidence: '', // What evidence do you have to prove that this Story is True?
            originalWant: '', // Boolean Type, Will the original story give you what you want ?
            meWant: '', // Boolean Type, Will the me story give you what you want ?
            oppositeWant: '', // Boolean Type, Will the opposite story give you what you want ?
            desiredWant: '', // Boolean Type, Will the desired story give you what you want ?
            choice: '', // Which version of the stroy are you choosing ?
            chosen: '',
            why: '' // Why are you choosing this story ?
        },
        lift: {
            situation: '', // info type
            why: '', // Why is that positive?
            what: '',  // What is the Lesson you learned?
            body: '', // [intro.username], How does this lesson apply to your Body?
            being: '', // [intro.username], How does this lesson apply to your Being
            balance: '', // [intro.username], How does this lesson apply to your Balance?
            business: '' // [intro.username], How does this lesson apply to your Business?
        },
        light: {
            revelation: '', // What is the Most Significant Insight/Revelation you’re leaving this stack experience with?
            why: '', // Why do you feel that Insight/Revelation is significant?
            // what: '', //  [intro.username], Now Seeing what You see, What is the ONE THING You MUST take Action On in the next 48 hours?
            // must: '', // Why is this Action a MUST for you?
            // how: '', // How Will You Know You Have Completed This Action?
            actions: [
                {
                    what: '', //  [intro.username], Now Seeing what You see, What is the ONE THING You MUST take Action On in the next 48 hours?
                    must: '', // Why is this Action a MUST for you?
                    how: '' // How Will You Know You Have Completed This Action?
                }
            ], // Actions
            power: 0, // Selector Type
            feeling: [] // Grid Selector Type, [intro.username], at the end of this Stack what level of power are you feeling ?
        },
	},
	date: moment().format('dddd, MMMM Do'),
	currentPhase: 0,
	currentStep: 0,
};
