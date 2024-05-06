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
        input_zone.appendChild(document.createElement('br'));
        input_zone.appendChild(document.createTextNode('Диагональ 2:'));
        input_zone.appendChild(document.createElement('input'));
        input_zone.lastElementChild.type = 'number';
        input_zone.lastElementChild.id = 'diag2';

    } else if (document.getElementById('type').value === 'side&ang') {
        document.getElementById('img').children[0].src = 'angle.png';
        input_zone.appendChild(document.createTextNode('Сторона:'));
        input_zone.appendChild(document.createElement('input'));
        input_zone.lastElementChild.type = 'number';
        input_zone.lastElementChild.id = 'side';
        input_zone.appendChild(document.createElement('br'));
        input_zone.appendChild(document.createTextNode('Угол:'));
        input_zone.appendChild(document.createElement('input'));
        input_zone.lastElementChild.type = 'number';
        input_zone.lastElementChild.id = 'angle';
    }
    calc_button.result = document.getElementById('type').value;
}

let calculate = (type) => {
    let inp = document.getElementById('input').getElementsByTagName('input');
    if (type === 'diag') {
        document.getElementById('heightresult').value = (inp[0].value*inp[1].value) / Math.sqrt(inp[0].value*inp[0].value + inp[1].value*inp[1].value);
        document.getElementById('perimeterresult').value = 2 * Math.sqrt(inp[0].value*inp[0].value + inp[1].value*inp[1].value);
        document.getElementById('radiusresult').value = (inp[0].value*inp[1].value) / (2 * Math.sqrt(inp[0].value*inp[0].value + inp[1].value*inp[1].value));
        document.getElementById('arearesult').value = (inp[0].value*inp[1].value) / 2;
    } else if (type === 'side&ang') {
        document.getElementById('heightresult').value = inp[0].value * Math.sin(toRadians(inp[1].value));
        document.getElementById('perimeterresult').value = inp[0].value * 4;
        document.getElementById('radiusresult').value = inp[0].value * Math.sin(toRadians(inp[1].value)) / 2;
        document.getElementById('arearesult').value = inp[0].value * inp[0].value * Math.sin(toRadians(inp[1].value));
    }
}

initInputData();

document.getElementById('show').onclick = () => {initInputData()};

document.getElementById('clear').onclick = () => {
    for (let item in document.getElementById('input').getElementsByTagName('input')) {
        document.getElementById('input').getElementsByTagName('input')[item].value = null;
    }
}

document.getElementById('calc').onclick = () => {
    calculate(document.getElementById('calc').result);
    
}
