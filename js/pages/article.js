import { getPost, renderPost } from "../posts";

tryLoadPost();


function tryLoadPost() {
    const search = new URLSearchParams(window.location.search);
    const content = document.getElementById("content");
    
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
    
    
    renderPost(post);
}