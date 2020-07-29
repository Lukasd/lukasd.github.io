import express from "express";

//routes
import userRoutes from "./server/user/user.route.js";
import authRoutes from "./server/auth/auth.route.js";

const router = express.Router();

router.get("/working", async (req, res) => {
  res.send("OK");
});

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
