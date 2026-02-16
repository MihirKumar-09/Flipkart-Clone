import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  logout,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

// ===========SIGN UP ROUTE==========
router.post("/signup", signup);

// =========LOGIN ROUTE=======
router.post("/login", signin);

// ========LOG-OUT ROUTE========= ;
router.post("/logout", logout);

// ===========DELETE USER==========
router.delete("/delete-user", deleteUser);

// =======UPDATE USER==========
router.put("/user/update", updateUser);

export default router;
