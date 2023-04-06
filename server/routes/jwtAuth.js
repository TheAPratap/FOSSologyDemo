const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");

//Register
router.post("/register", validInfo, async(req, res) => {
    
    let {firstName, lastName, email, password} = req.body;

    email = email.toLowerCase();

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
          email
        ]);
    
        if (user.rows.length > 0) {
          return res.status(401).json("User already exist!");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *", [firstName, lastName, email, bcryptPassword]);

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token});
    }

    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//Login
router.post("/login", async(req, res) => {
    
    let {email, password} = req.body;
    email = email.toLowerCase();

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        if(user.rows.length === 0) {
            return res.status(401).send("Invalid credentials");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }

        const jwtToken = jwtGenerator(user.rows[0].user_id);
        res.json({ jwtToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;