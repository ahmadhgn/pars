const express = require("express");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();

const authRoutes = require("./routes/auth");
const db = require("./config/db");

// امنیت
app.use(helmet());

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// فایل‌های استاتیک
app.use(express.static("public"));

// session
app.use(
    session({
        secret: "CHANGE_THIS_TO_A_LONG_RANDOM_SECRET",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

// rate limiter (فعلاً آماده ولی استفاده نشده)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many login attempts"
});

// لاگ درخواست‌ها
app.use("/auth", (req, res, next) => {
    console.log("AUTH REQUEST:", req.method, req.url);
    next();
});

// routes
app.use("/auth", authRoutes);

// تست
app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING CORRECTLY");
});

app.get("/ping", (req, res) => {
    res.send("PONG");
});

app.get("/servertest", (req, res) => {
    res.send("SERVER TEST OK");
});

// villages API
app.get("/villages/:userId", (req, res) => {
    const userId = req.params.userId;

    db.query(
        "SELECT * FROM villages WHERE user_id = ?",
        [userId],
        (err, result) => {
            if (err) return res.send(err.message);
            res.json(result);
        }
    );
});

// resource update loop
setInterval(() => {
    db.query("SELECT * FROM villages", (err, villages) => {
        if (err) return;

        villages.forEach(v => {
            const newWood = v.wood + v.wood_production;
            const newStone = v.stone + v.stone_production;
            const newFood = v.food + v.food_production;

            db.query(
                `UPDATE villages SET wood=?, stone=?, food=? WHERE id=?`,
                [newWood, newStone, newFood, v.id]
            );
        });
    });
}, 10000);

// upgrade wood
app.post("/upgrade/wood/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM villages WHERE id=?", [id], (err, rows) => {
        if (err) return res.send(err.message);

        const v = rows[0];
        const cost = v.wood_level * 100;

        if (v.wood < cost) {
            return res.send("Not enough resources");
        }

        db.query(
            `UPDATE villages 
             SET wood=?, wood_level=?, wood_production=? 
             WHERE id=?`,
            [
                v.wood - cost,
                v.wood_level + 1,
                v.wood_production + 5,
                id
            ],
            (err2) => {
                if (err2) return res.send(err2.message);
                res.send("Upgraded successfully");
            }
        );
    });
});

// start server (آخر فایل)
app.listen(3000, () => {
    console.log("SERVER STARTED ON PORT 3000");
});