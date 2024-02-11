var interval95;
var interval92;

function showDetails(details_id){
    document.getElementById(details_id).classList.toggle('d-none');
}

function Up95() {
    // animation
    document.getElementById('nozzle95').classList.toggle('scale');
    // increase
    document.getElementById('footer95').classList.toggle('d-none');
    document.getElementById('footer95').style.transition = 'all 1s';
    interval95 = setInterval(function () {
        var amount = document.getElementById('amount95');
        amount.innerText = parseFloat(amount.innerText) + 1.0;
        amount.style.transition = 'all 1s';
        $.ajax({
            url: "/tablet/Nozzles/Gas95/Up/",
            method: "GET",
            dataType: "json",
            data: {
                'nozzle': 95,
                'unit': 14.30,
                'amount': amount.innerText,
            },
            success: function (response) {
                console.log(response);
            },
        });
    }, 500)
    // down button
    document.getElementById('down95').removeAttribute('disabled');
    document.getElementById('down95').style.transition = 'all 1s';
}

function Down95() {
    // animation
    document.getElementById('nozzle95').classList.toggle('scale');
    // increase
    clearInterval(interval95)
    setTimeout(function () {
        var amount = document.getElementById('amount95');
        amount.innerText = 0;
        amount.style.transition = 'all 1s';
        document.getElementById('footer95').classList.toggle('d-none');
        document.getElementById('footer95').style.transition = 'all 1s';
    }, 5000)
    // down button
    document.getElementById('down95').setAttribute('disabled', 'true');
    document.getElementById('down95').style.transition = 'all 1s';
}


function Up92() {
    // animation
    document.getElementById('nozzle92').classList.toggle('scale');
    // increase
    document.getElementById('footer92').classList.toggle('d-none');
    document.getElementById('footer92').style.transition = 'all 1s';
    interval92 = setInterval(function () {
        var amount = document.getElementById('amount92');
        amount.innerText = parseFloat(amount.innerText) + 1.0;
        amount.style.transition = 'all 1s';
    }, 1)
    // down button
    document.getElementById('down92').removeAttribute('disabled');
    document.getElementById('down92').style.transition = 'all 1s';
}

function Down92() {
    // animation
    document.getElementById('nozzle92').classList.toggle('scale');
    // increase
    clearInterval(interval92)
    setTimeout(function () {
        var amount = document.getElementById('amount92');
        amount.innerText = 0;
        amount.style.transition = 'all 1s';
        document.getElementById('footer92').classList.toggle('d-none');
        document.getElementById('footer92').style.transition = 'all 1s';
    }, 5000)
    // down button
    document.getElementById('down92').setAttribute('disabled', 'true');
    document.getElementById('down92').style.transition = 'all 1s';
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