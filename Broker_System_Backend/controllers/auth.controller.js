const admin = require("../config/firebaseAdmin.config");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const Tenant=require('../models/tenant.model');
const Owner=require('../models/owner.model')
const { refreshIdToken } = require("../utiles/tokenUtils");

const signup = async (req, res) => {
  const { uid, roleId,email } = req.body;
  try {
    const validRole = await Role.findById(roleId);
    if (!validRole) {
      return res.status(400).json({ error: "Invalid role ID" });
    }
    const user = new User({
      uid,
      roleId: validRole._id,
      email
    });
    await user.save();
    await admin.auth().setCustomUserClaims(uid, { roleId });
    console.log(validRole)
    if (validRole.name === "Tenant") {
      const tenant = new Tenant({ userId: user._id  });
      await tenant.save();
    } else if (validRole.name === "Owner") {
      const owner = new Owner({ userId: user._id });
      await owner.save();
    }
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};
const authMiddleware = async (req, res) => {
    try {
      const idToken = req.cookies.idToken;
      console.log("At auth middleware, idToken:", idToken);
      if (idToken) {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log("Decoded token:", decodedToken);
        console.log("Role ID:", decodedToken.roleId);
        return res.status(200).json({
          authenticated: true,
          role: decodedToken.roleId,
          uid:decodedToken.uid,
          email:decodedToken.email,
        });
      }
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken) {
        console.log("Refresh token found, attempting to refresh idToken...");
        const newIdToken = await refreshIdToken(refreshToken);
        console.log("New ID token generated:", newIdToken);
        res.cookie("idToken", newIdToken, {
          httpOnly: true,
          sameSite: "Strict",
          maxAge: 60 * 60 * 1000, 
        });
        const decodedNewToken = await admin.auth().verifyIdToken(newIdToken);
        console.log("Decoded new token:", decodedNewToken);
        console.log("New role ID:", decodedNewToken.roleId);
        return res.status(200).json({
          authenticated: true,
          role: decodedNewToken.roleId
        });
      }
      return res.status(401).json({ authenticated: false });
    } catch (error) {
      console.error("Authentication failed:", error.message);
      return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
  };




const login = async (req, res) => {
  try{
  const { idToken, refreshToken } = req.body;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.cookie("idToken", idToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, 
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({ message: "Login successful", uid: decodedToken.uid });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(401).json({ message: "Login failed", error: error.message });
  }
}
//   // Logout route
const logout = (req, res) => {
  res.clearCookie('idToken', { httpOnly: true });
  res.clearCookie('refreshToken', { httpOnly: true});
  res.status(200).json({ message: 'Logout successful' });
};
module.exports = { signup, login,authMiddleware,logout };
