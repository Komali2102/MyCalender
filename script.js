document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bgMusic");
    if (!music) return;

    const CORRECT_PASSCODE = "1234";

    let page = window.location.pathname.split("/").pop().replace(".html", "");
    if (page === "") page = "index";

    const isRootPage = (page === "index" || page === "months" || page === "surprise");
    const musicPath = isRootPage ? "music/" : "../music/";

    const pageMusic = {
        index: "intro.mp3",
        months: "Second.mp3",

        january: "january.mp3",
        february: "february.mp3",
        march: "march.mp3",
        april: "april.mp3",
        may: "may.mp3",
        june: "june.mp3",
        july: "july.mp3",
        august: "august.mp3",
        september: "september.mp3",
        october: "october.mp3",
        november: "november.mp3",
        december: "december.mp3",

        surprise: "surprise.mp3"
    };

    if (pageMusic[page]) {
        music.src = musicPath + pageMusic[page];
    }

    music.volume = 0.25;

    /* ✅ FIXED AUTOPLAY */
    if (sessionStorage.getItem("musicAllowed") === "yes") {
        setTimeout(() => {
            music.play().catch(() => {});
        }, 300);
    }

    /* 🔐 First user interaction */
    document.body.addEventListener("click", () => {
        sessionStorage.setItem("musicAllowed", "yes");
        if (music.paused) {
            music.play().catch(() => {});
        }
    }, { once: true });

    /* 🔐 Passcode only on index */
    if (page === "index") {
        window.checkPasscode = function () {

            const entered = document.getElementById("passcode").value;
            const errorText = document.getElementById("error-text");
            const transitionText = document.getElementById("transition-text");

            if (entered === CORRECT_PASSCODE) {
                errorText.innerText = "";
                transitionText.classList.remove("hidden");

                let fade = setInterval(() => {
                    if (music.volume > 0.02) {
                        music.volume -= 0.02;
                    } else {
                        clearInterval(fade);
                        music.pause();
                        window.location.href = "months.html";
                    }
                }, 100);

            } else {
                errorText.innerText = "Wrong passcode… try again 💭";
            }
        };
    }

});
