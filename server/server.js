const express = require("express");
const mongoose = require("mongoose");
const app = express();
const regis_router = require("./Routes/login-routes");
const img_router = require("./Routes/image-routes");
const Adm_router = require("./Routes/Admin-route");
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://Alex:alexbenedictselva1772006@cluster0.n2pci.mongodb.net/"
  )
  .then(console.log("Successfully connected to the dataBase"))
  .catch((e) => console.log("Error in connecting to the dataBase :", e));

app.use(express.json());
app.use(cors());
app.use("/api", regis_router);
app.use("/api", img_router);
app.use("/api/admin", Adm_router);

const port = "5000";
app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});
