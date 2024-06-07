import axios from "axios";
import express from "express";

const app = express();
const port = 3000;

// anything in the 'public' folder is publicly accessible
app.use(express.static("public"));

const drone_url = "https://datasets-server.huggingface.co/first-rows?dataset=abhi1505%2FHUVER&config=default&split=train";

app.get("/get-image", async (req, res) => {
    try {
        const response = await axios.get(drone_url);
        const metadata = response.data;
        // fetch exact URL of the images
        const imageUrl = metadata["rows"][2]["row"]["image"]["src"];
        // convert the URL to a JSON string
        res.json({ imageUrl });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
