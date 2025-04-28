import { displayForm, hideForm } from "./forms.js";

//New post
const newPostButton = document.getElementById("new_post");
newPostButton.addEventListener("click", displayForm);

const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", hideForm);

const submitButton = document.getElementById("submit_post");

submitButton.addEventListener("click", submitPost);


function submitPost(event) {
    
}