import { displayForm, hideForm } from "./forms.js";
import { submitPost, renderPosts } from "./posts.js";

// New post
const newPostButton = document.getElementById("new_post");
newPostButton.addEventListener("click", displayForm);


const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", hideForm);

const bg = document.getElementById("darken-bg");
bg.addEventListener("click", hideForm); // hide form when clicking anywhere other than the form too

const submitButton = document.getElementById("submit_post");

submitButton.addEventListener("click", submitPost);

// load posts 
renderPosts();

