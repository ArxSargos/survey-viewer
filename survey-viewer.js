/**
 * Survey viewer - visualisation for data correlation
 * author: Martin Nechvatal martin.nech@gmail.com
 */

// Survey data stored in 2 global variables: questions, answers

let selected_record = undefined;

// Mouse Events Handling
let last_mouse_down_element = undefined;


// Loading data for classifications
const clsconf = localStorage.getItem("classifier-config");
let classifier_config = clsconf ? JSON.parse(clsconf) : default_classifier_config;

// GLobal reference array to link cut out text with replacements
const answers_references = [];

// Tagging
// Prepare tags needed
const tagList = (() => {
    let list = {};
    let tag_styles = "";
    survey_config.color_highlighter.map((item) => {
        list[item.question_ref] = item.option_val;
        // Generate syles for tag
        tag_styles += `.${item.option_val} .${item.option_val}1 { background-color: hsl(20, 100%, 50%)}
        .${item.option_val} .${item.option_val}2 { background-color: hsl(20, 80%, 70%)}
        .${item.option_val} .${item.option_val}3 { background-color: hsl(60, 90%, 60%)}
        .${item.option_val} .${item.option_val}4 { background-color: hsl(150, 90%, 60%)}
        .${item.option_val} .${item.option_val}5 { background-color: hsl(150, 70%, 40%)}`;
    });

    // Add styles for tags
    const stelm = document.createElement("style");
    stelm.textContent = tag_styles;
    document.getElementsByTagName("head")[0].appendChild(stelm);

    return list;
})();
// Extend answers with tags
extendAnswersWithTags();

// Render page components
setTimeout(()=>{
    // Set survey title
    document.getElementById("survey_title").textContent = survey_config.survey_title;
    
    const render_area = document.getElementById("interactive_render");

    // Rendfer all question specified in config
    for (const item of survey_config.show_answers) {
        render_area.appendChild(rendering_functions[item.render](item.question));
        render_area.appendChild(render_component_placeholder(item.question));
    }

    // setup highlighter
    setup_highlighter(render_area);

    // export
    // Classifiers config export
    const export_class_config_btn = document.getElementById("export_class_config");
    export_class_config_btn.addEventListener("click", (ev) => {

        function download(content, fileName, contentType) {
            var a = document.createElement("a");
            var file = new Blob([content], {type: contentType});
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
        }
        download(JSON.stringify(classifier_config), 'classifier_config.json', 'text/plain');
    });
}, 500);


// Config to rendering functions mapping
let rendering_functions = {
    "one_to_five": render_one_to_five,
    "text": build_classifier
}

function setup_highlighter(render_area) {
    const highlighter = document.getElementById("highlighter");
    highlighter.addEventListener("change", (elm) => {
        render_area.className = elm.target.value;
    })
    for (const opt of survey_config.color_highlighter) {
        const option = document.createElement("option");
        option.value = opt.option_val;
        option.textContent = opt.description;
        highlighter.appendChild(option);
    }
}

// ------------------------------------------------------------
// Graphic representation functions
function render_component_placeholder(componentID) {
    const placeholder = document.createElement("span");
    placeholder.setAttribute("id","comp_loc_"+componentID);
    return placeholder;
}

function redraw_component(componentID, component_type) {
    const placeholder = document.getElementById("comp_loc_"+componentID);
    const render_area = document.getElementById("interactive_render");
    render_area.removeChild(placeholder.previousSibling);
    if (component_type === "render_one_to_five") {
        render_area.insertBefore(render_one_to_five(componentID), placeholder);
    } else {
        render_area.insertBefore(build_classifier(componentID), placeholder);
    }
}


// Rendering One to Five rating component
function render_one_to_five(question) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<div class='headline'>${questions[question]}</div><hr>`;
    wrapper.classList.add("otof_wrapper");

    for(let i=1; i<6; i++) {
        const column = document.createElement("div");
        column.classList.add("otof_column");
        column.innerHTML = `<div class='headline'>${i}</div><hr>`;

        let count = 0;
        for(let ansIndex = 0; ansIndex < answers.length; ansIndex++) {
            if (answers[ansIndex][question]===i) {
                const marker = render_marker(answers[ansIndex], ansIndex);
                column.appendChild(marker);

                count++;
            }
        }
        const counter = document.createElement("div");
        counter.innerHTML = `<div class='headline'>Count: ${count}</div>`;
        column.appendChild(counter);

        wrapper.appendChild(column);
    }
    return wrapper;
}

// Rendering marker with references to answer and tags
function render_marker(answer, ref, inner_text, unclassify_opt, question) {
    const square = document.createElement("div");

    const search_text = inner_text ? inner_text : "";
    // Replace cutout indicators with hover title to proper text reference •••
    const matched = search_text.match(/###/g);

    if (matched) {
        let innerHTML = inner_text;
        for (let i =0; i < matched.length; i++) {
            innerHTML = innerHTML.replace("###", "<span title='" + answers_references[ref][question][i] + "'>•••</span>");
        }
        square.innerHTML = innerHTML;
    } else {
        square.textContent = inner_text ? inner_text : "";
    }

    square.dataset.ref = ref;
    square.classList.add("marker", ...answer.tags);
    square.addEventListener("mousedown", (ev) => {
        render_side_record(ev.target.dataset["ref"]);
        highlight_same_answer_markers(ev.target.dataset["ref"]);
        // Save element reference for drag/drop classification
        last_mouse_down_element = ev.target;
    });

    if (unclassify_opt) {
        const unclassify_btn = document.createElement("button");
        // unclassify_btn.value = "x";
        unclassify_btn.textContent = "x";
        unclassify_btn.addEventListener("click", (ev) => {
            unclassify(inner_text, ev.target.parentNode.parentNode.dataset["group"], question);
            redraw_component(question, "classifier_type");
        });
        square.appendChild(unclassify_btn);
    }
    return square;
}

// Rendering Classification component
function build_classifier(question) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("classifier_wrapper");

    const headline = document.createElement("div");
    headline.classList.add("headline");

    // Add new classification_group control
    const new_group_input = document.createElement("input");
    new_group_input.setAttribute("type", "text");
    const new_group_btn = document.createElement("button");
    new_group_btn.textContent = "Add classification group";
    new_group_btn.addEventListener("click", (ev) => {
        const group_name = new_group_input.value;
        if (!group_name || group_name==="") {
            alert("Unable to use classification group name.");
        } else {
            add_cls_group(group_name, question);
            redraw_component(question, "classifier_type");
        }
    });
    headline.appendChild(new_group_input);
    headline.appendChild(new_group_btn);

    const headline_text = document.createElement("span");
    headline_text.textContent = questions[question];
    headline.appendChild(headline_text);
    wrapper.appendChild(headline);
    const endline = document.createElement("hr");
    wrapper.appendChild(endline);

    const class_row = document.createElement("div");
    class_row.classList.add("classifier_row");
    
    // Parse groups
    const groups = classifier_config[question];

    const answers_residuals = JSON.parse(JSON.stringify(answers));

    for (const key in groups) {
        const class_column = document.createElement("div");
        class_column.dataset.group = key;
        class_column.classList.add("classifier_column");
        class_column.innerHTML = `<div class='headline'>${key}</div>`;
        // Romeve classification group button
        const rm_group_btn = document.createElement("button");
        rm_group_btn.textContent = "-";
        rm_group_btn.addEventListener("click", () => {
                remove_cls_group(key, question);
                redraw_component(question, "classifier_type");
        });
        class_column.appendChild(rm_group_btn);
        const line = document.createElement("hr");
        class_column.appendChild(line);

        // console.log ("key", key, groups[key]);

        // Parse users answers and split it to classified parts
        let count = 0;
        for(let ansIndex = 0; ansIndex < answers_residuals.length; ansIndex++) {
                let answer_text = answers_residuals[ansIndex][question];
                answer_text = answer_text.replace(/(\r\n|\n|\r)/gm, " ");

                for (const class_item of groups[key]) {
                    if (answer_text.length < 4) continue;
                    if (answer_text.indexOf(class_item) > -1) {
                        const marker = render_marker(answers[ansIndex], ansIndex, class_item, true, question); // passing unclassify = true
                        
                        class_column.appendChild(marker);
                        answer_text = answer_text.replace(class_item, "###");
                        count++;

                        // save reference to replaced text
                        answers_references[ansIndex]
                            ? answers_references[ansIndex] = answers_references[ansIndex]
                            : answers_references[ansIndex] = {};
                        answers_references[ansIndex][question]
                            ? answers_references[ansIndex][question] = answers_references[ansIndex][question]
                            : answers_references[ansIndex][question] = [];
                        answers_references[ansIndex][question].push(class_item);
                    }
                }

                // Update answer residuals
                answers_residuals[ansIndex][question] = answer_text;
        }
        const counter = document.createElement("div");
        counter.innerHTML = `<div class='headline'>Count: ${count}</div>`;
        class_column.appendChild(counter);

        const dropzone = document.createElement("div");
        dropzone.classList.add("dropzone");
        dropzone.innerHTML = "<span>+</span>";
        const drop_input = document.createElement("input");
        drop_input.setAttribute("title", "drag and drop text from unclassified to create mapping");
        drop_input.setAttribute("type", "text");

        // Handle drag/drop classification
        drop_input.addEventListener("drop", () => {
            // Drag and drop detected
            const selected_text = window.getSelection().toString().trim();
            classify(selected_text, class_column.dataset.group, question);
            redraw_component(question, "classifier_type");
        });
        dropzone.appendChild(drop_input);
        class_column.appendChild(dropzone);

        class_row.appendChild(class_column);
    }

    // Add unclassified group
    const class_column = document.createElement("div");
    class_column.classList.add("classifier_column");
    class_column.innerHTML = `<div class='headline'>unclassified</div><hr>`;

    for(let ansIndex = 0; ansIndex < answers_residuals.length; ansIndex++) {
        const text = answers_residuals[ansIndex][question];
        if (text && text.length > 2 && containsValuableText(text)) {
            const marker = render_marker(answers[ansIndex], ansIndex, text, false, question); // passing unclassify = false
            class_column.appendChild(marker);
        }
    }
    class_row.appendChild(class_column);

    wrapper.appendChild(class_row);
    return wrapper;
}

function containsValuableText(text) {
    if (text.search(/([a-zA-Z])\w+/g) > -1) return true;
    return false;
}

// Classification functions - generating classification data
// Loaded and stored in localStorage
function add_cls_group(group, question) {
    if (classifier_config[question][group]) {
        alert("Group already exists.");
    } else {
        classifier_config[question][group] = [];
    }
    localStorage.setItem("classifier-config", JSON.stringify(classifier_config));
}

function remove_cls_group(group, question) {
    if (classifier_config[question][group]) {
        delete classifier_config[question][group];
    }
    localStorage.setItem("classifier-config", JSON.stringify(classifier_config));
}

function classify(match_string, group, question) {
    classifier_config[question][group].push(match_string);
    classifier_config[question][group].sort((a, b)=> b.length - a.length);

    localStorage.setItem("classifier-config", JSON.stringify(classifier_config));
}

function unclassify(match_string, group, question) {
    const index = classifier_config[question][group].indexOf(match_string);
    if (index > -1) {
        classifier_config[question][group].splice(index, 1);
    }

    localStorage.setItem("classifier-config", JSON.stringify(classifier_config));
}


// ------------------------------------------------------------
// Side panel individual answers rendering functions

function render_side_record(ref_index) {
    const answer = answers[ref_index];

    if (!selected_record) {
        domRef = document.getElementById("detail-raw");
        domRef.innerHTML = "";
    }

    for (const key in answer) {
        const section_key = document.createElement("h3");
        section_key.textContent = key;
        const section_content = document.createElement("p");
        section_content.textContent = answer[key];
        domRef.appendChild(section_key);
        domRef.appendChild(section_content);
    }
}

function highlight_same_answer_markers(ref) {
    const all_markers = document.querySelectorAll(".marker");
    for (const marker of all_markers) {
        if (marker.dataset.ref === ref) {
            if (!marker.classList.contains("highlighted")) {
                marker.classList.add("highlighted");
            }
        } else {
            if (marker.classList.contains("highlighted")) {
                marker.classList.remove("highlighted");
            }
        }
    }
}

// Tags added based on 1-5 rating questions and role question
function extendAnswersWithTags() {
    for (const answer of answers) {
        let tags = [];

        for (const tag in tagList) {
            tags.push(tagList[tag] + answer[tag]);
        }
        answer.tags = tags;
    }
}


// Helper functions
function getAnswerType(answer_value) {
    switch (typeof answer_value) {
        case "number": return {answer_type: "number", value: answer_value};
        case "string": return {answer_type: "text", value: answer_value};
        case "boolean": return {answer_type: "boolean", value: answer_value};
        case "undefined": return {answer_type: "undefined", value: answer_value};
        default: return {answer_type: "undeterminated", value: answer_value};
    }
}
