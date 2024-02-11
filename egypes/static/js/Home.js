
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
        // document.getElementById('amount_volume').innerHTML = data.message.amount;
        // document.getElementById('unit_price').innerHTML = data.message.unit;
        // console.log(data.message.type);
        if (data.message.type == 'wetstock') {
            document.getElementById('main_station').classList.add('d-none');
            document.getElementById('wetstock_station').classList.remove('d-none');
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