import { spline } from "@georgedoescode/spline";
import { SVG } from "@svgdotjs/svg.js";

class BlobChar {
    constructor(width, height, target) {
        // viewbox dimensions
        this.width = width
        this.height = height

        // position of the blob in the viewbox (center)
        this.x = this.width / 2
        this.y = this.height / 2

        // svg element used to render
        this.svg = SVG()
        .addTo(target)      // mount instance to target
        .viewbox(0, 0, this.width, this.height)     // set the <svg /> viewbox attribute

        // random size of our char
        this.size = random(50, 80)

        // drawing body of char
        drawBody() {
            // random no of points
            const numPoints = random( 3, 12)
            // step used to place each point at equal distance
            const angleStep = (Math.PI * 2) / numPoints

            // track points
            const points = []

            // how much randomness should be added to each point
            for (let i = 1; i <= numPoints; i++) {
                const pull = random(0.75, 1, true)

                // x & y coordinates of the current point
                const x = this.x + Math.cos(i * angleStep) * (this.size * pull)
                const y = this.y + Math.sin(i * angleStep) * (this.size * pull)
                
                points.push({ x, y })
            }
        }

        // generate smooth conntinuous curve based on  points, using bezier curves. spline() will return an svg path-data string
        const pathData = spline(points, 1, true)

        // render the body in the form of an svg path elelement
        this.svg
            .path(pathData)
            .stroke({ color: '#000', width: 2 })
            .fill('transparent')
    }
}


// choose a whole number within a range
function random (min, max, float = false) {
    const val = Math.random() * (max - min) + min

    if (float) {
        return val
    }

    return Math.floor(val)
}


const char = new BlobChar(200, 200, document.body)
char.drawBody()

