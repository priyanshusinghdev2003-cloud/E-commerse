import app from "./app.js";
import { PORT } from "./Utils/constant.js";
import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
