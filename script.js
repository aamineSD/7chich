window.addEventListener("load", () => {
    const overlay = document.getElementById("intro-overlay");
    const container = document.querySelector(".profile-container");

    setTimeout(() => {
        overlay.style.transition = "opacity 0.5s ease";
        overlay.style.opacity = "0";

        setTimeout(() => {
            overlay.style.display = "none";
            // هنا كيبان كلشي دقة وحدة بالأنميشن ديالو
            container.style.display = "block";
        }, 300); 
    }, 1500); 
});
window.addEventListener('load', () => {
    const intro = document.getElementById('intro-overlay');
    const welcomeText = document.querySelector('.intro-name');

    // مورا ما تسالي أنميشن Welcome (تقريبا 3 ثواني)
    setTimeout(() => {
        // تأثير نبضة أخيرة قبل الاختفاء
        welcomeText.style.transition = "all 0.5s ease";
        welcomeText.style.letterSpacing = "30px";
        welcomeText.style.opacity = "0";
        welcomeText.style.filter = "blur(20px)";

        setTimeout(() => {
            intro.classList.add('intro-hidden');
            
            // مورا ما يحيد الـ Intro، نحيدوه من الكود باش ما يتقلش
            setTimeout(() => intro.remove(), 1200);
        }, 500);
        
    }, 3500); 
});