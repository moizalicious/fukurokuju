function toErrorPage(error) {
    console.error(error);
}

function showWarning(message) {
    console.warn(message);
    $('#warningText').html(message);
    $('#warning').show();
}

function closeWarning() {
    $('#warning').hide();
}

function showError(message) {
    console.error(message);
    $('#errorText').html(message);
    $('#error').show();
}

function closeError() {
    $('#error').hide();
}
