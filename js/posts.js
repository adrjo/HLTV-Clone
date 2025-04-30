import { deletePostForm, editPostForm, hideForm } from "./forms";
import { clearForms, displayToast, getElapsedTimeFormatted, createFaIconSolid, generateUUID } from "./utils";


let editModeEnabled = false;

export class Post {
    constructor(title, imgLink, author, content) {
        this.id = generateUUID(); // TODO: when API: get id from database
        this.title = title;
        this.imgLink = imgLink;
        this.author = author;
        this.content = content;
        this.date = Date.now();
    }


    static createFullPost(id, title, imgLink, author, content, date) {
        const post = new Post(title, imgLink, author, content);
        post.id = id;
        post.date = date;
        return post;
    }
}

export function submitPost(event) {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const imgLink = document.getElementById("image");
    const content = document.getElementById("post_content");


    let post = new Post(title.value, imgLink.value, author.value, content.value);

    try {
        savePost(post);

        // clear and hide the form
        clearForms(title, author, imgLink, content);
        hideForm(event);
        displayToast("✅ Successfully created post " + post.title, 5);
        renderPosts();
    } catch(error) {
        displayToast("❌ Error creating post", 5);
    }
}

export function updatePost(postId, post) {
    try {
        removePost(postId);

        savePost(post);
        toggleEditMode();
    } catch(error) {
        return false;
    }
    return true;
}

//TODO: load posts from api instead of localstorage
export function getPosts() {
    let posts = localStorage.getItem("posts");

    if (posts == null) {
        return [];
    }
    return JSON.parse(posts);
}

function savePost(post) {
    let posts = getPosts();
    posts.push(post);

    savePosts(posts);
}

//TODO: replace with call to API to save a post.
function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}

export function getPost(postId) {
    const posts = getPosts();

    for (const post of posts) {
        if (post.id == postId) {
            return post;
        }
    }
    return null;
}


export function renderPost(post) {
    const contentContainer = document.getElementById("article-content");

    let articleContainer = document.createElement("div");
    articleContainer.classList.add("article", "flex-3/4", "mr-1", "mb-5");

    let title = document.createElement("h1");
    title.append(post.title);
    title.classList.add("uppercase", "font-extrabold", "text-4xl", "mt-1.5", "pb-2");

    let authorDate = document.createElement("div");
    authorDate.classList.add("flex");

    let author = document.createElement("small");
    author.append(post.author);

    let date = document.createElement("small");
    date.classList.add("mr-0", "text-right", "m-auto");
    let formattedDate = new Date(post.date);
    date.append(formattedDate.toDateString());

    authorDate.append(author, date);

    
    let img = document.createElement("img");
    img.src = post.imgLink;
    img.classList.add("border-black-1", "p-4");

    const content = createContentSection(post.content);

    articleContainer.append(title, authorDate);
    if (post.imgLink != undefined) {
        articleContainer.append(img);
    }
    articleContainer.append(content);

    contentContainer.append(articleContainer);
}

// automatically split sections up into spans via newline chars, automatic links, create lists via star * and -, make bold/italic via [b]/[i] codes, maybe [spoiler] tag support too?
function createContentSection(contentData) {
    if (contentData == undefined || contentData == "") {
        return "";
    }

    let contentDiv = document.createElement("div");

    //inline styling (bold, italic, spoiler)
    //const styled = inlineStyling() //TODO, for now just splitting into spans is enough.

    // split into spans
    const sections = contentData.split("\n\n");

    for (let section of sections) {
        let span = document.createElement("span");

        if (section.includes("\n")) { // single line breaks
            let newLines = section.split("\n");

            for (const line of newLines) {
                span.append(line);
                span.append(document.createElement("br"));
            }
        } else {
            span.append(section);
        }
        contentDiv.append(span);
    }

    return contentDiv;
}


export function renderPosts() {
    const posts = getPosts();

    const postsContainer = document.getElementById("content");

    postsContainer.innerHTML = "";

    if (posts == null) {
        return;
    }
    
    // newest posts first
    posts.sort((a, b) => b.date - a.date);

    let currentDay = -1;
    for (const post of posts) {
        let postDate = new Date(post.date);
        if (postDate.getDate() != currentDay) {
            postsContainer.append(createDateHeading(postDate));
            
        }
        postsContainer.append(createPost(post));
        currentDay = postDate.getDate();
    }
}

/*
    <h3 class="font-bold mb-5 mt-5">Counter-Strike news on March 10th 2025:</h3>
*/

function createDateHeading(postDate) {
    let h3 = document.createElement("h3");
    h3.classList.add("font-bold", "mb-5", "mt-5")

    const formatter = new Intl.DateTimeFormat('en-US', { // format like "March 10 2025"
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

    h3.append("Counter-Strike news on " + formatter.format(postDate) + ":");

    return h3;
}

/*
<a href="article" class="news-button bg-gray-700 flex gap-2 items-center shadow-2xs mb-0.5">
    <h2>NAVI upset G2</h2> <!-- title -->
    <div class="news-info m-auto mr-0 text-xs">
         <div class="comments">5 comments</div> <!-- comment count -->
         <div class="date">5 min ago</div> <!-- date -->
     </div>
</a>
*/

function createPost(post) {
    let container = document.createElement((editModeEnabled ? "div" : "a"));
    container.href = "article?id=" + post.id;
    container.classList.add("news-button", "bg-gray-700", "flex", "gap-2", "items-center", "shadow-2xs", "mb-0.5");

    let editB = document.createElement("button");
    let deleteB = document.createElement("button");

    let crossIcon = createFaIconSolid("fa-xmark");
    let editIcon = createFaIconSolid("fa-pen-to-square");
    deleteB.append(crossIcon);
    deleteB.title = "Remove post";
    deleteB.onclick = () => deletePostForm(post.id);

    editB.append(editIcon);
    editB.title = "Edit post";
    editB.onclick = () => editPostForm(post.id);

    let h2 = document.createElement("h2");
    h2.append(post.title);

    let meta = createMeta(post);

    if (editModeEnabled) {
        container.append(editB, deleteB);
    }

    container.append(h2, meta);
    return container;
}

export function removePost(id) {
    try {
        console.log("deleting id=" + id);

        let posts = getPosts();
        posts = posts.filter(post => post.id != id);

        savePosts(posts);
        renderPosts();
    } catch(error) {
        return false;
    }
    return true; // successfully deleted post
}

function createMeta(post) {
    let meta = document.createElement("div");
    meta.classList.add("news-info", "m-auto", "mr-0", "text-xs");

    let commentsCount = document.createElement("p");
    commentsCount.append(0 + " comments"); //todo

    let date = document.createElement("p");
    let dateObj = new Date(post.date);

    let timeSince = Date.now() - post.date;
    let formattedDate = getElapsedTimeFormatted(timeSince); // for same-day posts, display time since ("5 hours ago", "10 minutes ago", "just now")


    if ((timeSince / 3_600_000) > 24) {
        formattedDate = dateObj.toLocaleTimeString(["sv"], { hour: '2-digit', minute: '2-digit' }); //format like "15:30"
    }

    date.append(formattedDate);


    meta.append(commentsCount, date);
    return meta;
}

export function toggleEditMode(event) {
    editModeEnabled = !editModeEnabled;

    // render posts again with/without edit mode buttons
    renderPosts();
}