// ==========================================
// GAME DIALOG CONTROLLER
// مدیریت دیالوگ بازی
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // گرفتن المان اصلی دیالوگ
    const dialog = document.getElementById("gameDialog");

    // دکمه بستن
    const closeBtn = document.getElementById("dialogClose");

    // اگر المان‌ها وجود نداشتند، کاری نکن
    if (!dialog || !closeBtn) return;

    // ==========================================
    // بستن دیالوگ
    // ==========================================
    closeBtn.onclick = () => {

        dialog.classList.add("hidden");

    };

    // ==========================================
    // باز کردن دیالوگ
    // ==========================================
    window.openDialog = function (title, html) {

        document.getElementById("dialogTitle").innerHTML = title;
        document.getElementById("dialogBody").innerHTML = html;

        dialog.classList.remove("hidden");

    };

    // ==========================================
    // تست اولیه (بعد از 1 ثانیه)
    // ==========================================
    setTimeout(() => {

        openDialog(
            "خوش آمدید",
            "<p style='text-align:center'>به امپراتوری پارس خوش آمدید.</p>"
        );

    }, 1000);

});