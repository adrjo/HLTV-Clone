import { getPost, renderPost } from "../posts";
import { addComment, renderComments } from "../comments";


const search = new URLSearchParams(window.location.search);

let post = getPagePost(search);

addClickEvent();

tryLoadPost();
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

function addClickEvent() {
    if (post == undefined) return;

    const submitButton = document.getElementById("submit_comment");

    submitButton.addEventListener("click", (event) => addComment(event, post.id));
}



function tryLoadPost() {
    if (post == undefined) return;
    const content = document.getElementById("article-content");
    
    renderPost(post);
}

function tryLoadComments() {
    if (post == undefined) return;

    renderComments(post.id);
}