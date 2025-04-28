export function displayToast(event) {
    const toast = document.getElementById("toasted");
    toast.style = "display:flex";
}

export function removeToast(event) {
    const toast = document.getElementById("toasted");
    toast.style = "display:none";
}