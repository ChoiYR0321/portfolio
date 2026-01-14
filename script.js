document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".hero-item").forEach(item => {
        item.addEventListener("click", () => {
            const target = document.querySelector(item.dataset.target);
            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });



    /* ----------------------------------------
       🟦 스킬 탭 기능
    ---------------------------------------- */
    const tabs = document.querySelectorAll('.skill-tab');
    const contents = document.querySelectorAll('.skill-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.getAttribute('data-target');

            contents.forEach(content => content.classList.remove('active'));

            const targetContent = document.getElementById(targetId);
            if (targetContent) targetContent.classList.add('active');
        });
    });




    /* ----------------------------------------
       📘 README 모달
    ---------------------------------------- */
    const modal = document.getElementById("modalOverlay");
    const modalContent = document.getElementById("modalContent");

    document.querySelectorAll(".readme-btn").forEach(button => {
        button.addEventListener("click", () => {
            const file = button.dataset.file;

            fetch(file)
                .then(res => res.text())
                .then(html => {
                    modalContent.innerHTML = html;
                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                })
                .catch(err => {
                    modalContent.innerHTML = "<p>파일을 불러올 수 없습니다.</p>";
                    modal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                });
        });
    });

    document.querySelector(".close-modal").addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
    });

    modal.addEventListener("click", e => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "";
        }
    });




    /* ----------------------------------------
       📷 SHOW 모달
    ---------------------------------------- */
    const modalShow = document.getElementById("modalShowOverlay");
    const modalShowContent = document.getElementById("modalShowContent");

    document.querySelectorAll(".show-btn").forEach(button => {
        button.addEventListener("click", () => {
            const file = button.dataset.file;

            fetch(file)
                .then(res => res.text())
                .then(html => {
                    modalShowContent.innerHTML = html;

                    modalShow.style.display = "flex";
                    document.body.style.overflow = "hidden";

                    // ⭐ 중요: HTML 삽입 이후 슬라이드 초기화
                    initShowSlide();
                })
                .catch(err => {
                    console.error("SHOW 파일 로딩 실패:", err);
                    modalShowContent.innerHTML = "<p>파일을 불러올 수 없습니다.</p>";
                    modalShow.style.display = "flex";
                    document.body.style.overflow = "hidden";
                });
        });
    });

    document.querySelector(".close-show").addEventListener("click", () => {
        modalShow.style.display = "none";
        document.body.style.overflow = "";
    });

    modalShow.addEventListener("click", e => {
        if (e.target === modalShow) {
            modalShow.style.display = "none";
            document.body.style.overflow = "";
        }
    });

});




/* -------------------------------------------------------
   🎞 SHOW 모달 내부 슬라이드 초기화 함수 (가장 중요!)
------------------------------------------------------- */
function initShowSlide() {

    const slideContainer = document.querySelector('#modalShowContent .slide-container');
    if (!slideContainer) return;

    const slides = slideContainer.querySelectorAll('.slide-item');
    const prevBtn = slideContainer.querySelector('.prev-btn');
    const nextBtn = slideContainer.querySelector('.next-btn');

    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    let currentIndex = 0;

    const showSlide = (index) => {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
    };

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    showSlide(currentIndex);
}
