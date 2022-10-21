function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export default class PagePagination {

  burgerMenu = null
  paginationElement = null
  currentSlide = null
  viewPortHeight = null

  init() {
    this.#getBurgerMenuElement()
    this.#getPaginationElement()
    this.#getCurrentSlide()
    this.#createPagination()
    this.#createHeaderMenu()
    this.#initScroll()
  }

  #getBurgerMenuElement() {
    this.burgerMenu = document.querySelector('#burger-menu')
  }

  #getPaginationElement() {
    this.paginationElement = document.querySelector("#pagination")
  }

  #getCurrentSlide = () => {
    this.viewPortHeight = document.documentElement.clientHeight
    const scrollOffset = window.scrollY
    this.currentSlide = Math.round(scrollOffset / this.viewPortHeight)
  }

  #getSectionsData = () => {
    const sections = [...document.querySelectorAll("section")]
    return sections.map(elem => ({ title: elem.dataset.title, content: elem.dataset.content, id: elem.id }))
  }

  #createPagination = () => {
    const itemTemplate = this.paginationElement.querySelector("#section-pagination-item")
    const itemTemplateNumber = itemTemplate.content.querySelector(".section-pagination__sectionNumber")
    const itemTemplateTitle = itemTemplate.content.querySelector(".section-pagination__sectionTitle")
    const item = itemTemplate.content.querySelector(".section-pagination__item")
    const sectionData = this.#getSectionsData()
    let paginationItem = null

    sectionData.forEach((data, i) => {
      itemTemplateNumber.textContent = '0'.repeat(Math.max(2 - i.toString().length, 0)) + (i + 1)
      itemTemplateTitle.textContent = data.title

      if (i === this.currentSlide) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }

      if (data.content === 'light') {
        item.classList.add('dark')
      } else {
        item.classList.remove('dark')
      }

      paginationItem = itemTemplate.content.cloneNode(true)

      const itemBullet = paginationItem.querySelector(".section-pagination__sectionBullet")
      itemBullet.addEventListener('click', () => { this.scrollToSlide(data.id) })
      this.paginationElement.append(paginationItem)
    })
  }

  #createHeaderMenu = () => {
    const itemTemplate = this.burgerMenu.querySelector("#header-menu-item")
    const itemButton = itemTemplate.content.querySelector(".header__menuItem button")
    const burgerMenuList = this.burgerMenu.querySelector("ul")
    const sectionData = this.#getSectionsData()
    let headerItem = null

    sectionData.forEach((data, i) => {
      itemButton.textContent = data.title

      if (i === this.currentSlide) {
        itemButton.classList.add('active')
      } else {
        itemButton.classList.remove('active')
      }

      headerItem = itemTemplate.content.cloneNode(true)

      const itemBullet = headerItem.querySelector(".header__menuItem button")
      itemBullet.addEventListener('click', () => { this.scrollToSlide(data.id) })
      burgerMenuList.append(headerItem)
    })
  }

  scrollToSlide = (id) => {
    document.querySelector(`#${id}`).scrollIntoView({ behavior: 'smooth' })
    //taki zdraste
    this.burgerMenu.classList.remove('_active')
    document.querySelector('#burger').classList.toggle('_active')
  }

  #updatePagination = () => {
    const paginationItems = this.paginationElement.querySelectorAll(".section-pagination__item")
    const itemButtons = this.burgerMenu.querySelectorAll(".header__menuItem button")

    paginationItems.forEach((elem, i) => {
      if (i === this.currentSlide) {
        elem.classList.add('active')
      } else {
        elem.classList.remove('active')
      }
    })
    itemButtons.forEach((elem, i) => {
      if (i === this.currentSlide) {
        elem.classList.add('active')
      } else {
        elem.classList.remove('active')
      }
    })
  }

  #initScroll = () => {
    const debouncedScroll = debounce(this.#handleScroll, 30)
    document.addEventListener('scroll', debouncedScroll)
  }

  #handleScroll = () => {
    this.#getCurrentSlide()
    this.#updatePagination()
  }
}
