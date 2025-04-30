export function clearForms(...forms) {
    for (const form of forms) {
        form.value = "";
    }
}

export async function displayToast(toastMessage, displaySeconds = 5) {
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

export function getElapsedTimeFormatted(timeSince) {
    let seconds = Math.floor(timeSince / 1000);

    if (seconds < 60) {
        return "just now";
    }

    let minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        let ret = minutes + " minute" + (minutes > 1 ? "s" : "");
        return ret += " ago";
    }

    let hours = Math.floor(minutes / 60);

    if (hours < 24) {
        let ret = hours + " hour" + (hours > 1 ? "s" : "");
        return ret += " ago";
    }
}

export function createFaIconSolid(faName) {
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", faName);

    return icon;
}

// manual uuids cause crypto.randomUUID() only works on HTTPS and i wanna be able to test on mobile natively :D
export function generateUUID() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }