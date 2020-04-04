
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector('.logo');
  const hideSm = document.querySelectorAll('.hide-sm');
  const initialLogoText = logo.innerHTML;
  let initialHideText = [];
  let i = 0;
  for (let item of hideSm) {
    initialHideText[i] = item.innerHTML;
    ++i;
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth < 685) {
      hideSm.forEach(el => el.innerHTML = '')
      logo.innerHTML = 'IT';
    } else {
      logo.innerHTML = initialLogoText;
      for (let i = 0; i < hideSm.length; i++) {
        hideSm[i].innerHTML = initialHideText[i]
      }
    }
  });
  if (window.innerWidth < 685) {
    hideSm.forEach(el => el.innerHTML = '')
    logo.innerHTML = 'IT';
  } else {
    logo.innerHTML = initialLogoText;
    for (let i = 0; i < hideSm.length; i++) {
      hideSm[i].innerHTML = initialHideText[i]
    }
  }

 

});