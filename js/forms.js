export function displayForm(event) {
    const toast = document.getElementById("formed");
    toast.style = "display:flex";

    const bg = document.getElementById("darken-bg");
    bg.style = "display:block";
}

export function hideForm(event) {
    const toast = document.getElementById("formed");
    toast.style = "display:none";

    const bg = document.getElementById("darken-bg");
    bg.style = "display:none";
}