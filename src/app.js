const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000;



const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, "../templates/partials")


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


app.listen(port, () => {
    console.log(`Server running on port` + port);
});