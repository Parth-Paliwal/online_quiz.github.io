const express = require("express");
const app = express();
const path = require("path")
const bodyParser = require("body-parser")
const port = 80;

function random() {
    return Math.floor(Math.random() * 100000);
}
let z;

const mongoose = require('mongoose');
const { stringify } = require("querystring");
const { json } = require("body-parser");
mongoose.set('strictQuery', true)
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/try');
}

// shemas

const questionschema = new mongoose.Schema({
    user: String,
    code: String,
    heading: String,
    que: String,
    question: Array,
    option1: Array,
    option2: Array,
    option3: Array,
    option4: Array,
    answer: Array
});
const submitschema = new mongoose.Schema({
    name: String,
    answer: Array,
    code: String,
    result: String
})

const userschema = new mongoose.Schema({
    user: String,
    email: String,
    password: String
})

const questions = mongoose.model('questions', questionschema);
const submissions = mongoose.model('submissions', submitschema);
const users = mongoose.model('users', userschema);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

//index page

app.get('/', (req, res) => {
    res.status(200).render('quiz');
})

// create page

app.get('/create', (req, res) => {
    res.status(200).render('create');
})

// post request after creating exam

app.post('/create', (req, res) => {
    var myquiz = new questions(req.body);
    let c = random();
    myquiz.code = c;
    myquiz.save().then(() => {
        res.status(200).render('submit', { 'code': c });
    }).catch(() => {
        res.status(400).send("item was not saved");
    })
});

// after post 

app.post('/give', (req, res) => {

    z = req.body.give;
    res.status(200).render('exam');
    app.get('/exam', (req, res) => {
        questions.find({ code: z }, function (err, questions) {
            if (err) return console.log("error");
            var n = [];
            n = questions;
            res.json({ no: n[0] });
        });
    })

});


app.post('/submit', (req, res) => {

    var myanswer = new submissions(req.body);
    let result = 0;
    questions.find({ code: req.body.code }, function (err, question) {
        if (err) console.log("error");

        // creating result

        for (let i = 0; i < question[0].answer.length; i++) {
            if (question[0].answer[i] == req.body.answer[i]) {
                result++;
            }
        }

        myanswer.result = result;
        // saving exam

        myanswer.save().then(() => {
            res.status(200).render('submission');
        }).catch(() => {
            res.status(400).send("item was not saved");
        })
    })

});

// login code

app.get('/login', (req, res) => {
    res.status(200).render('login');
})

app.post('/login', (req, res) => {

    users.find({ user: req.body.user }, function (err, user) {
        if (err) console.log("error");

        if (user[0] == null) {
            var myid = new users(req.body);
            myid.save().then(() => {
                res.cookie('username', req.body.user);
                res.status(200).render('quiz');

            }).catch(() => {
                res.status(400).send("item was not saved");
            })
        }
        else if (req.body.password == user[0].password) {
            res.cookie('username', req.body.user);
            res.status(200).render('quiz');
        }
        else if (req.body.password != user[0].password) {

            res.status(200).render('login');
        }
    })
});

// created exams 

app.get('/created', (req, res) => {
    let n;
    res.render('created');
    app.post('/created', (req, res) => {
        questions.find({ user: req.body.data }, function (err, questions) {
            if (err) return console.log("error");

            n = [];
            n = questions;

        });
    })

    app.get('/upi', (req, res) => {
        res.json({ user: n })
    })

    // anslytics

    app.get('/analytics', (req, res) => {
        res.render('analytics')
    })

});
let n;
app.post('/result', (req, res) => {
    submissions.find({ code: req.body.code }, function (err, submit) {
        if (err) console.log('error');
        n = submit
        res.render('result');

        app.get('/result', (req, res) => {
            
            res.json({ data: n })
        })
        
    })
    })


app.listen(port, () => {
    console.log(`this app is listning on potr${port}`)
})








