
function connectWebSocket() {
    const roomName = JSON.parse(document.getElementById('room-name').textContent);
    const notificationSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/notification/'
        + roomName
        + '/'
    );
    notificationSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        // console.log(data);
        if (data.message.type == 'wetstock') {
            console.log(data.message);
            document.getElementById('main_station').classList.add('d-none');
            document.getElementById('wetstock_station').classList.remove('d-none');
            if(data.message.popup){
                document.getElementById('main-popup'+parseInt(data.message.popup)).classList.toggle('main-popup-'+parseInt(data.message.popup)+'-hover');
            }
            if(data.message.group){
                var group_ids;
                if(data.message.group == 'green'){
                    group_ids = [4,6,7,10,14];
                }
                if(data.message.group == 'blue'){
                    group_ids = [5,8,9,15,16];
                }
                if(data.message.group == 'gray'){
                    group_ids = [1,2,3,11,12,13];
                }
                if(data.message.group == 'all'){
                    group_ids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
                }
                group_ids.forEach((element)=>{
                    document.getElementById('main-popup'+parseInt(element)).classList.toggle('main-popup-'+parseInt(element)+'-hover');
                })
            }
        } else if (data.message.type == 'prices') {
            if(data.message.action == 'open'){
                document.getElementById('main_station').classList.remove('d-none');
                document.getElementById('wetstock_station').classList.add('d-none');
            }else if(data.message.action == 'change'){
                document.getElementById('gas95').innerHTML = data.message.gas95;
                document.getElementById('gas92').innerHTML = data.message.gas92;
                document.getElementById('diesel').innerHTML = data.message.diesel;
                document.getElementById('cng').innerHTML = data.message.cng;
                document.getElementById('gas95').style.transition = 'all 1s';
                document.getElementById('gas92').style.transition = 'all 1s';
                document.getElementById('diesel').style.transition = 'all 1s';
                document.getElementById('cng').style.transition = 'all 1s';
            }else{
                console.log('no prices action!');
            }
        } else if (data.message.type == 'tanks') {
            if(data.message.action == 'open'){
                document.getElementById('main_station').classList.remove('d-none');
                document.getElementById('wetstock_station').classList.add('d-none');
            }else if(data.message.action == 'change'){
                if(data.message.location == 'details'){
                    console.log(data.message);
                    if(data.message.product == 95){
                        var tank95_amount = document.getElementById('tank95_amount');
                        tank95_amount.innerHTML = parseFloat(data.message.amount);
                        tank95_amount.style.transition = 'all 0.05s';

                        var tank95_progress = document.getElementById('tank95_progress');
                        var precentage = (parseFloat(data.message.amount)*100)/parseFloat(data.message.capacity)
                        tank95_progress.style.width = `${precentage}%`;
                        tank95_progress.innerHTML = `${precentage.toFixed(2)}%`;
                        tank95_progress.style.transition = 'all 0.05s';
                    }else if(data.message.product == 92){
                        var tank92_amount = document.getElementById('tank92_amount');
                        tank92_amount.innerHTML = parseFloat(data.message.amount);
                        tank92_amount.style.transition = 'all 0.05s';

                        var tank92_progress = document.getElementById('tank92_progress');
                        var precentage = (parseFloat(data.message.amount)*100)/parseFloat(data.message.capacity)
                        tank92_progress.style.width = `${precentage}%`;
                        tank92_progress.innerHTML = `${precentage.toFixed(2)}%`;
                        tank92_progress.style.transition = 'all 0.05s';
                    }else{
                        console.log('no tank product!');
                    }
                }else if(data.message.location == 'delivery'){
                    if(data.message.product == 95){
                        var tank95_amount = document.getElementById('tank95_amount');
                        tank95_amount.innerHTML = parseFloat(tank95_amount.innerHTML) + parseFloat(data.message.amount);
                        tank95_amount.style.transition = 'all 0.05s';

                        var tank95_progress = document.getElementById('tank95_progress');
                        tank95_progress.style.width = data.message.delivery;
                        tank95_progress.innerHTML = data.message.delivery;
                        tank95_progress.style.transition = 'all 0.05s';
                    }else if(data.message.product == 92){
                        var tank92_amount = document.getElementById('tank92_amount');
                        tank92_amount.innerHTML = parseFloat(tank92_amount.innerHTML) + parseFloat(data.message.amount);
                        tank92_amount.style.transition = 'all 0.05s';

                        var tank92_progress = document.getElementById('tank92_progress');
                        tank92_progress.style.width = data.message.delivery;
                        tank92_progress.innerHTML = data.message.delivery;
                        tank92_progress.style.transition = 'all 0.05s';
                    }else{
                        console.log('no tank product!');
                    }
                }else{
                    console.log('no tank location!');
                }
            }else{
                console.log('no tank action!');
            }
        } else if (data.message.type == 'nozzles') {
            if(data.message.action == 'open'){
                document.getElementById('main_station').classList.remove('d-none');
                document.getElementById('wetstock_station').classList.add('d-none');
            }else if(data.message.action == 'change'){
                if(data.message.product == 95){
                    if(data.message.status == 'Up'){
                        var nozzle95 = document.getElementById('nozzle95');
                        nozzle95.classList.remove('bg-danger');
                        nozzle95.classList.add('bg-success');
                        nozzle95.style.transition = 'all 0.5s';
                    }else{
                        var nozzle95 = document.getElementById('nozzle95');
                        nozzle95.classList.add('bg-danger');
                        nozzle95.classList.remove('bg-success');
                        nozzle95.style.transition = 'all 0.5s';

                        var tank95_amount = document.getElementById('tank95_amount');
                        var new_amount_precentage = (parseFloat(data.message.amount)*100)/parseFloat(tank95_amount.innerHTML);
                        tank95_amount.innerHTML = (parseFloat(tank95_amount.innerHTML) - parseFloat(data.message.amount)).toFixed(2);
                        tank95_amount.style.transition = 'all 0.5s';
                        var tank95_progress = document.getElementById('tank95_progress');
                        tank95_progress.style.width = (parseFloat(tank95_progress.style.width.split('%')[0]) - parseFloat(new_amount_precentage)).toFixed(2)+'%';
                        tank95_progress.innerHTML = (parseFloat(tank95_progress.innerHTML.split('%')[0]) - parseFloat(new_amount_precentage)).toFixed(2)+'%';
                        tank95_progress.style.transition = 'all 0.5s';

                        document.getElementById('main_sc2_transactions').innerHTML = `
                        <div id="transaction_${data.message.transaction_id}" class="row mt-2 m-auto">
                            <div class="col-lg-3 p-0 d-flex justify-content-center align-items-center">
                                <img class="ps2-gas-img" src="/static/img/pos-screen2-gas.png" alt="">
                            </div>
                            <div class="col-lg-3 p-0">
                                <p class="transaction">${data.message.product}</p>
                                <p class="transaction">PUMP 1</p>
                                <p class="transaction">${data.message.transaction_date}</p>
                                <p class="transaction">sale ID:${data.message.sale_id}</p>
                            </div>
                            <div class="col-lg-3 p-0">
                                <p class="transaction">QTY:${data.message.amount}LTR</p>
                                <p class="transaction">${data.message.transaction_time}</p>
                            </div>
                            <div class="col-lg-3 p-0">
                                <p class="transaction">${data.message.total} EGP</p>
                                <p class="transaction">NOZZLE:${data.message.product}</p>
                                <p class="transaction">SEQ:${data.message.transaction_id}</p>
                            </div>
                        </div>` + document.getElementById('main_sc2_transactions').innerHTML;
                    }
                } else if(data.message.product == 92){
                    if(data.message.status == 'Up'){
                        var nozzle92 = document.getElementById('nozzle92');
                        nozzle92.classList.remove('bg-danger');
                        nozzle92.classList.add('bg-success');
                        nozzle92.style.transition = 'all 0.5s';
                    }else{
                        var nozzle92 = document.getElementById('nozzle92');
                        nozzle92.classList.add('bg-danger');
                        nozzle92.classList.remove('bg-success');
                        nozzle92.style.transition = 'all 0.5s';

                        var tank92_amount = document.getElementById('tank92_amount');
                        var new_amount_precentage = (parseFloat(data.message.amount)*100)/parseFloat(tank92_amount.innerHTML);
                        tank92_amount.innerHTML = (parseFloat(tank92_amount.innerHTML) - parseFloat(data.message.amount)).toFixed(2);
                        tank92_amount.style.transition = 'all 0.5s';
                        var tank92_progress = document.getElementById('tank92_progress');
                        tank92_progress.style.width = (parseFloat(tank92_progress.style.width.split('%')[0]) - parseFloat(new_amount_precentage)).toFixed(2)+'%';
                        tank92_progress.innerHTML = (parseFloat(tank92_progress.innerHTML.split('%')[0]) - parseFloat(new_amount_precentage)).toFixed(2)+'%';
                        tank92_progress.style.transition = 'all 0.5s';

                        document.getElementById('main_sc2_transactions').innerHTML = `
                        <div id="transaction_${data.message.transaction_id}" class="row mt-2 m-auto">
                            <div class="col-lg-3 p-0 d-flex justify-content-center align-items-center">
                                <img class="ps2-gas-img" src="/static/img/pos-screen2-gas.png" alt="">
                            </div>
                            <div class="col-lg-3 p-0">
                                <p class="transaction">${data.message.product}</p>
                                <p class="transaction">PUMP 1</p>
                                <p class="transaction">${data.message.transaction_date}</p>
                                <p class="transaction">sale ID:${data.message.sale_id}</p>
                            </div>
                            <div class="col-lg-3 p-0">
                                <p class="transaction">QTY:${data.message.amount}LTR</p>
                                <p class="transaction">${data.message.transaction_time}</p>
                            </div>
                            <div class="col-lg-3 p-0">
                                <p class="transaction">${data.message.total} EGP</p>
                                <p class="transaction">NOZZLE:${data.message.product}</p>
                                <p class="transaction">SEQ:${data.message.transaction_id}</p>
                            </div>
                        </div>` + document.getElementById('main_sc2_transactions').innerHTML;
                    }
                } else{
                    console.log('no nozzles product!');
                }
                var disp_total = document.getElementById('disp_total');
                disp_total.innerHTML = data.message.total
                disp_total.style.transition = 'all 0.1s';
                var disp_amount = document.getElementById('disp_amount');
                disp_amount.innerHTML = data.message.amount
                disp_amount.style.transition = 'all 0.1s';
                var disp_unit = document.getElementById('disp_unit');
                disp_unit.innerHTML = data.message.unit
                disp_unit.style.transition = 'all 0.1s';

                var ads_total = document.getElementById('ads_total');
                ads_total.innerHTML = data.message.total
                ads_total.style.transition = 'all 0.1s';
                var ads_amount = document.getElementById('ads_amount');
                ads_amount.innerHTML = data.message.amount
                ads_amount.style.transition = 'all 0.1s';
                var ads_unit = document.getElementById('ads_unit');
                ads_unit.innerHTML = data.message.unit
                ads_unit.style.transition = 'all 0.1s';
            }else{
                console.log('no nozzles action!');
            }
        } else if (data.message.type == 'pos') {
            if(data.message.action == 'open'){
                document.getElementById('main_station').classList.remove('d-none');
                document.getElementById('wetstock_station').classList.add('d-none');
            }else if(data.message.action == 'change'){
                if(data.message.t_id){
                    document.getElementById('mt_product').innerHTML = data.message.t_product;
                    document.getElementById('mt_amount').innerHTML = data.message.t_amount;
                    document.getElementById('mt_total').innerHTML = data.message.t_total;
                }
                if(data.message.pay_tid){
                    document.getElementById('mtr_tid').innerHTML = data.message.pay_tid;
                    document.getElementById('mtr_product').innerHTML = data.message.pay_product;
                    document.getElementById('mtr_amount').innerHTML = data.message.pay_amount;
                    document.getElementById('mtr_unit').innerHTML = data.message.pay_unit;
                    document.getElementById('mtr_total').innerHTML = data.message.pay_total;
                    document.getElementById('mtr_total_end').innerHTML = data.message.pay_total;
                    setTimeout(function(){
                        window.location.reload();
                    }, 10000)
                }
                document.getElementById('main_sc'+parseInt(data.message.current)).classList.add('d-none');
                document.getElementById('main_sc'+parseInt(data.message.current)).style.transition = 'all 1s';
                document.getElementById('main_sc'+parseInt(data.message.dist)).classList.remove('d-none');
                document.getElementById('main_sc'+parseInt(data.message.dist)).style.transition = 'all 1s';
            }else{
                console.log('no pos action!');
            }
        }
    };
    notificationSocket.onclose = function (e) {
        console.error('Notification socket closed unexpectedly');
        setTimeout(connectWebSocket, 1000);
    };
}

connectWebSocket();

window.addEventListener("load", () => {
    document.querySelector("#demo").innerHTML = "";
    let i = 0;
    let txt =
        "An improvement in fuel loss of just 0.1% equates to a saving of 3000 litres per year on a typical retail site.";
    let speed = 100;
    type(txt, i, speed);
});

let type = (txt, i, speed) => {
    if (i < txt.length) {
        document.querySelector("#demo").classList.remove("typing");
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(() => {
            type(txt, i, speed);
        }, speed);
    } else {
        document.querySelector("#demo").classList.add("typing");
    }
};
