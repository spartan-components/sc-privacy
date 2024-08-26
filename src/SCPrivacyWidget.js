class SCPrivacyWidget extends HTMLElement {
  constructor() {
    super();

    // set properties
    this.key = this.dataset.key;

    // get references and placeholder references
    this.buttonOk = null;
    this.fallback = this.querySelector('[data-fallback]');
    this.tmplDisclaimer = this.querySelector(`template[data-disclaimer]`);
    this.tmplWidget = this.querySelector(`template[data-widget]`);

    this.setupHtml();

    // listen for events
    document.addEventListener('scpm:cookiesAccepted', this);
  }

  handleEvent(event) {
    if(event.target === this.buttonOk) {
      this.acceptCookies();
    }

    if(event.type === "scpm:cookiesAccepted" && event.detail.keys.includes(this.key)) {
      this.renderWidget();
    }
  }

  setupHtml() {
    // check if cookies accepted
    const cookiesAccepted = localStorage.getItem(this.key) === "true";

    // cookies are accepted, render widget
    if(cookiesAccepted) {
      return this.renderWidget();
    }

    // otherwise render the disclaimer
    this.renderDisclaimer();
  }

  renderDisclaimer() {
    // remove the fallback
    this.fallback.remove();

    // append disclaimer
    this.insertAdjacentHTML('afterbegin', this.tmplDisclaimer.innerHTML);

    // update reference
    this.buttonOk = this.querySelector(`button[data-ok]`);

    // setup event listener
    this.addEventListener('click', this);
  }

  renderWidget() {
    this.innerHTML = this.tmplWidget.innerHTML;
  }

  acceptCookies() {
    // save key to localstorage
    // to not show the disclaimer when the page reloads
    localStorage.setItem(this.key, "true");
    // render the widget
    this.renderWidget();
    // emit custom event to let other to react to it
    this.emit('cookiesAccepted', { key: this.key });
  }

  /**
   * Function to emit a custom event
   * @param {string} type The name of the event
   * @param {object} detail Additional details
   * @returns {null}
   */
  emit(type, detail = {}) {
    let event = new CustomEvent(`scpw:${type}`, {
      bubbles: true,
      cancelable: true,
      detail: detail,
    });

    return this.dispatchEvent(event);
  }
}

export default SCPrivacyWidget;
