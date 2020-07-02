// General survey configuration
const survey_config = {
    survey_title: "Example Survey Results: dd/mm/yyyy",
    show_answers: [ // question id, renderer to generate html representation
        { question: "expected_features", render: "text" },
        { question: "familiarity", render: "one_to_five" }
    ],
    color_highlighter: [
        // default option { description: "no coloring" , value: "" }
        { description: "How easy to use is Survey Viewer?", option_val: "fam", question_ref: "familiarity" }
    ]

}

// strings are ordered later from longest to shortest (so when applied they don't break string matching)
// USED ONLY WHEN APP FIRST LOADED, THEN STORED TO LOCALSTORAGE!
// Following setup can be exported from browser localStorage, when your classification is done
// When exported paste here as default so you can shared your classification with html as one bundle 
// format:
// {
//    question_id: [ string, string, ... ],
//    another_q_id: [ string, string, ... ]
// }

const default_classifier_config = {}