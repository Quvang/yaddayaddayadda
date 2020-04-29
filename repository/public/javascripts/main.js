function clock() {
    var month = document.getElementById('month');
    var date = document.getElementById('date');
    var hours = document.getElementById('hours');
    var minutes = document.getElementById('minutes');
    var seconds = document.getElementById('seconds');
    // var ampm = document.getElementById('ampm');

    var mo = new Date().getMonth() + 1;
    var d = new Date().getDate();
    var h = new Date().getHours();
    var m = new Date().getMinutes();
    var s = new Date().getSeconds();
    // var am = 'AM';

    // if (h > 12) {
    //     h = h - 12;
    //     var am = 'PM';
    // }

    mo = mo < 10 ? '0' + mo : mo;
    d = d < 10 ? '0' + d : d;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    month.innerHTML = mo;
    date.innerHTML = d;
    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
    // ampm.innerHTML = am;
}

var interval = setInterval(clock, 1000);

// Color change seconds
// function color() {
//     if (seconds.innerHTML == 10) {
//         seconds.setAttribute('style', 'color: #6F0;');
//     } else {
//         seconds.setAttribute('style', 'color: #fff');
//     }
// }

// var colorinterval = setInterval(color, 1000);
