const page = `/${window.location.pathname.split('/')[0]}`;
document.querySelectorAll('#menu a').forEach(a => {
  if (new URL(a.href).pathname === page) {
    a.classList.add("active")
  }
});

document.body.addEventListener("click", (e) => {
  if (e.target.parentNode.id === "menu") return;
  document.getElementById("burger").checked = false;
});

let observer = new IntersectionObserver(entries => {
  if (entries[0].boundingClientRect.y < 0) {
    document.getElementById("menu").classList.remove("burger");
  } else {
    document.getElementById("menu").classList.add("burger");
  }
});
observer.observe(document.querySelector("#menu-breakpoint"));