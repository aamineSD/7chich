window.addEventListener('load', () => {
    const intro = document.getElementById('intro-overlay');
    const welcomeText = document.querySelector('.intro-name');
    const container = document.querySelector('.profile-container');

    // كنأكدو أن البروفايل ديجا واخد مساحتو ولكن شفاف
    if (container) {
        container.style.opacity = "0";
    }

    // مورا 2.5 ثانية (وقت كافي للـ Welcome)
    setTimeout(() => {
        // 1. غبر الكلمة Welcome
        if (welcomeText) {
            welcomeText.style.transition = "all 0.6s ease";
            welcomeText.style.opacity = "0";
            welcomeText.style.transform = "scale(1.1)";
        }

        // 2. حيد الـ Intro وببين البروفايل
        setTimeout(() => {
            if (intro) {
                intro.classList.add('intro-hidden');
            }
            if (container) {
                container.style.opacity = "1";
            }

            // 3. مسح الـ Intro نهائياً مورا ما يختفي باش ما يتقلش الرام
            setTimeout(() => {
                if (intro) intro.remove();
            }, 800);
        }, 500);

    }, 2500); 
});