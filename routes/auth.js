console.log("AUTH MODULE LOADED");

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const db = require("../config/db");
const path = require("path");

// صفحه ثبت نام
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/register.html"));
});

// ثبت نام
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send("Username and password required");
    }

    const hashed = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, hashed],
        (err, result) => {
            if (err) return res.send(err.message);

            const userId = result.insertId;

            db.query(
                "INSERT INTO villages (user_id, name) VALUES (?,?)",
                [userId, username + "'s Village"],
                (err2) => {
                    if (err2) return res.send(err2.message);

                    res.send("REGISTER OK");
                }
            );
        }
    );
});

// LOGIN (نسخه تستی)
router.post("/login", (req, res) => {
    console.log("LOGIN HIT:", req.body);

    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err, rows) => {
            if (err) return res.send(err.message);

            if (rows.length === 0) {
                return res.send("INVALID USER");
            }

            const user = rows[0];

            const ok = await bcrypt.compare(password, user.password);

            if (!ok) {
                return res.send("WRONG PASSWORD");
            }

            req.session.userId = user.id;

            res.send("LOGIN_SUCCESS");
        }
    );
});

// تست route
router.get("/test", (req, res) => {
    res.send("AUTH WORKS");
});

module.exports = router;