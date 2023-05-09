const notification = (message, backgroundColor) => {
    $(".notificationContainer").css("display", "flex");
    $(".notification").css("background-color", backgroundColor);
    $(".notificationMessage").text(message);
    gsap.fromTo(".notification", { x: 100 }, { duration: 1, x: 0, ease: "bounce" });
    gsap.to(".notification", { x: 300, duration: 1, delay: 6 })
}

