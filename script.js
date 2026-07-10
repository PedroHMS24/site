/*=========================================================
    RENZO 16 ANOS
    SCRIPT.JS - PARTE 1
=========================================================*/

"use strict";

/*=========================================================
                ELEMENTOS
=========================================================*/

const countdown = document.querySelector(".countdown");
const countNumber = document.querySelector(".count-number");

const hero = document.querySelector(".hero");

const startButton = document.querySelector(".start-btn");

const video = document.querySelector("video");

const overlay = document.querySelector(".video-overlay");

const progressBar = document.querySelector(".video-progress span");

const finalScreen = document.querySelector(".final-screen");

const restartButton = document.querySelector(".restart");

/*=========================================================
            CONFIGURAÇÕES
=========================================================*/

const COUNTDOWN_TIME = 5;

let countdownValue = COUNTDOWN_TIME;

let started = false;

/*=========================================================
            CONTAGEM REGRESSIVA
=========================================================*/

function startCountdown(){

    countNumber.textContent = countdownValue;

    const timer = setInterval(()=>{

        countdownValue--;

        if(countdownValue > 0){

            countNumber.textContent = countdownValue;

        }

        if(countdownValue === 0){

            countNumber.textContent = "🎉";

            clearInterval(timer);

            launchConfetti();

            setTimeout(hideCountdown,1000);

        }

    },1000);

}

function hideCountdown(){

    countdown.style.opacity="0";

    countdown.style.pointerEvents="none";

    setTimeout(()=>{

        countdown.style.display="none";

    },900);

}

/*=========================================================
            CONFETES
=========================================================*/

function launchConfetti(){

    if(typeof confetti !== "function") return;

    confetti({

        particleCount:200,

        spread:160,

        origin:{y:.65}

    });

}

/*=========================================================
            COMEÇAR HISTÓRIA
=========================================================*/

function startMovie(){

    if(started) return;

    started=true;

    hero.style.transition=".8s";

    hero.style.opacity="0";

    hero.style.transform="translate(-50%,-60%)";

    setTimeout(()=>{

        hero.style.display="none";

    },800);

    video.muted=false;

    video.play();

}

startButton?.addEventListener("click",startMovie);

/*=========================================================
        PROGRESSO DO VÍDEO
=========================================================*/

video?.addEventListener("timeupdate",()=>{

    const progress =
        (video.currentTime/video.duration)*100;

    if(progressBar){

        progressBar.style.width = progress+"%";

    }

});

/*=========================================================
            FIM DO VÍDEO
=========================================================*/

video?.addEventListener("ended",()=>{

    launchConfetti();

    finalScreen.classList.add("active");

});

/*=========================================================
            RECOMEÇAR
=========================================================*/

restartButton?.addEventListener("click",()=>{

    location.reload();

});

/*=========================================================
            TECLADO
=========================================================*/

document.addEventListener("keydown",(e)=>{

    switch(e.code){

        case "Space":

            e.preventDefault();

            if(video.paused){

                video.play();

            }else{

                video.pause();

            }

        break;

        case "ArrowRight":

            video.currentTime += 5;

        break;

        case "ArrowLeft":

            video.currentTime -= 5;

        break;

        case "KeyF":

            if(!document.fullscreenElement){

                document.documentElement.requestFullscreen();

            }else{

                document.exitFullscreen();

            }

        break;

    }

});

/*=========================================================
            VOLUME
=========================================================*/

document.addEventListener("wheel",(e)=>{

    if(e.deltaY<0){

        video.volume=Math.min(video.volume+.05,1);

    }else{

        video.volume=Math.max(video.volume-.05,0);

    }

});

/*=========================================================
            MÚSICA (OPCIONAL)
=========================================================*/

// const music = new Audio("audio/musica.mp3");
// music.loop = true;
// music.volume = .3;

/*=========================================================
            INICIAR
=========================================================*/

window.addEventListener("load",()=>{

    startCountdown();

});

console.log("RENZO 16 ANOS - Parte 1 carregada.");
/*=========================================================
                CARROSSEL PREMIUM
=========================================================*/

const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carousel-track");

const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let animationID;

const AUTO_SPEED = 0.6;

let autoMove = true;

/*=========================================================
            DUPLICA AS FOTOS
=========================================================*/

function duplicateItems(){

    if(!track) return;

    const items = [...track.children];

    items.forEach(item=>{

        const clone = item.cloneNode(true);

        track.appendChild(clone);

    });

}

duplicateItems();

/*=========================================================
            LOOP AUTOMÁTICO
=========================================================*/

function autoCarousel(){

    if(!autoMove) return;

    currentTranslate -= AUTO_SPEED;

    const limit = track.scrollWidth/2;

    if(Math.abs(currentTranslate)>=limit){

        currentTranslate=0;

    }

    track.style.transform=`translateX(${currentTranslate}px)`;

    animationID=requestAnimationFrame(autoCarousel);

}

requestAnimationFrame(autoCarousel);

/*=========================================================
                PAUSAR
=========================================================*/

carousel?.addEventListener("mouseenter",()=>{

    autoMove=false;

});

carousel?.addEventListener("mouseleave",()=>{

    autoMove=true;

    cancelAnimationFrame(animationID);

    requestAnimationFrame(autoCarousel);

});

/*=========================================================
            BOTÕES
=========================================================*/

leftArrow?.addEventListener("click",()=>{

    currentTranslate+=350;

    track.style.transition=".4s";

    track.style.transform=`translateX(${currentTranslate}px)`;

});

rightArrow?.addEventListener("click",()=>{

    currentTranslate-=350;

    track.style.transition=".4s";

    track.style.transform=`translateX(${currentTranslate}px)`;

});

track?.addEventListener("transitionend",()=>{

    track.style.transition="none";

});

/*=========================================================
                DRAG
=========================================================*/

carousel?.addEventListener("mousedown",dragStart);
carousel?.addEventListener("mouseup",dragEnd);
carousel?.addEventListener("mouseleave",dragEnd);
carousel?.addEventListener("mousemove",dragMove);

function dragStart(e){

    isDragging=true;

    autoMove=false;

    startX=e.pageX;

    previousTranslate=currentTranslate;

}

function dragMove(e){

    if(!isDragging) return;

    const current=e.pageX;

    const diff=current-startX;

    currentTranslate=previousTranslate+diff;

    track.style.transform=`translateX(${currentTranslate}px)`;

}

function dragEnd(){

    isDragging=false;

    autoMove=true;

}

/*=========================================================
                TOUCH
=========================================================*/

carousel?.addEventListener("touchstart",(e)=>{

    isDragging=true;

    autoMove=false;

    startX=e.touches[0].clientX;

    previousTranslate=currentTranslate;

});

carousel?.addEventListener("touchmove",(e)=>{

    if(!isDragging) return;

    const current=e.touches[0].clientX;

    const diff=current-startX;

    currentTranslate=previousTranslate+diff;

    track.style.transform=`translateX(${currentTranslate}px)`;

});

carousel?.addEventListener("touchend",()=>{

    isDragging=false;

    autoMove=true;

});

/*=========================================================
            CLIQUE NAS FOTOS
=========================================================*/

document.querySelectorAll(".photo img").forEach(img=>{

    img.addEventListener("click",()=>{

        const modal=document.querySelector(".modal");

        const modalImg=document.querySelector(".modal-content img");

        modal.classList.add("active");

        modalImg.src=img.src;

        video.pause();

    });

});

/*=========================================================
            FECHAR MODAL
=========================================================*/

document.querySelector(".modal-close")?.addEventListener("click",()=>{

    document.querySelector(".modal").classList.remove("active");

    video.play();

});

document.querySelector(".modal")?.addEventListener("click",(e)=>{

    if(e.target.classList.contains("modal")){

        document.querySelector(".modal").classList.remove("active");

        video.play();

    }

});

/*=========================================================
            ESC
=========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        document.querySelector(".modal")?.classList.remove("active");

        video.play();

    }

});

/*=========================================================
            HOVER NAS FOTOS
=========================================================*/

document.querySelectorAll(".photo").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        autoMove=false;

    });

    card.addEventListener("mouseleave",()=>{

        autoMove=true;

    });

});

console.log("Carrossel carregado!");
/*=========================================================
            PAINÉIS PREMIUM
=========================================================*/

const panels = document.querySelectorAll(".panel");
const menuCards = document.querySelectorAll(".menu-card");
const closeButtons = document.querySelectorAll(".close-panel");

/*=========================================================
            ABRIR PAINEL
=========================================================*/

function openPanel(id){

    const panel = document.getElementById(id);

    if(!panel) return;

    video.pause();

    panel.style.display = "flex";

    setTimeout(()=>{

        panel.classList.add("active");

    },20);

}

/*=========================================================
            FECHAR PAINEL
=========================================================*/

function closePanel(panel){

    panel.classList.remove("active");

    setTimeout(()=>{

        panel.style.display="none";

        if(started){

            video.play();

        }

    },400);

}

/*=========================================================
        MENU
=========================================================*/

menuCards.forEach(card=>{

    card.addEventListener("click",()=>{

        const panelName = card.dataset.panel;

        openPanel(panelName);

    });

});

/*=========================================================
        BOTÕES FECHAR
=========================================================*/

closeButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        closePanel(btn.closest(".panel"));

    });

});

/*=========================================================
        CLICOU FORA
=========================================================*/

panels.forEach(panel=>{

    panel.addEventListener("click",(e)=>{

        if(e.target===panel){

            closePanel(panel);

        }

    });

});

/*=========================================================
            ESC
=========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        panels.forEach(panel=>{

            if(panel.classList.contains("active")){

                closePanel(panel);

            }

        });

    }

});

/*=========================================================
        ANIMAÇÃO DOS CARDS
=========================================================*/

menuCards.forEach((card,index)=>{

    card.style.opacity="0";
    card.style.transform="translateY(40px)";

    setTimeout(()=>{

        card.style.transition=".6s ease";

        card.style.opacity="1";
        card.style.transform="translateY(0px)";

    },120*index);

});

/*=========================================================
        EFEITO 3D
=========================================================*/

menuCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x/rect.width)-0.5)*18;
        const rotateX = ((y/rect.height)-0.5)*-18;

        card.style.transform=
        `perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale(1.04)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="perspective(900px) rotateX(0deg) rotateY(0deg)";

    });

});

/*=========================================================
            CONTADOR DE FOTOS
=========================================================*/

const totalPhotos = document.querySelectorAll(".photo").length;

const photoCounter = document.querySelector("#photoCounter");

if(photoCounter){

    photoCounter.innerHTML = totalPhotos;

}

/*=========================================================
        SLIDESHOW AUTOMÁTICO
=========================================================*/

let slideShow = null;

function startSlideshow(){

    const images = document.querySelectorAll(".photo img");

    let current = 0;

    slideShow = setInterval(()=>{

        images[current].click();

        current++;

        if(current>=images.length){

            current=0;

        }

    },5000);

}

function stopSlideshow(){

    clearInterval(slideShow);

}

/*=========================================================
            TOOLTIP
=========================================================*/

document.querySelectorAll("[data-tooltip]").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        const tooltip = document.createElement("div");

        tooltip.className="tooltip";

        tooltip.innerHTML=item.dataset.tooltip;

        document.body.appendChild(tooltip);

        const rect=item.getBoundingClientRect();

        tooltip.style.left=rect.left+"px";

        tooltip.style.top=(rect.top-40)+"px";

        item.tooltip=tooltip;

    });

    item.addEventListener("mouseleave",()=>{

        if(item.tooltip){

            item.tooltip.remove();

        }

    });

});

/*=========================================================
        MENSAGEM FINAL
=========================================================*/

function showFinalMessage(){

    finalScreen.classList.add("active");

    launchConfetti();

}

video.addEventListener("ended",showFinalMessage);

console.log("Painéis Premium carregados!");