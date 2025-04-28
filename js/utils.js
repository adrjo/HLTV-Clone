export function clearForms(...forms) {
    for (const form of forms) {
        form.value = "";
    }
}

export async function displayToast(toastMessage, displaySeconds) {
    const toastsContainer = document.getElementById("toastsContainer");

    let newToast = createToast(toastMessage);
    toastsContainer.append(newToast);

    setTimeout(() => {
        newToast.style.transition = "opacity 0.5s ease-out"; //fade out...
        newToast.style.opacity = "0";
        setTimeout(() => newToast.remove(), 500); //then remove
    }, displaySeconds * 1000); // timeout in milliseconds
    
    }

function createToast(toastMessage) {
    let toastContainer = document.createElement("div");
    let heading = document.createElement("h2");
    heading.append(toastMessage);
    toastContainer.append(heading);

    return toastContainer;
}