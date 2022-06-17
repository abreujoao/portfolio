class resposivo {
    constructor(responsiveMenu, navList, navLinks) {
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
      this.responsiveMenu = document.querySelector(responsiveMenu);
      this.navList = document.querySelector(navList);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.animateLinks();
      this.responsiveMenu.classList.toggle(this.activeClass);
      this.navList.classList.toggle(this.activeClass);
    }

    init() {
        if (this.responsiveMenu) {
          this.addClickEvent();
        }
        return this;
      }
    addClickEvent() {
      this.responsiveMenu.addEventListener("click", this.handleClick);
    }
    animateLinks() {
        this.navLinks.forEach((link, index) => {
          link.style.animation
            ? (link.style.animation = "")
            : (link.style.animation = `navLinkFade 0.5s ease forwards ${
                index / 7 + 0.3
              }s`);
        });
      }
    
  }
  
  const responsiveNavbar = new ResponsiveNavbar(
    ".responsive-menu",
    ".nav-list",
    ".nav-list li",
  );
  responsiveMenuNavbar.init();