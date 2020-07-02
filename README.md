# survey-viewer
Starter kit for google forms survey viewer with 1-5 question rendering, classification text abilities

1. Export google forms survey results as csv.
2. Convert csv with survey results into json.
  - recommend use of https://csvjson.com/csv2json
  - replace questions on first line with shorter key and the map full questions to those keys in file questions.js
3. Create "keys" to bind questions and results.
4. Setup data/config.js
  - change title to reflect your survey name
  - set which questions you want to render - you have to explicitly add every question to be rendered on page like following:
    question = key you specified in questions and answers
    render = method which should be used to represent answers, currently supported 1-5 scale "one_to_five" and text answers "text"
    { question: "YOUR_KEY", render: "text" }
    
## Extras:
### color highlighter
Allows you to choose scale 1-5 questions to be differentiated by colors alowing to see data correlation between your answers

example setup of highlighter:
{ description: "How easy to use is Survey Viewer?", option_val: "fam", question_ref: "familiarity" }

description = what is shown is highlighter select
option_val = option value or unique id to be used as tags for answers and to properly take correct answer set, recomended to be short as it is added in DOM on every created answer marker
question_ref = used to link answers with option selection
