const headerNavbarOptions = document.querySelectorAll("header .navbar li");

headerNavbarOptions.forEach((option) => {
    const optionText = option.querySelector("a");
    const optionImg = option.querySelector("img")
    optionText.addEventListener("mouseover", (event) => {
        optionImg.classList.add("show");
    });
    optionText.addEventListener("mouseleave", (event) => {
        optionImg.classList.remove("show");
    });
})