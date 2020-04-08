
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector('.logo');
let initialLogoText = logo.innerHTML;
  window.addEventListener('resize', () => {
    if (window.innerWidth < 685) {
      logo.innerHTML = 'IT';
    } else {
      logo.innerHTML = initialLogoText;
    }
  });
  if (window.innerWidth < 685) {
    logo.innerHTML = 'IT';
  } else {
    logo.innerHTML = initialLogoText;
  }
});