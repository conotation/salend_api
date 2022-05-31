"use strict"

const button = document.getElementById("button")

function upload() {
    const img = document.getElementById("upload");
    const formData = new FormData();

    formData.append('image', img.files[0])
    console.log(img.files[0])
    const options = {
        method: "POST",
        body: formData,
    }

    fetch("/upload", options)
    .then((res) => res.json())
        .then((data) => {
            console.log(data.success)
            console.log(data.msg)
        }).catch(err => {
            console.error(new Error(err));
        });
}

button.addEventListener('click', upload);