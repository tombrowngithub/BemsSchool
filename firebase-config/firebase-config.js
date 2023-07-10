// Initialize Firebase
let firebaseConfig = {
    apiKey: "AIzaSyB8FlXGCYyTqut-_AVMrhzBZXjdy6t4_RM",
    authDomain: "bitvs-blog.firebaseapp.com",
    projectId: "bitvs-blog",
    storageBucket: "bitvs-blog.appspot.com",
    messagingSenderId: "412591996083",
    appId: "1:412591996083:web:884d2ce2949e0e175884c6"
};

firebase.initializeApp(firebaseConfig);

// Get file input element
let fileUpload = document.getElementById('fileUpload');
let preview = document.getElementById('preview');
let imageGrid = document.getElementById('imageGrid');

// Function to upload file
function uploadImage() {
    let file = fileUpload.files[0];

    // Create a storage reference
    let storageRef = firebase.storage().ref('images/' + file.name);

    // Upload file
    let task = storageRef.put(file);

    // Listen for state changes, errors, and completion of the upload.
    task.on(
        'state_changed',
        function progress(snapshot) {
            let percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + percentage + '% done');
        },
        function error(err) {
            console.log('Upload error:', err);
            alert(err)
        },
        function complete() {
            console.log('Upload complete');
            window.location.reload()
            retrieveImages();
        }
    );
}

// Function to retrieve all images from Firebase Storage
function retrieveImages() {
    let storageRef = firebase.storage().ref('images');

    storageRef.listAll().then(function (result) {
        result.items.forEach(function (imageRef) {
            imageRef.getDownloadURL().then(function (url) {
                let imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.classList.add('image-preview');
                imgElement.classList.add('card-img-top');
                imgElement.classList.add('img-fluid');

                let colElement = document.createElement('div');
                colElement.classList.add('col-md-4', 'shadow', 'p-1');
                colElement.appendChild(imgElement);

                imageGrid.appendChild(colElement);
                preview.appendChild(imgElement);
            });
        });
    }).catch(function (error) {
        console.log('Error retrieving images:', error);
    });
}

// Function to load images on page load
function loadImages() {
    retrieveImages();
}

// Load images on page load
window.onload = loadImages;