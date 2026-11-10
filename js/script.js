/**
 * MS. - Hospitality General Cashier Portfolio
 * Interactive Functionality & Recruiter Workflows
 * Client: Miriyala Sudheer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Bar
  const headerNav = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Navigation Drawer
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (menuToggle) menuToggle.classList.add('open');
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (menuToggle) menuToggle.classList.remove('open');
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.openMobileMenu = openMobileMenu;
  window.closeMobileMenu = closeMobileMenu;

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobileMenu();
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          setTimeout(() => {
            const headerHeight = headerNav ? headerNav.offsetHeight : 68;
            const top = targetElem.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
          }, 150);
        }
      }
    });
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-menu .nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // 4. Toast Notification Helper
  const toast = document.getElementById('toastNotice');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 5. Copy to Clipboard Utility
  window.copyText = function(text, label) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} copied to clipboard!`);
      }).catch(() => {
        fallbackCopyText(text, label);
      });
    } else {
      fallbackCopyText(text, label);
    }
  };

  function fallbackCopyText(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`${label} copied to clipboard!`);
  }

  // 6. Generic Modal Handler
  const modals = document.querySelectorAll('.modal-overlay');
  
  window.openModal = function(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.remove('active');
      document.body.style.overflow = '';
      if (modalId === 'retroPrinterModal') {
        isPrinting = false;
      }
    }
  };

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (modal.id === 'retroPrinterModal') {
          isPrinting = false;
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => modal.classList.remove('active'));
      closeMobileMenu();
      document.body.style.overflow = '';
      isPrinting = false;
    }
  });

  // 7. Competency Data & Modal Inspection
  const competencyData = {
    'cash-handling': {
      title: 'Cash Handling & Safe Storage',
      icon: 'shield-check',
      summary: 'Currency management, cash custody and float balances',
      details: [
        'Safe Float Custody: Managing daily cashier cash float with strict morning handovers and evening secure safe drops.',
        'Denomination Control: Systematic sorting, bundling, and counterfeit detection compliance per RBI / hospitality standards.',
        'Safe Custody SOPs: Dual-custody protocols for hotel master vault access and shift change register transfers.',
        'Float Balances: Maintaining predetermined cash liquidity to ensure uninterrupted checkout operations during high occupancy.'
      ]
    },
    'pos-operations': {
      title: 'Cash Register Operations',
      icon: 'calculator',
      summary: 'POS billing, receipts and drawer balancing',
      details: [
        'POS & PMS Billing: Operating front office point-of-sale systems, posting room charges, restaurant folios, and guest incidentals.',
        'Itemized Invoicing: Generating accurate tax invoices, guest folios, advance payment receipts, and corporate bill settlements.',
        'Drawer Balancing: Conducting count sheets at shift beginning and end, eliminating unaccounted surplus or deficits.',
        'Speed & Precision: Rapid bill generation to prevent queues at the front desk during peak morning checkouts.'
      ]
    },
    'card-transactions': {
      title: 'Credit & Debit Transactions',
      icon: 'credit-card',
      summary: 'Card processing and transaction settlement',
      details: [
        'EDC & Card Terminal Management: Processing Visa, MasterCard, RuPay, Amex, UPI QR codes, and digital wallets.',
        'Split Folio Settlements: Flawlessly executing multi-party and split cash/card payments for family and corporate bookings.',
        'Batch Settlements: Daily electronic terminal batch closing and matching EDC settlement slips with PMS system totals.',
        'Chargeback Prevention: Ensuring signatures, pre-authorizations, and guest identity checks match hotel compliance standards.'
      ]
    },
    'transaction-accuracy': {
      title: 'Transaction Accuracy & Reconciliation',
      icon: 'check-circle-2',
      summary: 'Daily reconciliation and discrepancy control',
      details: [
        'Shift Reconciliation: Comparing physical cash drawer balance against PMS shift summary reports.',
        'Discrepancy Investigation: Immediate identification and root-cause resolution of any variances before shift handover.',
        'Night Audit Verification: Assisting the Night Auditor with closing journal entries, room revenue reconciliations, and daily banking reports.',
        'Audit Documentation: Maintaining organized binders of paid folios, credit card slips, refund approvals, and void logs.'
      ]
    },
    'team-leadership': {
      title: 'Team Leadership & Training',
      icon: 'users',
      summary: 'Staff supervision and operational guidance',
      details: [
        'Shift Supervision: Led cashier staff across mountain resort and heritage properties (Kedarnath & Manali).',
        'SOP Onboarding: Trained junior cashiers and front-desk trainees on cash register handling and guest communication.',
        'Shift Scheduling: Organized cashier coverage to ensure seamless coverage during check-in surges and dining peak hours.',
        'Supply Management: Maintained adequate reserves of thermal printer rolls, receipt books, change floats, and audit registers.'
      ]
    },
    'complaint-resolution': {
      title: 'Guest Complaint Resolution',
      icon: 'smile',
      summary: 'Guest billing queries and service assistance',
      details: [
        'Courteous Dispute Handling: De-escalating billing confusion calmly, reviewing itemized room tariffs and minibar/restaurant charges.',
        'Folio Corrections: Coordinating with Front Office Managers to rectify erroneous charges and issue authorized adjustments.',
        'Prompt Guest Support: Providing warm, respectful hospitality service to ensure departing guests leave with total satisfaction.',
        'Front-Desk Alignment: Bridging communication between Housekeeping, F&B, and Cashiering for seamless guest departures.'
      ]
    }
  };

  window.openCompetencyModal = function(key) {
    const data = competencyData[key];
    if (!data) return;

    document.getElementById('compModalTitle').textContent = data.title;
    document.getElementById('compModalSubtitle').textContent = data.summary;

    const listContainer = document.getElementById('compModalDetails');
    listContainer.innerHTML = '';

    data.details.forEach(item => {
      const li = document.createElement('li');
      li.style.marginBottom = '12px';
      li.style.position = 'relative';
      li.style.paddingLeft = '22px';
      li.style.fontSize = '0.94rem';
      li.style.color = 'var(--color-text-main)';
      li.style.lineHeight = '1.6';

      const dot = document.createElement('span');
      dot.style.position = 'absolute';
      dot.style.left = '0';
      dot.style.top = '8px';
      dot.style.width = '7px';
      dot.style.height = '7px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = 'var(--color-gold)';

      li.appendChild(dot);
      
      const parts = item.split(': ');
      if (parts.length > 1) {
        const strong = document.createElement('strong');
        strong.textContent = parts[0] + ': ';
        strong.style.color = 'var(--color-heading)';
        li.appendChild(strong);
        li.appendChild(document.createTextNode(parts.slice(1).join(': ')));
      } else {
        li.appendChild(document.createTextNode(item));
      }

      listContainer.appendChild(li);
    });

    openModal('competencyModal');
  };

  // 8. Experience Lightbox Preview
  const expPhotos = {
    'exp1': {
      title: 'Best Western Ramachandra, Visakhapatnam',
      sub: 'Front Desk Cashier & Night Audit Station (Aug 2025 – Jan 2026)',
      src: 'assets/images/experience-1.jpg'
    },
    'exp2': {
      title: 'Hotel Shivalik, Kedarnath',
      sub: 'Cashier Manager Safe Custody & Register Operations (Feb 2024 – Mar 2025)',
      src: 'assets/images/experience-2.jpg'
    },
    'exp3': {
      title: 'Hotel NEW SHIVALIK, Manali',
      sub: 'Departmental Revenue & Register Balancing (Feb 2022 – Nov 2023)',
      src: 'assets/images/experience-3.jpg'
    }
  };

  window.openExperienceLightbox = function(key) {
    const data = expPhotos[key];
    if (!data) return;

    document.getElementById('lightboxImg').src = data.src;
    document.getElementById('lightboxCaptionTitle').textContent = data.title;
    document.getElementById('lightboxCaptionSub').textContent = data.sub;

    openModal('lightboxModal');
  };

  // 9. Recruiter Direct Inquiry Form Handler
  const recruiterForm = document.getElementById('recruiterForm');
  if (recruiterForm) {
    recruiterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('recruiterName').value.trim();
      const hotel = document.getElementById('recruiterHotel').value.trim();
      const role = document.getElementById('recruiterRole').value;
      const phone = document.getElementById('recruiterPhone').value.trim();
      const email = document.getElementById('recruiterEmail').value.trim();
      const notes = document.getElementById('recruiterNotes').value.trim();

      const subject = encodeURIComponent(`Hospitality Vacancy Inquiry: ${role} at ${hotel}`);
      const body = encodeURIComponent(
        `Dear Sudheer,\n\n` +
        `I am reaching out regarding a vacancy at ${hotel}.\n\n` +
        `Candidate Target Role: ${role}\n` +
        `Recruiter Name: ${name}\n` +
        `Hotel / Property: ${hotel}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n\n` +
        `Message / Details:\n${notes}\n\n` +
        `Looking forward to connecting with you.`
      );

      // Open mail client
      window.location.href = `mailto:sudheer4chinnu@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client to send inquiry...');
    });
  }

  // 10. WhatsApp Pre-filled Quick Opener
  window.sendWhatsAppInquiry = function() {
    const hotel = document.getElementById('recruiterHotel') ? document.getElementById('recruiterHotel').value.trim() : '';
    const role = document.getElementById('recruiterRole') ? document.getElementById('recruiterRole').value : 'General Cashier';
    
    let text = `Hello Sudheer, I am reaching out regarding a ${role} position.`;
    if (hotel) {
      text = `Hello Sudheer, I am contacting you regarding a ${role} opening at ${hotel}. When is a good time to speak?`;
    }
    const url = `https://wa.me/918008974092?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // 11. Resume Print / Download Action
  window.triggerResumeDownload = function() {
    const link = document.createElement('a');
    link.href = 'assets/documents/sudheer-resume.pdf';
    link.download = 'Miriyala_Sudheer_Hospitality_General_Cashier_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Resume download initiated.');
  };

  // 12. Web Audio API Luxury Sound Synthesizer (Zero External Dependencies)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playHotelChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.9);
      });
    } catch (e) {
      // Audio fallback silent
    }
  }

  function playClocheChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime); // D6
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      // Audio fallback silent
    }
  }

  function playDrawerChime() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      // Register bell ding
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // 13. FULLSCREEN 3D GRAND HOTEL DOORS CONTROLLER
  // The whole page starts closed behind the double 3D doors.
  // Clicking opens them in 3D perspective to reveal the interior.
  const grandPortal = document.getElementById('grandEntrancePortal');

  window.openGrandDoors = function() {
    if (!grandPortal || grandPortal.classList.contains('doors-opening')) return;

    grandPortal.classList.add('doors-opening');
    playHotelChime();
    showToast('Welcome to Miriyala Sudheer\'s Hospitality Suite!');

    // Unlock body scrolling smoothly
    document.body.classList.remove('doors-locked');

    setTimeout(() => {
      grandPortal.classList.add('doors-parted');
    }, 850);
  };

  window.closeGrandDoors = function() {
    if (!grandPortal) return;

    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.classList.add('doors-locked');
    grandPortal.classList.remove('doors-parted');

    setTimeout(() => {
      grandPortal.classList.remove('doors-opening');
      playDrawerChime();
      showToast('Grand hotel doors closed.');
    }, 60);
  };

  // 14. 3D RETRO DOT-MATRIX PRINTER ANIMATION FOR RESUME DOWNLOAD
  // Shows a retro printer with paper feeding out line-by-line before triggering PDF download.
  let isPrinting = false;

  function playDotMatrixSound(durationMs) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return null;
      // Rapid staccato bursts simulating dot-matrix print head
      const bufferSize = ctx.sampleRate * (durationMs / 1000);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        // Create rhythmic clicking pattern
        const t = i / ctx.sampleRate;
        const clickFreq = 45; // clicks per second
        const clickPhase = (t * clickFreq) % 1;
        if (clickPhase < 0.15) {
          data[i] = (Math.random() * 2 - 1) * 0.06 * (1 - clickPhase / 0.15);
        } else {
          data[i] = 0;
        }
        // Add subtle carriage movement noise every ~0.4s
        const carriagePhase = (t * 2.5) % 1;
        if (carriagePhase < 0.08) {
          data[i] += (Math.random() * 2 - 1) * 0.03;
        }
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(ctx.currentTime);
      return source;
    } catch (e) {
      return null;
    }
  }

  function playPrintDingSound() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      // Classic typewriter/printer "ding" bell
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2093, ctx.currentTime); // C7 high bell
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      // Audio fallback silent
    }
  }

  window.triggerRetroPrint = function() {
    if (isPrinting) return;
    isPrinting = true;

    const modal = document.getElementById('retroPrinterModal');
    const paperOutput = document.getElementById('printerPaperOutput');
    const printedContent = document.getElementById('printedContent');
    const statusText = document.getElementById('printerStatusText');
    
    if (!modal) {
      // Fallback: just download directly
      triggerResumeDownload();
      isPrinting = false;
      return;
    }

    // Open the printer modal
    openModal('retroPrinterModal');

    // Reset state
    paperOutput.classList.remove('printing', 'print-complete');
    const allLines = printedContent.querySelectorAll('.print-line');
    allLines.forEach(line => {
      line.classList.remove('printed');
    });

    statusText.innerHTML = '<i data-lucide="loader"></i> Warming up printer...';
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }

    // Start printing after a brief warmup delay
    setTimeout(() => {
      statusText.innerHTML = '<i data-lucide="printer"></i> Printing resume...';
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
      
      paperOutput.classList.add('printing');

      // Start dot-matrix sound
      const totalPrintTime = allLines.length * 120 + 800;
      const printSound = playDotMatrixSound(totalPrintTime);

      // Reveal lines one by one
      allLines.forEach((line, idx) => {
        setTimeout(() => {
          line.classList.add('printed');
        }, idx * 120);
      });

      // After all lines printed
      setTimeout(() => {
        paperOutput.classList.add('print-complete');
        if (printSound) {
          try { printSound.stop(); } catch(e) {}
        }
        playPrintDingSound();
        
        statusText.innerHTML = '<i data-lucide="check-circle-2"></i> Print complete! Downloading PDF...';
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
          lucide.createIcons();
        }
        showToast('Resume printed! Downloading PDF document...');
        
        // Trigger actual download
        setTimeout(() => {
          triggerResumeDownload();
          isPrinting = false;
        }, 1200);
      }, allLines.length * 120 + 600);
    }, 1000);
  };

  // 15. Initialize Lucide Icons if available
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
});

