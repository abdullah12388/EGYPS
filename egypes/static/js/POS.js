function back(curr, dist){
    document.getElementById('sc'+curr).classList.add('d-none');
    document.getElementById('sc'+curr).style.transition = 'all 1s';
    document.getElementById('sc'+dist).classList.remove('d-none');
    document.getElementById('sc'+dist).style.transition = 'all 1s';
    $.ajax({
        url: "/tablet/POS/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'current': curr,
            'dist': dist,
        },
        success: function (t) {
            console.log(t);
        },
    });
}

function transactions(){
    document.getElementById('sc1').classList.add('d-none');
    document.getElementById('sc1').style.transition = 'all 1s';
    document.getElementById('sc2').classList.remove('d-none');
    document.getElementById('sc2').style.transition = 'all 1s';
    $.ajax({
        url: "/tablet/POS/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'current': 1,
            'dist': 2,
        },
        success: function (t) {
            console.log(t);
        },
    });
}

function transactionDetails(tid){
    document.getElementById('sc2').classList.add('d-none');
    document.getElementById('sc2').style.transition = 'all 1s';
    var Tproduct = document.getElementById('t_'+tid+'_product').innerHTML;
    var Tamount = document.getElementById('t_'+tid+'_amount').innerHTML;
    var Ttotal = document.getElementById('t_'+tid+'_total').innerHTML;
    document.getElementById('vt_product').innerHTML = Tproduct;
    document.getElementById('vt_amount').innerHTML = Tamount;
    document.getElementById('vt_total').innerHTML = Ttotal;
    document.getElementById('transaction_id').value = tid;
    document.getElementById('sc3').classList.remove('d-none');
    document.getElementById('sc3').style.transition = 'all 1s';
    $.ajax({
        url: "/tablet/POS/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'current': 2,
            'dist': 3,
            'tid': tid,
        },
        success: function (t) {
            console.log(t);
        },
    });
}

function cashPage(){
    document.getElementById('sc3').classList.add('d-none');
    document.getElementById('sc3').style.transition = 'all 1s';
    document.getElementById('sc4').classList.remove('d-none');
    document.getElementById('sc4').style.transition = 'all 1s';
    $.ajax({
        url: "/tablet/POS/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'current': 3,
            'dist': 4,
        },
        success: function (t) {
            console.log(t);
        },
    });
}

function cashCard(){
    document.getElementById('sc4').classList.add('d-none');
    document.getElementById('sc4').style.transition = 'all 1s';

    document.getElementById('tr_pos_datetime').innerHTML = document.getElementById('pos_datetime').innerHTML;
    var tid = document.getElementById('transaction_id').value;
    
    document.getElementById('tr_tid').innerHTML = tid;
    document.getElementById('tr_product').innerHTML = document.getElementById('t_'+tid+'_product').innerHTML;
    document.getElementById('tr_amount').innerHTML = document.getElementById('t_'+tid+'_amount').innerHTML;
    document.getElementById('tr_unit').innerHTML = document.getElementById('t_'+tid+'_unit').value;
    document.getElementById('tr_total').innerHTML = document.getElementById('t_'+tid+'_total').innerHTML;
    document.getElementById('tr_total_end').innerHTML = document.getElementById('t_'+tid+'_total').innerHTML;

    document.getElementById('sc5').classList.remove('d-none');
    document.getElementById('sc5').style.transition = 'all 1s';
    $.ajax({
        url: "/tablet/POS/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'current': 4,
            'dist': 5,
            'pay_tid': document.getElementById('transaction_id').value,
        },
        success: function (t) {
            console.log(t);
            setTimeout(function(){
                window.location.reload();
            }, 10000)
        },
    });
}