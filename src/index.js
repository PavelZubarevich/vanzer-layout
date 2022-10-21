import './styles/styles.scss'
import './index.html'
import PagePagination from './js/PagePagination'
import Swiper, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const handleBurgerButtonClick = (e) => {
  const burgerMenu = document.querySelector('#burger-menu')
  e.currentTarget.classList.toggle('_active')
  burgerMenu.classList.toggle('_active')
}

const handleTabClick = (e, tabsContent) => {
  const targetTab = e.target.dataset.tab

  if (targetTab) {
    e.currentTarget.querySelectorAll('button').forEach(elem => {
      if (targetTab === elem.dataset.tab) {
        elem.classList.add('active')
      } else {
        elem.classList.remove('active')
      }
    })

    tabsContent.forEach(tab => {
      if (tab.id === targetTab) {
        tab.classList.add('active')
      } else {
        tab.classList.remove('active')
      }
    })
  }
}

function initBurgerMenu() {
  document.querySelector('#burger').addEventListener('click', handleBurgerButtonClick)
}

function initTabs() {
  const tabs = document.querySelectorAll('.tabs')

  tabs.forEach(tab => {
    const tabsButtons = tab.querySelector('.tabs-buttons')
    const tabsContent = tab.querySelectorAll('.tabs-content div')

    tabsButtons.addEventListener('click', (e) => handleTabClick(e, tabsContent))
  })
}

window.addEventListener('load', () => {
  initBurgerMenu()
  initTabs()
  new PagePagination().init()
  new Swiper('.swiper', {
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination',
      bulletActiveClass: 'portfolio__bullet-active',
      bulletClass: 'portfolio__bullet',
      clickable: true,
      horizontalClass: 'portfolio__pagination'
    },
  });
})
