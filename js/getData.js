var g_fixationDataArr = [];
var sequence = 1;
// d3.csv('data/fixationData.csv', type, function (csvdata) {
//     // console.log(csvdata);
//     g_fixationDataArr = csvdata;
//     // for (var i = 0; i < csvdata.length; i++) {
//     //     g_fixationDataArr[i] = csvdata[i];
//     // }
//     console.log("load完毕");
// });

// $.each(g_fixationDataArr, function (index, element) {
//     console.log(element);
// });

function syncLoadCSV() {
    $.ajax({
        url: 'data/fixationData.csv',
        async: false,
        method: 'GET',
        success: function (text) {
            g_fixationDataArr = d3.csv.parseRows(text).map(function (row) {
                return {'sequence' : sequence++, 'duration' : +row[0], 'fixationX' : +row[1], 'fixationY' : +row[2]};
            });
        }
    });
}

syncLoadCSV();


