export function likePost(event, postId) {
    let current = getLikes(postId);

    saveLikes(postId, current+1);
    renderFeedback(postId);
}


function getAllLikes() {
    let likes = localStorage.getItem("likes");

    if (likes == null) {
        return [];
    }
    return JSON.parse(likes);
}

function getLikes(postId) {
    const likes = getAllLikes();
    if (likes.length == 0) {
        return 0;
    }

    let postLikes = likes.filter(like => like.postId == postId);
    for (const like of postLikes) {
        return like.amt;
    }
    return 0;
}

function saveLikes(postId, amt) {
    let postLikes = new Likes(postId, amt);

    let likes = getAllLikes().filter(like => like.postId != postId);

    likes.push(postLikes);
    saveAllLikes(likes);
}

function saveAllLikes(likes) {
    localStorage.setItem("likes", JSON.stringify(likes));
} 

function removeLikes(postId) {
    let likes = getAllLikes().filter(like => like.postId == postId);

    saveAllLikes(likes);
}


class Likes {
    constructor(postId, amt) {
        this.postId = postId;
        this.amt = amt;
    }
}

//shared

export function renderFeedback(postId) {
    let likeCounter = document.getElementById("likeCount");
    likeCounter.textContent = getLikes(postId);


    let dislikeCounter = document.getElementById("dislikeCount");
    dislikeCounter.textContent = getDislikes(postId);
}

//DISLIKES todo: maybe combine, this is all duped code :D

export function dislikePost(event, postId) {
    let current = getDislikes(postId);

    saveDislikes(postId, current+1);
    renderFeedback(postId);
}


function getAllDislikes() {
    let likes = localStorage.getItem("dislikes");

    if (likes == null) {
        return [];
    }
    return JSON.parse(likes);
}

function getDislikes(postId) {
    const likes = getAllDislikes();
    if (likes.length == 0) {
        return 0;
    }

    let postLikes = likes.filter(like => like.postId == postId);
    for (const like of postLikes) {
        return like.amt;
    }
    return 0;
}

function saveDislikes(postId, amt) {
    let postLikes = new Likes(postId, amt);

    let likes = getAllDislikes().filter(like => like.postId != postId);

    likes.push(postLikes);
    saveAllDislikes(likes);
}

function saveAllDislikes(likes) {
    localStorage.setItem("dislikes", JSON.stringify(likes));
} 

function removeDislikes(postId) {
    let likes = getAllDislikes().filter(like => like.postId == postId);

    saveAllDislikes(likes);
}
