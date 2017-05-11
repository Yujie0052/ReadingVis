/**
 * 返回每个aoi的阅读速度
 * @param points 所有的point
 * @param aois 所有的aoi
 * @return {Array}
 */
function caculateReadSpeed(points, aois) {

    //获取每个aoi对应的point
    var aoiRangePoints = [];
    var kdTree = new KdTree();
    $.each(points, function(index, point) {
        kdTree.insert(point);
    });
    $.each(aois, function (index, aoi) {
        aoiRangePoints.push({'aoiID' : aoi.id, 'points' : range(aoi)});
    });

    //对每个aoi的point按照point的时间排序
    $.each(aoiRangePoints, function (index, element) {
        element.points.sort(function (pointA, pointB) {
            return pointA.sequence - pointB.sequence;
        });
    });

    var result = [];

    $.each(aoiRangePoints, function (index, element) {
        var aoiID = element.aoiID;
        var points = element.points;

        var prevPoint = points[0];
        var totalDuration = prevPoint.duration;
        var totalDistance = 0;

        for (var i = 1; i < points.length; i++) {
            var point = points[i];
            totalDistance += Math.sqrt(Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2));
            totalDuration += point.duration;
            prevPoint = point;
        }
        result.push({'aoiID' : aoiID, 'speed' : totalDistance / totalDuration});
    });

    return result;

}


function caculateReadCount(points, aois, leaveThreshold, stayThreshold) {
    var aoisTimeInfo = new Array(aois.length);
    var result = new Array(aois.length);
    $.each(aois, function (index, aoi) {
        aoisTimeInfo[aoi.id - 1] = {'leave' : Infinity, 'stay' : 0};
        result[aoi.id - 1] = 0;
    });

    $.each(points, function (index, point) {
        var aoiID = findAoiByPoint(aois, point);
        jump(point, aoiID, aoisTimeInfo, result, leaveThreshold, stayThreshold);
    });
    return result;
}


function jump(targetPoint, targetAoiID, aoisTimeInfo, result, leaveThreshold, stayThreshold) {

    for (var i = 0; i < aoisTimeInfo.length; i++) {
        var aoiID = i + 1;
        if (targetAoiID == aoiID) {
            aoisTimeInfo[i].stay += targetPoint.duration;
            if (isReturnTheAoi(aoisTimeInfo[aoiID - 1].leave, aoisTimeInfo[aoiID - 1].stay, leaveThreshold, stayThreshold)) {
                result[i]++;
            }
            if (aoisTimeInfo[i].leave != Infinity || aoisTimeInfo[i].stay >= stayThreshold) {
                aoisTimeInfo[i].leave = 0;
            }
        } else {
            aoisTimeInfo[i].leave += targetPoint.duration;
            aoisTimeInfo[i].stay = 0;
        }
    }
    console.log(JSON.stringify(aoisTimeInfo));
}

function isReturnTheAoi(leave, stay, leaveThreshold, stayThreshold) {
    return leave >= leaveThreshold && stay >= stayThreshold;
}

function findAoiByPoint(aois, point) {
    for (var i = 0; i < aois.length; i++) {
        var aoi = aois[i];
        if (point.x >= aoi.xmin &&  point.x <= aoi.xmax && point.y >= aoi.ymin &&  point.y <= aoi.ymax) {
            return aoi.id;
        }
    }
}








