function changePrices() {
    var gas95 = document.getElementById('gas95');
    var gas92 = document.getElementById('gas92');
    var diesel = document.getElementById('diesel');
    var cng = document.getElementById('cng');
    $.ajax({
        url: "/tablet/Prices/",
        method: "GET",
        dataType: "json",
        data: {
            'gas95': gas95.value,
            'gas92': gas92.value,
            'diesel': diesel.value,
            'cng': cng.value,
        },
        success: function (t) {
            console.log(t);
            gas95.style = 'background-color: #198754;color: #fff;transition: all 1s;font-size: 30px;font-weight: bold;';
            gas92.style = 'background-color: #198754;color: #fff;transition: all 1s;font-size: 30px;font-weight: bold;';
            diesel.style = 'background-color: #198754;color: #fff;transition: all 1s;font-size: 30px;font-weight: bold;';
            cng.style = 'background-color: #198754;color: #fff;transition: all 1s;font-size: 30px;font-weight: bold;';
            setTimeout(function(){
                gas95.style = 'background-color: #fff;color: #000;transition: all 1s;font-size: 30px;font-weight: bold;';
                gas92.style = 'background-color: #fff;color: #000;transition: all 1s;font-size: 30px;font-weight: bold;';
                diesel.style = 'background-color: #fff;color: #000;transition: all 1s;font-size: 30px;font-weight: bold;';
                cng.style = 'background-color: #fff;color: #000;transition: all 1s;font-size: 30px;font-weight: bold;';
            },1000)
        },
    });
}