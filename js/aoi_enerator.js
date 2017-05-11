// $(function () {
function AoiGenerator(btnAOI, paperArea) {
    
    var $btnAOI = btnAOI;
    var $paperArea = paperArea;
    var count = 1;

    var aoisCoordinate = [];
    var beginX, beginY, width, height;
    

    this.getAoisCoordinate = function () {
        return aoisCoordinate;
    }

    this.init = function () {
        $btnAOI.on("click", function () {
            createAOI();
        });
    }

    function createAOI() {
        $paperArea.mousedown(drawAOI);
        $paperArea.mouseup(completeDraw);
    }

    function drawAOI(event) {
        var e = event || window.event;
        var beginPos = {"x": e.pageX, "y": e.pageY};
        var rect = createRect(beginPos);
        $paperArea.append(rect);

        $paperArea.mousemove(function (moveEvent) {
            var rectWidth = moveEvent.pageX - beginPos.x,
                rectHeight = moveEvent.pageY - beginPos.y;
            rect.css({
                "width": rectWidth + "px",
                "height": rectHeight + "px"
            });

            beginX = beginPos.x;
            beginY = beginPos.y;
            width = rectWidth;
            height = rectHeight;

        });
    }

    function completeDraw() {

        $paperArea.unbind("mousemove");

        var rect = {};
        rect.beginX = beginX;
        rect.beginY = beginY;
        rect.width = width;
        rect.height = height;
        aoisCoordinate.push(rect);
        rangeSearch(rect);

    }

    function rangeSearch(rect) {
        rect = {
            'id'  : count++,
            'xmin': rect.beginX,
            'xmax': rect.beginX + rect.width,
            'ymin': rect.beginY,
            'ymax': rect.beginY + rect.height
        };
        console.log('矩阵坐标:' + JSON.stringify(rect));
        var rangePoints = kdTree.range(rect);
        console.log(JSON.stringify(rangePoints));
        console.log(rangePoints.length);
    }


    function createRect(beginPos) {
        var rects = $("<div></div>");
        rects.css({
            "width": "0px",
            "height": "0px",
            "position": "absolute",
            "border": "1px solid gray",
            "left": beginPos.x + "px",
            "top": beginPos.y + "px"
        });
        return rects;    //
    }
}