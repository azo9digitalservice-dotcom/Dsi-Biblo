    /* ==========================================
       0. CONFIGURATION DU PARCOURS DE TÉLÉCHARGEMENT
       ========================================== */
    // Remplacez cette valeur par le lien réel du groupe WhatsApp.
    // Tant qu'elle est vide, la page d'invitation affiche un message
    // d'erreur propre au lieu d'un lien cassé.
    const CONFIG = {
      whatsappLink: "https://chat.whatsapp.com/H1ciMxRnW7s7Zw2xPMJf4S" // ex: "https://chat.whatsapp.com/VOTRE_CODE_ICI"
    };

    // Clé localStorage dédiée au déblocage WhatsApp.
    // Volontairement séparée des données des livres (booksData) :
    // elle ne stocke qu'un indicateur non sensible, jamais de données produit.
    const WHATSAPP_STORAGE_KEY = "biblio_whatsapp_access";

    const Storage = {
      hasWhatsAppAccess() {
        try {
          return localStorage.getItem(WHATSAPP_STORAGE_KEY) === "true";
        } catch (e) {
          // localStorage indisponible (navigation privée, etc.) : on ne bloque pas l'utilisateur.
          return false;
        }
      },
      grantWhatsAppAccess() {
        try {
          localStorage.setItem(WHATSAPP_STORAGE_KEY, "true");
        } catch (e) {
          /* silencieux : pas bloquant si le stockage n'est pas disponible */
        }
      }
    };

    /* ==========================================
       1. STRUCTURE DE DONNÉES STRICTE ET SANS INVENTIONS
       ========================================== */
    const booksData = [
      {
        id: "book-1",
        title: "Mathématiques pour les sciences de la vie - Tout le cours en fiches",
        author: "Claire David, Sami Mustapha, Frédéric Viens, Nathalie Capron",
        publisher: "Dunod",
        category: "Maths",
        level: "Licence · Prépas · CAPES",
        coverSrc: "1000254897.png",
        gridClass: "col-6", // Grand format Hero sur la grille
        downloadUrl: "https://drive.google.com/uc?export=download&id=11Z_zKTGutBk6mNYdumNW-9GOyYoCv83i" // Fichier source
      },
      {
        id: "book-2",
        title: "Physique PCSI - Tout-en-un (7e édition)",
        author: "Sous la direction de Stéphane Cardini (D. Jurine, B. Salamito, V. Bouland, R. Comte, F. Crépin, L. Gauthier, T. Morel, M. Sanz)",
        publisher: "Dunod - Collection J'intègre",
        category: "Physique",
        level: "PCSI",
        coverSrc: "1000254898.png",
        gridClass: "col-6",
        downloadUrl: "https://drive.google.com/uc?export=download&id=10ehhQQminv_3aanCGcQy_2bj0op7ipNX"
      },
      {
        id: "book-3",
        title: "Mounier - L'engagement politique",
        author: "Guy Coq",
        publisher: "Michalon - Le bien commun",
        category: "Politique",
        level: "Philosophie & Sciences Politiques",
        coverSrc: "1000254900.png",
        gridClass: "col-4",
        downloadUrl: "https://drive.google.com/uc?export=download&id=10agwT9_7XKuxLJglz_nHBBmqgpCQRs9s"
      },
      {
        id: "book-4",
        title: "Physique MP/MP*-MPI/MPI*-PT/PT* - Exercices incontournables (5e édition)",
        author: "Jean-Noël Beury",
        publisher: "Dunod - Collection J'intègre (Nouveaux programmes 2022)",
        category: "Physique",
        level: "MP / MP* / MPI / MPI* / PT / PT*",
        coverSrc: "1000254901.png",
        gridClass: "col-4",
        downloadUrl: "https://drive.google.com/uc?export=download&id=10XC88Y7B-mRB7tkdR-NqAqro9FT-2BG3"
      },
      {
        id: "book-5",
        title: "Physique PSI/PSI* - Entraînement intensif",
        author: "Jérémy Ferrand, Arnaud Le Diffon & coauteurs",
        publisher: "Vuibert - Prépas Scientifiques",
        category: "Physique",
        level: "PSI / PSI*",
        coverSrc: "1000254902.png",
        gridClass: "col-4",
        downloadUrl: "https://drive.google.com/uc?export=download&id=10N2lqNHRKI_kcmTw8Fym5Z-3eihuoRt6"
      },
      {
        id: "book-6",
        title: "Maths MP/MP*/MPI/MPI* - Parcours Prépas",
        author: "Sylvain Gugger, Gérard Rozsavolgyi, Laurent Pater, Henri Lemberg",
        publisher: "Ediscience (Nouveaux programmes)",
        category: "Maths",
        level: "MP / MP* / MPI / MPI*",
        coverSrc: "1000254903.png",
        gridClass: "col-3",
        downloadUrl: "https://drive.google.com/uc?export=download&id=10WLmMZyz8xFT1bm6EYnsIDoF0re9NfKw"
      },
      {
        id: "book-7",
        title: "Maths MP-MP* - Méthodes et exercices (4e édition)",
        author: "Jean-Marie Monier, Guillaume Haberer, Cécile Lardon",
        publisher: "Dunod - Collection J'intègre",
        category: "Maths",
        level: "MP - MP*",
        coverSrc: "1000254904.png",
        gridClass: "col-3",
        downloadUrl: "https://drive.google.com/uc?export=download&id=10RhWqQNH6wUp0_vhE2-TsqhloJ3fSaZT"
      },
      {
        id: "book-8",
        title: "Maths PCSI-PTSI - Méthodes et exercices (5e édition)",
        author: "Jean-Marie Monier, Guillaume Haberer, Cécile Lardon",
        publisher: "Dunod - Collection J'intègre",
        category: "Maths",
        level: "PCSI - PTSI",
        coverSrc: "1000254905.png",
        gridClass: "col-3",
        downloadUrl: "https://drive.google.com/uc?export=download&id=10OSYBNu6j7OfQGlHkwSBmb-S6iD6lRAt"
      },
      {
        id: "book-9",
        title: "Physique PCSI - Tout-en-un (7e édition - Complément)",
        author: "Sous la direction de Stéphane Cardini",
        publisher: "Dunod - Collection J'intègre",
        category: "Physique",
        level: "PCSI",
        coverSrc: "1000254906.png",
        gridClass: "col-3",
        downloadUrl: "https://drive.google.com/uc?export=download&id=1-URIYDwlQC5PBYRy6CtfVuVIxAwyaBsy"
      },
      {
        id: "book-10",
        title: "Colles de mathématiques MPSI/MP2I - 380 exercices corrigés",
        author: "Rémi Coutens",
        publisher: "Ellipses (Nouveaux programmes)",
        category: "Maths",
        level: "MPSI / MP2I",
        coverSrc: "1000254899.png",
        gridClass: "col-12", // Format étendu de clôture de collection
        downloadUrl: "https://drive.google.com/uc?export=download&id=1-RPrrjcujNNNE6Gd2Os2ohkkFpU98caN"
      }
    ];

    /* ==========================================
       2. GESTION DU RENDU DE LA GRILLE D'ACCUEIL
       ========================================== */
    const booksGrid = document.getElementById('booksGrid');
    const searchInput = document.getElementById('searchInput');
    const filterContainer = document.getElementById('filterContainer');

    let currentFilter = 'all';
    let currentSearchQuery = '';

    function renderBooks() {
      booksGrid.innerHTML = '';

      const filteredBooks = booksData.filter(book => {
        const matchesFilter = currentFilter === 'all' || book.category === currentFilter;
        const matchesSearch = book.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) ||
                              (book.author && book.author.toLowerCase().includes(currentSearchQuery.toLowerCase())) ||
                              book.publisher.toLowerCase().includes(currentSearchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      });

      if (filteredBooks.length === 0) {
        booksGrid.innerHTML = `
          <div style="grid-column: span 12; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
            Aucun ouvrage ne correspond à votre recherche.
          </div>
        `;
        return;
      }

      filteredBooks.forEach(book => {
        const card = document.createElement('article');
        card.className = `book-card ${book.gridClass}`;
        
        card.innerHTML = `
          <div class="book-card-inner">
            <div class="book-cover-wrapper">
              <img class="book-cover-img" src="${book.coverSrc}" alt="Couverture du livre ${book.title}" loading="lazy">
            </div>
            <div class="book-publisher-tag">${book.publisher}</div>
            <h3 class="book-title">${book.title}</h3>
            ${book.author ? `<div class="book-author">${book.author}</div>` : ''}
            <div class="book-meta">
              <button class="btn-detail" onclick="openModal('${book.id}')">
                <span>Voir le livre</span>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>
              <button class="btn-download-sm" onclick="startDownloadFlow('${book.id}')" aria-label="Télécharger ${book.title}">Télécharger</button>
            </div>
          </div>
        `;
        booksGrid.appendChild(card);
      });
    }

    /* ==========================================
       3. INTERACTION FILTRES & RECHERCHE
       ========================================== */
    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('pill-btn')) {
        document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.getAttribute('data-filter');
        renderBooks();
      }
    });

    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderBooks();
    });

    /* ==========================================
       4. GESTION DE LA MODALE / VUE DÉTAILLÉE
       ========================================== */
    const bookModal = document.getElementById('bookModal');
    const modalContent = document.getElementById('modalContent');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    function openModal(bookId) {
      const book = booksData.find(b => b.id === bookId);
      if (!book) return;

      // Sélection de 3 autres livres pour la zone de découverte
      const relatedBooks = booksData.filter(b => b.id !== book.id).slice(0, 3);

      modalContent.innerHTML = `
        <div class="modal-grid">
          <div>
            <div class="modal-cover-wrapper">
              <img src="${book.coverSrc}" alt="Couverture originale de ${book.title}">
            </div>
          </div>

          <div>
            <div class="modal-info-publisher">${book.publisher}</div>
            <h2 class="modal-info-title">${book.title}</h2>
            ${book.author ? `<div class="modal-info-author">Auteur(s) : ${book.author}</div>` : ''}

            ${book.level ? `
              <div class="modal-field">
                <div class="modal-field-label">Niveau & Programme</div>
                <div class="modal-field-value">${book.level}</div>
              </div>
            ` : ''}

            <div class="modal-field">
              <div class="modal-field-label">Domaine / Discipline</div>
              <div class="modal-field-value">${book.category}</div>
            </div>

            <div class="modal-download-box">
              <button class="btn-download-main" onclick="startDownloadFlow('${book.id}')">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <span>Télécharger l'ouvrage</span>
              </button>
            </div>
          </div>
        </div>

        <div class="modal-related">
          <h3 class="related-title">Autres ouvrages de la collection</h3>
          <div class="related-grid">
            ${relatedBooks.map(rel => `
              <div class="related-card" onclick="openModal('${rel.id}')">
                <img src="${rel.coverSrc}" class="related-thumb" alt="${rel.title}">
                <div class="related-info-title">${rel.title}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      bookModal.classList.add('active');
      bookModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      bookModal.classList.remove('active');
      bookModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    bookModal.addEventListener('click', (e) => {
      if (e.target === bookModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bookModal.classList.contains('active')) {
        closeModal();
      }
    });

    /* ==========================================
       5. PARCOURS DE TÉLÉCHARGEMENT CONTRÔLÉ
       Livre -> invitation WhatsApp -> transition -> fiche complète -> téléchargement
       Basé sur des routes en hash (#/...), fonctionne sur n'importe quel
       hébergement statique sans configuration serveur particulière.
       ========================================== */

    const viewCollection = document.getElementById('view-collection');
    const viewFlow = document.getElementById('view-flow');

    function findBook(bookId) {
      return booksData.find(b => b.id === bookId);
    }

    function getFileFormat(url) {
      if (!url || url.indexOf('.') === -1) return '';
      const ext = url.split('.').pop();
      return ext ? ext.toUpperCase() : '';
    }

    function navigateTo(hash) {
      window.location.hash = hash;
    }

    function showCollectionView() {
      viewCollection.hidden = false;
      viewFlow.hidden = true;
      viewFlow.innerHTML = '';
    }

    function showFlowView(html) {
      viewCollection.hidden = true;
      viewFlow.hidden = false;
      viewFlow.innerHTML = html;
      window.scrollTo(0, 0);
    }

    function renderErrorView(message, backHash) {
      return `
        <div class="flow-step">
          <div class="flow-card flow-card-error">
            <h1 class="flow-title">Oups.</h1>
            <p class="flow-text">${message}</p>
            <a href="${backHash || '#/'}" class="btn-explore flow-btn-main">Retour à la collection</a>
          </div>
        </div>
      `;
    }

    // Point d'entrée : décide de renvoyer vers l'étape WhatsApp ou
    // directement vers la fiche du livre selon le statut local.
    // Appelé par les boutons "Télécharger" ET par la route /telechargement/:bookId
    // (ouverture directe de l'URL).
    function startDownloadFlow(bookId) {
      if (typeof closeModal === 'function') closeModal();
      const book = findBook(bookId);
      if (!book) {
        showFlowView(renderErrorView("Ce livre n'est pas disponible.", '#/'));
        return;
      }
      if (Storage.hasWhatsAppAccess()) {
        navigateTo(`#/livre/${book.id}`);
      } else {
        navigateTo(`#/telechargement/${book.id}/whatsapp`);
      }
    }

    // Route /telechargement/:bookId ouverte directement (sans passer par un clic) :
    // même décision, mais on remplace l'URL au lieu d'empiler une entrée d'historique.
    function enterDownloadFlow(bookId) {
      const book = findBook(bookId);
      if (!book) {
        showFlowView(renderErrorView("Ce livre n'est pas disponible.", '#/'));
        return;
      }
      const target = Storage.hasWhatsAppAccess()
        ? `#/livre/${book.id}`
        : `#/telechargement/${book.id}/whatsapp`;
      history.replaceState(null, '', target);
      renderRoute();
    }

    // PAGE 1 — Invitation à rejoindre le groupe WhatsApp
    function renderWhatsAppPage(bookId) {
      const book = findBook(bookId);
      if (!book) {
        showFlowView(renderErrorView("Ce livre n'est pas disponible.", '#/'));
        return;
      }
      const linkAvailable = !!CONFIG.whatsappLink;
      showFlowView(`
        <div class="flow-step">
          <a href="#/" class="flow-back">← Retour à la collection</a>
          <div class="flow-card">
            <div class="flow-tag">Étape 1 sur 3</div>
            <h1 class="flow-title">Avant de télécharger votre livre</h1>
            <p class="flow-text">
              Pour accéder au téléchargement de « ${book.title} », rejoignez d'abord notre
              groupe WhatsApp. Cette étape ne vous sera demandée qu'une seule fois sur cet appareil.
            </p>
            ${linkAvailable ? `
              <button class="btn-explore flow-btn-main" onclick="handleJoinWhatsApp('${book.id}')">
                Rejoindre le groupe WhatsApp
              </button>
            ` : `
              <p class="flow-error">Le lien du groupe WhatsApp n'est pas encore configuré.</p>
            `}
          </div>
        </div>
      `);
    }

    // Action du bouton "Rejoindre le groupe WhatsApp" :
    // ouvre le lien réel, puis mémorise localement le déblocage.
    // Limite assumée : on ne peut pas vérifier depuis le navigateur qu'un
    // utilisateur a réellement rejoint un groupe WhatsApp privé — le
    // déblocage est basé sur l'action de clic, pas sur une vérification serveur.
    function handleJoinWhatsApp(bookId) {
      if (CONFIG.whatsappLink) {
        window.open(CONFIG.whatsappLink, '_blank', 'noopener');
      }
      Storage.grantWhatsAppAccess();
      navigateTo(`#/telechargement/${bookId}/continuer`);
    }

    // PAGE 2 — Transition / confirmation
    function renderTransitionPage(bookId) {
      const book = findBook(bookId);
      if (!book) {
        showFlowView(renderErrorView("Ce livre n'est pas disponible.", '#/'));
        return;
      }
      showFlowView(`
        <div class="flow-step">
          <a href="#/" class="flow-back">← Retour à la collection</a>
          <div class="flow-card">
            <div class="flow-tag">Étape 2 sur 3</div>
            <div class="flow-cover-wrapper">
              <img src="${book.coverSrc}" alt="Couverture de ${book.title}">
            </div>
            <h1 class="flow-title">Accès débloqué</h1>
            <p class="flow-text">
              Vous pouvez maintenant consulter la fiche complète de « ${book.title} ».
            </p>
            <button class="btn-explore flow-btn-main" onclick="navigateTo('#/livre/${book.id}')">
              Continuer vers le livre
            </button>
          </div>
        </div>
      `);
    }

    // PAGE 3 — Fiche complète du livre
    function renderBookPage(bookId) {
      const book = findBook(bookId);
      if (!book) {
        showFlowView(renderErrorView("Ce livre n'est pas disponible.", '#/'));
        return;
      }
      const fileFormat = getFileFormat(book.downloadUrl);
      showFlowView(`
        <div class="flow-step flow-step-book">
          <a href="#/" class="flow-back">← Retour à la collection</a>
          <div class="book-detail-card">
            <div class="book-detail-cover-wrapper">
              <img src="${book.coverSrc}" alt="Couverture de ${book.title}">
            </div>
            <div>
              <div class="modal-info-publisher">${book.publisher}</div>
              <h1 class="book-detail-title">${book.title}</h1>
              ${book.author ? `<div class="modal-info-author">Auteur(s) : ${book.author}</div>` : ''}

              ${book.level ? `
                <div class="modal-field">
                  <div class="modal-field-label">Niveau & Programme</div>
                  <div class="modal-field-value">${book.level}</div>
                </div>
              ` : ''}

              <div class="modal-field">
                <div class="modal-field-label">Domaine / Discipline</div>
                <div class="modal-field-value">${book.category}</div>
              </div>

              ${fileFormat ? `
                <div class="modal-field">
                  <div class="modal-field-label">Format du fichier</div>
                  <div class="modal-field-value">${fileFormat}</div>
                </div>
              ` : ''}

              ${book.fileSize ? `
                <div class="modal-field">
                  <div class="modal-field-label">Taille du fichier</div>
                  <div class="modal-field-value">${book.fileSize}</div>
                </div>
              ` : ''}

              <div class="modal-download-box">
                <button class="btn-download-main" onclick="downloadFinal('${book.id}')">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span>Télécharger le livre</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `);
    }

    // Déclenchement réel du téléchargement, uniquement depuis la fiche complète.
    // Revérifie le déblocage : ouvrir directement l'URL de la fiche ne permet
    // pas de contourner l'étape WhatsApp.
    function downloadFinal(bookId) {
      const book = findBook(bookId);
      if (!book) {
        showFlowView(renderErrorView("Ce livre n'est pas disponible.", '#/'));
        return;
      }
      if (!Storage.hasWhatsAppAccess()) {
        navigateTo(`#/telechargement/${book.id}/whatsapp`);
        return;
      }
      if (!book.downloadUrl) {
        showFlowView(renderErrorView(
          "Le fichier de téléchargement n'est pas encore disponible.",
          `#/livre/${book.id}`
        ));
        return;
      }
      const link = document.createElement('a');
      link.href = book.downloadUrl;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    // Table des routes. Les motifs les plus spécifiques (whatsapp/continuer)
    // sont vérifiés avant le motif générique /telechargement/:bookId.
    const ROUTES = [
      { pattern: /^#\/telechargement\/([^/]+)\/whatsapp$/, handler: renderWhatsAppPage },
      { pattern: /^#\/telechargement\/([^/]+)\/continuer$/, handler: renderTransitionPage },
      { pattern: /^#\/telechargement\/([^/]+)$/, handler: enterDownloadFlow },
      { pattern: /^#\/livre\/([^/]+)$/, handler: renderBookPage }
    ];

    function renderRoute() {
      const hash = window.location.hash || '';

      // Hash vide ou racine explicite ("#/") : vue collection par défaut.
      if (hash === '' || hash === '#' || hash === '#/') {
        showCollectionView();
        return;
      }

      // Un hash qui n'appartient pas au routeur (ex: "#collection", ancre de
      // navigation existante) n'est pas de notre ressort : on laisse le
      // comportement natif du navigateur faire son travail.
      if (!hash.startsWith('#/')) {
        return;
      }

      for (const route of ROUTES) {
        const match = hash.match(route.pattern);
        if (match) {
          route.handler(decodeURIComponent(match[1]));
          return;
        }
      }

      // Route inconnue sous #/...
      showFlowView(renderErrorView('Page introuvable.', '#/'));
    }

    window.addEventListener('hashchange', renderRoute);

    // Initialisation
    renderBooks();
    renderRoute();
