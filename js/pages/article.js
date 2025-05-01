import { getPost, renderPost } from "../posts";
import { addComment, renderComments } from "../comments";
import { renderFeedback, likePost, dislikePost } from "../feedback";


const search = new URLSearchParams(window.location.search);

let post = getPagePost(search);

addClickEvents();

tryLoadPost();
tryLoadFeedback();
tryLoadComments();

function getPagePost(search) {
    if (search.get("id") == null || search.get("id") == "") {
        content.textContent = "404 not found";
        return;
    }
    
    let id = search.get("id");
    const post = getPost(id);
    
    if (post == null) {
        content.textContent = "404 not found";
        return;
    }

    return post;
}

function addClickEvents() {
    if (post == undefined) return;

    const submitButton = document.getElementById("submit_comment");
    submitButton.addEventListener("click", (event) => addComment(event, post.id));

    const likeButton = document.getElementById("like");
    likeButton.addEventListener("click", (event) => likePost(event, post.id));

    const dislikeButton = document.getElementById("dislike");
    dislikeButton.addEventListener("click", (event) => dislikePost(event, post.id));
}



function tryLoadPost() {
    if (post == undefined) return;
    
    renderPost(post);
}

function tryLoadFeedback() {
    if (post == undefined) return;

    renderFeedback(post.id);
}

function tryLoadComments() {
    if (post == undefined) return;

    renderComments(post.id);
}