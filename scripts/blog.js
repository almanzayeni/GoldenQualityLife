//Post: Doesn't work like I want it to yet
document.getElementById('blogForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('image');
    let imageUrl = '';

    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageUrl = e.target.result;
            saveBlog({ title, author, date, category, content, imageUrl });
            alert('Blog posted successfully!');
            window.location.href = 'discussions.html';
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveBlog({ title, author, date, category, content, imageUrl });
        alert('Blog posted successfully!');
        window.location.href = 'discussions.html';
    }
});

function saveBlog(blog) {
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));
}

//Image preview
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change', function () {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" width="200px" height="200px">`;
        };
        reader.readAsDataURL(file);
    }
});


