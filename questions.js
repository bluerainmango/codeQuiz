var questions = [
    { 
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<scripting>","<js>","<javascript>","<script>"],
        answer: "<script>" 
    },
    { 
        title: "What is the correct JavaScript syntax to change the content of the following HTML element? <p id=\"demo\">This is a demonstration.</p>",
        choices: [ 
                    `document.getElement("p").innerHTML = "Hello World!;`,
                    `#demo.innerHTML = "Hello World!";`,      
                    `document.getElementById("demo").innerHTML = "Hello World!";`,
                    `document.getElementByName("p").innerHTML = "Hello World!";`
                ],
        answer: `document.getElementById("demo").innerHTML = "Hello World!";`
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