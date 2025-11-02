class CustomNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['theme', 'expanded'];
  }

  constructor() {
    super();
    this.featherLoaded = false;
    this.isMenuOpen = false;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.loadFeatherIcons();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  async loadFeatherIcons() {
    if (this.featherLoaded) return;
    
    try {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
      
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      if (window.feather) {
        window.feather.replace(this.shadowRoot.querySelectorAll('[data-feather]'));
        this.featherLoaded = true;
      }
    } catch (err) {
      console.error('Failed to load Feather icons:', err);
    }
  }

  setupEventListeners() {
    const menuButton = this.shadowRoot.querySelector('.mobile-menu-button');
    menuButton?.addEventListener('click', () => this.toggleMenu());

    // Close menu on escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  removeEventListeners() {
    const menuButton = this.shadowRoot.querySelector('.mobile-menu-button');
    menuButton?.removeEventListener('click', () => this.toggleMenu());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menu = this.shadowRoot.querySelector('.nav-links');
    const menuButton = this.shadowRoot.querySelector('.mobile-menu-button');
    
    menu.classList.toggle('show');
    menuButton.setAttribute('aria-expanded', this.isMenuOpen);
    
    if (this.isMenuOpen) {
      menu.querySelector('a').focus();
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    const menu = this.shadowRoot.querySelector('.nav-links');
    const menuButton = this.shadowRoot.querySelector('.mobile-menu-button');
    
    menu.classList.remove('show');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  render() {
    const styles = `
      :host {
        --navbar-bg: var(--nav-background, rgba(17, 24, 39, 0.8));
        --navbar-text: var(--nav-text, #fff);
        --navbar-accent: var(--nav-accent, #3B82F6);
        --navbar-hover: var(--nav-hover, #2563EB);
        --navbar-border: var(--nav-border, rgba(255, 255, 255, 0.1));
        display: block;
      }

      @media (prefers-reduced-motion: reduce) {
        * { transition: none !important; }
      }

      nav {
        background: var(--navbar-bg);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 50;
        border-bottom: 1px solid var(--navbar-border);
      }

      .logo {
        color: var(--navbar-text);
        font-weight: bold;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
      }

      .logo-icon {
        color: var(--navbar-accent);
      }

      .nav-links {
        display: flex;
        gap: 2rem;
        list-style: none;
        margin: 0;
        padding: 0;
        align-items: center;
      }

      .nav-link {
        color: var(--navbar-text);
        text-decoration: none;
        transition: color 0.3s;
        font-weight: 500;
        position: relative;
      }

      .nav-link:hover,
      .nav-link:focus {
        color: var(--navbar-accent);
        outline: none;
      }

      .nav-link:focus-visible {
        outline: 2px solid var(--navbar-accent);
        outline-offset: 4px;
        border-radius: 2px;
      }

      .cta-button {
        background: var(--navbar-accent);
        padding: 0.5rem 1.5rem;
        border-radius: 0.375rem;
        transition: background 0.3s;
      }

      .cta-button:hover,
      .cta-button:focus {
        background: var(--navbar-hover);
        color: var(--navbar-text);
      }

      .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        color: var(--navbar-text);
        cursor: pointer;
        padding: 0.5rem;
        margin: -0.5rem;
      }

      .mobile-menu-button:focus {
        outline: 2px solid var(--navbar-accent);
        border-radius: 4px;
      }

      @media (max-width: 768px) {
        .nav-links {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--navbar-bg);
          padding: 1rem;
          flex-direction: column;
          gap: 1rem;
          border-bottom: 1px solid var(--navbar-border);
        }

        .nav-links.show {
          display: flex;
        }

        .mobile-menu-button {
          display: block;
        }
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <nav role="navigation">
        <a href="/" class="logo" aria-label="SignalSync Home">
          <i data-feather="airplay" class="logo-icon" aria-hidden="true"></i>
          <span>SignalSync</span>
        </a>
        
        <ul class="nav-links" role="menubar">
          <li role="none"><a href="/" class="nav-link" role="menuitem">Home</a></li>
          <li role="none"><a href="#services" class="nav-link" role="menuitem">Services</a></li>
          <li role="none"><a href="#contact" class="nav-link" role="menuitem">Contact</a></li>
          <li role="none"><a href="#contact" class="nav-link cta-button" role="menuitem">Get Quote</a></li>
        </ul>
        
        <button class="mobile-menu-button" 
                aria-expanded="false"
                aria-label="Toggle navigation menu"
                aria-controls="nav-links">
          <i data-feather="menu" aria-hidden="true"></i>
        </button>
      </nav>
    `;
  }
}

customElements.define('custom-navbar', CustomNavbar);

<custom-navbar theme="light"></custom-navbar>

<style>
  custom-navbar {
    --nav-background: #ffffff;
    --nav-text: #000000;
    --nav-accent: #3B82F6;
    --nav-hover: #2563EB;
    --nav-border: #e5e7eb;
  }
</style>
