
function greenFocus(){
    document.getElementById('popup4').classList.toggle('popup-focus-green');
    document.getElementById('popup6').classList.toggle('popup-focus-green');
    document.getElementById('popup7').classList.toggle('popup-focus-green');
    document.getElementById('popup10').classList.toggle('popup-focus-green');
    document.getElementById('popup14').classList.toggle('popup-focus-green');
    $.ajax({
        url: "/tablet/Wetstock/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'group': 'green',
        },
        success: function (response) {
            console.log(response);
        },
    });
}
function blueFocus(){
    document.getElementById('popup5').classList.toggle('popup-focus-blue');
    document.getElementById('popup8').classList.toggle('popup-focus-blue');
    document.getElementById('popup9').classList.toggle('popup-focus-blue');
    document.getElementById('popup15').classList.toggle('popup-focus-blue');
    document.getElementById('popup16').classList.toggle('popup-focus-blue');
    $.ajax({
        url: "/tablet/Wetstock/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'group': 'blue',
        },
        success: function (response) {
            console.log(response);
        },
    });
}
function grayFocus(){
    document.getElementById('popup1').classList.toggle('popup-focus-gray');
    document.getElementById('popup2').classList.toggle('popup-focus-gray');
    document.getElementById('popup3').classList.toggle('popup-focus-gray');
    document.getElementById('popup11').classList.toggle('popup-focus-gray');
    document.getElementById('popup12').classList.toggle('popup-focus-gray');
    document.getElementById('popup13').classList.toggle('popup-focus-gray');
    $.ajax({
        url: "/tablet/Wetstock/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'group': 'gray',
        },
        success: function (response) {
            console.log(response);
        },
    });
}
function allFocus(){
    document.getElementById('popup4').classList.toggle('popup-focus-green');
    document.getElementById('popup6').classList.toggle('popup-focus-green');
    document.getElementById('popup7').classList.toggle('popup-focus-green');
    document.getElementById('popup10').classList.toggle('popup-focus-green');
    document.getElementById('popup14').classList.toggle('popup-focus-green');
    document.getElementById('popup5').classList.toggle('popup-focus-blue');
    document.getElementById('popup8').classList.toggle('popup-focus-blue');
    document.getElementById('popup9').classList.toggle('popup-focus-blue');
    document.getElementById('popup15').classList.toggle('popup-focus-blue');
    document.getElementById('popup16').classList.toggle('popup-focus-blue');
    document.getElementById('popup1').classList.toggle('popup-focus-gray');
    document.getElementById('popup2').classList.toggle('popup-focus-gray');
    document.getElementById('popup3').classList.toggle('popup-focus-gray');
    document.getElementById('popup11').classList.toggle('popup-focus-gray');
    document.getElementById('popup12').classList.toggle('popup-focus-gray');
    document.getElementById('popup13').classList.toggle('popup-focus-gray');
    $.ajax({
        url: "/tablet/Wetstock/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'group': 'all',
        },
        success: function (response) {
            console.log(response);
        },
    });
}

function hover(number){
    document.getElementById('popup'+parseInt(number)).classList.toggle('main-popup-'+parseInt(number)+'-hover');
    $.ajax({
        url: "/tablet/Wetstock/Socket/",
        method: "GET",
        dataType: "json",
        data: {
            'popup': number,
        },
        success: function (response) {
            console.log(response);
        },
    });
}

