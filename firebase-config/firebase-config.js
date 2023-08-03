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
let preview = document.getElementById('preview');
let imageGrid = document.getElementById('imageGrid');

// Function to handle authentication and render content
function checkPassword() {
    let password = document.getElementById("password-input").value;

    // Replace "your-password" with the actual password you want to use
    if (password === "12345") {
        // Password is correct, close the modal or perform any desired action
        let passwordModal = bootstrap.Modal.getInstance(document.getElementById("password-page"));
        passwordModal.hide();

        // Generate and display the content
        let contentPage = document.getElementById("content-page");
        contentPage.classList.remove("hidden");

        // Additional content generation and manipulation can be done here
        contentPage.innerHTML = `
      <h3 class="my-4 text-info shadow-sm">Make a post on BITVs Events & Gallery</h3>
      <div class="d-flex flex-column">
          <div class="mb-3">
              <label for="fileUpload" class="form-label">Choose an image or video</label>
              <input class="form-control" type="file" id="fileUpload">
          </div>

          <div class="form-floating mb-5">
              <textarea class="form-control h-100" placeholder="Leave a comment here" id="Textarea"></textarea>
              <label for="Textarea">Comments</label>
          </div>
            <div class="d-flex flex-column justify-content-center">
                <div style="height: 30px;"  class="progress" role="progressbar" aria-label="Default striped example" aria-valuemin="0" aria-valuemax="100">
                    <div id="progress-bar" class="progress-bar progress-bar-animated" style="width: 0"></div>
                 </div>
                    <button id="uploadButton" class="btn btn-primary text-center mb-4" onclick="uploadFile()">UPLOAD POST</button>
             </div>


      </div>
    `;
    } else {
        // Password is incorrect, display an error message or perform any desired action
        alert("Incorrect password!!! Please Contact Administrator.");
    }
}


// Function to upload image
function uploadFile() {
    let fileUpload = document.getElementById('fileUpload');
    let file = fileUpload.files[0];

    let storageRef, fileType, loadFunction;

    // Check the file type
    if (file.type.includes('image')) {
        storageRef = firebase.storage().ref('images/' + file.name);
        fileType = 'image';
        loadFunction = loadImages;
    } else if (file.type.includes('video')) {
        storageRef = firebase.storage().ref('videos/' + file.name);
        fileType = 'video';
        loadFunction = loadVideos;
    } else {
        alert('Invalid file type. Only images and videos are allowed.');
        return;
    }

    // Upload file
    let task = storageRef.put(file);

    // Listen for state changes, errors, and completion of the upload.
    task.on(
        'state_changed',
        function progress(snapshot) {
            let percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            // Update the width of the progress bar element
            let progressBar = document.getElementById('progress-bar');
            let uploadButton = document.getElementById('uploadButton');

            uploadButton.style.display = 'none';
            progressBar.style.width = percentage + '%';
            progressBar.innerText = percentage + '%';
        },
        function error(err) {
            console.log('Upload error:', err);
            alert(err);
        },
        async function complete() {
            console.log('Upload complete');

            // Retrieve the comment from the textarea
            let commentTextArea = document.getElementById('Textarea');
            let comment = commentTextArea.value;

            // Save the comment in Firestore
            await saveComment(file.name, comment);

            loadFunction();
            //window.location.href = '/gallery-event.html';
        }
    );
}

async function saveComment(filename, comment) {
    try {
        // Create a Firestore reference to the collection where you want to store the comments
        const commentsCollectionRef = firebase.firestore().collection('comments');

        // Create a new document in the comments collection
        await commentsCollectionRef.doc(filename).set({
            comment: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log('Comment saved successfully!');
    } catch (error) {
        console.error('Error saving comment:', error);
    }
}



function getComment(filename) {
    return new Promise((resolve, reject) => {
        // Create a Firestore reference to the collection where the comments are stored
        const commentsCollectionRef = firebase.firestore().collection('comments');

        // Retrieve the comment document for the given filename
        commentsCollectionRef
            .doc(filename)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    // Retrieve the comment from the document data
                    const comment = doc.data().comment;
                    resolve(comment);
                } else {
                    resolve(null); // Return null if no comment document exists
                }
            })
            .catch((error) => {
                console.error('Error retrieving comment:', error);
                reject(error);
            });
    });
}



// Function to retrieve all images from Firebase Storage
function loadImages() {
    let imageGrid = document.getElementById('imageGrid');
   // imageGrid.innerHTML = ''; // Clear the existing content

    let storageRef = firebase.storage().ref('images');
    storageRef.listAll().then(function(result) {
        result.items.forEach(function(item) {
            item.getDownloadURL().then(function(url) {
                let imgElement = document.createElement('img');
                imgElement.src = url;
                imgElement.classList.add('image-preview', 'card-img-top', 'img-fluid');

                let colElement = document.createElement('div');
                colElement.classList.add('col-md-4', 'shadow', 'p-1');
                colElement.appendChild(imgElement);

                // Get the comment for the current image
                getComment(item.name).then(function(comment) {
                    if (comment) {
                        let commentElement = document.createElement('p');
                        commentElement.textContent = comment;
                        colElement.appendChild(commentElement);
                    }

                    imageGrid.appendChild(colElement);
                });
            });
        });
    }).catch(function(error) {
        console.log('Error retrieving images:', error);
    });
}

function loadVideos() {
    let imageGrid = document.getElementById('imageGrid');
    //imageGrid.innerHTML = ''; // Clear the existing content

    let storageRef = firebase.storage().ref('videos');
    storageRef.listAll().then(function(result) {
        result.items.forEach(function(item) {
            item.getDownloadURL().then(function(url) {
                let videoElement = document.createElement('video');
                videoElement.src = url;
                videoElement.classList.add('video-preview', 'card-img-top', 'img-fluid');
                videoElement.controls = true;

                let colElement = document.createElement('div');
                colElement.classList.add('col-md-4', 'shadow', 'p-1');
                colElement.appendChild(videoElement);

                // Get the comment for the current video
                getComment(item.name).then(function(comment) {
                    if (comment) {
                        let commentElement = document.createElement('p');
                        commentElement.textContent = comment;
                        colElement.appendChild(commentElement);
                    }

                    imageGrid.appendChild(colElement);
                });
            });
        });
    }).catch(function(error) {
        console.log('Error retrieving videos:', error);
    });
}


// Load images on page load
window.onload = function () {
    loadImages();
    loadVideos();
    let passwordModal = new bootstrap.Modal(document.getElementById("password-page"));
    passwordModal.show();
};
