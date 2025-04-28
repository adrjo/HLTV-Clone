export function clearForms(...forms) {
    for (const form of forms) {
        form.value = "";
    }
}