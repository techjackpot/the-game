export default {
    "data": [
        {
            "id": "intro",
            "title": "THE PIT",
            "type": "target",
            "method": "all",
            "steps": [
                {
                    "id": "title",
                    "fields": [
                        {
                            "id": "title",
                            "type": "text",
                            "placeholder": "This is my title",
                            "label": "",
                        }
                    ]
                },
                {
                    "id": "core4",
                    "fields": [
                        {
                            "id": "core4",
                            "type": "single",
                            "placeholder": "",
                            "label": "What area of the Core 4 are you stacking?",
                            "options": ['body', 'being', 'balance', 'business'],
                        }
                    ]
                },
                {
                    "id": "who",
                    "fields": [
                        {
                            "id": "who",
                            "type": "text",
                            "placeholder": "",
                            "label": "Who / What are you stacking ?",
                        }
                    ]
                },
                {
                    "id": "feeling",
                    "fields": [
                        {
                            "id": "feeling",
                            "type": "multi",
                            "placeholder": "",
                            "label": "Which of the four feelings of the drift are you currently experiencing right now?",
                            "options": ['anger', 'blame', 'guilt', 'shame', 'other'],
                        }
                    ]
                },
            ]
        },
        {
            "id": "dark",
            "title": "DARK",
            "type": "target",
            "steps": [
                {
                    "id": "trigger",
                    "fields": [
                        {
                            "id": "trigger",
                            "type": "text",
                            "label2": "In this moment, what/who has triggered you to drift, feel angry, frustrated, pissed off, hurt, upset, or disappointed and why?",
                            "placeholder": "[intro.who] has triggered me to feel [intro.feeling] because:",
                            "label": "In this moment, why has [intro.who] triggered you to feel [intro.feeling]?"
                        }
                    ]
                },
                {
                    "id": "scream",
                    "fields": [
                        {
                            "id": "scream",
                            "type": "text",
                            "label": "In this moment, if you could scream at [intro.who] what would you say?",
                            "placeholder": "I would scream _______"
                        }
                    ]
                },
                {
                    "id": "force",
                    "fields": [
                        {
                            "id": "force",
                            "type": "text",
                            "label": "In this moment, if you could force [intro.who] to think, say, feel, or do anything what would it be?",
                            "placeholder": "I would Force them to _____"
                        }
                    ]
                },
                {
                    "id": "think",
                    "fields": [
                        {
                            "id": "think",
                            "type": "text",
                            "label": "In this moment, with no filter nor constraints what do you truly think about [intro.who]?",
                            "placeholder": " [intro.who] is a/an __[make a list]___"
                        }
                    ]
                },
                {
                    "id": "experience",
                    "fields": [
                        {
                            "id": "experience",
                            "type": "text",
                            "label": "In this moment, what is it that you don't ever want to experience in the future with [intro.who]?",
                            "placeholder": "I don't ever want to ___[make a list]___."
                        }
                    ]
                }
            ]
        },
        {
            "id": "drift",
            "title": "DRIFT",
            "type": "target",
            "steps": [
                {
                    "id": "facts",
                    "fields": [
                        {
                            "id": "facts",
                            "type": "text",
                            "label": "What are the facts about the situation that triggered you?",
                            "placeholder": "The situation that triggered me was __[description & details of what happened & why it triggered you]__."
                        }
                    ]
                },
                {
                    "id": "story",
                    "fields": [
                        {
                            "id": "story",
                            "type": "text",
                            "label": "What is the story, created by the Trigger that you're telling yourself and others?",
                            "placeholder": "The story I’m telling is __[specific, short 1-2 sentence or statement]__."
                        }
                    ]
                },
                {
                    "id": "feelings",
                    "fields": [
                        {
                            "id": "feelings",
                            "type": "text",
                            "label": "Describe the feeling’s that arise for you when you tell yourself this story.",
                            "placeholder": "I feel [intro.feeling] and __[make a list]__"
                        }
                    ]
                },
                {
                    "id": "thoughts",
                    "fields": [
                        {
                            "id": "thoughts",
                            "type": "text",
                            "label": "Describe the specific thoughts or desired actions that arise for you when you tell yourself this story.",
                            "placeholder": "I want to __[description of action]__."
                        }
                    ]
                },
                {
                    "id": "evidence",
                    "fields": [
                        {
                            "id": "evidence",
                            "type": "text",
                            "label": "What evidence do you have to prove the current story is true?",
                            "placeholder": "Here's why this version could be true __[reasons it could be true]__ ."
                        }
                    ]
                },
                {
                    "id": "possibilities",
                    "fields": [
                        {
                            "id": "possibilities",
                            "type": "text",
                            "label": "[intro.username], what might be possible for you in this situation if the current story was false?",
                            "placeholder": "I would be free to __[description of possibility]."
                        }
                    ]
                },
                {
                    "id": "truth",
                    "fields": [
                        {
                            "id": "truth",
                            "type": "driftBoolean",
                            "label": "Is this story true?",
                            "placeholder": "placeholder"
                        }
                    ]
                },
                {
                    "id": "truth100",
                    "fields": [
                        {
                            "id": "truth100",
                            "type": "driftBoolean",
                            "label": "[intro.username], are you 100% sure that this story is true?",
                            "placeholder": "placeholder"
                        }
                    ]
                },
                {
                    "id": "clear",
                    "fields": [
                        {
                            "id": "clear",
                            "type": "info",
                            "label": "Okay [intro.username], time to get clear about what you want!",
                            "placeholder": "placeholder"
                        }
                    ]
                },
                {
                    "id": "you",
                    "fields": [
                        {
                            "id": "you",
                            "type": "text",
                            "label": "Regardless of the emotional trigger and the current story what do you truly want in this situation?",
                            "placeholder": "I want __[description of want]__ for me."
                        }
                    ]
                },
                {
                    "id": "them",
                    "fields": [
                        {
                            "id": "them",
                            "type": "text",
                            "label": "What do you want for [intro.who] in this situation?",
                            "placeholder": "I want __[description of want]__ for [intro.who]."
                        }
                    ]
                },
                {
                    "id": "relationship",
                    "fields": [
                        {
                            "id": "relationship",
                            "type": "text",
                            "label": "What do you want for you and [intro.who] in this situation?",
                            "placeholder": "I want __[description of want]__ for [intro.who] and [intro.username]."
                        }
                    ]
                }
            ]
        },
        {
            "id": "shift",
            "title": "SHIFT",
            "type": "target",
            "steps": [
                {
                    "id": "step1",
                    "fields": [
                        {
                            "id": "q01",
                            "type": "info",
                            "label": "[intro.username], now that you're clear, let's get back in the game.",
                            "placeholder": "placeholder"
                        }
                    ]
                },
                {
                    "id": "meStory",
                    "fields": [
                        {
                            "id": "meStory",
                            "type": "text",
                            "label": "What is the me Version?",
                            "placeholder": "The “me” version of the story is __[turn the story on yourself]__."
                        }
                    ]
                },
                {
                    "id": "meEvidence",
                    "fields": [
                        {
                            "id": "meEvidence",
                            "type": "text",
                            "label": "What evidence do you have to prove that this story is True?",
                            "placeholder": "Here is why this version could be true __[reasons it could be true]__."
                        }
                    ]
                },
                {
                    "id": "oppositeStory",
                    "fields": [
                        {
                            "id": "oppositeStory",
                            "type": "text",
                            "label": "What is the opposite version?",
                            "placeholder": "The “opposite” version of the story is __[turn the original story around]__."
                        }
                    ]
                },
                {
                    "id": "oppositeEvidence",
                    "fields": [
                        {
                            "id": "oppositeEvidence",
                            "type": "text",
                            "label": "What evidence do you have to prove that this story is true?",
                            "placeholder": "Here is why this version could be true __[reasons it could be true]__."
                        }
                    ]
                },
                {
                    "id": "desiredStory",
                    "fields": [
                        {
                            "id": "desiredStory",
                            "type": "text",
                            "label": "Now [intro.username], what is the desired version of the story?",
                            "placeholder": "The “desired” version of the story is __[create the story you truly want]__."
                        }
                    ]
                },
                {
                    "id": "desiredEvidence",
                    "fields": [
                        {
                            "id": "desiredEvidence",
                            "type": "text",
                            "label": "What evidence do you have to prove that this story is True?",
                            "placeholder": "Here is why this version could be true __[reasons it could be true]__."
                        }
                    ]
                },
                {
                    "id": "originalWant",
                    "fields": [
                        {
                            "id": "originalWant",
                            "type": "blockBoolean",
                            "label": "Will the “original“ story give you what you want?",
                            "placeholder": "placeholder"
                        }
                    ]
                },
                {
                    "id": "meWant",
                    "fields": [
                        {
                            "id": "meWant",
                            "type": "blockBoolean",
                            "label": "Will the “me“ story give you what you want?",
                            "placeholder": "placeholder"
                        }
                    ]
                },
                {
                    "id": "oppositeWant",
                    "fields": [
                        {
                            "id": "oppositeWant",
                            "type": "blockBoolean",
                            "label": "Will the “opposite“ story give you what you want?",
                            "placeholder": "placeholder"
                        }
                    ]
                },
                {
                    "id": "desiredWant",
                    "fields": [
                        {
                            "id": "desiredWant",
                            "type": "blockBoolean",
                            "label": "Will the “desired“ story give you what you want?",
                            "placeholder": "placeholder"
                        }
                    ]
                },
                {
                    "id": "choice",
                    "fields": [
                        {
                            "id": "choice",
                            "type": "choice",
                            "label": "Now [intro.username], which version of the story are you choosing?",
                            "placeholder": "placeholder"
                        }
                    ]
                },
                {
                    "id": "why",
                    "fields": [
                        {
                            "id": "why",
                            "type": "text",
                            "label": "Why are you choosing this story, [intro.username]?",
                            "placeholder": "I am choosing this version because __[reason]__"
                        }
                    ]
                }
            ]
        },
        {
            "id": "lift",
            "title": "LIFT",
            "type": "target",
            "steps": [
                {
                    "id": "why",
                    "fields": [
                        {
                            "id": "why",
                            "type": "text",
                            "label": "Why is that positive?",
                            "placeholder": "What happened was positive because __[describe the reason it was positive]__."
                        }
                    ]
                },
                {
                    "id": "what",
                    "fields": [
                        {
                            "id": "what",
                            "type": "text",
                            "label": "What is the Lesson you learned?",
                            "placeholder": "I learned that __[describe the lesson learned in 1-2 sentences]__."
                        }
                    ]
                },
                {
                    "id": "body",
                    "fields": [
                        {
                            "id": "body",
                            "type": "text",
                            "label": "[intro.username], how does this lesson apply to your body?",
                            "placeholder": "This is how the lesson applies to my body __[describe the application]__."
                        }
                    ]
                },
                {
                    "id": "being",
                    "fields": [
                        {
                            "id": "being",
                            "type": "text",
                            "label": "[intro.username], how does this lesson apply to your being?",
                            "placeholder": "This is how the lesson applies to my being __[describe the application]__."
                        }
                    ]
                },
                {
                    "id": "balance",
                    "fields": [
                        {
                            "id": "balance",
                            "type": "text",
                            "label": "[intro.username], how does this lesson apply to your balance?",
                            "placeholder": "This is how the lesson applies to my balance __[describe the application]__."
                        }
                    ]
                },
                {
                    "id": "business",
                    "fields": [
                        {
                            "id": "business",
                            "type": "text",
                            "label": "[intro.username], how does this lesson apply to your business",
                            "placeholder": "This is how the lesson applies to my business __[describe the application]__."
                        }
                    ]
                }
            ]
        },
        {
            "id": "light",
            "title": "LIGHT",
            "type": "target",
            "steps": [
                {
                    "id": "revelation",
                    "fields": [
                        {
                            "id": "revelation",
                            "type": "text",
                            "label": "What is the most significant insight/revelation you’re leaving this stack experience with?",
                            "placeholder": "The most significant revelation is __[describe the revelation]__."
                        }
                    ]
                },
                {
                    "id": "why",
                    "fields": [
                        {
                            "id": "why",
                            "type": "text",
                            "label": "Why do you feel that Insight/Revelation is significant?",
                            "placeholder": "This is significant because __[describe why this is significant]__."
                        }
                    ]
                },
                {
                    "id": "what",
                    "fields": [
                        {
                            "id": "what",
                            "type": "text",
                            "label": " [intro.username], now seeing what you see, what is the one thing you must take action on in the next 48 hours?",
                            "placeholder": "I will __[do this one thing]__."
                        }
                    ]
                },
                {
                    "id": "must",
                    "fields": [
                        {
                            "id": "must",
                            "type": "text",
                            "label": "Why is this action a must for you?",
                            "placeholder": "I must do this one thing __[describe why you are doing this one thing]__."
                        }
                    ]
                },
                {
                    "id": "how",
                    "fields": [
                        {
                            "id": "how",
                            "type": "text",
                            "label": "How will you know you have completed this action?",
                            "placeholder": "The result will be __[describe how you will know you have completed the one thing]__."
                        }
                    ]
                }
            ]
        },
        /*{
            "id": "path",
            "title": "THE PATH",
            "type": "hide",
            "steps": []
        }*/
    ]
}
