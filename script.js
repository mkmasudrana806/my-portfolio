// load blog data

function loadBlog() {
  fetch("/data/blogs.json")
    .then((res) => res.json())
    .then((data) => displayBlog(data));
}

function displayBlog(blogs) {
  const blogsContainer = document.getElementById("cards");
  blogs.forEach((blog) => {
    const div = document.createElement("div");
    div.classList.add("card", "swiper-slide");
    div.innerHTML = `
      <div class="card-top">
        <img src="${blog.img}" alt="" />
      </div>
      <div class="card-info">
        <h2 class="truncate-to-1-lines">${blog.title}</h2>
        <span class="date">${blog.date}</span>
        <p class="excerpt truncate-to-5-lines">
          ${blog.description.replace(/\n/g, "<br>")}
        </p>
        <button  class="readMore">Explore More</button>
      </div>
    `;
    // when user click on the read more button then modal pop-up will show
    div.querySelector(".readMore").addEventListener("click", () => {
      openModal(blog);
    });
    blogsContainer.appendChild(div);
  });
}

// open modal for blog function
function openModal(blog) {
  console.log(blog);
  const modal = document.getElementById("modal");
  modal.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <h2>${blog.title}</h2>
    <br\>
    <hr \>
    <br\>
    <img src=${blog.img} alt="" />
    <br>
    <p> ${blog.description.replace(/\n/g, "<br /> <br />")}</p>
  `;
  modal.append(div);
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.classList.add("active");
  closeModalButton.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
  });
}

loadBlog();

// below is for services load and modal

function loadServicesData() {
  fetch("/data/services.json")
    .then((res) => res.json())
    .then((data) => displayServices(data));
}

function displayServices(services) {
  const servicesContainer = document.getElementById("allServices");
  services.forEach((service) => {
    const div = document.createElement("div");
    div.classList.add("servicesItem");
    div.id = "servicesItem";

    div.innerHTML = `
     <div class="icon-services">
            <i class="bx bx-code-alt"></i>
            <span></span>
          </div>
          <h3 class="truncate-to-1-lines">${service?.title}</h3>
          <p class="truncate-to-5-lines">
            ${service.description}
          </p>
          <button
            href="#"
            class="readMore"
            id="open-pop-up"
            >Read More</button
          >
    `;
    // when user click on the read more button then modal pop-up will show
    div.querySelector(".readMore").addEventListener("click", () => {
      openModal(service);
      console.log("yes service is clicked", service);
    });
    servicesContainer.appendChild(div);
  });
}

loadServicesData();

// active hamburger menu
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist");
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("active");
  navlist.classList.toggle("active");
  document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click", () => {
  navlist.classList.remove("active");
  menuIcon.classList.remove("active");
  document.body.classList.remove("open");
});

// rotate text js code
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML
  .split("")
  .map((char, i) => `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`)
  .join("");

// switch between about buttons

const buttons = document.querySelectorAll(".about-btn button");
const contents = document.querySelectorAll(".content");

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    contents.forEach((content) => (content.style.display = "none"));
    contents[index].style.display = "block";
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// portfolio fillter

var mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".portfolio-box",
  },
  animation: {
    duration: 500,
  },
});

// Initialize swiperjs

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

//   skill Progress bar

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", () => {
  if (!skillsPlayed) skillsCounter();
});

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;
  if (window.innerHeight >= topPosition + el.offsetHeight) return true;
  return false;
}

function updateCount(num, maxNum) {
  let currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

let skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill)) return;
  skillsPlayed = true;
  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 465 - 465 * (target / 100);

    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });

  progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
  );
}

// side progress bar

let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let pos = document.documentElement.scrollTop;

  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// active menu

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll("section");

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsetTop) {}
  menuLi.forEach((sec) => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);

// scroll reveal

ScrollReveal({
  distance: "90px",
  duration: 1500,
  delay: 150,
  // reset: true ,
});

ScrollReveal().reveal(".hero-info,.main-text,.proposal,.heading", {
  origin: "top",
});
ScrollReveal().reveal(".about-img,.fillter-buttons,.contact-info", {
  origin: "left",
});
ScrollReveal().reveal(".about-content,.skills", { origin: "right" });
ScrollReveal().reveal(
  ".allServices,.portfolio-gallery,.blog-box,footer,.img-hero",
  { origin: "bottom" }
);

// send email from client contact from to me
const contactForm = document.getElementById("contact-form");
// Initialize EmailJS
emailjs.init("ftaN7ot6b9YzcykmO");

// Function to handle form submission
function sendEmail() {
  event.preventDefault();
  const formData = new FormData(event.target);

  const templateParams = {
    from_name: formData.get("name"),
    from_email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailPattern.test(formData.get("email"))) {
    // Send email
    emailjs.send("service_2egi7ik", "template_yhzg7um", templateParams).then(
      function (response) {
        showToast(response);
        contactForm.reset();
      },
      function (response) {
        showToast(response);
        console.log("Error sending email:", error);
      }
    );
  } else showToast(0);
}

// show toast
function showToast(res) {
  // toast message when email is succesfully send
  const toastContainer = document.getElementById("toastContainer");

  const toast = document.createElement("div");
  if (res.status === 200) {
    console.log("yes email send hoise");
    toast.innerText = "✅ Email Sent Successfully!";
  } else if (res === 0) {
    toast.innerText = "❌ Please Provide Valid Email!";
  } else {
    console.log("email send hoinai tai error block");
    toast.innerText = "❌ Error Sending Email!";
  }

  toast.classList.add("toast");
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      toast.classList.add("hide");
      setTimeout(() => {
        toast.remove();
      }, 500); // Remove toast after the animation
    }, 2000); // Show the toast for 3 seconds
  }, 100); // Delay the toast appearance slightly for better animation
}
