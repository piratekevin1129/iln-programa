var i = 0;
var j = 0;

function getRand(minimum,maximum){
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomnumber;
}

function getE(idname){
    return document.getElementById(idname)
}

function overBtn(){
    over_mp3.play()
}

var ancho_fondo = 0;
var alto_fondo = 0;

var nubes_animacion = []
var total_nubes = 2;

function setFondo(){
    while(nubes_animacion.length<total_nubes){
        var n = getRand(1,total_nubes)
        var check_n = false
        for(j = 0;j<nubes_animacion.length;j++){
            if(nubes_animacion[j]==nu){
                check_n = true
            }
        }
        if(!check_n){
            nubes_animacion.push(n)
        }
    }

    for(i = 0;i<nubes_animacion.length;i++){
        getE('nube-'+nubes_animacion[i]).style.top = String(getRand(0,20))+'%'
        getE('nube-'+nubes_animacion[i]).style.transform = 'translateX('+getRand(0,70)+'%)'
        getE('nube-'+nubes_animacion[i]).className = 'nube animacion-nube-'+getRand(1,5)
    }
    
    var ancho = window.innerWidth
    var percent = (ancho * 100) / 1920
    var alto = (1080 * percent) / 100
    while(alto<window.innerHeight){
        ancho++
        percent = (ancho * 100) / 1920
        alto = (1080 * percent) / 100
    }

    ancho_fondo = ancho
    alto_fondo = alto
    getE('fondo').style.width = ancho_fondo+'px'
    getE('fondo').style.height = alto_fondo+'px'

    //desorganizar casos
    while(casos_data.length<casos.length){
        var c = getRand(0,(casos.length-1))
        var check_c = false;
        for(j = 0;j<casos_data.length;j++){
            if(casos_data[j]==c){
                check_c = true
            }
        }
        if(!check_c){
            casos_data.push(c)
        }
    }
    console.log(casos_data)
}

/****************************/
var actual_caso = 0;
var actual_caso_ind = 0;
var animacion_nombre = null;
var animacion_cortina = null;
var casos_data = [];
var animacion_comenzar = null;

function startGame(){
    animacion_comenzar = setTimeout(function(){
        clearTimeout(animacion_comenzar)
        animacion_comenzar = null

        setCaso()
    },3000)
}

function setCaso(){
    actual_caso = casos_data[actual_caso_ind]
    getE('cortina').className = 'cortina-on'
    animacion_cortina = setTimeout(function(){
        clearTimeout(animacion_cortina)
        animacion_cortina = null
    
        getE('cortina').className = 'cortina-off'
        underground_mp3.volume = 0.5
    
        getE('instruccion-txt').innerHTML = casos[actual_caso].nombre
        getE('instruccion').className = 'instruccion-on'
    
        if(casos[actual_caso].id==1){
            stopAnimation(0,true)
            playAnimation(0,null,-1,false,null,50)
            getE('carretera').className = 'carretera-velocidad'
            getE('volante').className = 'volante-velocidad'
            getE('mapa-img').className = 'mapa-velocidad'
            getE('aguja').className = 'aguja-velocidad'
        }else if(casos[actual_caso].id==2){
            getE('volante').className = 'volante-adulterada'
            getE('cabina').className = 'cabina-adulterada'
        }else if(casos[actual_caso].id==3){
            getE('ojos').className = 'ojos-on'
            getE('cabina').className = 'cabina-borrosa'
            bostezo_mp3.play()
        }else if(casos[actual_caso].id==4){
            getE('celular').className = 'celular-on'
            celular_mp3.play()
        }else if(casos[actual_caso].id==5){
            getE('peatones').className = 'peatones-on'
        }
        
        animacion_nombre = setTimeout(function(){
            clearTimeout(animacion_nombre)
            animacion_nombre = null
    
            getE('botones-container').className = 'botones-container-on'
        },2000)
        car_mp3.play()
    },500)
}

function clickOpcion(o){
    getE('instruccion').className = 'instruccion-off'

    if(o==casos[actual_caso].correct){
        getE('cortina').className = 'cortina-on'
        animacion_cortina = setTimeout(function(){
            clearTimeout(animacion_cortina)
            animacion_cortina = null

            getE('cortina').className = 'cortina-off'
            car_mp3.pause()
            //audio locucion

            //volver a la normalidad
            if(casos[actual_caso].id==1){
                stopAnimation(0,true)
                playAnimation(0,null,-1)
                getE('carretera').removeAttribute('class')
                getE('volante').className = 'volante-normal'
                getE('mapa-img').className = 'mapa-normal'
                getE('aguja').className = 'aguja-normal'
            }else if(casos[actual_caso].id==2){
                getE('volante').className = 'volante-normal'
                getE('cabina').className = 'cabina-normal'
            }else if(casos[actual_caso].id==3){
                getE('ojos').className = 'ojos-off'
                getE('cabina').className = 'cabina-normal'
                bostezo_mp3.pause()
            }else if(casos[actual_caso].id==4){
                getE('celular').className = 'celular-off'
                celular_mp3.pause()
            }else if(casos[actual_caso].id==5){
                getE('peatones').className = 'peatones-off'
            }
            
            getE('modal-title').innerHTML = casos[actual_caso].title
            getE('modal-subtitle').innerHTML = casos[actual_caso].subtitle
            getE('modal-text').innerHTML = casos[actual_caso].text
            getE('modal-boton-siguiente').className = 'boton-grid-show'
            getE('modal-boton-repetir').className = 'boton-grid-hide'
            getE('modal').className = 'modal-on'

            getE('boton-grid-'+casos[actual_caso].id).className = 'active'
            casos[i].visto = true

            getE('botones-container').className = 'botones-container-off'
        },500)
    }else{
        stopAnimation(0,true)
        playAnimation(0,null,0,false,null,70)
        getE('carretera').removeAttribute('class')
        getE('cabina').className = 'cabina-wrong'
        getE('volante').className = 'volante-wrong'
        getE('mapa-img').className = 'mapa-wrong'
        getE('aguja').className = 'aguja-wrong'
        getE('ojos').className = 'ojos-off'
        getE('celular').className = 'celular-off'
        getE('peatones').className = 'peatones-off'
        
        getE('botones-container').className = 'botones-container-off'
        car_mp3.pause()
        bostezo_mp3.pause()
        celular_mp3.pause()
        freno_mp3.play()

        animacion_modal = setTimeout(function(){
            clearTimeout(animacion_modal)
            animacion_modal = null;

            getE('modal-title').innerHTML = 'Respuesta Incorrecta'
            getE('modal-subtitle').innerHTML = 'No seleccionaste la opción correcta'
            getE('modal-text').innerHTML = 'Volvamos a intentarlo'
            getE('modal-boton-repetir').className = 'boton-grid-show'
            getE('modal-boton-siguiente').className = 'boton-grid-hide'
            getE('modal').className = 'modal-on'
        },1000)
    }
}

var animacion_modal = null;
function clickContinuar(){
    getE('modal').className = 'modal-off'
    //parar locucion
    animacion_modal = setTimeout(function(){
        clearTimeout(animacion_modal)
        animacion_modal = null;

        underground_mp3.volume = 1
        animacion_comenzar = setTimeout(function(){
            clearTimeout(animacion_comenzar)
            animacion_comenzar = null

            actual_caso_ind++;
            setCaso()
        },3000)
    },1000)
    click_mp3.play()
}

function clickRepetir(){
    getE('modal').className = 'modal-off'
    getE('cortina').className = 'cortina-on'
    animacion_cortina = setTimeout(function(){
        clearTimeout(animacion_cortina)
        animacion_cortina = null
        actual_caso_ind = 0;

        getE('carretera').removeAttribute('class')
        getE('cabina').className = 'cabina-normal'
        getE('volante').className = 'volante-normal'
        getE('mapa-img').className = 'mapa-normal'
        getE('aguja').className = 'aguja-normal'
        getE('ojos').className = 'ojos-off'
        getE('celular').className = 'celular-off'
        getE('peatones').className = 'peatones-off'

        //reiniciar botones contenedor
        for(i = 0;i<casos.length;i++){
            getE('boton-grid-'+casos[i].id).removeAttribute('class')
            casos[i].visto = false
        }
        getE('cortina').className = 'cortina-off'

    },1000)
}