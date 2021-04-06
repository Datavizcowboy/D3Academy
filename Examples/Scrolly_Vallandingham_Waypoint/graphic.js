/* 
	I've created a function here that is a simple d3 chart.
	This could be anthing that has discrete steps, as simple as changing
	the background color, or playing/pausing a video.
	The important part is that it exposes and update function that
	calls a new thing on a scroll trigger.
*/
window.createGraphic = function(graphicSelector) {
    var graphicEl = d3.select('.graphic')
    var graphicVisEl = graphicEl.select('.graphic__vis')
    var graphicProseEl = graphicEl.select('.graphic__prose')

    var margin = 20
    var size = 600
    var height = 600
    var chartSize = size - margin * 2
    var scaleX = null
    var scaleR = null
    var data = [8, 6, 7, 5, 3, 0, 9]
    var extent = d3.extent(data)
    var minR = 10
    var maxR = 24

    // actions to take on each step of our scroll-driven story
    var steps = [
        function step0() {
            // circles are centered and small
            var t = d3.transition()
            .duration(5000)
            .ease(d3.easeQuadInOut)

            d3.select("#title_0")
                .transition(t)
                .style('opacity',1)
            d3.select("#title_1")
                .transition(t)
                .style('opacity',1)
            d3.select("#title_2")
                .transition(t)
                .style('opacity',1)

        },

        function step1() {
            var t = d3.transition()
            .duration(800)
            .ease(d3.easeQuadInOut)

            var def = svg.append('g')
            .classed('chart', true)
            .attr('transform', 'translate(' + margin + ',' + margin + ')')

            for (var i = 0; i < 1; i++) {
                for (var k = 0; k < 1; k += 2) {

                    var rand = (Math.random() * 25) - 10
                    var rand2 = (Math.random() * 20) - 10
                    var rand3 = (Math.random() * 20) - 10

                    var points = [
                        [defaultpitchx + mobile[5] / 2, vpitch + 500],
                        [defaultpitchx + mobile[5] / 2, vpitch + 200],
                        [defaultpitchx + mobile[5] / 2, vpitch + 150]
                    ];

                    var pathData = lineGenerator(points);

                    var pathNZL = def
                    .append("path")
                    .attr('d', pathData)
                    .style("stroke-width", 1)
                    .style('stroke-linecap', 'round')
                    .style("opacity", 1)
                    .style('stroke', function () { return "#999"; });

                    var totalLengthNZL = pathNZL.node().getTotalLength();

                    pathNZL
                        .attr("stroke-dasharray", totalLengthNZL + " " + totalLengthNZL)
                        .attr("stroke-dashoffset", totalLengthNZL)
                        .transition()
                        .duration(speed)
                    //                    .ease(easeLinear)
                        .attr("stroke-dashoffset", 0);
                }

                def
                    .append("circle")
                    .attr("r", function (d) { return 2 + 2 * Math.log(mobile[5]) })
                    .attr("cx", defaultpitchx + mobile[5] / 2)
                    .attr("cy", vpitch + 150)
                    .style("opacity", function (d) { return 0; })
                    .attr("id", function (d) { return "isl" })
                    .attr("fill", function (d) { return "white"; })
                    .attr("stroke", function (d) { return "#999"; })
                    .transition().duration(speed)
                    .style("opacity",1)

            }
        },

        function step2() {
            var t = d3.transition()
            .duration(800)
            .ease(d3.easeQuadInOut)

            var pred = svg.append('g')
            .classed('chart', true)
            .attr('transform', 'translate(' + margin + ',' + margin + ')')

            //-------------------------------- Path A / Historic

            verticalpitch = 530
            maxsepp = Math.max(datacatpred.length, datacatref.length)
            sepp = 150 - maxsepp * 22

            for (var i = 0; i < datacatpred.length; i++) {

                for (var k = 0; k < 1; k += 2) {

                    var rand = (Math.random() * 20) - 10
                    var rand2 = (Math.random() * 20) - 10
                    var rand3 = (Math.random() * 20) - 10

                    var points = [

                        [defaultpitchx - alltotalpred[i] - mobilepred[i] / 2, vpitch + verticalpitch - 30],
                        [defaultpitchx - alltotalpred[i] - mobilepred[i] / 2, vpitch + verticalpitch - 150 - (datacatpred.length - i) * 30],
                        [barpitchx - (i + 1) * 20 - alltotalpred[i] - mobilepred[i] / 2, vpitch - (datacatpred.length - i) * 30 + verticalpitch - 250],
                        [barpitchx - (i + 1) * 20 - alltotalpred[i] - mobilepred[i] / 2, vpitch + verticalpitch - 450 + i * sepp],
                        [barpitchx - (i + 1) * 20 - (alltotalpred[i]) - 10 - mobilepred[i] / 2, vpitch + 100 + i * sepp - 50]
                    ];

                    var pathData = lineGenerator(points);

                    var pathNZL = pred
                    .append("path")
                    .attr('d', pathData)
                    .style("stroke-width", 1)
                    .attr("id", "path_blue_" + i)
                    .style('stroke-linecap', 'round')
                    .style("opacity", opac)
                    .style('stroke', function () { return "#999"; });

                    var totalLengthNZL = pathNZL.node().getTotalLength();

                    pathNZL
                        .attr("stroke-dasharray", totalLengthNZL + " " + totalLengthNZL)
                        .attr("stroke-dashoffset", totalLengthNZL)
                        .transition()
                        .duration(speed)
                    //                        .ease(easeLinear)
                        .attr("stroke-dashoffset", 0);
                }

                pred
                    .append("circle")
                    .attr('transform', 'translate(0,' + (0) + ')')
                    .attr("r", function (d) { return 5 + 2 * Math.log(mobile[5]) })
                    .attr("cx", barpitchx - (i + 1) * 20 - (alltotalpred[i]) - 10 - mobilepred[i] / 2)
                    .attr("cy", vpitch + 100 + i * sepp - 50)
                    .style("opacity", function (d) { return 0; })
                    .attr("id", function (d) { return "isl" })
                    .attr("fill", function (d) { return "white"; })
                    .attr("stroke", function (d) { return "#999"; })
                    .transition().duration(speed)
                    .style("opacity",1)

//                pred
//                    .append("circle")
//                    .attr('transform', 'translate(0,' + (0) + ')')
//                    .attr("r", function (d) { return 5 + 3 * Math.log(mobilepred[i]) })
//                    .attr("cx", barpitchx - (i + 1) * 20 - (alltotalpred[i]) - 10 - mobilepred[i] / 2)
//                    .attr("cy", vpitch + 100 + i * sepp - 50)
//                    .style("opacity", function (d) { return 0; })
//                    .attr("id", function (d) { return "isl" })
//                // .attr("fill", function (d) { return "white"; })
//                // .attr("stroke", function (d) { return "#999"; })
//                    .attr('stroke', function () { return thecolorspred[i]; })
//                    .attr('fill', function () { return thecolorspred[i]; })
//                    .transition().duration(speed)
//                    .style("opacity",1)

                pred
                    .append("text")
                    .attr("x", -30 + barpitchx - (i + 1) * 20 - (alltotalpred[i]) - 10 - mobilepred[i] / 2)
                    .attr("y", -5 + vpitch + 100 + i * sepp - 50)
                    .text(function () { return datacatpred[i] })
                    .attr("font-family", "Montserrat,sans-serif")
                    .attr("font-size", 12)
                    .attr("font-style","semibold")
                    .attr("text-anchor", "end")
                    .style("fill", "#ccc")
                    .transition().duration(speed)
                    .style("opacity",1)

                // this.barGroup3
                //     .append("text")
                //     .attr("x", - 80 + barpitchx - (i + 1) * 40 - (alltotalpred[i]) - 20 - mobilepred[i] / 2)
                //     .attr("y", vpitch + 200 + i * sepp - 50)
                //     // .text(function () {return themobilepred[i].toFixed(0)})
                //     .text(function () {return datacatpredexp[i]})
                //     .attr("font-family", "sans-serif")
                //     .attr("id", "text_blue_" + i)
                //     .attr("font-size", 18)
                //     .attr("text-anchor", "end")
                //     .style("fill", "#ddd");
            }
        },

        function step3() {
            var t = d3.transition()
            .duration(800)
            .ease(d3.easeQuadInOut)

            var ref = svg.append('g')
            .classed('chart', true)
            .attr('transform', 'translate(' + margin + ',' + margin + ')')

            for (var i = 0; i < datacatref.length; i++) {

                for (var k = 0; k < 1; k += 2) {

                    var points = [


                        [defaultpitchx + mobile[5] + alltotalref[i] + mobileref[i] / 2,  vpitch + verticalpitch - 30],
                        [defaultpitchx + mobile[5] + alltotalref[i] + mobileref[i] / 2, vpitch + verticalpitch - 150 - (datacatref.length - i) * 20],
                        [barpitchx + mobile[5] + (i + 2) * 20 + alltotalref[i] + mobileref[i] / 2, vpitch - (datacatref.length - i) * 20 + verticalpitch - 250],
                        [barpitchx + mobile[5] + (i + 2) * 20 + alltotalref[i] + mobileref[i] / 2, vpitch + verticalpitch - 500 + i * sepp],
                        [barpitchx + mobile[5] + (i + 2) * 20 + 10 + alltotalref[i] + mobileref[i] / 2, vpitch + 50 + i * sepp - 50]
                    ]; var pathData = lineGenerator(points);

                    // this.barGroup5
                    // .append('line')
                    // .attr("x1", function (d) { return barpitchx + mobile[5] + (i + 1) * 40 + alltotalref[i] + mobileref[i] / 2; })
                    // .attr("y1", function (d) { return vpitch + verticalpitch - 600 - (datacatref.length - i) * 40; })
                    // .attr("x2", function (d) { return 390 + 1 * 1150; })
                    // .attr("y2", function (d) { return 330 + thedash[0]; })
                    // .attr("stroke-width", 2.)
                    // .style("opacity", 1)
                    // .style("stroke-dasharray", ("1"))
                    // .attr("stroke", "#ddd");

                    // this.barGroup5
                    //     .append("path")
                    //     .attr('d', pathData)
                    //     .style("stroke-width", 1)
                    //     .attr("id", "path_orange_" + i)
                    //     .style("opacity", opac)
                    //     .style('stroke-linecap', 'round')
                    //     .style('stroke', function () {
                    //         return "#999";
                    //     });

                    var pathNZL = ref
                    .append("path")
                    .attr('d', pathData)
                    .style("stroke-width", 1)
                    .attr("id", "path_orange_" + i)
                    .style("opacity", opac)
                    .style('stroke-linecap', 'round')
                    .style('stroke', function () { return "#999"; });

                    var totalLengthNZL = pathNZL.node().getTotalLength();

                    pathNZL
                        .attr("stroke-dasharray", totalLengthNZL + " " + totalLengthNZL)
                        .attr("stroke-dashoffset", totalLengthNZL)
                        .transition()
                        .duration(speed)
                    //                        .ease(easeLinear)
                        .attr("stroke-dashoffset", 0);
                }

                ref
                    .append("circle")
                    .attr('transform', 'translate(0,' + (0) + ')')
                    .attr("r", function (d) { return 5 + 2 * Math.log(mobile[5]) })
                    .attr("cx", barpitchx + mobile[5] + (i + 2) * 20 + 10 + alltotalref[i] + mobileref[i] / 2)
                    .attr("cy", vpitch + 50 + i * sepp - 50)
                    .style("opacity", function (d) { return 0; })
                    .attr("id", function (d) { return "isl" })
                    .attr("fill", function (d) { return "white"; })
                    .attr("stroke", function (d) { return "#999"; })
                    .transition().duration(speed)
                    .style("opacity",1)
                
//                ref
//                    .append("circle")
//                    .attr('transform', 'translate(0,' + (0) + ')')
//                    .attr("r", function (d) { return 5 + 3 * Math.log(mobileref[i]) })
//                    .attr("cx", barpitchx + mobile[5] + (i + 3) * 20 + 10 + alltotalref[i] + mobileref[i] / 2)
//                    .attr("cy", vpitch + 50 + i * sepp - 50)
//                    .style("opacity", function (d) { return 0; })
//                    .attr("id", function (d) { return "isl" })
//                // .attr("fill", function (d) { return "white"; })
//                // .attr("stroke", function (d) { return "#999"; })
//                    .attr('stroke', function () { return thecolorsref[i]; })
//                    .attr('fill', function () { return thecolorsref[i]; })
//                    .transition().duration(speed)
//                    .style("opacity",1)

                ref
                    .append("text")
                    .attr("x", 20 + barpitchx + mobile[5] + (i + 2) * 20 + 20 + alltotalref[i] + mobileref[i] / 2)
                    .attr("y", - 5 + vpitch + 50 + i * sepp - 50)
                    .text(function () { return datacatref[i] })
                    .attr("font-family", "Montserrat,sans-serif")
                    .attr("font-size", 12)
                    .attr("font-style","semibold")
                    .style("fill", "#ccc");

                // this.barGroup5
                //     .append("text")
                //     .attr("x", 80 + barpitchx + mobile[5] + (i + 1) * 40 + 20 + alltotalref[i] + mobileref[i] / 2)
                //     .attr("y", vpitch + 200 + i * sepp - 50)
                //     .text(function () { return datacatrefexp[i]})
                //     // .text(function () { return themobileref[i].toFixed(0) })
                //     .attr("font-family", "sans-serif")
                //     .attr("id", "text_orange_" + i)
                //     .attr("font-size", 18)
                //     .style("fill", "#ddd");
            }
        },

        function step4() {
            var t = d3.transition()
            .duration(800)
            .ease(d3.easeQuadInOut)
            
            // -------------------------------------------------- DEFAULT
            
             var def2 = svg.append('g')
            .classed('chart', true)
            .attr('transform', 'translate(' + margin + ',' + margin + ')')

            for (var i = 0; i < 1; i++) {
                for (var k = 0; k < mobile[5]; k += 2) {

                    var rand = (Math.random() * 25) - 10
                    var rand2 = (Math.random() * 20) - 10
                    var rand3 = (Math.random() * 20) - 10

                    var points = [
                        [defaultpitchx + mobile[5] / 2 + (mobile[5] / 2) * rand / 10, vpitch + 500],
                        [defaultpitchx + mobile[5] / 2 + (mobile[5] / 2) * rand2 / 15, vpitch + 200],
                        [defaultpitchx + mobile[5] / 2 + (mobile[5] / 2) * rand3 / 200, vpitch + 150]
                    ];

                    var pathData = lineGenerator(points);

                    var pathNZL = def2
                    .append("path")
                    .attr('d', pathData)
                    .style("stroke-width", thewidth)
                    .style('stroke-linecap', 'round')
                    .style("opacity", 1)
                    .style('stroke', function () { return "#ddd"; });

                    var totalLengthNZL = pathNZL.node().getTotalLength();

                    pathNZL
                        .attr("stroke-dasharray", totalLengthNZL + " " + totalLengthNZL)
                        .attr("stroke-dashoffset", totalLengthNZL)
                        .transition()
                        .duration(speed  + rand * 300)
                    //                    .ease(easeLinear)
                        .attr("stroke-dashoffset", 0);
                }
            }
            
            // -------------------------------------------------- PREDICTIVE
            
                        var pred2 = svg.append('g')
            .classed('chart', true)
            .attr('transform', 'translate(' + margin + ',' + margin + ')')
            
            for (var i = 0; i < datacatpred.length; i++) {

                for (var k = 0; k < mobilepred[i]; k += 2) {

                    var rand = (Math.random() * 10) - 10
                    var rand2 = (Math.random() * 10) - 10
                    var rand3 = (Math.random() * 10) - 10

                    var points = [
                        // [defaultpitchx + mobile[5] / 2 + (mobile[5] / 2) * rand / 10, vpitch + verticalpitch + 400 + 10 * rand2],
                        [defaultpitchx - alltotalpred[i] - mobilepred[i] / 2 - mobilepred[i] * rand / 18, vpitch + verticalpitch - 30],
                        [defaultpitchx - alltotalpred[i] - mobilepred[i] / 2 - mobilepred[i] * rand / 20, vpitch + verticalpitch - 150 - (datacatpred.length - i) * 30],
                        [barpitchx - (i + 1) * 20 - alltotalpred[i] - mobilepred[i] / 2 - mobilepred[i] * rand / 20, vpitch - (datacatpred.length - i) * 30 + verticalpitch - 250],
                        [barpitchx - (i + 1) * 20 - alltotalpred[i] - mobilepred[i] / 2 - mobilepred[i] * rand / 40, vpitch + verticalpitch - 450 + i * sepp],
                        [barpitchx - (i + 1) * 20 - (alltotalpred[i]) - 10 - mobilepred[i] / 2 - mobilepred[i] * rand / 50, vpitch + 100 + i * sepp - 50]
                    ];

                    var pathData = lineGenerator(points);

                    var pathNZL = pred2
                    .append("path")
                    .attr('d', pathData)
                    // .style("stroke-width", mobilepred[i])
                    .style("stroke-width", thewidth)
                    .attr("id", "path_blue_" + i)
                    .style('stroke-linecap', 'round')
                    .style("opacity", opac)
                    .style('stroke', function () { return thecolorspred[i]; });

                    var totalLengthNZL = pathNZL.node().getTotalLength();

                    pathNZL
                        .attr("stroke-dasharray", totalLengthNZL + " " + totalLengthNZL)
                        .attr("stroke-dashoffset", totalLengthNZL)
                        .transition()
                        .duration(speed + rand * 300)
                    //                        .ease(easeLinear)
                        .attr("stroke-dashoffset", 0);
                }
                
                                pred2
                    .append("circle")
                    .attr('transform', 'translate(0,' + (0) + ')')
                    .attr("r", function (d) { return 5 + 2 * Math.log(mobilepred[i]) })
                    .attr("cx", barpitchx - (i + 1) * 20 - (alltotalpred[i]) - 10 - mobilepred[i] / 2)
                    .attr("cy", vpitch + 100 + i * sepp - 50)
                    .style("opacity", function (d) { return 0; })
                    .attr("id", function (d) { return "isl" })
                // .attr("fill", function (d) { return "white"; })
                // .attr("stroke", function (d) { return "#999"; })
                    .attr('stroke', function () { return thecolorspred[i]; })
                    .attr('fill', function () { return thecolorspred[i]; })
                    .transition().duration(speed)
                    .style("opacity",1)
            }
            
            // ------------------------------------------------- REFINEMENT
            
                       var ref2 = svg.append('g')
            .classed('chart', true)
            .attr('transform', 'translate(' + margin + ',' + margin + ')')

            for (var i = 0; i < datacatref.length; i++) {

                for (var k = 0; k < mobileref[i]; k += 2) {
                    
                                        var rand = (Math.random() * 20) - 10
                    var rand2 = (Math.random() * 20) - 10
                    var rand3 = (Math.random() * 20) - 10

                    var points = [

                        [defaultpitchx + mobile[5] + alltotalref[i] + mobileref[i] / 2 + mobileref[i] * rand / 18,  vpitch + verticalpitch - 30],
                        [defaultpitchx + mobile[5] + alltotalref[i] + mobileref[i] / 2 + mobileref[i] * rand3 / 20, vpitch + verticalpitch - 150 - (datacatref.length - i) * 20],
                        [barpitchx + mobile[5] + (i + 2) * 20 + alltotalref[i] + mobileref[i] / 2 + mobileref[i] * rand3 / 20, vpitch - (datacatref.length - i) * 20 + verticalpitch - 250],
                        [barpitchx + mobile[5] + (i + 2) * 20 + alltotalref[i] + mobileref[i] / 2 + mobileref[i] * rand2 / 50, vpitch + verticalpitch - 500 + i * sepp],
                        [barpitchx + mobile[5] + (i + 2) * 20 + 10 + alltotalref[i] + mobileref[i] / 2 + mobileref[i] * rand2 / 80, vpitch + 50 + i * sepp - 50]
                    ]; var pathData = lineGenerator(points);

                    var pathNZL = ref2
                    .append("path")
                    .attr('d', pathData)
                    .style("stroke-width", thewidth)
                    .attr("id", "path_orange_" + i)
                    .style("opacity", opac)
                    .style('stroke-linecap', 'round')
                    .style('stroke', function () { return thecolorsref[i]; });

                    var totalLengthNZL = pathNZL.node().getTotalLength();

                    pathNZL
                        .attr("stroke-dasharray", totalLengthNZL + " " + totalLengthNZL)
                        .attr("stroke-dashoffset", totalLengthNZL)
                        .transition()
                        .duration(speed  + rand * 300)
                        .attr("stroke-dashoffset", 0);
                }
                
                                ref2
                    .append("circle")
                    .attr('transform', 'translate(0,' + (0) + ')')
                    .attr("r", function (d) { return 5 + 2 * Math.log(mobileref[i]) })
                    .attr("cx", barpitchx + mobile[5] + (i + 2) * 20 + 10 + alltotalref[i] + mobileref[i] / 2)
                    .attr("cy", vpitch + 50 + i * sepp - 50)
                    .style("opacity", function (d) { return 0; })
                    .attr("id", function (d) { return "isl" })
                // .attr("fill", function (d) { return "white"; })
                // .attr("stroke", function (d) { return "#999"; })
                    .attr('stroke', function () { return thecolorsref[i]; })
                    .attr('fill', function () { return thecolorsref[i]; })
                    .transition().duration(speed)
                    .style("opacity",1)
            
            }

            // circles are sized
            var item = graphicVisEl.selectAll('.item')
            },
    ]

    // update our chart
    function update(step) {
        steps[step].call()
    }

    // little helper for string concat if using es5
    function translate(x, y) {
        return 'translate(' + x + ',' + y + ')'
    }

    function setupCharts() {
        svg = graphicVisEl.append('svg')
            .attr('width', size + 'px')
            .attr('height', height + 'px')

        var chart = svg.append('g')
        .classed('chart', true)
        .attr('transform', 'translate(' + margin + ',' + margin + ')')



        scaleR = d3.scaleLinear()
        scaleX = d3.scaleBand()

        var domainX = d3.range(data.length)

        scaleX
            .domain(domainX)
            .range([0, chartSize])
            .padding(1)

        scaleR
            .domain(extent)
            .range([minR, maxR])


        datacatpred = ["Top Trends", "Historic", "Linked"]
        thecolorspred = ["cyan", "turquoise", "darkcyan", "#ddd"]
        datacatref = ["Empathy", "Category", "Related", "Empathy_Next", "Next"]
        thecolorsref = ["orange", "darkorange", "coral", "firebrick", "darkred"]
        thecolors = ["cyan", "darkcyan", "orange", "darkorange", "firebrick", "antiquewhite"]

        //------------------------------------- Variables

        opac = 1
        trait = 4
        col = "#bbb"
        pitch = 100
        speed = 4000
        thick = 100
        thefont = "Verdana, sans-serif"
        thefontcolor = "#ddd"
        vpitch = 20
        hpitch = 500
        barpitchx = 200
        barpitchy = 550
        defaultpitchx = 225
        defaultend = 1300
        lowercompy = 1050
        uppercompy = 1230
        comp_pitch = 1050
        speed_bars = 10000
        columns = ["Predictive", "Organic", "Refinement"]

        lineGenerator = d3.line()
            .curve(d3.curveCardinal.tension(0.5));

        chart
            .append("rect")
            .attr("x", 0 - 20)
            .attr("y", barpitchy)
            .attr("height", 200)
            .attr("width", 500)
            .attr("fill", "#fff");

//        chart
//            .append("text")
//            .attr("x", barpitchx - 20)
//            .attr("y", barpitchy + 50)
//            .text(function () { return "Q" })
//            .attr("font-family", "sans-serif")
//            .attr("font-size", 12)
//            .attr("id", "thekey")
//            .style("fill", "#999");
//
//        chart
//            .append("rect")
//            .attr("x", barpitchx - 20)
//            .attr("y", barpitchy + 60)
//            .attr("height", 2)
//            .attr("width", 200)
//            .attr("fill", "#999");

        for (var i = 0; i < columns.length; i++) {

            chart
                .append("text")
                .attr("x", defaultpitchx - 60 + i * 90)
                .attr("y", 555)
                .text(columns[i])
                .attr("font-family", "Montserrat, sans-serif")
                .attr("text-anchor", "middle")
                .attr("font-style","semibold")
                .attr("id","title_"+i)
                .attr("font-size", 16)
                .attr("opacity",0)
                .style("fill", "#999");
        }

        // --------------------------------- DATA

        magnify = 600;
        thewidth = 5;

        themobile = [1063.118, 72.207, 402.772, 19.114, 62.153, 23781]
//        themobilepred = [488, 592, 871]
//        themobileref = [2273, 647, 932, 36, 6]
        themobilepred = [1044, 2907, 537]
        themobileref = [15577, 5476, 1443, 95, 902]
        
        
        mobile = themobile.map(function (item) { return item / magnify })
        mobilepred = themobilepred.map(function (item) { return item / magnify })
        mobileref = themobileref.map(function (item) { return item / magnify })

        alltotalpred = [0]
        thesumpred = 0
        for (let pp = 0; pp < mobilepred.length; pp++) {
            thesumpred = thesumpred + mobilepred[pp]
            alltotalpred.push(thesumpred)
        }

        alltotalvalpred = [0]
        thesumvalpred = 0
        for (let pp = 0; pp < themobilepred.length; pp++) {
            thesumvalpred = thesumvalpred + themobilepred[pp]
            alltotalvalpred.push(thesumvalpred)
        }

        alltotalref = [0]
        thesum = 0
        for (let pp = 0; pp < mobileref.length; pp++) {
            thesum = thesum + mobileref[pp]
            alltotalref.push(thesum)
        }

        alltotalvalref = [0]
        thesumvalref = 0
        for (let pp = 0; pp < themobileref.length; pp++) {
            thesumvalref = thesumvalref + themobileref[pp]
            alltotalvalref.push(thesumvalref)
        }

        //------------------------------------------------- Default



        // ----------------------------------- GO

        //        var item = chart.selectAll('.item')
        //        .data(data)
        //        .enter().append('g')
        //        .classed('item', true)
        //        .attr('transform', translate(chartSize / 2, chartSize / 2))
        //
        //        item.append('circle')
        //            .attr('cx', 0)
        //            .attr('cy', 0)
        //
        //        item.append('text')
        //            .text(function(d) { return d })
        //            .attr('y', 1)
        //            .style('opacity', 0)
    }

    function setupProse() {
        var height = window.innerHeight * 1.5
        graphicProseEl.selectAll('.trigger')
            .style('height', height + 'px')
    }

    function init() {
        setupCharts()
        setupProse()
        update(0)
    }

    init()

    return {
        update: update,
    }
}