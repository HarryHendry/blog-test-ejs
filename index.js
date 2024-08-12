const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Initialize the posts array with a sample post
let posts = [
    {
        id: Date.now(), // Unique ID based on the current timestamp
        title: "Welcome to My Blog!",
        content: "This is the first post on this blog. Feel free to edit or delete it, and create your own posts."
    }
];

// Route to display all posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Route to show the form to create a new post
app.get('/new', (req, res) => {
    res.render('new');
});

// Route to handle the creation of a new post
app.post('/new', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: Date.now(), title, content });
    res.redirect('/');
});

// Route to show the form to edit a post
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', { post });
});

// Route to handle the updating of a post
app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id == req.params.id);
    post.title = title;
    post.content = content;
    res.redirect('/');
});

// Route to handle the deletion of a post
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
