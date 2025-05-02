import { clearForms, generateUUID } from "./utils";

class Comment {
    constructor(content, postId) {
        this.id = generateUUID();
        this.content = content;
        this.author = "Anonymous"; //todo
        this.date = Date.now();
        this.postId = postId;
    }
}


export function addComment(event, postId) {
    let content = document.getElementById("comment_content");

    let comment = new Comment(content.value, postId);

    clearForms(content);
    
    saveComment(comment);
    renderComments(postId);
}

function getComments() {
    let comments = localStorage.getItem("comments");

    if (comments == null) {
        return [];
    }
    return JSON.parse(comments);
}

function saveComment(comment) {
    let comments = getComments();
    comments.push(comment);

    saveComments(comments);
}

function saveComments(comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
}

export function removeComments(postId) {
    let comments = getComments()
        .filter(comment => comment.postId != postId);

        saveComments(comments);
}


/*
                <div>
                    <div class="flex">
                        <small>Author</small>
                        <small class="mr-0 text-right m-auto">2025-04-30 17:30</small>
                    </div>
                    <span>My goat</span>
                </div>*/

export function renderComments(postId) {
    const commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = "";

    const comments = getComments()
        .filter(comment => comment.postId == postId)                
        .sort((a,b) => a.date > b.date);

    for (const comment of comments) {
        let container = document.createElement("div");

        let metaContainer = document.createElement("div");
        metaContainer.classList.add("flex");

        let author = document.createElement("small");
        author.append(comment.author);
        let date = document.createElement("small");
        date.append(new Date(comment.date).toLocaleString());
        date.classList.add("mr-0", "text-right", "m-auto");

        metaContainer.append(author, date);

        let content = document.createElement("span");
        content.append(comment.content);

        container.append(metaContainer, content);

        commentsContainer.append(container);
    }
}

export function getCommentCount(postId) {
    return getComments()
        .filter(comment => comment.postId == postId)
        .length;
}