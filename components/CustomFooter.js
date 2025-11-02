# Rename your main branch to 'main' if it's not already
git branch -M main

# Push to GitHub
git push -u origin mainclass CustomFooter extends HTMLElement {
  static get observedAttributes() {
    return ['theme'];
  }

  constructor() {
    super();
    this.featherLoaded = false;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.loadFeatherIcons();
  }

  disconnectedCallback() {
    // placeholder for cleanup if needed later
  }

  async loadFeatherIcons() {
    if (this.featherLoaded) return;

    // If feather is already available globally, use it
    if (window.feather) {
      try {
        window.feather.replace(this.shadowRoot.querySelectorAll('[data-feather]'));
        this.featherLoaded = true;
        return;
      } catch (err) {
        console.warn('Feather found but replace failed:', err);
      }
    }

    // Avoid loading the script multiple times
    const existing = document.getElementById('feather-icons-script');
    if (existing) {
      await new Promise((resolve, reject) => {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
      }).catch(() => {});
    } else {
      const script = document.createElement('script');
      script.id = 'feather-icons-script';
      script.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
      script.defer = true;

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      }).catch((err) => {
        console.error('Failed to load Feather icons script:', err);
      });
    }

    if (window.feather) {
      try {
        window.feather.replace(this.shadowRoot.querySelectorAll('[data-feather]'));
        this.featherLoaded = true;
      } catch (err) {
        console.error('Failed to replace feather icons in shadow DOM:', err);
      }
    }
  }

  render() {
    const styles = `
      :host {
        --footer-bg: var(--footer-background, #111827);
        --footer-text: var(--footer-color, #fff);
        --footer-muted: var(--footer-muted-color, #9CA3AF);
        --footer-accent: var(--footer-accent-color, #3B82F6);
        --footer-spacing: var(--spacing, 2rem);
        display: block;
      }

      @media (prefers-reduced-motion: reduce) {
        * { transition: none !important; }
      }

      footer {
        background: var(--footer-bg);
        color: var(--footer-text);
        padding: calc(var(--footer-spacing) * 2) var(--footer-spacing) var(--footer-spacing);
        position: relative;
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--footer-spacing);
      }

      .footer-logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: var(--footer-text);
      }

      .footer-logo-icon {
        color: var(--footer-accent);
      }

      .footer-description {
        color: var(--footer-muted);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .footer-heading {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        color: var(--footer-text);
      }

      .footer-links {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .footer-link {
        color: var(--footer-muted);
        text-decoration: none;
        transition: color 0.3s;
      }

      .footer-link:hover,
      .footer-link:focus {
        color: var(--footer-accent);
        outline: none;
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-link {
        color: var(--footer-muted);
        transition: color 0.3s;
      }

      .social-link:hover,
      .social-link:focus {
        color: var(--footer-accent);
        outline: none;
      }

      .copyright {
        text-align: center;
        margin-top: calc(var(--footer-spacing) * 2);
        padding-top: var(--footer-spacing);
        border-top: 1px solid var(--footer-muted);
        color: var(--footer-muted);
      }

      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;
        }
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <footer role="contentinfo">
        <div class="footer-content">
          <div>
            <div class="footer-logo" role="img" aria-label="SignalSync logo">
              <i data-feather="airplay" class="footer-logo-icon" aria-hidden="true"></i>
              <span>SignalSync</span>
            </div>
            <p class="footer-description">
              SignalSync provides professional installation of NextGen TV 3.0 and MIMO antennas for the clearest signal and best viewing experience.
            </p>
            <div class="social-links" role="list">
              <a href="#" class="social-link" aria-label="Facebook">
                <i data-feather="facebook" aria-hidden="true"></i>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <i data-feather="twitter" aria-hidden="true"></i>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <i data-feather="instagram" aria-hidden="true"></i>
              </a>
              <a href="#" class="social-link" aria-label="LinkedIn">
                <i data-feather="linkedin" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          
          <nav aria-label="Services">
            <h3 class="footer-heading">Services</h3>
            <div class="footer-links" role="list">
              <a href="#" class="footer-link">NextGen TV 3.0 Installation</a>
              <a href="#" class="footer-link">MIMO Antenna Solutions</a>
              <a href="#" class="footer-link">Whole-Home Distribution</a>
              <a href="#" class="footer-link">Signal Troubleshooting</a>
            </div>
          </nav>
          
          <nav aria-label="Company">
            <h3 class="footer-heading">Company</h3>
            <div class="footer-links" role="list">
              <a href="#" class="footer-link">About Us</a>
              <a href="#" class="footer-link">Our Technicians</a>
              <a href="#" class="footer-link">Testimonials</a>
              <a href="#" class="footer-link">Careers</a>
            </div>
          </nav>
          
          <div>
            <h3 class="footer-heading">Contact</h3>
            <address class="footer-links">
              <a href="mailto:Joseoterobw@gmail.com" class="footer-link">Joseoterobw@gmail.com</a>
              <a href="tel:3128834695" class="footer-link">(312) 883-4695</a>
              <span class="footer-link">1723 W Devon Ave</span>
              <span class="footer-link">Chicago, IL 60626</span>
            </address>
          </div>
        </div>
        
        <div class="copyright">
          &copy; ${new Date().getFullYear()} SignalSync. All rights reserved.
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);
