import { hideForm } from "./forms";
import { clearForms, displayToast, getElapsedTimeFormatted } from "./utils";

class Post {
    constructor(title, author, content) {
        this.id = crypto.randomUUID(); // TODO: when API: get id from database
        this.title = title;
        this.author = author;
        this.content = content;
        this.date = Date.now();
    }
}

export function submitPost(event) {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const content = document.getElementById("post_content");


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



//TODO: load posts from api instead of localstorage
export function renderPosts() {
    const posts = JSON.parse(localStorage.getItem("posts"));
    const postsContainer = document.getElementById("content");

    postsContainer.innerHTML = "";

    let currentDay = new Date(Date.now()).getDate();
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
    let container = document.createElement("a");
    container.href = "/article/" + post.id;
    container.classList.add("news-button", "bg-gray-700", "flex", "gap-2", "items-center", "shadow-2xs", "mb-0.5");

    let h2 = document.createElement("h2");
    h2.append(post.title);
    container.append(h2);

    let meta = createMeta(post);
    container.append(meta);

    return container;
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