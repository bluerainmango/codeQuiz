var questions = [
    { 
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<scripting>","<js>","<javascript>","<script>"],
        answer: "<script>" 
    },
    { 
        title: "How can you add a comment in a JavaScript?",
        choices: [ 
                    `<!-- This is a comment-->`,
                    `// This is a comment`,      
                    `' This is a comment`,
                ],
        answer: `// This is a comment`
    },
    { 
        title: "Where is the correct place to insert a JavaScript?",
        choices: [
                    "The <head> section",
                    "Both the <head> section and the <body> section are correct",
                    "The <body> section"
                ],
        answer: "Both the <head> section and the <body> section are correct" 
    },
    {
        title: `What is the correct syntax for referring to an external script called "xxx.js"?`,
        choices: [
                    `<script href="xxx.js">`,
                    `<script name="xxx.js">`,
                    `<script src="xxx.js">`
                ],
        answer: `<script src="xxx.js">`
    },
    {
        title: `How do you round the number 7.25, to the nearest integer?`,
        choices: [
                    `Math.rnd(7.25)`,
                    `rnd(7.25)`,
                    `round(7.25)`,
                    `Math.round(7.25)`
        ],
        answer: `Math.round(7.25)`
    }
]