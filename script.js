// =====================================================
// CONFIGURAÇÕES GERAIS
// =====================================================
const menuBtn = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id], footer[id]");

// =====================================================
// MENU MOBILE
// =====================================================
if(menuBtn && menu){
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

// =====================================================
// ANIMAÇÃO AO SCROLL
// =====================================================
const animatedElements = document.querySelectorAll(
    ".feature-card, .explore-card, .tema-text, .tema-img"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
}, {
    threshold:0.15
});

animatedElements.forEach((element) => observer.observe(element));

// =====================================================
// NAVEGAÇÃO / LINKS DO MENU
// =====================================================
function setActiveMenuLink(){
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight){
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", setActiveMenuLink);

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));
        if(!target) return;

        const headerHeight = header ? header.offsetHeight : 90;

        window.scrollTo({
            top:target.offsetTop - headerHeight - 20,
            behavior:"smooth"
        });

        if(menu){
            menu.classList.remove("active");
        }
    });
});

// =====================================================
// MODO ESCURO - SITE
// =====================================================
const themeBtn = document.getElementById("theme-toggle");

if(themeBtn){
    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){
        document.body.classList.add("dark");
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const dark = document.body.classList.contains("dark");
        localStorage.setItem("theme", dark ? "dark" : "light");

        themeBtn.innerHTML = dark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    });
}

// =====================================================
// CARROSSEL - SUSTENTABILIDADE
// =====================================================
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next-slide");
const prevBtn = document.querySelector(".prev-slide");
const slideLinks = document.querySelectorAll(".slide-source");

let currentSlide = 0;
let carouselTimer = null;

function showSlide(index){
    if(!slides.length) return;

    slides.forEach((slide) => {
        slide.classList.remove("active", "prev", "next");
    });

    slides[index].classList.add("active");
    slides[(index - 1 + slides.length) % slides.length].classList.add("prev");
    slides[(index + 1) % slides.length].classList.add("next");
}

function goToNextSlide(){
    if(!slides.length) return;

    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function goToPrevSlide(){
    if(!slides.length) return;

    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startCarouselAutoSlide(){
    if(!slides.length || carouselTimer) return;
    carouselTimer = setInterval(goToNextSlide, 5000);
}

function stopCarouselAutoSlide(){
    clearInterval(carouselTimer);
    carouselTimer = null;
}

if(slides.length){
    showSlide(currentSlide);
    startCarouselAutoSlide();
}

nextBtn?.addEventListener("click", () => {
    goToNextSlide();
});

prevBtn?.addEventListener("click", () => {
    goToPrevSlide();
});

carousel?.addEventListener("mouseenter", stopCarouselAutoSlide);
carousel?.addEventListener("mouseleave", startCarouselAutoSlide);
carousel?.addEventListener("focusin", stopCarouselAutoSlide);
carousel?.addEventListener("focusout", startCarouselAutoSlide);

slideLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});

// =====================================================
// NOME DO VISITANTE
// =====================================================
const welcomeScreen = document.getElementById("welcome-screen");
const saveNameBtn = document.getElementById("save-name");
const usernameInput = document.getElementById("username");
const greeting = document.getElementById("personal-greeting");
const footerMessage = document.getElementById("footer-message");

function applyUserName(name){
    if(greeting){
        greeting.innerHTML = `
            <div class="greeting-name">
                Bem-vindo(a), ${name}!
            </div>
        `;
    }

    const temaPersonalizado = document.getElementById("tema-personalizado");

    if(temaPersonalizado){
        temaPersonalizado.innerHTML = `${name}, sustentabilidade não é apenas preservar, mas produzir com responsabilidade.`;
    }

    if(footerMessage){
        footerMessage.innerHTML = `
            Obrigado pela visita, ${name}!<br>
            Cultivando conhecimento, colhendo um futuro sustentável.
        `;
    }

    const conviteProjeto = document.getElementById("trajetoria-convite");

    if(conviteProjeto){
        conviteProjeto.innerHTML = `${name}, venha conhecer este projeto premiado`;
    }
}

function saveVisitorName(){
    const name = usernameInput.value.trim();

    if(name.length < 2){
        alert("Digite seu nome para continuar.");
        return;
    }

    localStorage.setItem("agrinho-user", name);
    applyUserName(name);

    if(welcomeScreen){
        welcomeScreen.style.display = "none";
    }
}

const savedName = localStorage.getItem("agrinho-user");

if(savedName && welcomeScreen){
    welcomeScreen.style.display = "none";
    applyUserName(savedName);
}

saveNameBtn?.addEventListener("click", saveVisitorName);

usernameInput?.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        saveVisitorName();
    }
});

// =====================================================
// MODAL - AGROFLORESTA
// =====================================================
const agroModal = document.getElementById("modal-agrofloresta");
const openAgroModal = document.getElementById("open-agro-modal");
const closeAgroModal = document.getElementById("close-agro-modal");

function abrirAgrofloresta(){
    if(!agroModal) return;

    agroModal.classList.add("active");
    agroModal.setAttribute("aria-hidden", "false");
}

function fecharAgrofloresta(){
    if(!agroModal) return;

    agroModal.classList.remove("active");
    agroModal.setAttribute("aria-hidden", "true");
}

openAgroModal?.addEventListener("click", abrirAgrofloresta);
closeAgroModal?.addEventListener("click", fecharAgrofloresta);

agroModal?.addEventListener("click", (event) => {
    if(event.target === agroModal){
        fecharAgrofloresta();
    }
});

// =====================================================
// GRAPES FARM - MOSTRAR / ESCONDER HISTÓRIA
// =====================================================
const toggleInfoJogoBtn = document.getElementById("toggle-info-jogo");
const infoJogo = document.getElementById("info-jogo");

function toggleInfoJogo(){
    if(!infoJogo) return;
    infoJogo.classList.toggle("active");
}

toggleInfoJogoBtn?.addEventListener("click", toggleInfoJogo);

// =====================================================
// CONFIGURAÇÕES - ALTERAR NOME
// =====================================================
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettings = document.getElementById("close-settings");
const saveNewName = document.getElementById("save-new-name");
const resetName = document.getElementById("reset-name");
const newUsername = document.getElementById("new-username");

function openSettingsModal(){
    if(!settingsModal) return;

    settingsModal.classList.add("active");
    settingsModal.setAttribute("aria-hidden", "false");

    if(newUsername){
        newUsername.value = localStorage.getItem("agrinho-user") || "";
    }
}

function closeSettingsModal(){
    if(!settingsModal) return;

    settingsModal.classList.remove("active");
    settingsModal.setAttribute("aria-hidden", "true");
}

settingsBtn?.addEventListener("click", openSettingsModal);
closeSettings?.addEventListener("click", closeSettingsModal);

settingsModal?.addEventListener("click", (event) => {
    if(event.target === settingsModal){
        closeSettingsModal();
    }
});

saveNewName?.addEventListener("click", () => {
    const nome = newUsername.value.trim();

    if(nome.length < 2){
        alert("Digite um nome válido.");
        return;
    }

    localStorage.setItem("agrinho-user", nome);
    applyUserName(nome);
    closeSettingsModal();
});

newUsername?.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        saveNewName?.click();
    }
});

resetName?.addEventListener("click", () => {
    localStorage.removeItem("agrinho-user");
    location.reload();
});

// =====================================================
// ATALHOS DE TECLADO / FECHAMENTO DE MODAIS
// =====================================================
document.addEventListener("keydown", (event) => {
    if(event.key !== "Escape") return;

    fecharAgrofloresta();
    closeSettingsModal();
});
