import { displayForm, hideForm } from "../forms.js";
import { submitPost, renderPosts, toggleEditMode } from "../posts.js";

// New post
const newPostButton = document.getElementById("new_post");
newPostButton.addEventListener("click", displayForm);

const editModeButton = document.getElementById("edit_mode");
editModeButton.addEventListener("click", toggleEditMode);


const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", hideForm);

const bg = document.getElementById("darken-bg");
bg.addEventListener("click", hideForm); // hide form when clicking anywhere other than the form too

const submitButton = document.getElementById("submit_post");

submitButton.addEventListener("click", submitPost);

// load posts 
renderPosts();

