"use strict"

const button = document.getElementById("button")
const divimg = document.getElementById("image")

function upload() {
    const img = document.getElementById("upload");
    const formData = new FormData();

    formData.append('image', img.files[0])
    // console.log(img.files[0])
    const options = {
        method: "POST",
        body: formData,
    }

    fetch("/upload", options)
    .then((res) => res.json())
        .then((data) => {
            if(data.success){
                console.log(data.filename)
                var img = document.createElement("img");
                img.src = document.URL + "image/" + data.filename;
                img.style.width = "100px";
                img.style.height = "100px";
                divimg.appendChild(img);
            }
            console.log(data.msg)
        }).catch(err => {
            console.error(new Error(err));
        });
}

button.addEventListener('click', upload);