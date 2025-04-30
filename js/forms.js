import { getPost, removePost } from "./posts";
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

}