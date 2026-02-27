var i = 0;
var j = 0;

function getRand(minimum,maximum){
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomnumber;
}

function getE(idname){
    return document.getElementById(idname)
}

var casos = [
    {
        id:1,
        nombre:'Exceso de velocidad',
        correct:1,
        visto:false,
        title:'FRENOS ACTIVADOS - VELOCIDAD ESTABILIZADA',
        subtitle:'Programa de gestión de la velocidad segura.',
        text:'El programa tiene como objetivo educar y concientizar a los conductores y operadores sobre la importancia que tiene el cumplir con las normas de tránsito vigentes, de tal forma que se logre reducir los índices de accidentalidad e infracciones.'
    },{
        id:2,
        nombre:'Visión adulterada',
        correct:4,
        visto:false,
        title:'PRUEBA REALIZADA - CONDUCTOR REEMPLAZADO',
        subtitle:'Programa de cero tolerancia a la conducción bajo los efectos del alcohol y sustancias psicoactivas.',
        text:'Contempla el seguimiento y medición a los trabajadores que conduzcan algún tipo de transporte para el desarrollo y cumplimiento de las actividades misionales de la entidad.'
    },{
        id:3,
        nombre:'Alerta de sueño',
        correct:2,
        visto:false,
        title:'PAUSA ACTIVA INICIADA - ALERTA RECUPERADA',
        subtitle:'Programa de prevención de la fatiga.',
        text:'Consiste en establecer medidas preventivas contra la fatiga laboral para los operadores.'
    },{
        id:4,
        nombre:'Llamada entrante',
        correct:3,
        visto:false,
        title:'DISPOSITIVO BLOQUEADO - ATENCIÓN RESTAURADA',
        subtitle:'Programa de prevención de la distracción.',
        text:'Contempla la sensibilización y herramientas que reduzcan el riesgo de distracción de cada uno de los actores viales.'
    },{
        id:5,
        nombre:'Peatones en la vía',
        correct:5,
        visto:false,
        title:'PRIORIDAD DE PASO OTORGADA - ZONA SEGURA',
        subtitle:'Programa para la protección de actores viales vulnerables.',
        text:'Contempla el diagnóstico y análisis de cada uno de los actores viales vinculados a la Secretaría Distrital de Integración Social.'
    }
]

function overBtn(){
    over_mp3.play()
}

var ancho_fondo = 0;
var alto_fondo = 0;

function setFondo(){
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
}

var nubes_animacion = []
var total_nubes = 2;

function nubeRepetida(nu){
    var nube_r = false
    for(j = 0;j<nubes_animacion.length;j++){
        if(nubes_animacion[j]==nu){
            nube_r = true
        }
    }
    return nube_r
}

function setNubes(){
    while(nubes_animacion.length<total_nubes){
        var n = getRand(1,total_nubes)
        var nr = nubeRepetida(n)
        if(!nr){
            nubes_animacion.push(n)
        }
    }

    for(i = 0;i<nubes_animacion.length;i++){
        getE('nube-'+nubes_animacion[i]).style.top = String(getRand(0,40))+'%'
        getE('nube-'+nubes_animacion[i]).style.transform = 'translateX('+getRand(0,70)+'%)'
        getE('nube-'+nubes_animacion[i]).className = 'nube animacion-nube-'+getRand(1,5)
    }
}

/****************************/
var actual_caso = 0;
var animacion_nombre = null;
var animacion_cortina = null;

function startGame(){
    getE('cortina').className = 'cortina-on'
    animacion_cortina = setTimeout(function(){
        clearTimeout(animacion_cortina)
        animacion_cortina = null

        getE('cortina').className = 'cortina-off'

        getE('instruccion-txt').innerHTML = casos[actual_caso].nombre
        getE('instruccion').className = 'instruccion-on'
    
        if(actual_caso==0){
            stopAnimation(0,true)
            playAnimation(0,null,-1,false,null,50)
            getE('carretera').className = 'carretera-velocidad'
            getE('volante').className = 'volante-velocidad'
            getE('mapa-img').className = 'mapa-velocidad'
            getE('aguja').className = 'aguja-velocidad'
        }else if(actual_caso==1){
    
        }
        
        animacion_nombre = setTimeout(function(){
            clearTimeout(animacion_nombre)
            animacion_nombre = null
    
            getE('botones-container').className = 'botones-container-on'
        },2000)
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

            //volver a la normalidad
            if(actual_caso==0){
                stopAnimation(0,true)
                playAnimation(0,null,-1)
                getE('carretera').removeAttribute('class')
                getE('volante').className = 'volante-normal'
                getE('mapa-img').className = 'mapa-normal'
                getE('aguja').className = 'aguja-normal'
            }
            
            getE('modal-title').innerHTML = casos[actual_caso].title
            getE('modal-subtitle').innerHTML = casos[actual_caso].subtitle
            getE('modal-text').innerHTML = casos[actual_caso].text
            getE('modal').className = 'modal-on'

            getE('botones-container').className = 'botones-container-off'
        },500)
    }else{
        stopAnimation(0,true)
        playAnimation(0,null,0,false,null,70)
        getE('cabina').className = 'cabina-wrong'
        getE('carretera').removeAttribute('class')
        getE('volante').className = 'volante-wrong'
        getE('mapa-img').className = 'mapa-wrong'
        getE('aguja').className = 'aguja-wrong'
    }
}