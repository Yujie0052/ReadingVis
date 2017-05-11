var kdTree = new KdTree();
for (var i = 0; i < g_fixationDataArr.length; i++) {
    var point = {};
    point.x = g_fixationDataArr[i].fixationX;
    point.y = g_fixationDataArr[i].fixationY;

    kdTree.insert(point);
}



