const colorInput = document.getElementById('color');
const Weight = document.getElementById('weight');
const clear = document.getElementById('clear');
const paths = []
let currentPath = [];

const pecil = document.querySelector('#pencil');
const line = document.querySelector('#line');
const rect = document.querySelector('#rect');
const circle = document.querySelector('#circle');

let dataURL;

function setup() { //Cria um novo elemento `canvas` com as dimensoes da janela do navegado. a função createCanvas recebe 2 argumentos.
    createCanvas(window.innerWidth, window.innerHeight);
   
    background(255); //DEFINE A COR DE FUNDO DO CANVAS(tela em branco)
    dataURL = canvas.toDataURL();
   //converte o conteúdo do canvas para um URL de dados.
   //A função toDataURL() retorna uma string que contem o URL dos dados
   //A URL serve para exibir a imagem no navegaodr ou salvar
}

function draw() { //Função que vai desenhar na tela
    
    noFill(); //Função noFill define que as formas desenhadas não serâo preenchidas em cor

    if (mouseIsPressed) { //Essa condicional verifica se o botao do mouse estiver
                           //precissionado o código sera executado
        const point = { //OBJETO POINT SERÁ CHAMADO
            x: mouseX, //armazenam as cordenadas do cursor do mouse x, y
            y: mouseY,

            color: colorInput.value, //armazena a cor
            weight: weight.value //armazena a expessura do lapis
        };

        currentPath.push(point); //Obejeto point é adicionado ao array `currentPath`. CurrentPath ele armazena os pontos que foram desenhados pelo botao do moise 
    }

    paths.forEach(path => { //o loop forEach executa esses coódigos para cada caminho 

         beginShape(); //para desenhar uma nova forma
         path.forEach(point => { //o loop itera os pontos no caminho. é executado 

            stroke(point.color);//define a cor da forma. com o color
            strokeWeight(point.weight); //define a espessura da forma com weight
            vertex(point.x, point.y); //o vertex adiciona um vertice na forma, que é adicionado nas cordenadas do x e y
         })
        endShape();// Funçaõ para para de desenhar a forma

    });
    
}

function mousePressed() { //função que é chamada quando o botão é pressionado

    currentPath = []; //limpa o array currentPath. que ele é usado para armazenar os pontos que são desenhados quando o mouse é pressionado
    if (pencil.checked) { //a condição if verifica se a caixa pencil esta marcada
                          //se estiver marcada o código é executado
        paths.push(currentPath) //o array currentPath é adicionado ao array paths que ele armazena os caminhos
        //a função push adiciona um novo elemento ao final de um array.
    }
}

clear.addEventListener('click', () => {
    //remove os paths
    paths.splice(0);
    //limpa o background
    background(255);
    dataURL = canvas.toDataURL();

});

window.onload = () => { //essa função é chamada quando a pagina web é carregada
	var c = document.querySelector("#defaultCanvas0");
	var ctx = c.getContext("2d");
	let x1,y1,x2,y2,x3,y3;
	let gradient;
	let isDown = false;
	const color2 = document.querySelector("#color2");

	document.querySelector("#gradient").addEventListener('click', () => {
		if(document.querySelector("#gradient").checked){
			color2.disabled = false;
		}
		else{
			color2.disabled = true;
		}
	})
	
	document.querySelector("#defaultCanvas0").addEventListener("mousedown", (e) => {
		x1 = e.clientX;
		y1 = e.clientY - 42;
		isDown = true
	});
	document.querySelector("#defaultCanvas0").addEventListener("mousemove", (e) => {
		if(isDown){
			const image = new Image();
			image.src = dataURL;
			image.addEventListener("load", () => {
				ctx.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);
			});
			drawing(e);
		}
	});
	document.querySelector("#defaultCanvas0").addEventListener("mouseup", (e) => {
		isDown = false;
		drawing(e);
		dataURL = canvas.toDataURL();
	});


    function drawing(e){
		if(line.checked){
			x2 = e.clientX;
			y2 = e.clientY - 42;

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			if(document.querySelector("#gradient").checked){
				gradient = ctx.createLinearGradient(x1, y1, x2, y2);
				gradient.addColorStop(0, colorInput.value);
				gradient.addColorStop(1, color2.value);
				ctx.strokeStyle = gradient;
			}
			else{
				ctx.strokeStyle = colorInput.value;
			}
			ctx.lineWidth = weight.value;
			ctx.stroke();
		}
		else if(rect.checked){
			x2 = e.clientX - x1;
			y2 = (e.clientY - 42) - y1;

			ctx.beginPath();
			if(document.querySelector("#gradient").checked){
				x3 = e.clientX;
				y3 = e.clientY - 42;
				gradient = ctx.createLinearGradient(x1, y1, x3, y3);
				gradient.addColorStop(0, colorInput.value);
				gradient.addColorStop(1, color2.value);
				ctx.fillStyle = gradient;
			}
			else{
				ctx.fillStyle = colorInput.value;
			}
			ctx.fillRect(x1, y1, x2, y2);
		}
		else if(circle.checked){
			x2 = e.clientX - x1;
			y2 = (e.clientY - 42) - y1;

			ctx.beginPath();
			ctx.arc(x1 + x2/2, y1 + y2/2, Math.abs(Math.max(Math.abs(x2),Math.abs(y2))/2), 0, 2 * Math.PI, false);
			if(document.querySelector("#gradient").checked){
				x3 = e.clientX;
				y3 = e.clientY - 42;
				gradient = ctx.createLinearGradient(x1, y1, x3, y3);
				gradient.addColorStop(0, colorInput.value);
				gradient.addColorStop(1, color2.value);
				ctx.fillStyle = gradient;
			}
			else{
				ctx.fillStyle = colorInput.value;
			}
			ctx.fill();
		}
	}
}