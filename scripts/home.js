const siteheader = document.getElementById("site--header-main");
const nickTitle = document.querySelector(".main-top");

if (siteheader && nickTitle) {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) {
                siteheader.classList.add("sticky");
            } else {
                siteheader.classList.remove("sticky");
            }
        },
        { threshold: 0 }
    );
    observer.observe(nickTitle);
}