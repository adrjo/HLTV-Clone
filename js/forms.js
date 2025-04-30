import { getPost, removePost, updatePost, Post } from "./posts";
import { displayToast } from "./utils";

export function displayForm(event) {
    const toast = document.getElementById("formed");
    toast.style = "display:block";

    darkenBg();
}

export function hideForm(event) {
    const toasts = document.getElementsByClassName("formed");
    for (let toast of toasts) {
        toast.style = "display:none";
    }

    removeBg();
}

function darkenBg() {
    const bg = document.getElementById("darken-bg");
    bg.style = "display:block";
}

function removeBg() {
    const bg = document.getElementById("darken-bg");
    bg.style = "display:none";
}

export function deletePostForm(postId) {
    let post = getPost(postId);
    if (post == null) return;
    darkenBg();

    let div = document.createElement("div");
    div.classList.add("formed");

    let h2 = document.createElement("h2");
    h2.append("Are you sure you want to remove '" + post.title + "'?");

    let cancelButton = document.createElement("button");
    cancelButton.classList.add("bg-red-400", "text-black")
    cancelButton.append("Cancel");
    cancelButton.onclick = () => {
        hideForm();
        div.remove();
    };

    let confirmButton = document.createElement("button");
    confirmButton.classList.add("bg-green-400", "text-black")
    confirmButton.append("Confirm");
    confirmButton.onclick = () => {
        hideForm();
        div.remove();
        if (removePost(postId)) {
            displayToast("✅ Successfully deleted post " + post.title);
        } else {
            displayToast("❌ Error deleting post");
        }
        
    }


    div.append(h2, cancelButton, confirmButton);
    
    
    document.body.prepend(div);
}

export function editPostForm(postId) {
    let post = getPost(postId);
    if (post == null) return;
    darkenBg();

    let div = document.createElement("div");
    div.classList.add("formed");

    let h2 = document.createElement("h2");
    h2.append("Edit Post");

    /*<input id="title" type="text" placeholder="Title" class="self-center">
    <input id="author" type="text" placeholder="Author" class="self-center">
    <input id="image" type="text" placeholder="Header Image Link" class="self-center">
    <textarea id="post_content" class="self-center"></textarea>*/

    let title = document.createElement("input");
    title.id = "title";
    title.type = "text";
    title.placeholder = "Title";
    title.value = post.title;

    let author = document.createElement("input");
    author.id = "author";
    author.type = "text";
    author.placeholder = "Author";
    author.value = post.author;

    let image = document.createElement("input");
    image.id = "image";
    image.type = "text";
    image.placeholder = "Header Image Link";
    image.value = post.imgLink;

    let content = document.createElement("textarea");
    content.id = "post_content";
    content.value = post.content;

    let cancelButton = document.createElement("button");
    cancelButton.classList.add("bg-red-400", "text-black")
    cancelButton.append("Cancel");
    cancelButton.onclick = () => {
        hideForm();
        div.remove();
    };

    let confirmButton = document.createElement("button");
    confirmButton.classList.add("bg-green-400", "text-black")
    confirmButton.append("Confirm");
    confirmButton.onclick = () => {
        let newPost = Post.createFullPost(post.id, title.value, image.value, author.value, content.value, post.date);

        hideForm();
        div.remove();
        if (updatePost(postId, newPost)) {
            displayToast("✅ Post updated: " + newPost.title);
        } else {
            displayToast("❌ Error updating post");
        }
        
    }


    div.append(h2, title, author, image, content, cancelButton, confirmButton);
    
    
    document.body.prepend(div);
}