const Theme = {
    LIGHT: "light-theme",
    DARK: "dark-theme",
    GREY: "grey-background-theme",
  };
  
  const body = document.querySelector("body");
  
  const delClassElem = () => {
    body.classList.remove(Theme.LIGHT, Theme.DARK);
  };
  const themeSwitcher = document.querySelector("#theme-switch-toggle");
  
  window.onload = () => {
    try{
      themeSwitcher.addEventListener("change", () => {
        delClassElem();
        if (themeSwitcher.checked) {
          localStorage.setItem("Theme", "darkTheme");
          body.classList.add(Theme.DARK);
        } else {
          localStorage.setItem("Theme", "lightTheme");
          body.classList.add(Theme.LIGHT);
        }
      });
      if (localStorage.getItem("Theme") === "darkTheme") {
        themeSwitcher.setAttribute("checked", true);
        body.classList.add(Theme.DARK);
 
      }
    }catch{};
        
  }
 