import app from "./app";
import { PORT } from "./config";
import db from "./models";

app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("====================================");
    console.log("✅ DB Connected");
    console.log("====================================");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
  }
  console.log(`Server running on ${PORT}!, http://localhost:${PORT}`);
}); 
