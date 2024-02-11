document.getElementById('FileUpload').addEventListener('change', function () {
    document.getElementById('previewBTN').removeAttribute('disabled');
})

function preview() {
    var file_uploaded = document.getElementById('FileUpload');

    var file = file_uploaded.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var preview = document.getElementById('ads_preview');
        if (file.type == 'video/mp4') {
            preview.innerHTML = '<video style="width:100%;" src="'+event.target.result+'" loop autoplay muted playsinline></video>';
        }else {
            preview.innerHTML = '<img style="width:100%;" src="' + event.target.result + '" class="img-fluid">';
        }
    }

    reader.readAsDataURL(file);
}