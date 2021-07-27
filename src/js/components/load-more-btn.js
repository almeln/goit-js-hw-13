export default class LoadMoreBtn {
    constructor({ selector, hidden = false }) {
      this.refs = this.getRefs(selector);
  
      hidden && this.hide();
    }
  
    getRefs(selector) {
      const refs = {};
      refs.button = document.querySelector(selector);
    //   refs.label = refs.button.querySelector('.label');
    //   refs.spinner = refs.button.querySelector('.spinner');
      refs.loadBtn = refs.button.querySelector('.load-more');
  
      return refs;
    }
  
    enable() {
      this.refs.loadBtn.disabled = false;
    //   this.refs.label.textContent = 'Показать ещё';
    //   this.refs.spinner.classList.add('is-hidden');
    }
  
    disable() {
      this.refs.loadBtn.disabled = true;
    //   this.refs.label.textContent = 'Загружаем...';
    //   this.refs.spinner.classList.remove('is-hidden');
    }
  
    show() {
      this.refs.loadBtn.classList.remove('is-hidden');
    }
  
    hide() {
      this.refs.loadBtn.classList.add('is-hidden');
    }
  }