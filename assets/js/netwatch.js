/* ============================================================
   NETWATCH.JS — Shared Functions & Component Injection
   Handles: nav, footer, mobile menu, tier accordion
   ============================================================ */


// ── NAV LINK DEFINITIONS ──
// Edit here to update nav across all pages simultaneously
const NW_NAV_LINKS = [
  { href: 'services.html',           label: 'Services',       id: 'services'     },
  { href: 'index.html#how-it-works', label: 'How It Works',   id: 'how-it-works' },
  { href: 'why.html',                label: 'Why NetWatch?',  id: 'why'          },
  { href: 'demo.html',               label: 'Demo',           id: 'demo'         },
  { href: 'about.html',              label: 'About',          id: 'about'        },
];

// ── FOOTER LINK DEFINITIONS ──
// Edit here to update footer across all pages simultaneously
const NW_FOOTER_LINKS = [
  { href: 'index.html',    label: 'Home'          },
  { href: 'why.html',      label: 'Why NetWatch'  },
  { href: 'services.html', label: 'Services'      },
  { href: 'demo.html',     label: 'Demo'          },
  { href: 'about.html',    label: 'About'         },
  { href: 'contact.html',  label: 'Contact'       },
  { href: 'privacy.html',  label: 'Privacy'       },
];


// ── NAV INJECTION ──
function injectNav(activePage) {
  const container = document.getElementById('site-nav');
  if (!container) return;

  const desktopLinks = NW_NAV_LINKS.map(link => {
    const active = link.id === activePage ? ' class="active"' : '';
    return `      <li><a href="${link.href}"${active}>${link.label}</a></li>`;
  }).join('\n');

  const ctaActive = activePage === 'contact' ? ' active' : '';

  const mobileLinks = NW_NAV_LINKS.map(link =>
    `    <a href="${link.href}" onclick="toggleMenu()">${link.label}</a>`
  ).join('\n');

  // Inject nav HTML inside the container
  container.innerHTML = `
  <nav>
    <a href="index.html" class="nav-logo">
      <span class="logo-bracket">[</span>NET<span>WATCH</span><span class="logo-bracket">]</span>
    </a>
    <ul class="nav-links">
${desktopLinks}
      <li><a href="contact.html" class="nav-cta${ctaActive}">Get Started</a></li>
    </ul>
    <button class="nav-hamburger" aria-label="Toggle menu" onclick="toggleMenu()">
      <span></span><span></span><span></span>
    </button>
  </nav>`;

  // Mobile menu injected as sibling after site-nav, not inside it
  container.insertAdjacentHTML('afterend', `
  <div class="mobile-menu" id="mobileMenu">
${mobileLinks}
    <a href="contact.html" class="nav-cta" onclick="toggleMenu()">Get Started</a>
  </div>`);
}


// ── FOOTER INJECTION ──
function injectFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  const links = NW_FOOTER_LINKS.map(link =>
    `        <li><a href="${link.href}">${link.label}</a></li>`
  ).join('\n');

  el.outerHTML = `
  <footer>
    <div class="footer-inner">
      <span class="footer-brand">[NET<span>WATCH</span>]</span>
      <ul class="footer-links">
${links}
      </ul>
      <span class="footer-copy">&copy; 2026 NetWatch | All rights reserved</span>
    </div>
  </footer>`;
}


// ── MOBILE MENU TOGGLE ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}


// ── TIER ACCORDION ──
function setTierHeight(tier, open) {
  const body = tier.querySelector('.tier-body');
  if (body) body.style.maxHeight = open ? body.scrollHeight + 'px' : '0';
}

function toggleTier(id) {
  const tier = document.getElementById(id);
  if (!tier) return;
  const wasActive = tier.classList.contains('active');
  document.querySelectorAll('.tier').forEach(t => {
    t.classList.remove('active');
    setTierHeight(t, false);
  });
  if (!wasActive) {
    tier.classList.add('active');
    setTierHeight(tier, true);
    setTimeout(() => {
      tier.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  }
}


// ── DOM READY ──
document.addEventListener('DOMContentLoaded', function () {

  // Inject nav
  const navContainer = document.getElementById('site-nav');
  if (navContainer) injectNav(navContainer.dataset.active || '');

  // Inject footer
  injectFooter();

  // Mobile menu outside-click close
  document.addEventListener('click', function (e) {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.nav-hamburger');
    if (
      menu &&
      menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      hamburger &&
      !hamburger.contains(e.target)
    ) {
      menu.classList.remove('open');
    }
  });

  // Auto-init tier accordion if present (index.html)
  const t1 = document.getElementById('tier1');
  if (t1) {
    t1.classList.add('active');
    setTierHeight(t1, true);
  }

});
