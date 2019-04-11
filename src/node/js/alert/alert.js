function toErrorPage(error) {
    console.error(error);
}

function showWarning(message) {
    $('#warningText').html(message);
    $('#warning').show();
}

function closeWarning() {
    $('#warning').hide();
}

function showError(message) {
    $('#errorText').html(message);
    $('#error').show();
}

function closeError() {
    $('#error').hide();
}
