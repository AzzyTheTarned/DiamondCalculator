function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

let initInputData = (type, img) => {
    let input_zone = document.getElementById('input');
    let calc_button = document.getElementById('calc');
    input_zone.innerHTML = '';
    if (document.getElementById('type').value === 'diag') {
        document.getElementById('img').children[0].src = 'diag.png';
        input_zone.appendChild(document.createTextNode('Диагональ 1:'));
        input_zone.appendChild(document.createElement('input'));
        input_zone.lastElementChild.type = 'number';
        input_zone.lastElementChild.id = 'diag1';
        input_zone.lastElementChild.oninput = () => {
            document.getElementById('error').innerHTML = '';
            document.getElementById('input').getElementsByTagName('input')[0].className = '';
        }
        input_zone.appendChild(document.createElement('br'));
        input_zone.appendChild(document.createTextNode('Диагональ 2:'));
        input_zone.appendChild(document.createElement('input'));
        input_zone.lastElementChild.type = 'number';
        input_zone.lastElementChild.id = 'diag2';
        input_zone.lastElementChild.oninput = () => {
            document.getElementById('error').innerHTML = '';
            document.getElementById('input').getElementsByTagName('input')[1].className = '';
        }

    } else if (document.getElementById('type').value === 'side&ang') {
        document.getElementById('img').children[0].src = 'angle.png';
        input_zone.appendChild(document.createTextNode('Сторона:'));
        input_zone.appendChild(document.createElement('input'));
        input_zone.lastElementChild.type = 'number';
        input_zone.lastElementChild.id = 'side';
        input_zone.lastElementChild.oninput = () => {
            document.getElementById('error').innerHTML = '';
            document.getElementById('input').getElementsByTagName('input')[0].className = '';
        }
        input_zone.appendChild(document.createElement('br'));
        input_zone.appendChild(document.createTextNode('Угол:'));
        input_zone.appendChild(document.createElement('input'));
        input_zone.lastElementChild.type = 'number';
        input_zone.lastElementChild.id = 'angle';
        input_zone.lastElementChild.oninput = () => {
            document.getElementById('error').innerHTML = '';
            document.getElementById('input').getElementsByTagName('input')[1].className = '';
        }
    }
    calc_button.result = document.getElementById('type').value;
}

let calculate = (type) => {
    document.getElementById('results').innerHTML = '';
    let inp = document.getElementById('input').getElementsByTagName('input');
    let selected_arr = Array.from(document.getElementById('calc_choice').options).filter(function (option) { return option.selected}).map(function (option) {
        return option.value;
    });
    let isValidData = true;
    let errorMessage = "";

    if (type === "diag") {
        if (inp[0].value === "" || inp[1].value === "") {
            isValidData = false;
            errorMessage = "Заполните поля диагоналей!";
            for (let i in inp) {
                if (inp[i].value === "") inp[i].className = "error";
            }
        } else if (parseFloat(inp[0].value) <= 0 || parseFloat(inp[1].value) <= 0) {
            isValidData = false;
            errorMessage = "Диагонали должны быть больше нуля!";
            for (let i in inp) {
                if (parseFloat(inp[i].value) <= 0) inp[i].className = "error";
            }
        } else if (selected_arr.length === 0) {
            isValidData = false;
            errorMessage = "Выберите хоть один тип вычисления!";
            document.getElementById('calc_choice').className = 'error';
        }
    } else if (type === "side&ang") {
        if (inp[0].value === "" || inp[1].value === "") {
            isValidData = false;
            errorMessage = "Заполните поля стороны и угла!";
            for (let i in inp) {
                if (inp[i].value === "") inp[i].className = "error";
            }
        } else if (parseFloat(inp[0].value) <= 0) {
            isValidData = false;
            errorMessage = "Сторона должна быть больше нуля!";
            inp[0].className = 'error';
        } else if (parseFloat(inp[1].value) <= 0 || parseFloat(inp[1].value) >= 180) {
            isValidData = false;
            errorMessage = "Угол должен быть в пределах от 0 до 180 градусов!";
            inp[1].className = 'error';
        } else if (selected_arr.length === 0) {
            isValidData = false;
            errorMessage = "Выберите хоть один тип вычисления!";
            document.getElementById('calc_choice').className = 'error';
        }
    }
    document.getElementById("error").innerHTML = errorMessage;

    if (isValidData) {
        if (type === 'diag') {
            if (selected_arr.includes('height')) document.getElementById('results').innerHTML += `Высота: ${inp[0].value*inp[1].value / Math.sqrt(inp[0].value*inp[0].value + inp[1].value*inp[1].value)}<br>`;
            if (selected_arr.includes('perimeter')) document.getElementById('results').innerHTML += `Периметр: ${2 * Math.sqrt(inp[0].value*inp[0].value + inp[1].value*inp[1].value)}<br>`;
            if (selected_arr.includes('radius')) document.getElementById('results').innerHTML += `Радиус вписанной окружности: ${(inp[0].value*inp[1].value) / (2 * Math.sqrt(inp[0].value*inp[0].value + inp[1].value*inp[1].value))}<br>`;
            if (selected_arr.includes('area')) document.getElementById('results').innerHTML += `Площадь: ${(inp[0].value*inp[1].value) / 2}<br>`;
        } else if (type === 'side&ang') {
            if (selected_arr.includes('height')) document.getElementById('results').innerHTML += `Высота: ${inp[0].value * Math.sin(toRadians(inp[1].value))}<br>`;
            if (selected_arr.includes('perimeter')) document.getElementById('results').innerHTML += `Периметр: ${inp[0].value * 4}<br>`;
            if (selected_arr.includes('radius')) document.getElementById('results').innerHTML += `Радиус вписанной окружности: ${inp[0].value * Math.sin(toRadians(inp[1].value)) / 2}<br>`;
            if (selected_arr.includes('area')) document.getElementById('results').innerHTML += `Площадь: ${inp[0].value * inp[0].value * Math.sin(toRadians(inp[1].value))}<br>`;
        }
    } 
}

initInputData();

document.getElementById('show').onclick = () => {initInputData()};

document.getElementById('clear').onclick = () => {
    for (let item in document.getElementById('input').getElementsByTagName('input')) {
        document.getElementById('input').getElementsByTagName('input')[item].value = null;
    }
    document.getElementById('results').innerHTML = '';
}

document.getElementById('calc').onclick = () => {
    calculate(document.getElementById('calc').result);
    
}

document.getElementById('calc_choice').oninput = () => {
    document.getElementById('error').innerHTML = '';
    document.getElementById('calc_choice').className = '';
}
document.getElementById('type').oninput = () => document.getElementById('error').innerHTML = '';
