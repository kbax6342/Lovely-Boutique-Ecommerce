const express = require('express')
const path = require('path')
const hbs = require('hbs')
const shopify = require('shopify-buy')

const app = express()
const port = process.env.PORT || 3000;



const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, "../templates/partials")
const productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=';


app.set('view engine', 'hbs')

app.set('views', viewsPath)

hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))
app.use(express.static('views/images'))




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

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Lovely Larea Boutique'
    })
})


app.listen(port, () => {
    console.log(`Server running on port` + port);
});