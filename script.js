//==========================================================
// RENZO • 16 ANOS
// SCRIPT.JS
// PARTE 1
//==========================================================



//==========================================================
// DADOS DAS FOTOS
//==========================================================

const photoTabs = [

{

id:"destaques",

label:"Destaques",

items:[

{title:"2020",sub:"10 anos",img:"public/destaques/1.jpg"},

{title:"2021",sub:"11 anos",img:"public/destaques/2.jpg"},

{title:"2022",sub:"12 anos",img:"public/destaques/3.jpg"},

{title:"2023",sub:"13 anos",img:"public/destaques/4.jpg"},

{title:"2024",sub:"14 anos",img:"public/destaques/5.jpg"},

{title:"2025",sub:"15 anos",img:"public/destaques/6.jpg"}

]

},

{

id:"aventuras",

label:"Aventuras",

items:[

{title:"Viagens",sub:"Novos lugares",img:"public/aventura/1.jpg"},

{title:"Esporte",sub:"Tatame",img:"public/aventura/2.jpg"},

{title:"Praia",sub:"Verão",img:"public/aventura/3.jpg"},

{title:"Eventos",sub:"Diversão",img:"public/aventura/4.jpg"},

{title:"Natureza",sub:"Trilhas",img:"public/aventura/5.jpg"},

{title:"Games",sub:"Momentos",img:"public/aventura/6.jpg"}

]

},

{

id:"familia",

label:"Amigos & Família",

items:[

{title:"Família",sub:"Sempre juntos",img:"public/amigos/1.jpg"},

{title:"Amigos",sub:"Parceiros",img:"public/amigos/2.jpg"},

{title:"Festas",sub:"Momentos",img:"public/amigos/3.jpg"},

{title:"Escola",sub:"Turma",img:"public/amigos/4.jpg"},

{title:"Resenha",sub:"Diversão",img:"public/amigos/5.jpg"},

{title:"Lembranças",sub:"Inesquecíveis",img:"public/amigos/6.jpg"}

]

}

];



//==========================================================
// CONQUISTAS
//==========================================================

const achievements=[

{

title:"Superação",

text:"Cada desafio enfrentado ajudou a construir quem você é."

},

{

title:"Esporte",

text:"Disciplina, coragem e determinação."

},

{

title:"Estudos",

text:"Conhecimento abre portas para grandes sonhos."

},

{

title:"Amizade",

text:"Grandes momentos são vividos ao lado de grandes pessoas."

},

{

title:"Família",

text:"O porto seguro de toda jornada."

},

{

title:"Futuro",

text:"Os melhores capítulos ainda estão por vir."

}

];



//==========================================================
// ELEMENTOS HTML
//==========================================================

const startScreen=document.getElementById("startScreen");

const startBtn=document.getElementById("startBtn");

const countdown=document.getElementById("countdown");

const countNumber=document.getElementById("countNumber");

const countFill=document.getElementById("countFill");

const reveal=document.getElementById("reveal");

const app=document.getElementById("app");

const navbar=document.getElementById("navbar");

const replayBtn=document.getElementById("replayBtn");

const soundToggle=document.getElementById("soundToggle");

const bgMusic=document.getElementById("bgMusic");



// Modal Netflix

const photoModal=document.getElementById("photoModal");

const modalImage=document.getElementById("modalImage");

const modalTitle=document.getElementById("modalTitle");

const modalSubtitle=document.getElementById("modalSubtitle");

const modalYear=document.getElementById("modalYear");

const closePhoto=document.getElementById("closePhoto");

const prevPhoto=document.getElementById("prevPhoto");

const nextPhoto=document.getElementById("nextPhoto");



//==========================================================
// VARIÁVEIS GLOBAIS
//==========================================================

let currentTab=0;

let currentPhoto=0;

let appLoaded=false;

let soundOn=true;

let audioCtx=null;



//==========================================================
// ÁUDIO
//==========================================================

function initAudio(){

if(audioCtx) return;

audioCtx=new(window.AudioContext||window.webkitAudioContext)();

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

gain.gain.setValueAtTime(0,audioCtx.currentTime);

gain.gain.linearRampToValueAtTime(

volume,

audioCtx.currentTime+.01

);

gain.gain.exponentialRampToValueAtTime(

0.001,

audioCtx.currentTime+duration

);

osc.connect(gain);

gain.connect(audioCtx.destination);

osc.start();

osc.stop(audioCtx.currentTime+duration);

}



function playTudum(){

playBeep(73,.22,"sine",.35);

setTimeout(()=>{

playBeep(98,.45,"sine",.35);

},180);

}



//==========================================================
// PRELOAD DAS IMAGENS
//==========================================================

photoTabs.forEach(tab=>{

tab.items.forEach(photo=>{

const img=new Image();

img.src=photo.img;

});

});



//==========================================================
// LOG
//==========================================================

console.log("RENZO 16 ANOS - PARTE 1 OK");
//==========================================================
// PARTE 2
// INTRO • COUNTDOWN • REVEAL
//==========================================================



//==========================================================
// ABRE O SITE
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
// REVEAL
//==========================================================

function showReveal(){

    countdown.classList.add("hidden");

    reveal.classList.remove("hidden");



    playTudum();



    setTimeout(()=>{

        showApp();

    },2500);

}



//==========================================================
// COUNTDOWN
//==========================================================

function runCountdown(){

    let value=1;



    countNumber.textContent=value;

    countFill.style.width="0%";



    countNumber.classList.remove("pop");

    void countNumber.offsetWidth;

    countNumber.classList.add("pop");



    playBeep(500,.15);



    const timer=setInterval(()=>{

        value--;



        if(value<=0){

            clearInterval(timer);

            countFill.style.width="100%";



            setTimeout(()=>{

                showReveal();

            },500);



            return;

        }



        countNumber.textContent=value;



        countFill.style.width=((5-value)/5)*100+"%";



        countNumber.classList.remove("pop");

        void countNumber.offsetWidth;

        countNumber.classList.add("pop");



        playBeep(

            value===1?850:500,

            .15

        );



    },1000);

}



//==========================================================
// COMEÇAR EXPERIÊNCIA
//==========================================================

function startExperience(){



    initAudio();



    if(audioCtx.state==="suspended"){

        audioCtx.resume();

    }



    if(bgMusic){

        bgMusic.volume=.35;

        bgMusic.currentTime=0;



        bgMusic.play().catch(()=>{});

    }



    startScreen.classList.add("hidden");



    countdown.classList.remove("hidden");



    runCountdown();

}



//==========================================================
// REPLAY
//==========================================================

function replayExperience(){



    app.classList.add("hidden");



    reveal.classList.add("hidden");



    countdown.classList.remove("hidden");



    countFill.style.width="0%";



    window.scrollTo({

        top:0,

        behavior:"instant"

    });



    runCountdown();

}



//==========================================================
// BOTÃO SOM
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
// HERO CINEMATOGRÁFICO
//==========================================================

function animateHero(){



    const hero=document.querySelector(".banner");



    if(!hero) return;



    hero.animate([

        {

            transform:"scale(1.08)"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:5000,

        easing:"ease-out",

        fill:"forwards"

    });

}



//==========================================================
// OBSERVER
//==========================================================

const heroObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

animateHero();

}

});

},

{

threshold:.5

}

);



window.addEventListener("load",()=>{

const hero=document.getElementById("banner");



if(hero){

heroObserver.observe(hero);

}

});



//==========================================================
// LOG
//==========================================================

console.log("PARTE 2 OK");
//==========================================================
// PARTE 3
// CONSTRUÇÃO DO SITE
//==========================================================



//==========================================================
// MONTA TODO O SITE
//==========================================================

function buildApp(){

    buildPhotoTabs();

    renderPhotoRow(photoTabs[0]);

    buildAchievements();

    animateCards();

}



//==========================================================
// CARD HTML
//==========================================================

function cardHTML(item,index){

    return `

    <div class="card"

         data-index="${index}">

        <img

            src="${item.img}"

            alt="${item.title}"

            loading="lazy"

            onerror="this.closest('.card').classList.add('no-img');this.remove();"

        >

        <div class="card-info">

            <span class="card-title">

                ${item.title}

            </span>

            <span class="card-sub">

                ${item.sub}

            </span>

        </div>

    </div>

    `;

}



//==========================================================
// ABAS
//==========================================================

function buildPhotoTabs(){

    const tabs=document.getElementById("photoTabs");



    tabs.innerHTML=photoTabs.map((tab,i)=>{

        return`

        <button

        class="tab-btn ${i===0?"active":""}"

        data-tab="${i}">

        ${tab.label}

        </button>

        `;

    }).join("");



    tabs.querySelectorAll(".tab-btn").forEach(btn=>{

        btn.addEventListener("click",()=>{

            currentTab=parseInt(btn.dataset.tab);



            tabs.querySelectorAll(".tab-btn")

            .forEach(b=>b.classList.remove("active"));



            btn.classList.add("active");



            renderPhotoRow(photoTabs[currentTab]);



            playBeep(650,.08);

        });

    });

}



//==========================================================
// RENDERIZA AS FOTOS
//==========================================================

function renderPhotoRow(tab){

    const row=document.getElementById("photoRow");



    row.innerHTML=tab.items

    .map((item,index)=>cardHTML(item,index))

    .join("");


    row.querySelectorAll(".card img").forEach(img=>{

    img.onload=()=>{

        if(img.naturalHeight>img.naturalWidth){

            img.closest(".card").classList.add("vertical");

        }

    };

});


    row.classList.remove("fade-swap");

    void row.offsetWidth;

    row.classList.add("fade-swap");



    row.scrollLeft=0;



    animateCards();

    //==========================================================
// CLIQUE NAS FOTOS
//==========================================================

row.querySelectorAll(".card").forEach((card,index)=>{

    card.onclick=()=>{

        currentPhoto=index;

        openPhotoModal();

    };

});



    row.querySelectorAll(".card")

    .forEach(card=>{

        card.addEventListener("click",()=>{

            currentPhoto=parseInt(card.dataset.index);

            //==========================================================
// MINIATURAS DO MODAL
//==========================================================

function buildModalThumbs(){

    const thumbs=document.getElementById("modalThumbs");

    if(!thumbs) return;

    thumbs.innerHTML="";

    const photos=photoTabs[currentTab].items;

    photos.forEach((photo,index)=>{

        const div=document.createElement("div");

        div.className="thumb";

        if(index===currentPhoto){

            div.classList.add("active");

        }

        div.innerHTML=`
            <img
                src="${photo.img}"
                alt="${photo.title}">
        `;

        div.addEventListener("click",()=>{

            currentPhoto=index;

            changeModalPhoto();

        });

        thumbs.appendChild(div);

    });

}

            openPhotoModal();

        });

    });

}



//==========================================================
// CONQUISTAS
//==========================================================

function buildAchievements(){

    const row=document.getElementById("achRow");



    row.innerHTML=achievements

    .map((item,index)=>{

        return`

        <div class="card ach">

            <span class="ach-num">

                ${String(index+1).padStart(2,"0")}

            </span>

            <h3 class="ach-title">

                ${item.title}

            </h3>

            <p class="ach-text">

                ${item.text}

            </p>

        </div>

        `;

    }).join("");



    row.querySelectorAll(".card")

    .forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(50px)";



        setTimeout(()=>{

            card.style.transition=".6s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*120);

    });

}



//==========================================================
// ANIMAÇÃO DOS CARDS
//==========================================================

function animateCards(){

    const cards=document.querySelectorAll("#photoRow .card");



    cards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(60px)";



        setTimeout(()=>{

            card.style.transition=".55s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*100);

    });

}



//==========================================================
// NAVBAR
//==========================================================

window.addEventListener("scroll",()=>{

    if(app.classList.contains("hidden")) return;



    navbar.classList.toggle(

        "scrolled",

        window.scrollY>40

    );

});



//==========================================================
// MENU
//==========================================================

document.addEventListener("click",(e)=>{

    const btn=e.target.closest("[data-target]");



    if(!btn) return;



    const section=document.getElementById(

        btn.dataset.target

    );



    if(section){

        section.scrollIntoView({

            behavior:"smooth",

            block:"start"

        });

    }

});



//==========================================================
// MENU ATIVO
//==========================================================

const sectionObserver=new IntersectionObserver(

(entries)=>{

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

}

);



window.addEventListener("load",()=>{

[

"banner",

"fotos",

"conquistas",

"mensagem"

].forEach(id=>{

const sec=document.getElementById(id);

if(sec){

sectionObserver.observe(sec);

}

});

});



//==========================================================
// LOG
//==========================================================

console.log("PARTE 3 OK");
//==========================================================
// PARTE 4
// MODAL NETFLIX
//==========================================================



//==========================================================
// ABRIR FOTO
//==========================================================

function openPhotoModal(){

    const photo=photoTabs[currentTab].items[currentPhoto];

    modalImage.src=photo.img;

    modalTitle.textContent=photo.title;

    modalSubtitle.textContent=photo.sub;

    buildModalThumbs();

document.getElementById("detailCategory").textContent =
photoTabs[currentTab].label;

document.getElementById("detailYear").textContent =
photo.title;

    modalYear.textContent=photo.title;



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



    changeModalPhoto();

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



    changeModalPhoto();

}



//==========================================================
// TROCA FOTO
//==========================================================

function changeModalPhoto(){
  

    const photo=photoTabs[currentTab].items[currentPhoto];



    modalImage.animate(

    [

        {

            opacity:.3,

            transform:"scale(.95)"

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

}



//==========================================================
// EVENTOS
//==========================================================

closePhoto.addEventListener(

"click",

closePhotoModal

);



nextPhoto.addEventListener(

"click",

nextPhotoModal

);



prevPhoto.addEventListener(

"click",

prevPhotoModal

);



//==========================================================
// FECHAR CLICANDO FORA
//==========================================================

photoModal.addEventListener(

"click",

(e)=>{

if(

e.target.classList.contains("photo-modal")

||

e.target.classList.contains("photo-overlay")

){

closePhotoModal();

}

}

);



//==========================================================
// TECLADO
//==========================================================

document.addEventListener(

"keydown",

(e)=>{

if(photoModal.classList.contains("hidden"))

return;



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

}

);



//==========================================================
// SWIPE MOBILE
//==========================================================

let touchStartX=0;



photoModal.addEventListener(

"touchstart",

e=>{

touchStartX=e.changedTouches[0].clientX;

}

);



photoModal.addEventListener(

"touchend",

e=>{

const touchEnd=e.changedTouches[0].clientX;

const dist=touchEnd-touchStartX;



if(dist>60){

prevPhotoModal();

}



if(dist<-60){

nextPhotoModal();

}

});



//==========================================================
// PLAY
//==========================================================

const playPhoto=document.getElementById("playPhoto");



if(playPhoto){

playPhoto.addEventListener(

"click",

()=>{

alert(

"Aqui você pode colocar um vídeo dessa lembrança futuramente."

);

});

}



//==========================================================
// PRELOAD DAS FOTOS
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

console.log("PARTE 4 OK");
//==========================================================
// PARTE 5
// ANIMAÇÕES PREMIUM
//==========================================================



//==========================================================
// HERO - EFEITO KEN BURNS
//==========================================================

function heroAnimation(){

    const hero=document.querySelector(".banner");

    if(!hero) return;

    hero.animate([

        {

            transform:"scale(1.08)"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:18000,

        easing:"ease-out",

        fill:"forwards"

    });

}



//==========================================================
// PARALLAX
//==========================================================

document.addEventListener("mousemove",(e)=>{

    const hero=document.querySelector(".banner");

    if(!hero) return;

    const x=(e.clientX/window.innerWidth-.5)*12;

    const y=(e.clientY/window.innerHeight-.5)*12;

    hero.style.backgroundPosition=`calc(50% + ${x}px) calc(50% + ${y}px)`;

});



//==========================================================
// CURSOR LUMINOSO
//==========================================================

const cursor=document.createElement("div");

cursor.className="cursorGlow";

document.body.appendChild(cursor);



document.addEventListener("mousemove",(e)=>{

    cursor.style.left=e.clientX+"px";

    cursor.style.top=e.clientY+"px";

});



//==========================================================
// BOTÕES
//==========================================================

document.querySelectorAll(".nf-btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        playBeep(900,.05);

    });

});



//==========================================================
// ANIMAÇÃO DOS CARDS
//==========================================================

function cardsReveal(){

    const cards=document.querySelectorAll(".card");



    cards.forEach((card,index)=>{

        card.animate([

            {

                opacity:0,

                transform:"translateY(50px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],{

            duration:700,

            delay:index*90,

            easing:"ease-out",

            fill:"forwards"

        });

    });

}



//==========================================================
// OBSERVER
//==========================================================

const revealObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([

{

opacity:0,

transform:"translateY(60px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:900,

fill:"forwards"

});

}

});

},

{

threshold:.18

}

);



document.querySelectorAll(

".row-section,.message-section"

).forEach(sec=>{

revealObserver.observe(sec);

});



//==========================================================
// HERO TEXTO
//==========================================================

window.addEventListener("load",()=>{

const items=document.querySelectorAll(

".banner-badge,.banner-title,.banner-meta,.banner-desc,.banner-btns"

);



items.forEach((el,index)=>{

el.animate([

{

opacity:0,

transform:"translateY(40px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:900,

delay:index*220,

fill:"forwards"

});

});

});



//==========================================================
// HOVER DOS CARDS
//==========================================================

document.addEventListener("mouseover",(e)=>{

const card=e.target.closest(".card");



if(!card) return;



card.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.08)"

}

],{

duration:180,

fill:"forwards"

});

});



document.addEventListener("mouseout",(e)=>{

const card=e.target.closest(".card");



if(!card) return;



card.animate([

{

transform:"scale(1.08)"

},

{

transform:"scale(1)"

}

],{

duration:180,

fill:"forwards"

});

});



//==========================================================
// HERO
//==========================================================

heroAnimation();

cardsReveal();



//==========================================================
// LOG
//==========================================================

console.log("RENZO • SITE PREMIUM CARREGADO");
//==========================================================
// EVENTOS
//==========================================================

if(startBtn){

    startBtn.addEventListener("click", startExperience);

}

if(replayBtn){

    replayBtn.addEventListener("click", replayExperience);

}

if(soundToggle){

    soundToggle.addEventListener("click", toggleSound);

}