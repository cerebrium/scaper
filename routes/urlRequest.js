const { default: Axios } = require('axios');
const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    try {
        Axios.get(req.body.url).then( response => {
            if (response) {
                let finalArray = []
                let titleChecker = response.data.match(/<span class="a-size-base">.*[^<\/span>]/g)
                titleChecker.forEach( (item, itemId) => {
                    let transientItem = item.replace(/<span class="a-size-base">/, '')
                    transientItem = transientItem.replace(/\n/, '')
                    transientItem = transientItem.replace(/<\/span>/, '')
                    if (transientItem !== '') {
                        finalArray.push(transientItem)
                    }
                })
                let imageArrayFinal = []
                let altArray = []
                let imageChecker = response.data.match(/<img.*?src="(.*?)"/g)
                imageChecker.forEach( image => {
                    let altMatch = image.match(/alt="(.*?)"/g)
                    finalArray.forEach( element => {
                        if (altMatch) {
                            if (altMatch[0].includes(element)) {
                                let transientAlt = altMatch[0].match(/alt="(.*?)"/g)[0]
                                transientAlt = transientAlt.replace(/alt="/g, '')
                                transientAlt = transientAlt.replace(/"/g, '')
                                altArray.push(transientAlt)
                                let transientSource = image.match(/src="(.*?)"/g)[0]
                                transientSource = transientSource.replace(/src=/g, '')
                                transientSource = transientSource.replace(/"/g, '')
                                imageArrayFinal.push(transientSource)
                            }
                        }
                    })
                })
                let finalObj = {
                    'images': imageArrayFinal,
                    'titles': altArray
                }
                res.status(200).send(finalObj)
            }
        })
    } catch (error) {
        res.status(503).send('error message')
    }
})

module.exports = router;