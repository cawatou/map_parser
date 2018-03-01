const jimp = require( 'jimp' );
const fs = require( 'fs' );

class Parser {
    constructor ( style ) {
        this.style  = style
        this.bounds = {z: 0, x: 0, y: 0}
    }

    getImage ( name ) {
        jimp.read(this.getPath(), (error, buffer) => {
            try {
                buffer.write( __public + 'images/' + name + '.png' )
                this.bounds.x++

                this.getImage( this.bounds.x + '-' + this.bounds.y )
            } catch ( error ) {
                this.bounds.x = 0
                this.bounds.y++

                this.getImage( this.bounds.x + '-' + this.bounds.y )
            }

            console.log( 'X: ' + this.bounds.x + ' Y: ' + this.bounds.y )
        })
    }

    moveImage () {
        let dirname = __public + 'images/'

        fs.readdirSync( dirname ).forEach(element => {
            let extn = element.split( '.' ).pop()
            let zoom = element.split( '.' ).shift().split( '-' ).shift()
            let name = element.split( '.' ).shift().split( '-' ).pop() + '.' + extn

            let _path = {
                old: dirname + element,
                new: dirname + zoom + '/' + name
            }

            if ( !fs.existsSync( dirname + zoom ) ) fs.mkdirSync( dirname + zoom )
            
            fs.renameSync(_path.old, _path.new)
        })
    }

    getPath () {
        return `https://tiles.mapiful.com/${this.style}/${this.bounds.z}/${this.bounds.x}/${this.bounds.y}.png`
    }
}

module.exports = Parser;