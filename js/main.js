import { displayToast, removeToast } from "./toasts.js";

//New post
const newPostButton = document.getElementById("new_post");
newPostButton.addEventListener("click", displayToast);

const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", removeToast);

const submitButton = document.getElementById("submit_post");

submitButton.addEventListener("click", submitPost);


