const express = require("express");

const app = express();

app.get('/', (req, res) => {
   res.status(200);
   res.send("Express works");
});

app.listen(3000);
