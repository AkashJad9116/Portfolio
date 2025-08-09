// content/js/main.js
// Purpose: initialize animations, typed/backspace effect, year, and form UX tweaks
document.addEventListener("DOMContentLoaded", function () {
  // AOS
  AOS.init({ once: true, offset: 80, duration: 700, easing: "ease-out" });

  // Typed.js role rotator
  // Backspace effect with slightly faster cadence for snappier feel
	new Typed("#typed-role", {
	  strings: [
		"Data Engineer",
		"Data Scientist",
		"Data Analytics Developer",
		"Machine Learning Developer",
		"Software Engineer"
	  ],
	  typeSpeed: 60,
	  backSpeed: 40,
	  backDelay: 1400,
	  smartBackspace: true,
	  loop: true
	});

  // Year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Bootstrap validation styling for contact form
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
  });
});
