'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
filterFunc("graphic design");

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// ========================================================
// ====== KODE PORTFOLIO MODAL (PASTIKAN DI PALING BAWAH) ======
// ========================================================

const projectDetails = {
    "Agency Company Profile": {
        description: "Website Company Profile Dinas Kearsipan dan Perpustakaan Kota Kediri dengan fitur utama dashboard admin dan pengelolaan berita. Dikerjakan bersama tim 3 orang, saya berperan dalam pengembangan fitur manajemen konten pada dashboard admin menggunakan JavaScript.",
        techStack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
        images: [
          "./assets/images/disarpus1.png",
          "./assets/images/disarpus2.png",
          "./assets/images/disarpus3.png",
          "./assets/images/disarpus4.png"
        ]
    },
    "Business Landing Page": {
        description: "Landing page untuk memperkenalkan produk usaha Keripik Pisang Ananta. Dibuat dengan tampilan sederhana namun informatif, menampilkan informasi produk, varian rasa, dan kontak pemesanan.",
        techStack: ["HTML", "CSS"],
        images: [
          "./assets/images/ananta1.png",
          "./assets/images/ananta2.png",
          "./assets/images/ananta3.png",
          "./assets/images/ananta4.png"
        ], 
    },
    "Local Network Monitoring": {
        description: "Aplikasi web untuk memantau kondisi jaringan lokal secara real-time. Menampilkan status dan performa jaringan secara langsung menggunakan Socket.io untuk komunikasi data instan antara server dan browser.",
         techStack: ["Node.js", "HTML", "Tilwind CSS", "Socket.io"],
        images: [
          "./assets/images/netmonly1.png",
          "./assets/images/netmonly2.png",
          "./assets/images/netmonly3.png"
        ],
    }
}

window.openProjectModal = function(projectName) {
  const data = projectDetails[projectName];
  if (!data) return;

  // 1. Isi Judul Proyek
  document.getElementById("modal-project-title").innerText = projectName;
  
  // 3. Isi Deskripsi Proyek
  document.getElementById("modal-project-desc").innerText = data.description;

  document.getElementById("modal-project-tech").innerText = "Tech Stack: " + data.techStack.join(", ");

  // 4. Render Gambar Screenshot
  const imgContainer = document.getElementById("modal-project-images");
  imgContainer.innerHTML = ""; // Bersihkan gambar lama
  
  if (data.images) {
    data.images.forEach(imgUrl => {
      const imgTag = document.createElement("img");
      imgTag.src = imgUrl;
      imgTag.style.width = "100%";
      imgTag.style.borderRadius = "8px";
      imgTag.style.border = "1px solid #38383a";
      imgTag.alt = "Project Screenshot";
      imgContainer.appendChild(imgTag);
    });
  }

  // Tampilkan Modal langsung ke layar depan
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.style.display = "flex";
  }
};

window.closeProjectModal = function() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.style.display = "none";
  }
};