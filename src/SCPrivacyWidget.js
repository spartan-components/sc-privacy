class SCPrivacyWidget extends HTMLElement {
  constructor() {
    super();

    // set properties
    this.key = this.dataset.key;

    // get references and placeholder references
    this.buttonAccept = null;
    this.fallback = this.querySelector('.fallback');
    this.tmplDisclaimer = this.querySelector(`template#${this.id}-disclaimer`);
    this.tmplWidget = this.querySelector(`template#${this.id}-widget`);

    this.setupHtml();

    // listen for events
    document.addEventListener('scpm:cookiesAccepted', this);
  }

  handleEvent(event) {
    if(event.target === this.buttonAccept) {
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
    this.buttonAccept = this.querySelector(`button#${this.id}-accept`);

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
    this.renderWidget();
  }
}

export default SCPrivacyWidget;
