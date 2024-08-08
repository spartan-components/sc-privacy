class SCPrivacyModal extends HTMLElement {
  constructor() {
    super();

    // set properties
    this.keys = this.dataset.keys.split(" ");

    // setup references and placeholder references
    this.buttonOk = null;
    this.buttonDismiss = null;
    this.tmplDisclaimer = this.querySelector(`template`);

    this.setupHtml();
  }

  // cleanup on element removal
  disconnectedCallback() {
    this.removeEventListener('click', this);
  }

  setupHtml() {
    // check if all cookies are accepted
    const allAccepted = this.keys.every(key => {
      return localStorage.getItem(key) === "true";
    });

    // check if all cookies are rejected
    const allRejected = this.keys.every(key => {
      return localStorage.getItem(key) === "false";
    });

    // if all cookies are either accepted or rejected,
    // then there's nothing to do
    if(allAccepted || allRejected) return;

    // otherwise, render the disclaimer
    this.innerHTML = this.tmplDisclaimer.innerHTML;

    // update references
    this.buttonOk = this.querySelector(`button[data-ok]`);
    this.buttonDismiss = this.querySelector(`button[data-dismiss]`);

    // add event click listeners
    this.addEventListener('click', this);
  }

  /**
   * Function to emit a custom event
   * @param {string} type The name of the event
   * @param {object} detail Additional details
   * @returns {null}
   */
  emit(type, detail = {}) {
    let event = new CustomEvent(`scpm:${type}`, {
      bubbles: true,
      cancelable: true,
      detail: detail,
    });

    return this.dispatchEvent(event);
  }

  handleEvent(event) {
    // ok button clicked
    if (event.target === this.buttonOk) {
      this.acceptCookies();
    }

    // dismiss button clicked
    if (event.target === this.buttonDismiss) {
      this.dismissCookies();
    }
  }

  acceptCookies() {
    // save all keys to localstorage
    // to not show the dialog when the page reloads
    this.keys.forEach(key => {
      localStorage.setItem(key, "true");
    });

    // emit event that cookies got accepted
    this.emit('cookiesAccepted', { keys: this.keys });

    // remove from DOM
    this.remove();
  }

  dismissCookies() {
    // save all keys to localstorage
    // to not show the dialog when the page reloads
    this.keys.forEach(key => {
      localStorage.setItem(key, "false");
    });

    // remove from DOM
    this.remove();
  }
}

export default SCPrivacyModal;
