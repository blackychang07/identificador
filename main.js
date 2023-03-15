var celular = 0
var libro = 0
var perfume = 0
var juguete = 0


Webcam.set({
    width: 450, height: 400, image_format: "png", png_quality: 100
})

Webcam.attach(
    "#camara"
)

function tomar_foto() {
    Webcam.snap(function (data_uri) {
        document.getElementById("captura").innerHTML = '<img src="' + data_uri + '" id="foto">'
    })
}

var reconocer_imagen = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YVMNlaUwP/model.json", cargar)

function cargar() {
    console.log("ya cargo el modelo");
}

function reconocer() {

    var foto = document.getElementById("foto")
    
    reconocer_imagen.classify(foto, mostrar_resultado)

}

function mostrar_resultado(error, resultados)
{

var precision = 0
var objeto = ""

if (!error) {
    console.log(resultados)
    objeto = resultados[0].label
precision = resultados[0].confidence

for(i=0; i<resultados.length; i++){
    if(resultados[i].label=="celular"){
        celular = resultados[i].confidence
        console.log(celular)
        celular = Math.ceil(celular*200)
        document.getElementById("celular").style.width= celular + "px"
    }

    if(resultados[i].label=="libro"){
        libro = resultados[i].confidence
        console.log(libro)
        libro = Math.ceil(libro*200)
        document.getElementById("libro").style.width= libro + "px"
    }

    if(resultados[i].label=="perfume"){
        perfume = resultados[i].confidence
        console.log(perfume)
        perfume = Math.ceil(perfume*200)
        document.getElementById("perfume").style.width= perfume + "px"
    }

    if(resultados[i].label=="juguete"){
        juguete = resultados[i].confidence
        console.log(juguete)
        juguete = Math.ceil(juguete*200)
        document.getElementById("juguete").style.width= juguete + "px"
    }


}

precision = Math.ceil(precision*100)

document.getElementById("objeto").innerHTML = "objeto: " + objeto
document.getElementById("precision").innerHTML = "precision: " + precision + "%"

}
}
