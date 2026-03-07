console.log("Welcome to My Portfolio !")

// // =====================================================
// //  Go To Top, Toggle and contact Button Functionality
// // =====================================================
const goTopBtn = document.getElementById('goTopBtn');
const contactBtn = document.getElementById('contactBtn');
const contactSection = document.getElementById('contact');
const toggleBtn = document.getElementById('toggle');
const bugMsg = document.getElementById('bug-msg');

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

toggleBtn.addEventListener('click', () => {
    bugMsg.classList.add('show');
    setTimeout(() => bugMsg.classList.remove('show'), 1800
    );
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        toggleBtn.style.bottom = '12vh';
    }
    else {
        toggleBtn.style.bottom = '2vh';
    }
});

window.addEventListener('scroll', () => {
    goTopBtn.style.display = window.scrollY > 200 ? 'flex' : 'none';
});

goTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

contactBtn.addEventListener('click', () => {
    contactSection.scrollIntoView({ behavior: 'smooth' });
})


// Resume Download
document.getElementById('downloadBtn').addEventListener('click', function () {
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Khushi_Chaudhary_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// =================================
//  Disable Right-Click & Shortcuts
// =================================

document.addEventListener('contextmenu', event => event.preventDefault());

['copy', 'cut', 'paste'].forEach(action =>
    document.addEventListener(action, e => e.preventDefault())
);

document.addEventListener('keydown', event => {
    const blockedKeys = ['c', 'u', 's', 'a', 'x'];
    if ((event.ctrlKey && blockedKeys.includes(event.key.toLowerCase())) || event.key === 'F12') {
        event.preventDefault();
    }
});


// ===============================
//  Hamburger Menu Functionality
// ===============================
const navicon = document.getElementById('navicon');
const menuContainer = document.getElementById('menuContainer');
const closeBtn = document.getElementById('closeBtn');
const menuLinks = document.querySelectorAll('.menu-container a');

const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

function openMenu() {
    menuContainer.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    menuContainer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

navicon.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
menuLinks.forEach(link => link.addEventListener('click', closeMenu));


// Hide hamburger outside home
window.addEventListener('scroll', () => {
    const homeSection = document.getElementById('home');
    const rect = homeSection.getBoundingClientRect();

    if (rect.top <= 0 && rect.bottom > window.innerHeight / 2) {
        navicon.classList.remove('hide-nav');
    } else {
        navicon.classList.add('hide-nav');
    }
});


// -----------  Preloader ---------- //

const preloader = document.querySelector('.preloader');
if (preloader) {
    window.addEventListener('load', () => {
        preloader.remove();
    });
}

// =========================================
//  Reveal Animation on Scroll
// =========================================
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.querySelector("#home");
    const homeReveals = homeSection.querySelectorAll(".reveal");

    homeReveals.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("active");
        }, index * 120);
    });
});

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((element) => {
        if (
            element.classList.contains("active") ||
            element.closest("#home")
        ) return;

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// =========================================
//  From 
// =========================================

const form = document.querySelector(".contact-form");
const messageBox = document.getElementById("formMessage");

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = "form-message-box show " + type;

    setTimeout(() => {
        messageBox.classList.remove("show");
    }, 1000);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    try {
        await fetch("https://script.google.com/macros/s/AKfycbz2U0k3Z8Ps5c5Gs0ItxWIgVarbK1wzRrRhMN20uWFiDtJxR1VM6Wd0QfneO4-01pT5tA/exec", {
            method: "POST",
            body: JSON.stringify(data)
        });

        showMessage("Message sent successfully!", "success");
        form.reset();

    } 
    catch (err) {
        showMessage("Failed to send message!", "error");
    }
});


