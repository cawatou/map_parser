const express = require( 'express' );
const router = express.Router();
const Parser = require( '../module/parser' );

const parser = new Parser( 'oldschool' )

router.get('/', (request, response, next) => {
	response.render('index', {
        zoom: 0
    });
});

router.post('/parse', (request, response, next) => {
    let zoom = request.body.zoom;
    parser.bounds.z = zoom;

    parser.getImage( parser.bounds.x + '-' + parser.bounds.y );

	response.render('index', {
        zoom: zoom,
        complete: 'Parse Success !'
    });
});

router.post('/rename', (request, response, next) => {
    let zoom = request.body.zoom;

    parser.moveImage();

	response.render('index', {
        zoom: zoom,
        complete: 'Rename Success !'
    });
});

module.exports = router;