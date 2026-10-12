/**
 * JAVASCRIPT LOGIC - NWEKE EMMANUEL UGWA PORTFOLIO
 * High-performance UI interactions, Terminal simulation, and state management
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initScrollEffects();
  initNavigation();
  initProjectFiltering();
  initProjectModals();
  initTerminal();
  initCopyActions();
  initContactForm();
  initScrollRevealObserver();
});

/* ===================================================================
   1. THEME TOGGLE (DARK / LIGHT MODE)
   =================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const icon = themeToggleBtn.querySelector('i');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, icon);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme, icon);
    showToast(`Switched to ${newTheme} mode`);
  });
}

function updateThemeIcon(theme, icon) {
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-moon';
  } else {
    icon.className = 'fa-solid fa-sun';
  }
}

/* ===================================================================
   2. TYPING EFFECT
   =================================================================== */
function initTypingEffect() {
  const typedRoleElem = document.getElementById('typed-role');
  if (!typedRoleElem) return;

  const roles = [
    'Full-Stack Developer (Laravel, Next, React & Vue)',
    'Mobile App Developer (Flutter & React Native)',
    'Senior Backend Engineer (Go & Java)',
    'Fintech Payment Switching Architect',
    'Cross-Platform iOS & Android Engineer',
    'High-Concurrency Distributed Systems Specialist'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedRoleElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedRoleElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   3. SCROLL EFFECTS (PROGRESS BAR & BACK-TO-TOP)
   =================================================================== */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    highlightActiveNavLink();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ===================================================================
   4. NAVIGATION (MOBILE MENU & ACTIVE SECTION HIGHLIGHT)
   =================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

/* ===================================================================
   5. PROJECT FILTERING
   =================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   6. PROJECT ARCHITECTURE MODALS
   =================================================================== */
const projectDetails = {
  billframe: {
    title: 'BillFrame – Automated Invoicing & Payment Switch',
    badge: 'Fintech & Payment Gateway',
    architecture: `
      <h4><i class="fa-solid fa-credit-card"></i> Fintech Billing Architecture</h4>
      <p>Multi-tenant enterprise SaaS infrastructure designed to automate B2B customer invoicing, webhook collection, and settlement switching for fast-growing companies.</p>
      
      <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--bg-card-border); padding: 1rem; border-radius: 8px; margin: 1rem 0; font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.6;">
        <span style="color:#60a5fa;">[Merchant Invoice]</span> ➔ 
        <span style="color:#ffffff;">[Automated Email / Link]</span> ➔ 
        <span style="color:#3b82f6;">[Switch Gateway Router]</span> ➔ 
        <span style="color:#60a5fa;">[Idempotent Payment Settlement]</span> ➔ 
        <span style="color:#ffffff;">[Webhook Dispatch]</span>
      </div>

      <h4><i class="fa-solid fa-bolt"></i> Key Guarantees</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Idempotent Settlements:</strong> Distributed locks preventing duplicate debit triggers during retry waves.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Automated Reconciliation:</strong> Instant ledger credit upon bank webhook verification.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Multi-Tenant Scalability:</strong> Secure isolation for enterprise business accounts.</li>
      </ul>
      <p><strong>Stack:</strong> Java (Spring Boot), Go, Redis, Docker, PostgreSQL, REST APIs.</p>
      <p><strong>Live URL:</strong> <a href="https://www.billframe.com.ng" target="_blank" style="color:var(--accent-ice);">billframe.com.ng</a></p>
    `
  },
  ukamart: {
    title: 'Ukamart – Multi-Vendor Retail Marketplace',
    badge: 'E-Commerce Platform',
    architecture: `
      <h4><i class="fa-solid fa-cart-shopping"></i> E-Commerce Platform Management</h4>
      <p>End-to-end management, SEO acceleration, and operational automation for Ukamart e-commerce platform.</p>

      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>40% Automation:</strong> Custom scripts automating daily product catalog imports and inventory sync.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>SEO Acceleration:</strong> Structured metadata optimization driving significant organic search volume.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Checkout Reliability:</strong> High-uptime cart checkout flows with low drop-off rates.</li>
      </ul>
      <p><strong>Stack:</strong> PHP, Node.js, Custom Automation Scripts, SEO Engine.</p>
      <p><strong>Live URL:</strong> <a href="https://ukamart.com" target="_blank" style="color:var(--accent-ice);">ukamart.com</a></p>
    `
  },
  myshop24: {
    title: 'MyShop24 – 24/7 Digital Storefront Platform',
    badge: 'E-Commerce & Multi-Store',
    architecture: `
      <h4><i class="fa-solid fa-store"></i> Digital Retail Architecture</h4>
      <p>Responsive, mobile-first storefront enabling customers to discover items and checkout with low latency.</p>

      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Sub-Second Page Transitions:</strong> Optimized asset loading and responsive rendering.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Seamless Checkout:</strong> Multi-channel payment integration with automated receipts.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Real-Time Inventory:</strong> Synchronized product counts preventing overselling.</li>
      </ul>
      <p><strong>Stack:</strong> React, Next.js, Node.js, PostgreSQL, Payment APIs.</p>
      <p><strong>Live URL:</strong> <a href="https://myshop24.ng" target="_blank" style="color:var(--accent-ice);">myshop24.ng</a></p>
    `
  },
  quickdrop: {
    title: 'QuickDrop – On-Demand Logistics & Delivery',
    badge: 'Real-Time Logistics Telemetry',
    architecture: `
      <h4><i class="fa-solid fa-truck-fast"></i> Real-Time Telemetry & Courier Routing</h4>
      <p>High-concurrency logistics platform pairing customers with couriers with sub-second WebSocket telemetry and automated status dispatch.</p>

      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>WebSocket Telemetry:</strong> Live courier location updates streamed with sub-15ms broadcast latency.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Geofenced Statuses:</strong> Automated pickup and arrival webhook alerts.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Dynamic Route Matching:</strong> Courier dispatch algorithms maximizing delivery efficiency.</li>
      </ul>
      <p><strong>Stack:</strong> Go (Golang), Node.js, WebSockets, React, GIS APIs.</p>
      <p><strong>Live URL:</strong> <a href="https://www.quickdrop.ng" target="_blank" style="color:var(--accent-ice);">quickdrop.ng</a></p>
    `
  },
  tapconnect: {
    title: 'TapConnect – Smart NFC & Digital Networking',
    badge: 'Mobile & Hardware Protocol',
    architecture: `
      <h4><i class="fa-solid fa-wifi"></i> Contactless Identity Architecture</h4>
      <p>Smart NFC card and dynamic QR profile engine enabling instant contact exchange and enterprise lead capture.</p>

      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>NFC/NDEF Protocol Encoding:</strong> Standardized multi-OS card tap support.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Dynamic vCard Generation:</strong> Direct one-tap contact additions to device address books.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Engagement Analytics:</strong> Profile view metrics, link clicks, and CRM lead exports.</li>
      </ul>
      <p><strong>Stack:</strong> React Native, React, Node.js API, MongoDB, NFC Protocols.</p>
      <p><strong>Live URL:</strong> <a href="https://tapconnect.ng" target="_blank" style="color:var(--accent-ice);">tapconnect.ng</a></p>
    `
  },
  migra: {
    title: 'Migra – Global Mobility & Relocation Tech',
    badge: 'Immigration & Workflow Engine',
    architecture: `
      <h4><i class="fa-solid fa-passport"></i> Cross-Border Mobility Platform</h4>
      <p>Workflow technology platform automating visa eligibility checks, credential document vaults, and relocation case tracking.</p>

      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Eligibility Rules Engine:</strong> Multi-country immigration logic and scoring algorithms.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Encrypted Document Vault:</strong> Secure credential storage with role-based viewing permissions.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Automated Progress Webhooks:</strong> Client stage milestone updates and notifications.</li>
      </ul>
      <p><strong>Stack:</strong> Python (Django), React, PostgreSQL, Docker, REST APIs.</p>
      <p><strong>Live URL:</strong> <a href="https://migra.ng" target="_blank" style="color:var(--accent-ice);">migra.ng</a></p>
    `
  },
  resqlink: {
    title: 'ResQLink – Rapid Emergency Response System',
    badge: 'Mission-Critical Telemetry',
    architecture: `
      <h4><i class="fa-solid fa-kit-medical"></i> High-Priority Emergency Routing</h4>
      <p>High-availability incident dispatch coordination linking emergency distress callers, central coordinators, and medical responders.</p>

      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Sub-Second Dispatch:</strong> High-priority queue worker dispatching to nearest responder units.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Multi-Channel Alerting:</strong> Real-time WebSocket alerts, SMS dispatch, and automated voice triggers.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Fault Tolerance:</strong> Zero packet drop design during peak crisis incident spikes.</li>
      </ul>
      <p><strong>Stack:</strong> Java Spring Boot, WebSockets, PostgreSQL, React, Docker.</p>
      <p><strong>Live URL:</strong> <a href="https://resqlink.org.ng" target="_blank" style="color:var(--accent-ice);">resqlink.org.ng</a></p>
    `
  },
  sccdr: {
    title: 'SCCDR – Dispute Resolution & Legal Portal',
    badge: 'Institutional & Legal Tech',
    architecture: `
      <h4><i class="fa-solid fa-scale-balanced"></i> Digital Case Filing Architecture</h4>
      <p>Institutional case intake and arbitration coordination platform for the Standing Conference on Mediation & Dispute Resolution.</p>

      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Encrypted Case Dossiers:</strong> Secure document submission and confidentiality safeguards.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Mediation Scheduling:</strong> Integrated session coordination between disputing parties and arbitrators.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Institutional Compliance:</strong> Accessible, reliable web architecture compliant with legal standards.</li>
      </ul>
      <p><strong>Stack:</strong> Next.js, React, Node.js, Document Encryption, REST API.</p>
      <p><strong>Live URL:</strong> <a href="http://sccdr.org.ng" target="_blank" style="color:var(--accent-ice);">sccdr.org.ng</a></p>
    `
  },
  switchEngine: {
    title: 'High-Concurrency Payment Switching Engine',
    badge: 'Fintech Infrastructure & Microservices',
    architecture: `
      <h4><i class="fa-solid fa-diagram-project"></i> Core Architecture & Routing Pipeline</h4>
      <p>Engineered to sit between merchant APIs, payment aggregators, and core banking switches. Designed with a modular multi-tier pipeline capable of processing 10,000+ transactions per second.</p>
      
      <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--bg-card-border); padding: 1rem; border-radius: 8px; margin: 1rem 0; font-family: var(--font-mono); font-size: 0.82rem; line-height: 1.6;">
        <span style="color:#60a5fa;">[Client Request]</span> ➔ 
        <span style="color:#ffffff;">[Ingress API Gateway]</span> ➔ 
        <span style="color:#3b82f6;">[Token Auth & Idempotency Check]</span> ➔ 
        <span style="color:#60a5fa;">[BIN & Host Switch Router]</span> ➔ 
        <span style="color:#ffffff;">[Goroutine Worker Pool]</span> ➔ 
        <span style="color:#3b82f6;">[Bank Gateway Dispatch (18ms)]</span>
      </div>

      <h4><i class="fa-solid fa-bolt"></i> Key Technical Guarantees</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Zero Dropped Transactions:</strong> Channel-based rate limiting buffers sudden traffic spikes gracefully.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Idempotency Layer:</strong> Redis distributed lock prevents duplicate debits during network retries.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>30% Processing Acceleration:</strong> Optimized dynamic routing tables based on host availability and scheme latency metrics.</li>
      </ul>
      <p><strong>Stack:</strong> Java (Spring Boot), Go (Golang), Redis, Docker, Microservices, Gin.</p>
    `
  },
  zenithedge: {
    title: 'Zenith Edge – Automated Wealth & Asset Investment',
    badge: 'Fintech & Wealth Management',
    architecture: `
      <h4><i class="fa-solid fa-chart-line"></i> Digital Wealth Architecture</h4>
      <p>Secure investment platform featuring automated yield compounding, user wallet deposit reconciliation, and transaction ledgers.</p>
      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Yield Compounding Engine:</strong> Automated interest calculation and daily dividend accrual.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Automated Ledger:</strong> Double-entry bookkeeping system ensuring zero balance discrepancies.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Security Auditing:</strong> Session management and cryptographic token authorization.</li>
      </ul>
      <p><strong>Stack:</strong> Java Spring Boot, React, PostgreSQL, Redis, REST API.</p>
      <p><strong>Live URL:</strong> <a href="https://zenith-edge-investment.onrender.com/" target="_blank" style="color:var(--accent-ice);">zenith-edge-investment.onrender.com</a></p>
    `
  },
  myvillaafrica: {
    title: 'MyVilla Africa – Luxury Property & Vacation Booking',
    badge: 'Hospitality & Booking Engine',
    architecture: `
      <h4><i class="fa-solid fa-hotel"></i> Vacation Booking Architecture</h4>
      <p>African luxury property reservation platform featuring real-time date availability, verified property amenities, and secure checkouts.</p>
      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Race Condition Prevention:</strong> Transactional database lock preventing simultaneous double-bookings.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Multi-Currency Gateway:</strong> Seamless checkout supporting card payments and bank transfers.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Host Telemetry:</strong> Dashboard for villa owners to manage calendars and booking rates.</li>
      </ul>
      <p><strong>Stack:</strong> React, Next.js, Node.js, MongoDB, Payment Gateway.</p>
      <p><strong>Live URL:</strong> <a href="https://myvillaafricaa.onrender.com/" target="_blank" style="color:var(--accent-ice);">myvillaafricaa.onrender.com</a></p>
    `
  },
  lunchio: {
    title: 'Lunchio – On-Demand Meal & Food Ordering Platform',
    badge: 'E-Commerce & Food Logistics',
    architecture: `
      <h4><i class="fa-solid fa-utensils"></i> Food Ordering & Kitchen Architecture</h4>
      <p>Meal subscription and digital food ordering system with automated queue dispatching and multi-channel customer receipts.</p>
      <h4><i class="fa-solid fa-bolt"></i> Technical Highlights</h4>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin: 0.75rem 0 1.25rem;">
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Real-Time Kitchen Queues:</strong> Preparation order updates streamed to kitchen staff dashboards.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Dynamic Menu Configuration:</strong> Real-time meal availability and price adjustments.</li>
        <li><i class="fa-solid fa-check" style="color:var(--accent-ice);"></i> <strong>Instant Checkout:</strong> Secure payment gateway authorization with instant invoice dispatch.</li>
      </ul>
      <p><strong>Stack:</strong> React, Node.js, Express, MongoDB, Payment Gateway.</p>
      <p><strong>Live URL:</strong> <a href="https://lunchio.onrender.com/" target="_blank" style="color:var(--accent-ice);">lunchio.onrender.com</a></p>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const viewBtns = document.querySelectorAll('.view-details-btn');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project');
      const data = projectDetails[pId];

      if (data) {
        modalContent.innerHTML = `
          <div style="margin-bottom: 1.25rem;">
            <span class="badge badge-subtle" style="margin-bottom: 0.5rem;">${data.badge}</span>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main);">${data.title}</h2>
          </div>
          <div>${data.architecture}</div>
          <div style="margin-top: 1.75rem; display: flex; justify-content: flex-end;">
            <a href="https://github.com/emmanuelchukwuemka" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              <i class="fa-brands fa-github"></i> View GitHub Repos
            </a>
          </div>
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===================================================================
   7. INTERACTIVE CLI TERMINAL SIMULATION
   =================================================================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const history = document.getElementById('terminal-history');
  const quickBtns = document.querySelectorAll('.quick-cmd-btn');
  const screen = document.getElementById('terminal-screen');

  if (!input || !history) return;

  const commands = {
    help: () => `
      <div class="cli-info" style="color:var(--accent-cyan); margin-bottom: 0.3rem;">Available Commands:</div>
      <div>  <span style="color:#f59e0b;">simulate-tx</span>   : Simulate high-concurrency payment switch transaction route</div>
      <div>  <span style="color:#f59e0b;">stats</span>         : View system throughput, uptime, and performance metrics</div>
      <div>  <span style="color:#f59e0b;">skills</span>        : Print core languages, frameworks, and fintech toolchain</div>
      <div>  <span style="color:#f59e0b;">experience</span>    : View Emmanuel's career roles & company history</div>
      <div>  <span style="color:#f59e0b;">projects</span>      : List production projects and architectures</div>
      <div>  <span style="color:#f59e0b;">contact</span>       : Display direct contact channels</div>
      <div>  <span style="color:#f59e0b;">clear</span>         : Clear terminal output</div>
    `,
    stats: () => `
      <div style="color:var(--accent-emerald); font-weight: 600;">[SYSTEM HEALTH: OPTIMAL]</div>
      <div>• Throughput Capacity : 10,000+ requests/sec (Goroutine pool)</div>
      <div>• Switch Latency       : 14.8ms average scheme transit</div>
      <div>• High Availability    : 99.9% uptime SLA</div>
      <div>• Total Exp            : 6+ Years (Java Spring Boot, Go, Python, Node.js)</div>
    `,
    skills: () => `
      <div style="color:var(--accent-ice); font-weight: 700;">=== Emmanuel's Core Tech Stack ===</div>
      <div>• Frontend & Full-Stack: Laravel (Inertia/Blade), Next.js (SSR/SSG), React.js, Vue.js (Vue 3/Nuxt), Tailwind CSS, TypeScript</div>
      <div>• Mobile App Engineering: Flutter (Dart), React Native, iOS & Android Deployments, BLoC, Riverpod, Redux</div>
      <div>• Backend & Systems: Java (Spring Boot), Go (Golang), Python (Flask/Django), Node.js, Express, Microservices</div>
      <div>• Fintech Infrastructure: Payment Switching Architecture, Gateway SaaS, Host/Scheme Routing, Concurrency</div>
      <div>• Cloud & Databases: PostgreSQL, MySQL, Redis In-Memory, MongoDB, Docker, Kubernetes, CI/CD Automation</div>
    `,
    experience: () => `
      <div><strong>1. UrbanPay (Jan 2021 – Dec 2024)</strong> - Senior Backend Developer (50% throughput scale boost)</div>
      <div><strong>2. Bolosom (2023 – Present)</strong> - Backend Developer (Java, Go, Laravel, Docker CI/CD)</div>
      <div><strong>3. IGHUB (2023 – Present)</strong> - Full-Stack Developer (React, Next.js, Django)</div>
      <div><strong>4. Ukamart (Sept 2022 – Present)</strong> - Website Manager (E-commerce & 40% maintenance automation)</div>
    `,
    projects: () => `
      <div style="color:var(--accent-ice); font-weight: 700;">=== Live Production Platforms & Systems ===</div>
      <div>1. <strong style="color:#ffffff;">BillFrame</strong> (<a href="https://www.billframe.com.ng" target="_blank" style="color:var(--accent-ice);">billframe.com.ng</a>) - Automated Invoicing & Payment Switch</div>
      <div>2. <strong style="color:#ffffff;">Ukamart</strong> (<a href="https://ukamart.com" target="_blank" style="color:var(--accent-ice);">ukamart.com</a>) - Multi-Vendor Retail Marketplace (40% Automation)</div>
      <div>3. <strong style="color:#ffffff;">MyShop24</strong> (<a href="https://myshop24.ng" target="_blank" style="color:var(--accent-ice);">myshop24.ng</a>) - 24/7 Digital Storefront Platform</div>
      <div>4. <strong style="color:#ffffff;">QuickDrop</strong> (<a href="https://www.quickdrop.ng" target="_blank" style="color:var(--accent-ice);">quickdrop.ng</a>) - On-Demand Logistics & Delivery Network</div>
      <div>5. <strong style="color:#ffffff;">TapConnect</strong> (<a href="https://tapconnect.ng" target="_blank" style="color:var(--accent-ice);">tapconnect.ng</a>) - Smart NFC & Digital Networking</div>
      <div>6. <strong style="color:#ffffff;">Migra</strong> (<a href="https://migra.ng" target="_blank" style="color:var(--accent-ice);">migra.ng</a>) - Global Mobility & Immigration Tech</div>
      <div>7. <strong style="color:#ffffff;">ResQLink</strong> (<a href="https://resqlink.org.ng" target="_blank" style="color:var(--accent-ice);">resqlink.org.ng</a>) - Rapid Emergency Response System</div>
      <div>8. <strong style="color:#ffffff;">SCCDR</strong> (<a href="http://sccdr.org.ng" target="_blank" style="color:var(--accent-ice);">sccdr.org.ng</a>) - Institutional Legal Dispute Resolution</div>
      <div>9. <strong style="color:#ffffff;">Zenith Edge</strong> (<a href="https://zenith-edge-investment.onrender.com/" target="_blank" style="color:var(--accent-ice);">zenith-edge-investment</a>) - Wealth & Asset Investment</div>
      <div>10. <strong style="color:#ffffff;">MyVilla Africa</strong> (<a href="https://myvillaafricaa.onrender.com/" target="_blank" style="color:var(--accent-ice);">myvillaafricaa</a>) - Luxury Villa & Vacation Booking</div>
      <div>11. <strong style="color:#ffffff;">Lunchio</strong> (<a href="https://lunchio.onrender.com/" target="_blank" style="color:var(--accent-ice);">lunchio.onrender.com</a>) - On-Demand Meal & Food Ordering</div>
      <div>12. <strong style="color:#ffffff;">Switch Engine</strong> - High-Concurrency Core Scheme Router (10,000+ RPS)</div>
    `,
    contact: () => `
      <div>Email    : <a href="mailto:nwekee125@gmail.com" style="color:var(--accent-cyan);">nwekee125@gmail.com</a></div>
      <div>Phone    : <a href="tel:+12148102921" style="color:var(--accent-cyan);">+1 (214) 810-2921</a></div>
      <div>Location : Umuahia, Abia, Nigeria</div>
      <div>GitHub   : <a href="https://github.com/emmanuelchukwuemka" target="_blank" style="color:var(--accent-cyan);">github.com/emmanuelchukwuemka</a></div>
    `,
    clear: () => {
      history.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Append command prompt line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.innerHTML = `<span class="terminal-prompt">guest@switch-node:$</span> ${escapeHTML(rawCmd)}`;
    history.appendChild(cmdLine);

    if (cmd === 'clear') {
      commands.clear();
      return;
    }

    if (cmd === 'simulate-tx') {
      simulateTransaction(history, screen);
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line';

    if (commands[cmd]) {
      outputLine.innerHTML = commands[cmd]();
    } else {
      outputLine.innerHTML = `<span style="color:#ef4444;">command not found: "${escapeHTML(cmd)}". Type <strong style="color:#f59e0b;">help</strong> for available commands.</span>`;
    }

    history.appendChild(outputLine);
    screen.scrollTop = screen.scrollHeight;
  }

  function simulateTransaction(historyContainer, screenElem) {
    const txId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
    const steps = [
      `[INGRESS] ➔ Incoming payment dispatch received (Card BIN: 5399-83xx)...`,
      `[ROUTER]  ➔ Scheme routing logic resolved destination: Interswitch / Visa Direct`,
      `[SECURITY]➔ Idempotency key verified in Redis cache (<1ms)`,
      `[WORKER]  ➔ Goroutine pool assigned task #G-${Math.floor(Math.random() * 500)}`,
      `[DISPATCH]➔ Forwarding ISO-8583 payload to core scheme switch...`,
      `<span style="color:var(--accent-emerald); font-weight:700;">[200 OK]  ➔ Transaction ${txId} APPROVED in 16.4ms (Host Latency: 11ms)</span>`
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = steps[currentStep];
        historyContainer.appendChild(line);
        screenElem.scrollTop = screenElem.scrollHeight;
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 280);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(input.value);
      input.value = '';
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ===================================================================
   8. COPY TO CLIPBOARD
   =================================================================== */
function initCopyActions() {
  const heroCopyBtn = document.getElementById('copy-email-hero');
  const directCopyBtn = document.getElementById('copy-email-btn');

  const copyEmail = () => {
    const email = 'nwekee125@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Copied email to clipboard: nwekee125@gmail.com');
    }).catch(() => {
      showToast('Failed to copy. Email: nwekee125@gmail.com');
    });
  };

  if (heroCopyBtn) heroCopyBtn.addEventListener('click', copyEmail);
  if (directCopyBtn) directCopyBtn.addEventListener('click', copyEmail);
}

/* ===================================================================
   9. CONTACT FORM
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Direct mailto fallback or simulated transmission
    const mailtoLink = `mailto:nwekee125@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    
    showToast(`Thank you ${name}! Opening your email client to dispatch message.`);
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 800);

    form.reset();
  });
}

/* ===================================================================
   10. TOAST NOTIFICATIONS
   =================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color:var(--accent-ice);"></i> ${message}`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/* ===================================================================
   11. SCROLL REVEAL OBSERVER (SLIDING ANIMATIONS)
   =================================================================== */
function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll('.reveal-slide-up, .reveal-slide-left, .reveal-slide-right');

  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    // If element is already in the upper viewport on initial load, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('is-revealed');
    } else {
      revealObserver.observe(el);
    }
  });
}

