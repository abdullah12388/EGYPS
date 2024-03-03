var interval;

function showDetails(details_id){
    document.getElementById(details_id).classList.toggle('d-none');
}

function Up(product) {
    if(product == '95'){
        document.getElementById('up92').setAttribute('disabled', 'true');
    }else{
        document.getElementById('up95').setAttribute('disabled', 'true');
    }
    // animation
    document.getElementById('nozzle'+parseInt(product)).classList.add('scale');
    var total = document.getElementById('total'+parseInt(product));
    var amount = document.getElementById('amount'+parseInt(product));
    var unit = document.getElementById('unit'+parseInt(product));
    total.innerText = 0.0;
    amount.innerText = 0.0;
    // increase
    interval = setInterval(function () {
        
        amount.innerText = (parseFloat(amount.innerText) + 0.1).toFixed(2);
        amount.style.transition = 'all 0.1s';

        total.innerHTML = (parseFloat(amount.innerText) * parseFloat(unit.innerHTML)).toFixed(2);
        total.style.transition = 'all 0.1s';

        $.ajax({
            url: "/tablet/Nozzles/Up/Socket/",
            method: "GET",
            dataType: "json",
            data: {
                'product': product,
                'total': total.innerText,
                'amount': amount.innerText,
                'unit': unit.innerText,
                'status': 'Up',
            },
            success: function (response) {
                console.log(response);
            },
        });
    }, 100)
    // down button
    document.getElementById('down'+product).removeAttribute('disabled');
    document.getElementById('down'+product).style.transition = 'all 1s';
}

function Down(product) {
    document.getElementById('up95').removeAttribute('disabled');
    document.getElementById('up92').removeAttribute('disabled');
    // animation
    document.getElementById('nozzle'+parseInt(product)).classList.remove('scale');
    // stop
    clearInterval(interval);
    var total = document.getElementById('total'+parseInt(product));
    var amount = document.getElementById('amount'+parseInt(product));
    var unit = document.getElementById('unit'+parseInt(product));

    $.ajax({
        url: "/tablet/Nozzles/Down/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'product': product,
            'total': total.innerHTML,
            'amount': amount.innerText,
            'unit': unit.innerHTML,
            'status': 'Down',
        },
        success: function (response) {
            console.log(response);
        },
    });
    // down button
    document.getElementById('down'+product).setAttribute('disabled', 'true');
    document.getElementById('down'+product).style.transition = 'all 1s';
}



// const roomName = JSON.parse(document.getElementById('room-name').textContent);
// const notificationSocket = new WebSocket(
//     'ws://'
//     + window.location.host
//     + '/ws/notification/'
//     + roomName
//     + '/'
// );
// notificationSocket.onmessage = function (e) {
//     const data = JSON.parse(e.data);
//     console.log(data);
// };
// notificationSocket.onclose = function (e) {
//     console.error('Notification socket closed unexpectedly');
// };