document.getElementById('capacity95').addEventListener('change', function (){
    if(this.value == 0){
        document.getElementById('capacity95').classList.add('bg-danger', 'text-white');
        document.getElementById('submit95').setAttribute('disabled', 'true');
    }else{
        document.getElementById('capacity95').classList.remove('bg-danger', 'text-white');
        document.getElementById('submit95').removeAttribute('disabled');
    }
});
document.getElementById('amount95').addEventListener('keyup', function(){
    var capacity = document.getElementById('capacity95');
    if(parseFloat(this.value) <= parseFloat(capacity.value)){
        document.getElementById('amount95').classList.remove('bg-danger', 'text-white');
        var fuel_precentage = (this.value*100)/capacity.value;
        document.getElementById('fuel95').style = `transform: translateY(${(100-fuel_precentage)}%);transition: all 1s;`;
        document.getElementById('tank_vol_amount95').innerHTML = fuel_precentage.toFixed(2);
        document.getElementById('tank_vol_amount95').style = 'transition: all 1s;';
    }else{
        document.getElementById('amount95').classList.add('bg-danger', 'text-white');
        // confirm('Notice: Max Capacity is '+capacity.value);
    }
})
document.getElementById('delivery95').addEventListener('keyup', function(){
    var capacity = document.getElementById('capacity95');
    var amount = document.getElementById('amount95');
    if(parseFloat(this.value) <= (parseFloat(capacity.value)-parseFloat(amount.value))){
        document.getElementById('delivery95').classList.remove('bg-danger', 'text-white');
        var fuel_precentage = ((parseFloat(this.value)+parseFloat(amount.value))*100)/capacity.value;
        document.getElementById('fuel95').style = `transform: translateY(${(100-fuel_precentage)}%);transition: all 1s;`;
        document.getElementById('tank_vol_amount95').innerHTML = fuel_precentage.toFixed(2);
        document.getElementById('tank_vol_amount95').style = 'transition: all 1s;';
        document.getElementById('submitDelivery95').removeAttribute('disabled');
    }else{
        document.getElementById('delivery95').classList.add('bg-danger', 'text-white');
        document.getElementById('submitDelivery95').setAttribute('disabled', 'true');
        // confirm('Notice: Max Delivery is '+(parseFloat(capacity.value)-parseFloat(amount.value)));
    }
})


document.getElementById('capacity92').addEventListener('change', function (){
    if(this.value == 0){
        document.getElementById('capacity92').classList.add('bg-danger', 'text-white');
        document.getElementById('submit92').setAttribute('disabled', 'true');
    }else{
        document.getElementById('capacity92').classList.remove('bg-danger', 'text-white');
        document.getElementById('submit92').removeAttribute('disabled');
    }
});

document.getElementById('amount92').addEventListener('keyup', function(){
    var capacity = document.getElementById('capacity92');
    if(parseFloat(this.value) <= parseFloat(capacity.value)){
        document.getElementById('amount92').classList.remove('bg-danger', 'text-white');
        var fuel_precentage = (this.value*100)/capacity.value;
        document.getElementById('fuel92').style = `transform: translateY(${(100-fuel_precentage)}%);transition: all 1s;`;
        document.getElementById('tank_vol_amount92').innerHTML = fuel_precentage.toFixed(2);
        document.getElementById('tank_vol_amount92').style = 'transition: all 1s;';
    }else{
        document.getElementById('amount92').classList.add('bg-danger', 'text-white');
        // confirm('Notice: Max Capacity is '+capacity.value);
    }
})
document.getElementById('delivery92').addEventListener('keyup', function(){
    var capacity = document.getElementById('capacity92');
    var amount = document.getElementById('amount92');
    if(parseFloat(this.value) <= (parseFloat(capacity.value)-parseFloat(amount.value))){
        document.getElementById('delivery92').classList.remove('bg-danger', 'text-white');
        var fuel_precentage = ((parseFloat(this.value)+parseFloat(amount.value))*100)/capacity.value;
        document.getElementById('fuel92').style = `transform: translateY(${(100-fuel_precentage)}%);transition: all 1s;`;
        document.getElementById('tank_vol_amount92').innerHTML = fuel_precentage.toFixed(2);
        document.getElementById('tank_vol_amount92').style = 'transition: all 1s;';
        document.getElementById('submitDelivery92').removeAttribute('disabled');
    }else{
        document.getElementById('delivery92').classList.add('bg-danger', 'text-white');
        document.getElementById('submitDelivery92').setAttribute('disabled', 'true');
        // confirm('Notice: Max Delivery is '+(parseFloat(capacity.value)-parseFloat(amount.value)));
    }
})



function tankDetails(product){
    if(product == 95){
        var capacity = document.getElementById('capacity95');
        var amount = document.getElementById('amount95');
    }else{
        var capacity = document.getElementById('capacity92');
        var amount = document.getElementById('amount92');
    }
    $.ajax({
        url: "/tablet/Tanks/",
        method: "GET",
        dataType: "json",
        data: {
            'capacity': capacity.value,
            'amount': amount.value,
            'product': parseInt(product),
            'action': 'details',
        },
        success: function (t) {
            console.log(t);
        },
    });
}

function deliveryDetails(product){
    if(product == 95){
        var capacity = document.getElementById('capacity95');
        var amount = document.getElementById('amount95');
        var delivery = document.getElementById('delivery95');
        document.getElementById('submitDelivery95').setAttribute('disabled', 'true');
    }else{
        var capacity = document.getElementById('capacity92');
        var amount = document.getElementById('amount92');
        var delivery = document.getElementById('delivery92');
        document.getElementById('submitDelivery92').setAttribute('disabled', 'true');
    }

    $.ajax({
        url: "/tablet/Tanks/",
        method: "GET",
        dataType: "json",
        data: {
            'delivery': delivery.value,
            'amount': amount.value,
            'product': parseInt(product),
            'action': 'delivery',
        },
        success: function (t) {
            console.log(t);
        },
    });

    var start_value = 10.0
    var amount_precentage = (parseFloat(amount.value) * 100)/parseFloat(capacity.value);
    interval = setInterval(function () {
        var precentage = (parseFloat(start_value)*100)/parseFloat(delivery.value);
        start_value = start_value + 10.0;
        
        var progress = document.getElementById('progress'+parseInt(product));
        progress.classList.add('progress-bar-animated');
        progress.innerText = precentage.toFixed(2) + '%';
        progress.style.width = precentage.toFixed(2) + '%';
        progress.style.transition = 'all 0.05s';
        // amount_precentage = amount_precentage + precentage;
        // console.log(
        //     (parseFloat(precentage)*parseFloat(delivery.value))/100,
        //     ((parseFloat(precentage)*parseFloat(delivery.value))/capacity.value),
        //     precentage
        // );
        $.ajax({
            url: "/tablet/Tanks/Delivery/Socket/",
            method: "GET",
            dataType: "json",
            data: {
                'delivery': `${(amount_precentage + ((parseFloat(precentage)*parseFloat(delivery.value))/capacity.value)).toFixed(2)}%`,
                'amount': 10.0,
                'product': parseInt(product),
                'action': 'delivery',
            },
            success: function (t) {
                console.log(t);
            },
        });
        if(parseFloat(start_value) > parseFloat(delivery.value)){
            document.getElementById('progress'+parseInt(product)).classList.remove('progress-bar-animated');
            var amount_product = document.getElementById('amount'+parseInt(product));
            clearInterval(interval);
            amount_product.value = parseFloat(amount_product.value) + parseFloat(delivery.value);
            delivery.value = '';
            setTimeout(function(){
                var progress_bar = document.getElementById('progress'+parseInt(product));
                progress_bar.style.width = '0%';
                progress_bar.innerHTML = '0%';
                progress_bar.style.transition = 'all 1s';
            },1000)
        }
    }, 50)
}