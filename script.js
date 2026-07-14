    //==========================================================
// RENZO • 16 ANOS
// SCRIPT.JS
// PARTE 1
// DADOS • ELEMENTOS • VARIÁVEIS
//==========================================================



//==========================================================
// DADOS DAS FOTOS
//==========================================================

const photoTabs = [

    {
        id: "destaques",
        label: "Destaques",

        items: [
            { title:"2018", sub:"10 anos", img:"public/destaques/8.jpeg" },
            { title:"2019", sub:"10 anos", img:"public/destaques/7.jpg" },
            { title:"2020", sub:"10 anos", img:"public/destaques/1.jpg" },
            { title:"2021", sub:"11 anos", img:"public/destaques/2.jpg" },
            { title:"2022", sub:"12 anos", img:"public/destaques/3.jpg" },
            { title:"2023", sub:"13 anos", img:"public/destaques/4.jpg" },
            { title:"2024", sub:"14 anos", img:"public/destaques/5.jpg" },
            { title:"2025", sub:"15 anos", img:"public/destaques/6.jpg" }

        ]

    },

    {

        id:"aventuras",

        label:"Aventuras",

        items:[

            { title:"Viagens", sub:"Novos Lugares", img:"public/aventura/1.jpg" },
            { title:"Jiu-Jitsu", sub:"Tatame", img:"public/aventura/2.jpg" },
            { title:"Praia", sub:"Verão", img:"public/aventura/3.jpg" },
            { title:"Eventos", sub:"Diversão", img:"public/aventura/4.jpg" },
            { title:"Natureza", sub:"Trilhas", img:"public/aventura/5.jpg" },
            { title:"Games", sub:"Momentos", img:"public/aventura/6.jpg" }

        ]

    },

    {

        id:"familia",

        label:"Amigos & Família",

        items:[

            { title:"Família", sub:"Sempre Juntos", img:"public/amigos/1.jpg" },
            { title:"Amigos", sub:"Parceiros", img:"public/amigos/2.jpg" },
            { title:"Festas", sub:"Momentos", img:"public/amigos/3.jpg" },
            { title:"Escola", sub:"Turma", img:"public/amigos/4.jpg" },
            { title:"Resenha", sub:"Diversão", img:"public/amigos/5.jpg" },
            { title:"Lembranças", sub:"Inesquecíveis", img:"public/amigos/6.jpg" }

        ]

    }

];


const achievements=[


{
    title:"EP.01",
    year:"",
    time:"",
    category:"",
    img:"public/episodios/coming-soon.png",
    text:""
},

{
    title:"EP.02",
    year:"",
    time:"",
    category:"",
    img:"public/episodios/coming-soon.png",
    text:""
},

{
    title:"EP.03",
    year:"",
    time:"",
    category:"",
    img:"public/episodios/coming-soon.png",
    text:""
},

{
    title:"EP.04",
    year:"",
    time:"",
    category:"",
    img:"public/episodios/coming-soon.png",
    text:""
},

{
    title:"16 Anos",
    year:"2026",
    time:"Especial",
    category:"Aniversário",
    img:"public/episodios/ep05/01.jpeg",
    text:"O melhor episódio até agora."
}

];




//==========================================================
// ELEMENTOS HTML
//==========================================================

const startScreen=document.getElementById("startScreen");

const startBtn=document.getElementById("startBtn");

const countdown=document.getElementById("countdown");

const countNumber=document.getElementById("countNumber");


const reveal=document.getElementById("reveal");

const app=document.getElementById("app");

const navbar=document.getElementById("navbar");

const replayBtn=document.getElementById("replayBtn");

const soundToggle=document.getElementById("soundToggle");

const bgMusic=document.getElementById("bgMusic");



//==========================================================
// FOTO
//==========================================================

const photoTabsContainer=document.getElementById("photoTabs");

const photoRow=document.getElementById("photoRow");

const achRow=document.getElementById("achRow");



//==========================================================
// MODAL
//==========================================================

const photoModal=document.getElementById("photoModal");

const modalImage=document.getElementById("modalImage");

const modalTitle=document.getElementById("modalTitle");

const modalSubtitle=document.getElementById("modalSubtitle");

const modalYear=document.getElementById("modalYear");

const modalThumbs=document.getElementById("modalThumbs");

const detailCategory=document.getElementById("detailCategory");

const detailYear=document.getElementById("detailYear");

const closePhoto=document.getElementById("closePhoto");

const prevPhoto=document.getElementById("prevPhoto");

const nextPhoto=document.getElementById("nextPhoto");

const playPhoto=document.getElementById("playPhoto");

const favoritePhoto=document.getElementById("favoritePhoto");

const sharePhoto=document.getElementById("sharePhoto");



//==========================================================
// VARIÁVEIS GLOBAIS
//==========================================================

let currentTab=0;

let currentPhoto=0;

let appLoaded=false;

let soundOn=true;

let audioCtx=null;

let touchStartX=0;

let currentepisode = 0;


//==========================================================
// PRELOAD DAS IMAGENS
//==========================================================

photoTabs.forEach(tab=>{

    tab.items.forEach(item=>{

        const img=new Image();

        img.src=item.img;

    });

});



//==========================================================
// LOG
//==========================================================

console.log("PARTE 1 OK");

//==========================================================
// PARTE 2
// ÁUDIO • INTRO • COUNTDOWN • REVEAL
//==========================================================



//==========================================================
// ÁUDIO
//==========================================================

function initAudio(){

    if(audioCtx) return;

    audioCtx=new(
        window.AudioContext||
        window.webkitAudioContext
    )();

}



function playBeep(

    freq=500,
    duration=.12,
    type="sine",
    volume=.15

){

    if(!soundOn) return;

    if(!audioCtx) return;

    const osc=audioCtx.createOscillator();

    const gain=audioCtx.createGain();

    osc.type=type;

    osc.frequency.value=freq;

    gain.gain.setValueAtTime(
        0,
        audioCtx.currentTime
    );

    gain.gain.linearRampToValueAtTime(

        volume,

        audioCtx.currentTime+.01

    );

    gain.gain.exponentialRampToValueAtTime(

        .001,

        audioCtx.currentTime+duration

    );

    osc.connect(gain);

    gain.connect(audioCtx.destination);

    osc.start();

    osc.stop(audioCtx.currentTime+duration);

}



//==========================================================
// TUDUM
//==========================================================

function playTudum(){

    playBeep(

        73,

        .22,

        "sine",

        .35

    );

    setTimeout(()=>{

        playBeep(

            98,

            .45,

            "sine",

            .35

        );

    },180);

}


//==========================================================
// START EXPERIENCE
//==========================================================

function startExperience(){

    initAudio();

    if(audioCtx && audioCtx.state==="suspended"){
        audioCtx.resume();
    }

    if(bgMusic){

        bgMusic.pause();
        bgMusic.currentTime = 0;
        bgMusic.volume = 0.35;

        bgMusic.play().catch(err=>{
            console.log(err);
        });

    }

    startScreen.classList.add("hidden");

    reveal.classList.remove("hidden");

    playTudum();

    setTimeout(showApp,2500);

}



//==========================================================
// REVEAL
//==========================================================

function showReveal(){

    countdown.classList.add("hidden");

    reveal.classList.remove("hidden");

    playTudum();

    setTimeout(showApp,2500);

}



//==========================================================
// APP
//==========================================================

function showApp(){

    reveal.classList.add("hidden");

    app.classList.remove("hidden");

    window.scrollTo({

        top:0,

        behavior:"instant"

    });

    if(!appLoaded){

        buildApp();

        appLoaded=true;

    }

}


//==========================================================
// REPLAY
//==========================================================

function replayExperience(){

    app.classList.add("hidden");

    reveal.classList.add("hidden");

    countdown.classList.add("hidden");

    startScreen.classList.remove("hidden");



    window.scrollTo({

        top:0,

        behavior:"instant"

    });

}



//==========================================================
// SOM
//==========================================================

function toggleSound(){

    soundOn=!soundOn;

    soundToggle.classList.toggle(

        "muted",

        !soundOn

    );

    soundToggle.querySelector(

        ".sound-icon"

    ).textContent=

    soundOn?"♪":"✕";

    if(bgMusic){

        bgMusic.muted=!soundOn;

    }

}



//==========================================================
// LOG
//==========================================================

console.log("PARTE 2 OK");

//==========================================================
// PARTE 3
// GALERIA • CONQUISTAS • NAVEGAÇÃO
//==========================================================



//==========================================================
// CONSTRÓI O SITE
//==========================================================

function buildApp(){

    buildPhotoTabs();

    renderPhotoRow();

    buildAchievements();

    initNavbar();

}



//==========================================================
// CARD HTML
//==========================================================

function cardHTML(photo,index){

    return `

    <div class="card" data-index="${index}">

        <img
            src="${photo.img}"
            alt="${photo.title}"
            loading="lazy">

        <div class="card-info">

            <span class="card-title">

                ${photo.title}

            </span>

            <span class="card-sub">

                ${photo.sub}

            </span>

        </div>

    </div>

    `;

}



//==========================================================
// ABAS
//==========================================================

function buildPhotoTabs(){

    photoTabsContainer.innerHTML=photoTabs.map((tab,index)=>`

        <button
            class="tab-btn ${index===0?"active":""}"
            data-index="${index}">

            ${tab.label}

        </button>

    `).join("");



    photoTabsContainer
    .querySelectorAll(".tab-btn")
    .forEach(btn=>{

        btn.onclick=()=>{

            currentTab=parseInt(btn.dataset.index);

            photoTabsContainer
            .querySelectorAll(".tab-btn")
            .forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            renderPhotoRow();

            playBeep(700,.05);

        };

    });

}



//==========================================================
// GALERIA
//==========================================================

function renderPhotoRow(){

    const photos=photoTabs[currentTab].items;

    photoRow.innerHTML=photos
    .map(cardHTML)
    .join("");



    const cards=photoRow.querySelectorAll(".card");



    cards.forEach((card,index)=>{

        const img=card.querySelector("img");



        img.onload = () => {

    const ratio = img.naturalWidth / img.naturalHeight;

    if (ratio < 0.85) {

        card.classList.add("vertical");

    } else if (ratio > 1.35) {

        card.classList.add("horizontal");

    } else {

        card.classList.add("square");

    }

};


        card.onclick=()=>{

            currentPhoto=index;

            openPhotoModal();

        };



        card.animate(

        [

        {

            opacity:0,

            transform:"translateY(40px)"

        },

        {

            opacity:1,

            transform:"translateY(0)"

        }

        ],

        {

            duration:500,

            delay:index*70,

            fill:"forwards"

        });

    });

}



function buildAchievements(){

    achRow.innerHTML = achievements.map((item,index)=>`

        <article class="episode-card" data-index="${index}">

            <div class="episode-poster">

                <img
                    src="${item.img}"
                    alt="${item.title}"
                    loading="lazy">

                <div class="episode-gradient"></div>

                <div class="episode-hover">

                    <button
                        class="episode-play"
                        data-index="${index}">

                        ▶ Assistir

                    </button>

                </div>

            </div>

            <div class="episode-body">

                <span class="episode-number">

                    EP. ${String(index+1).padStart(2,"0")}

                </span>

                <h3 class="episode-title">

                    ${item.title}

                </h3>

                <div class="episode-meta">

                    <span>${item.year}</span>

                    <span>•</span>

                    <span>${item.time}</span>

                </div>

                <p class="episode-description">

                    ${item.text}

                </p>

            </div>

        </article>

    `).join("");



    document
        .querySelectorAll(".episode-play")
        .forEach(btn=>{

            btn.addEventListener("click",()=>{

                openEpisode(index);

            });

        });

}



//==========================================================
// NAVBAR
//==========================================================

function initNavbar(){

    window.addEventListener("scroll",()=>{

        navbar.classList.toggle(

            "scrolled",

            window.scrollY>40

        );

    });



    document
    .querySelectorAll("[data-target]")
    .forEach(item=>{

        item.onclick=()=>{

            const section=document.getElementById(

                item.dataset.target

            );



            if(section){

                section.scrollIntoView({

                    behavior:"smooth"

                });

            }

        };

    });



    const observer=new IntersectionObserver(

    entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;



            document
            .querySelectorAll(".nav-links li")
            .forEach(li=>{

                li.classList.toggle(

                    "active",

                    li.dataset.target===entry.target.id

                );

            });

        });

    },

    {

        threshold:.55

    });



    [

        "banner",

        "fotos",

        "episodios",

        "mensagem"

    ].forEach(id=>{

        const section=document.getElementById(id);

        if(section){

            observer.observe(section);

        }

    });

}



//==========================================================
// LOG
//==========================================================

console.log("PARTE 3 OK");

function openEpisode(index){

    currentEpisode=index;

    const ep=achievements[index];

    modalImage.src=ep.img;

    modalTitle.textContent=ep.title;

    modalSubtitle.textContent=ep.text;

    modalYear.textContent=ep.year;

    if(detailCategory){

        detailCategory.textContent=ep.category;

    }

    if(detailYear){

        detailYear.textContent=ep.time;

    }

    photoModal.classList.remove("hidden");

    requestAnimationFrame(()=>{

        photoModal.classList.add("show");

    });

    document.body.style.overflow="hidden";

}

function nextEpisode(){

    currentEpisode++;

    if(currentEpisode>=achievements.length){

        currentEpisode=0;

    }function prevEpisode(){

    currentEpisode--;

    if(currentEpisode<0){

        currentEpisode=achievements.length-1;

    }

    openEpisode(currentEpisode);

}

    openEpisode(currentEpisode);

}





//==========================================================
// PARTE 4
// MODAL NETFLIX
//==========================================================



//==========================================================
// MINIATURAS
//==========================================================

function buildModalThumbs(){

    if(!modalThumbs) return;

    modalThumbs.innerHTML="";

    const photos=photoTabs[currentTab].items;

    photos.forEach((photo,index)=>{

        const thumb=document.createElement("div");

        thumb.className="thumb";

        if(index===currentPhoto){

            thumb.classList.add("active");

        }

        thumb.innerHTML=`
            <img
                src="${photo.img}"
                alt="${photo.title}">
        `;

        thumb.onclick=()=>{

            currentPhoto=index;

            updateModal();

        };

        modalThumbs.appendChild(thumb);

    });

}



//==========================================================
// ATUALIZA O MODAL
//==========================================================

function updateModal(){

    const photo=photoTabs[currentTab].items[currentPhoto];

    modalImage.animate(

    [

        {

            opacity:.3,

            transform:"scale(.96)"

        },

        {

            opacity:1,

            transform:"scale(1)"

        }

    ],

    {

        duration:250,

        easing:"ease"

    });

    modalImage.src=photo.img;

    modalTitle.textContent=photo.title;

    modalSubtitle.textContent=photo.sub;

    modalYear.textContent=photo.title;

    if(detailCategory){

        detailCategory.textContent=

        photoTabs[currentTab].label;

    }

    if(detailYear){

        detailYear.textContent=

        photo.title;

    }

    buildModalThumbs();

}



//==========================================================
// ABRIR
//==========================================================

function openPhotoModal(){

    updateModal();

    photoModal.classList.remove("hidden");

    requestAnimationFrame(()=>{

        photoModal.classList.add("show");

    });

    document.body.style.overflow="hidden";

}



//==========================================================
// FECHAR
//==========================================================

function closePhotoModal(){

    photoModal.classList.remove("show");

    setTimeout(()=>{

        photoModal.classList.add("hidden");

        document.body.style.overflow="";

    },250);

}



//==========================================================
// PRÓXIMA FOTO
//==========================================================

function nextPhotoModal(){

    currentPhoto++;

    if(currentPhoto>=photoTabs[currentTab].items.length){

        currentPhoto=0;

    }

    updateModal();

}



//==========================================================
// FOTO ANTERIOR
//==========================================================

function prevPhotoModal(){

    currentPhoto--;

    if(currentPhoto<0){

        currentPhoto=

        photoTabs[currentTab].items.length-1;

    }

    updateModal();

}



//==========================================================
// EVENTOS DO MODAL
//==========================================================

if(closePhoto){

    closePhoto.onclick=closePhotoModal;

}

if(nextPhoto){

    nextPhoto.onclick=nextPhotoModal;

}

if(prevPhoto){

    prevPhoto.onclick=prevPhotoModal;

}



//==========================================================
// FECHAR AO CLICAR FORA
//==========================================================

photoModal.addEventListener("click",(e)=>{

    if(

        e.target===photoModal ||

        e.target.classList.contains("photo-overlay")

    ){

        closePhotoModal();

    }

});



//==========================================================
// TECLADO
//==========================================================

document.addEventListener("keydown",(e)=>{

    if(photoModal.classList.contains("hidden")) return;

    switch(e.key){

        case"Escape":

            closePhotoModal();

        break;

        case"ArrowRight":

            nextPhotoModal();

        break;

        case"ArrowLeft":

            prevPhotoModal();

        break;

    }

});



//==========================================================
// SWIPE
//==========================================================

photoModal.addEventListener("touchstart",(e)=>{

    touchStartX=e.changedTouches[0].clientX;

});



photoModal.addEventListener("touchend",(e)=>{

    const dist=

    e.changedTouches[0].clientX-touchStartX;

    if(dist>60){

        prevPhotoModal();

    }

    if(dist<-60){

        nextPhotoModal();

    }

});



//==========================================================
// BOTÃO PLAY
//==========================================================

if(playPhoto){

    playPhoto.onclick=()=>{

        alert("Aqui futuramente poderá abrir um vídeo dessa lembrança.");

    };

}



//==========================================================
// FAVORITO
//==========================================================

if(favoritePhoto){

    favoritePhoto.onclick=()=>{

        favoritePhoto.classList.toggle("liked");

    };

}



//==========================================================
// COMPARTILHAR
//==========================================================

if(sharePhoto){

    sharePhoto.onclick=()=>{

        if(navigator.share){

            navigator.share({

                title:modalTitle.textContent,

                text:modalSubtitle.textContent

            });

        }

    };

}



//==========================================================
// LOG
//==========================================================

console.log("PARTE 4 OK");


//==========================================================
// PARTE 5
// ANIMAÇÕES • HERO • EVENTOS • INICIALIZAÇÃO
//==========================================================



//==========================================================
// HERO KEN BURNS
//==========================================================

function heroAnimation(){

    const hero=document.querySelector(".banner");

    if(!hero) return;

    hero.animate(

    [

        {

            transform:"scale(1.08)"

        },

        {

            transform:"scale(1)"

        }

    ],

    {

        duration:18000,

        easing:"ease-out",

        fill:"forwards"

    });

}




//==========================================================
// PARALLAX HERO
//==========================================================

document.addEventListener("mousemove",(e)=>{

    const hero=document.querySelector(".banner");

    if(!hero) return;

    const x=(e.clientX/window.innerWidth-.5)*15;

    const y=(e.clientY/window.innerHeight-.5)*15;

    hero.style.backgroundPosition=

        `calc(50% + ${x}px) calc(50% + ${y}px)`;

});



//==========================================================
// ANIMAÇÃO DAS SEÇÕES
//==========================================================

const revealObserver=new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        entry.target.animate(

        [

            {

                opacity:0,

                transform:"translateY(50px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],

        {

            duration:700,

            fill:"forwards"

        });

    });

},

{

threshold:.15

}

);



document.querySelectorAll(

".row-section,.message-section"

).forEach(sec=>{

    revealObserver.observe(sec);

});



//==========================================================
// HOVER BOTÕES
//==========================================================

document.querySelectorAll(".nf-btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        playBeep(

            900,

            .05,

            "sine",

            .08

        );

    });

});



//==========================================================
// HERO TEXTO
//==========================================================

window.addEventListener("load",()=>{

    const heroItems=document.querySelectorAll(

        ".banner-badge,.banner-title,.banner-meta,.banner-desc,.banner-btns"

    );



    heroItems.forEach((item,index)=>{

        item.animate(

        [

            {

                opacity:0,

                transform:"translateY(35px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],

        {

            duration:700,

            delay:index*180,

            fill:"forwards"

        });

    });

});



//==========================================================
// EVENTOS
//==========================================================

if(startBtn){

    startBtn.addEventListener(

        "click",

        startExperience

    );

}



if(replayBtn){

    replayBtn.addEventListener(

        "click",

        replayExperience

    );

}



if(soundToggle){

    soundToggle.addEventListener(

        "click",

        toggleSound

    );

}



//==========================================================
// HERO
//==========================================================

heroAnimation();



//==========================================================
// LOG
//==========================================================

console.log("RENZO • SCRIPT COMPLETO");

//==========================================================
// PARTE 6
// RECURSOS PREMIUM
//==========================================================



//==========================================================
// FAVORITOS
//==========================================================

const favorites=new Set(

JSON.parse(

localStorage.getItem("renzoFavorites")||"[]"

)

);

function saveFavorites(){

localStorage.setItem(

"renzoFavorites",

JSON.stringify([...favorites])

);

}

function updateFavoriteButton(){

if(!favoritePhoto) return;

const key=currentTab+"-"+currentPhoto;

favoritePhoto.classList.toggle(

"liked",

favorites.has(key)

);

}

if(favoritePhoto){

favoritePhoto.addEventListener("click",()=>{

const key=currentTab+"-"+currentPhoto;

if(favorites.has(key)){

favorites.delete(key);

}else{

favorites.add(key);

}

saveFavorites();

updateFavoriteButton();

});

}



//==========================================================
// SLIDESHOW
//==========================================================

let slideshow=null;

function startSlideshow(){

stopSlideshow();

slideshow=setInterval(()=>{

nextPhotoModal();

},3500);

}

function stopSlideshow(){

if(slideshow){

clearInterval(slideshow);

slideshow=null;

}

}



//==========================================================
// PLAY
//==========================================================

if(playPhoto){

playPhoto.onclick=()=>{

if(slideshow){

stopSlideshow();

playPhoto.innerHTML="▶";

}else{

startSlideshow();

playPhoto.innerHTML="❚❚";

}

};

}



//==========================================================
// ESPAÇO = PLAY
//==========================================================

document.addEventListener("keydown",(e)=>{

if(photoModal.classList.contains("hidden"))

return;

if(e.code==="Space"){

e.preventDefault();

playPhoto.click();

}

});



//==========================================================
// PROGRESSO
//==========================================================

const progress=document.createElement("div");

progress.className="photo-progress";

if(photoModal){

photoModal.appendChild(progress);

}

function animateProgress(){

progress.animate(

[

{width:"0%"},

{width:"100%"}

],

{

duration:3500,

fill:"forwards"

}

);

}



//==========================================================
// ALTERAÇÃO FOTO
//==========================================================

const oldUpdateModal=updateModal;

updateModal=function(){

oldUpdateModal();

updateFavoriteButton();

animateProgress();

}



//==========================================================
// CONFETE
//==========================================================

function birthdayConfetti(){

for(let i=0;i<40;i++){

const c=document.createElement("div");

c.className="confetti";

c.style.left=Math.random()*100+"vw";

c.style.animationDelay=Math.random()*2+"s";

c.style.animationDuration=

3+Math.random()*2+"s";

document.body.appendChild(c);

setTimeout(()=>{

c.remove();

},5000);

}

}



//==========================================================
// UMA ÚNICA VEZ
//==========================================================

window.addEventListener("load",()=>{

setTimeout(()=>{

birthdayConfetti();

},1200);

});



//==========================================================
// LOG
//==========================================================

console.log("PARTE 6 OK");


//==========================================================
// PARTE 7
// EXPERIÊNCIA PREMIUM
//==========================================================



//==========================================================
// SALVAR ÚLTIMA ABA
//==========================================================

function saveCurrentTab(){

    localStorage.setItem(

        "renzoTab",

        currentTab

    );

}

function loadCurrentTab(){

    const saved=

    parseInt(

        localStorage.getItem("renzoTab")

    );

    if(!isNaN(saved)){

        currentTab=saved;

    }

}



//==========================================================
// SOBRESCREVE BUILDAPP
//==========================================================

const oldBuildApp=buildApp;

buildApp=function(){

    loadCurrentTab();

    oldBuildApp();

}



//==========================================================
// TROCA DE ABA
//==========================================================

const oldRenderPhotoRow=renderPhotoRow;

renderPhotoRow=function(){

    saveCurrentTab();

    oldRenderPhotoRow();

}



//==========================================================
// BOTÃO TOPO
//==========================================================

const backTop=document.createElement("button");

backTop.className="back-top";

backTop.innerHTML="▲";

document.body.appendChild(backTop);

backTop.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

window.addEventListener("scroll",()=>{

backTop.classList.toggle(

"show",

window.scrollY>500

);

});



//==========================================================
// ZOOM FOTO
//==========================================================

let zoom=false;

if(modalImage){

modalImage.addEventListener("click",()=>{

zoom=!zoom;

modalImage.style.transform=

zoom?

"scale(1.7)":

"scale(1)";

modalImage.style.cursor=

zoom?

"zoom-out":

"zoom-in";

});

}



//==========================================================
// TECLAS
//==========================================================

document.addEventListener("keydown",(e)=>{

switch(e.key){

case"Home":

window.scrollTo({

top:0,

behavior:"smooth"

});

break;

case"End":

window.scrollTo({

top:document.body.scrollHeight,

behavior:"smooth"

});

break;

}

});

document.addEventListener("touchend",function(e){

    const now=Date.now();

    if(now-this.lastTouch<=300){

        e.preventDefault();

    }

    this.lastTouch=now;

},{passive:false});

//==========================================================
// FADE DA MÚSICA
//==========================================================

function fadeMusic(target){

if(!bgMusic) return;

const interval=setInterval(()=>{

if(Math.abs(bgMusic.volume-target)<0.02){

bgMusic.volume=target;

clearInterval(interval);

return;

}

bgMusic.volume+=

target>bgMusic.volume?

0.02:-0.02;

},40);

}



//==========================================================
// MODAL
//==========================================================

const oldOpen=openPhotoModal;

openPhotoModal=function(){

fadeMusic(.18);

oldOpen();

};

const oldClose=closePhotoModal;

closePhotoModal=function(){

fadeMusic(.35);

oldClose();

};



//==========================================================
// LOADING FOTO
//==========================================================

if(modalImage){

modalImage.addEventListener("load",()=>{

modalImage.classList.add("loaded");

});

}



//==========================================================
// PARALLAX HERO
//==========================================================

window.addEventListener("scroll",()=>{

const hero=document.querySelector(".banner");

if(!hero) return;

hero.style.backgroundPositionY=

window.scrollY*.35+"px";

});



//==========================================================
// AUTOFOCUS NAVBAR
//==========================================================

const navItems=document.querySelectorAll(

".nav-links li"

);

navItems.forEach(item=>{

item.addEventListener("mouseenter",()=>{

playBeep(

950,

.03,

"sine",

.05

);

});

});



//==========================================================
// LOG
//==========================================================

console.log("PARTE 7 OK");