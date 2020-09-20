const express = require('express')
const path = require('path')
const hbs = require('hbs')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const oauth2 = require('oauth2')


const app = express()
const PORT = process.env.PORT || 3000;



const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, "../templates/partials")
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.set("port", PORT)

hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))
app.use(express.static('views/images'))
app.use(bodyParser.urlencoded({
    extended: false
}))




app.get('', (req, res) => {
    res.render('index', {
        title: 'Lovely Larea Boutique'
    })
})

app.get('/shop', (req, res) => {
    res.render('shop', {
        title: 'Lovely Larea Boutique'
    })
})

app.get('/contact', (req, res) => {

    res.render('contact', {
        title: 'Lovely Larea Boutique'
    })
})

app.post('/send', (req, res) => {
    console.log(req.body)

    const output = `
        <p> You have an email from a customer </p>
        <h3> This is the email</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li> Email: ${req.body.email} </li>
        <li> Message: ${req.body.message} </li>
        </ul>
    `
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'k3vin.baxt3r@gmail.com',
            clientId: '231037834866-4s2lu4sujn3jg41e5egpp6t5hgkomar7.apps.googleusercontent.com',
            clientSecret: 's2y2XUNalReFdrZZrix6SYX7',
            refreshToken: '1//04UXf2lwqZLG6CgYIARAAGAQSNwF-L9IrdDhbJ1l8A72hpg9_ffX0Gee-grhsrzVFpe6RgsywMIpNScraupJ7xXHgeEVv7Ee_Qcg',
            accessToken: 'ya29.a0AfH6SMD9mYD9WsD0f9vSysu7Q2raMtc4VrJKhgf52FMmS4_NODRVOinKi33GZ8B-mMDixT21EzgzgkFHp504x0aaFj-F0t3rHkhQ8bqBM8-xfFNF2ckam6nUrVu3w-KeyJUEVV1cLG6lxx9kXicYQuXTZUf2JhTq-4Y'
        }
    });

    let mailOptions = {
        from: req.body.email,
        to: 'kking198928@gmail.com',
        subject: req.body.subject,
        text: req.body.message,
        html: output
    }

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log('There was an error', err);

        } else {
            return console.log(res);
        }
    });

    res.render('contact', {
        msg: 'Email Sent!',
        title: 'Lovely Larea Boutique'
    })

})


// app.listen(port, () => {
//     console.log(`Server running on port` + port);
// });