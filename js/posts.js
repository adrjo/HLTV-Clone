import { hideForm } from "./forms";
import { clearForms, displayToast } from "./utils";

class Post {
    static lastId = 0;
    constructor(title, author, content) {
        this.id = Post.lastId++; // TODO: when API: get id from database
        this.title = title;
        this.author = author;
        this.content = content;
        this.date = Date.now();
    }
}

export function submitPost(event) {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("content");


    let post = new Post(title.value, author.value, content.value);

    //TODO: replace with call to API to save a post.
    let posts = [];

    try {
        if (localStorage.getItem("posts") != null) {
            posts = JSON.parse(localStorage.getItem("posts"));
        }

        posts.push(post);

        localStorage.setItem("posts", JSON.stringify(posts));

        // clear and hide the form
        clearForms(title, author, content);
        hideForm(event);
        displayToast("✅ Successfully created post " + post.title, 5);
    } catch(error) {
        displayToast("❌ Error creating post", 5);
    }
}