const express = require('express');
const app = express();

// Serve static files from the "public" directory
app.use(express.static('parent'));

const userData = {
    username: 'exampleUser',
    password: 'secretPassword',
  };
  

// Other routes and server setup
// ...

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
