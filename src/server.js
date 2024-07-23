const app = require("."); 
const { connectDB } = require("./Config/db");
const PORT = process.env.PORT || 5454;
const bodyParser = require('body-parser') 

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server running at port no. ${PORT}`);
});
