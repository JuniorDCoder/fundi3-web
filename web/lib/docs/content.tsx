import type { ReactNode } from "react";

export interface Doc {
  slug: string;
  title: string;
  titleFr: string;
  category: string;
  categoryFr: string;
  readingTime: number;
  lastUpdated: string;
  content: ReactNode;
  contentFr: ReactNode;
}

// ─── "What is blockchain?" ────────────────────────────────────────────────────

const blockchainEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Imagine a village that keeps a communal record book — a big ledger where every transaction,
      every loan, every Njangi contribution is written down. Everyone in the village can read it,
      but no single person can secretly go back and change an old entry. That record book is a
      blockchain.
    </p>

    <h2>What is a block?</h2>
    <p>
      Each <strong>block</strong> is one page in that record book. It contains:
    </p>
    <ul>
      <li>A list of transactions (who sent what to whom)</li>
      <li>A timestamp (when it was written)</li>
      <li>A unique fingerprint called a <strong>hash</strong></li>
      <li>The fingerprint of the previous page (<strong>previous hash</strong>)</li>
    </ul>
    <p>
      That last point is what makes it a <em>chain</em>. Each page references the page before it,
      all the way back to the very first page (the &ldquo;genesis block&rdquo;). If you try to
      secretly change page 50, its fingerprint changes — which breaks the reference on page 51,
      which breaks page 52, and so on. The entire village notices immediately.
    </p>

    <CodeBlock>{`const block = {
  index:    50,
  data:     "Njangi: Amara → Marie 25,000 FCFA",
  timestamp: "2025-06-01T09:00:00Z",
  hash:     "0x4a2f9c…",
  prevHash: "0x9e1b3d…"  // fingerprint of block 49
}`}</CodeBlock>

    <h2>What is decentralisation?</h2>
    <p>
      In a traditional bank, one company holds the record book. If their computer breaks — or if
      they decide to freeze your account — you&rsquo;re stuck.
    </p>
    <p>
      A blockchain gives <em>thousands of computers</em> around the world an identical copy of the
      record book. To add a new page, most of those computers must agree it&rsquo;s valid. This is
      called <strong>consensus</strong>. No single government, company, or person can unilaterally
      change the history.
    </p>

    <h2>The Njangi example</h2>
    <p>
      A <strong>Njangi</strong> (tontine) is a rotating savings group common across Cameroon and
      Central Africa. Each month, every member contributes — say 10,000 FCFA — and one member
      receives the full pot. You trust the group because everyone knows the rules and watches each
      other.
    </p>
    <p>
      Now imagine a Njangi where the rules are written in code, the contributions are tracked
      automatically, and no one can cheat because the record is public and tamper-proof. That&rsquo;s
      a <strong>Njangi DApp</strong> — and you&rsquo;ll build one in the{" "}
      <a href="/courses" style={{ color: "#1D9E75" }}>Njangi on the Blockchain</a> course.
    </p>

    <h2>Why does this matter for Africa?</h2>
    <p>
      Across Africa, millions of people lack access to traditional banking — but they have
      smartphones and mobile money. Blockchain removes the need for a central bank or intermediary.
      It enables:
    </p>
    <ul>
      <li>Cross-border payments without 15% remittance fees</li>
      <li>Programmable savings groups (Njangi) with automatic payouts</li>
      <li>Verifiable credentials that can&rsquo;t be forged or lost</li>
      <li>Access to DeFi products without a bank account</li>
    </ul>

    <h2>Quick summary</h2>
    <table>
      <thead>
        <tr>
          <th>Term</th>
          <th>Analogy</th>
          <th>Technical meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Block</td>
          <td>One page in the record book</td>
          <td>A batch of transactions + metadata</td>
        </tr>
        <tr>
          <td>Chain</td>
          <td>Pages linked by references</td>
          <td>Each block contains the previous block&rsquo;s hash</td>
        </tr>
        <tr>
          <td>Decentralised</td>
          <td>Every villager has a copy</td>
          <td>Thousands of nodes each hold the full ledger</td>
        </tr>
        <tr>
          <td>Immutable</td>
          <td>Can&rsquo;t secretly erase old entries</td>
          <td>Changing any block breaks all subsequent hashes</td>
        </tr>
        <tr>
          <td>Consensus</td>
          <td>Village votes to approve a new page</td>
          <td>Nodes agree before adding a new block</td>
        </tr>
      </tbody>
    </table>
  </article>
);

const blockchainFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Imagine un village qui tient un registre communal — un grand livre où chaque transaction,
      chaque prêt, chaque contribution au Njangi est inscrit. Tout le monde peut le lire, mais
      personne ne peut secrètement revenir en arrière et modifier une ancienne entrée. Ce registre,
      c&rsquo;est une blockchain.
    </p>

    <h2>Qu&rsquo;est-ce qu&rsquo;un bloc ?</h2>
    <p>
      Chaque <strong>bloc</strong> est une page de ce registre. Il contient :
    </p>
    <ul>
      <li>Une liste de transactions (qui a envoyé quoi à qui)</li>
      <li>Un horodatage (quand c&rsquo;a été écrit)</li>
      <li>Une empreinte unique appelée <strong>hash</strong></li>
      <li>L&rsquo;empreinte de la page précédente (<strong>hash précédent</strong>)</li>
    </ul>
    <p>
      Ce dernier point est ce qui en fait une <em>chaîne</em>. Chaque page référence la page
      d&rsquo;avant, jusqu&rsquo;au tout premier bloc (le &laquo; bloc genesis &raquo;). Si tu
      essaies de modifier secrètement la page 50, son empreinte change — ce qui casse la référence
      de la page 51, puis de la 52, et ainsi de suite. Tout le village s&rsquo;en aperçoit
      immédiatement.
    </p>

    <CodeBlock>{`const bloc = {
  index:     50,
  données:   "Njangi : Amara → Marie 25 000 FCFA",
  horodatage: "2025-06-01T09:00:00Z",
  hash:      "0x4a2f9c…",
  hashPrécédent: "0x9e1b3d…"  // empreinte du bloc 49
}`}</CodeBlock>

    <h2>Qu&rsquo;est-ce que la décentralisation ?</h2>
    <p>
      Dans une banque traditionnelle, une seule entreprise détient le registre. Si leur ordinateur
      tombe en panne — ou s&rsquo;ils décident de geler ton compte — tu es bloqué.
    </p>
    <p>
      Une blockchain donne à <em>des milliers d&rsquo;ordinateurs</em> dans le monde une copie
      identique du registre. Pour ajouter une nouvelle page, la majorité de ces ordinateurs doit
      valider qu&rsquo;elle est correcte. C&rsquo;est le <strong>consensus</strong>. Aucun
      gouvernement, aucune entreprise, aucune personne ne peut modifier l&rsquo;historique
      unilatéralement.
    </p>

    <h2>L&rsquo;exemple du Njangi</h2>
    <p>
      Un <strong>Njangi</strong> (tontine) est un groupe d&rsquo;épargne rotative courant au
      Cameroun et en Afrique centrale. Chaque mois, chaque membre contribue — disons 10 000 FCFA
      — et un membre reçoit la totalité de la cagnotte. Tu fais confiance au groupe parce que tout
      le monde connaît les règles et se surveille mutuellement.
    </p>
    <p>
      Imagine maintenant un Njangi où les règles sont écrites en code, les contributions sont
      suivies automatiquement, et personne ne peut tricher car le registre est public et
      infalsifiable. C&rsquo;est une <strong>DApp Njangi</strong> — et tu en construiras une dans
      le cours{" "}
      <a href="/courses" style={{ color: "#1D9E75" }}>Njangi sur la Blockchain</a>.
    </p>

    <h2>Pourquoi est-ce important pour l&rsquo;Afrique ?</h2>
    <p>
      À travers l&rsquo;Afrique, des millions de personnes n&rsquo;ont pas accès aux banques
      traditionnelles — mais elles ont des smartphones et le mobile money. La blockchain supprime
      le besoin d&rsquo;une banque centrale ou d&rsquo;un intermédiaire. Elle permet :
    </p>
    <ul>
      <li>Des paiements transfrontaliers sans frais de transfert à 15 %</li>
      <li>Des groupes d&rsquo;épargne programmables (Njangi) avec versements automatiques</li>
      <li>Des diplômes vérifiables qui ne peuvent pas être falsifiés ou perdus</li>
      <li>L&rsquo;accès aux produits DeFi sans compte bancaire</li>
    </ul>

    <h2>Résumé rapide</h2>
    <table>
      <thead>
        <tr>
          <th>Terme</th>
          <th>Analogie</th>
          <th>Sens technique</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bloc</td>
          <td>Une page du registre</td>
          <td>Un ensemble de transactions + métadonnées</td>
        </tr>
        <tr>
          <td>Chaîne</td>
          <td>Pages liées par des références</td>
          <td>Chaque bloc contient le hash du précédent</td>
        </tr>
        <tr>
          <td>Décentralisé</td>
          <td>Chaque villageois a une copie</td>
          <td>Des milliers de nœuds possèdent le registre complet</td>
        </tr>
        <tr>
          <td>Immuable</td>
          <td>Impossible d&rsquo;effacer secrètement</td>
          <td>Modifier un bloc casse tous les hashs suivants</td>
        </tr>
        <tr>
          <td>Consensus</td>
          <td>Le village vote pour valider une page</td>
          <td>Les nœuds s&rsquo;accordent avant d&rsquo;ajouter un bloc</td>
        </tr>
      </tbody>
    </table>
  </article>
);

// ─── "What is Fundi3?" ────────────────────────────────────────────────────────

const whatIsFundi3En: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Fundi3 is a bilingual Web3 education platform built specifically for francophone Africa —
      Cameroon, Gabon, Côte d&rsquo;Ivoire, the DRC, Senegal, and the wider CEMAC/ECOWAS zone. The
      name comes from <em>&ldquo;fundi&rdquo;</em> — Swahili for a skilled craftsman or expert —
      plus <em>&ldquo;3&rdquo;</em> for Web3.
    </p>

    <h2>Why we built it</h2>
    <p>
      Every existing Web3 platform assumes fast internet, English fluency, and a Western economic
      context. Our founder spent months stuck trying to learn blockchain from resources that
      didn&rsquo;t speak his language, didn&rsquo;t work on his connection, and used examples — Wall
      Street, US banks — that meant nothing to his daily life. Fundi3 is the platform he wished
      existed: clear, bilingual, mobile-first, and built around things you already understand —
      mobile money, Njangi, cross-border CFA payments.
    </p>

    <h2>What you can learn</h2>
    <p>Fundi3 offers three learning tracks:</p>
    <table>
      <thead>
        <tr><th>Track</th><th>For</th><th>You&rsquo;ll build</th></tr>
      </thead>
      <tbody>
        <tr><td>Beginner</td><td>Anyone curious about Web3, no coding required</td><td>A mental model of blockchain, wallets, and crypto</td></tr>
        <tr><td>Developer</td><td>People who can already code (or want to learn)</td><td>Smart contracts in Solidity and Rust/Anchor</td></tr>
        <tr><td>DeFi</td><td>Learners focused on finance and money</td><td>A Njangi DApp, lending, and stablecoin tools</td></tr>
      </tbody>
    </table>

    <h2>What makes Fundi3 different</h2>
    <ul>
      <li><strong>French + English, always.</strong> Every lesson, every page, every AI tutor reply.</li>
      <li><strong>Mobile + low data.</strong> Text-first lessons that load on 3G.</li>
      <li><strong>African context.</strong> Examples use Njangi, MTN Mobile Money, and CFA — not Wall Street.</li>
      <li><strong>Real proof of skill.</strong> Finish a course, earn a tamper-proof NFT certificate on Solana.</li>
    </ul>

    <h2>Is it free?</h2>
    <p>
      Yes. Beginner content is free forever — no credit card, no crypto required to start. Some
      advanced tracks may include paid content later, but the path from zero to your first
      certificate is always free.
    </p>
  </article>
);

const whatIsFundi3Fr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Fundi3 est une plateforme d&rsquo;éducation Web3 bilingue conçue spécifiquement pour
      l&rsquo;Afrique francophone — Cameroun, Gabon, Côte d&rsquo;Ivoire, RDC, Sénégal, et toute la
      zone CEMAC/CEDEAO. Le nom vient de <em>&laquo; fundi &raquo;</em> — un mot swahili pour un
      artisan ou expert qualifié — suivi de <em>&laquo; 3 &raquo;</em> pour Web3.
    </p>

    <h2>Pourquoi nous l&rsquo;avons créée</h2>
    <p>
      Toutes les plateformes Web3 existantes supposent une connexion rapide, une maîtrise de
      l&rsquo;anglais et un contexte économique occidental. Notre fondateur a passé des mois bloqué,
      essayant d&rsquo;apprendre la blockchain avec des ressources qui ne parlaient pas sa langue, ne
      fonctionnaient pas avec sa connexion, et utilisaient des exemples — Wall Street, les banques
      américaines — qui n&rsquo;avaient aucun sens pour sa vie quotidienne. Fundi3 est la plateforme
      qu&rsquo;il aurait aimé trouver : claire, bilingue, pensée pour le mobile, et construite autour
      de choses que tu connais déjà — le mobile money, le Njangi, les paiements transfrontaliers en
      FCFA.
    </p>

    <h2>Ce que tu peux apprendre</h2>
    <p>Fundi3 propose trois parcours d&rsquo;apprentissage :</p>
    <table>
      <thead>
        <tr><th>Parcours</th><th>Pour</th><th>Tu vas construire</th></tr>
      </thead>
      <tbody>
        <tr><td>Débutant</td><td>Toute personne curieuse du Web3, sans code requis</td><td>Une compréhension claire de la blockchain, des portefeuilles et de la crypto</td></tr>
        <tr><td>Développeur</td><td>Ceux qui codent déjà (ou veulent apprendre)</td><td>Des smart contracts en Solidity et Rust/Anchor</td></tr>
        <tr><td>DeFi</td><td>Les apprenants orientés finance et argent</td><td>Une DApp Njangi, du prêt, et des outils stablecoin</td></tr>
      </tbody>
    </table>

    <h2>Ce qui rend Fundi3 différent</h2>
    <ul>
      <li><strong>Français + anglais, toujours.</strong> Chaque leçon, chaque page, chaque réponse du tuteur IA.</li>
      <li><strong>Mobile et faible débit.</strong> Des leçons texte d&rsquo;abord qui chargent en 3G.</li>
      <li><strong>Contexte africain.</strong> Les exemples utilisent le Njangi, le Mobile Money MTN et le FCFA — pas Wall Street.</li>
      <li><strong>Une vraie preuve de compétence.</strong> Termine un cours, reçois un certificat NFT infalsifiable sur Solana.</li>
    </ul>

    <h2>Est-ce gratuit ?</h2>
    <p>
      Oui. Le contenu pour débutants est gratuit pour toujours — sans carte bancaire, sans crypto
      requise pour commencer. Certains parcours avancés pourront inclure du contenu payant plus
      tard, mais le chemin de zéro à ton premier certificat reste toujours gratuit.
    </p>
  </article>
);

// ─── "Creating your account" ───────────────────────────────────────────────────

const creatingYourAccountEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      You don&rsquo;t need any crypto knowledge — or even a wallet — to create a Fundi3 account.
      All you need is an email address or phone number.
    </p>

    <h2>Sign up in three steps</h2>
    <ol>
      <li>Go to <a href="/auth/signup" style={{ color: "#1D9E75" }}>Sign up</a> and choose &ldquo;Create your free account&rdquo;.</li>
      <li>Enter your email (or phone number) and choose a password.</li>
      <li>Click the confirmation link we send to your inbox.</li>
    </ol>
    <p>That&rsquo;s it — you&rsquo;re in. No seed phrase, no browser extension, nothing to install.</p>

    <h2>Choosing your language</h2>
    <p>
      During sign-up, Fundi3 checks your browser language and defaults to French if it starts with
      &ldquo;fr&rdquo;, otherwise English. Switch anytime with the <strong>FR | EN</strong> toggle in
      the navbar — your preference is saved to your profile, so it follows you to any device.
    </p>

    <h2>What happens behind the scenes</h2>
    <p>
      The moment your account is created, Fundi3 quietly generates a <strong>Solana wallet</strong>
      for you using Privy. You won&rsquo;t see a seed phrase or sign a transaction — it&rsquo;s
      simply tied to your email and ready for the day you claim your first NFT certificate. Learn
      more in{" "}
      <a href="/docs/wallet-setup" style={{ color: "#1D9E75" }}>Setting up your wallet</a>.
    </p>

    <h2>Trouble signing in?</h2>
    <ul>
      <li>Didn&rsquo;t get the confirmation email? Check your spam folder, then use &ldquo;Resend confirmation&rdquo; on the login page.</li>
      <li>Forgot your password? Use &ldquo;Forgot password&rdquo; — reset links expire after 1 hour.</li>
      <li>Still stuck? Reach us via the <a href="/contact" style={{ color: "#1D9E75" }}>Contact page</a>.</li>
    </ul>
  </article>
);

const creatingYourAccountFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Tu n&rsquo;as besoin d&rsquo;aucune connaissance crypto — ni même d&rsquo;un portefeuille —
      pour créer un compte Fundi3. Il te faut juste une adresse email ou un numéro de téléphone.
    </p>

    <h2>Inscription en trois étapes</h2>
    <ol>
      <li>Va sur <a href="/auth/signup" style={{ color: "#1D9E75" }}>Inscription</a> et choisis &laquo; Créer mon compte gratuit &raquo;.</li>
      <li>Entre ton email (ou numéro) et choisis un mot de passe.</li>
      <li>Clique sur le lien de confirmation que nous envoyons dans ta boîte mail.</li>
    </ol>
    <p>C&rsquo;est tout — tu es prêt. Pas de phrase secrète, pas d&rsquo;extension de navigateur, rien à installer.</p>

    <h2>Choisir ta langue</h2>
    <p>
      Lors de l&rsquo;inscription, Fundi3 vérifie la langue de ton navigateur et choisit le français
      par défaut si elle commence par &laquo; fr &raquo;, sinon l&rsquo;anglais. Change à tout moment
      avec le bouton <strong>FR | EN</strong> dans la barre de navigation — ta préférence est
      enregistrée sur ton profil et te suit sur tous tes appareils.
    </p>

    <h2>Ce qui se passe en arrière-plan</h2>
    <p>
      Dès la création de ton compte, Fundi3 génère discrètement un <strong>portefeuille Solana</strong>
      pour toi via Privy. Tu ne verras ni phrase secrète ni transaction à signer — il est simplement
      lié à ton email et prêt pour le jour où tu réclameras ton premier certificat NFT. En savoir
      plus dans{" "}
      <a href="/docs/wallet-setup" style={{ color: "#1D9E75" }}>Configurer votre portefeuille</a>.
    </p>

    <h2>Problème de connexion ?</h2>
    <ul>
      <li>Email de confirmation non reçu ? Vérifie tes spams, puis utilise &laquo; Renvoyer la confirmation &raquo; sur la page de connexion.</li>
      <li>Mot de passe oublié ? Utilise &laquo; Mot de passe oublié &raquo; — les liens expirent après 1 heure.</li>
      <li>Toujours bloqué ? Contacte-nous via la <a href="/contact" style={{ color: "#1D9E75" }}>page Contact</a>.</li>
    </ul>
  </article>
);

// ─── "Setting up your wallet" ──────────────────────────────────────────────────

const walletSetupEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Fundi3 uses <strong>Privy</strong> to give every learner a Solana wallet automatically — no
      seed phrases to write down, no apps to install, no risk of losing access on day one.
    </p>

    <h2>What is a wallet, really?</h2>
    <p>
      A crypto wallet is just a pair of keys: a <strong>public address</strong> (like an account
      number — safe to share) and a <strong>private key</strong> (like a PIN — never share it).
      Anything signed with your private key is provably from you. Your wallet is what lets you
      receive and prove ownership of your NFT certificates.
    </p>

    <h2>How Fundi3 creates yours</h2>
    <p>
      When you sign up with email or phone, Privy creates a wallet behind the scenes and links it
      to your account. You can see your wallet address anytime from your{" "}
      <a href="/dashboard" style={{ color: "#1D9E75" }}>dashboard</a>. There&rsquo;s nothing to set
      up — it&rsquo;s ready from your very first login.
    </p>

    <h2>Do I need to fund it?</h2>
    <p>
      No. Fundi3 runs on Solana <strong>devnet</strong> during the learning phase — minting an NFT
      certificate costs less than $0.01, and Fundi3 covers it. You don&rsquo;t need to buy SOL or
      any cryptocurrency to complete free courses or claim certificates.
    </p>

    <h2>Exporting your private key</h2>
    <p>
      If you ever want to use your Fundi3 wallet outside the platform — for example, in Phantom —
      you can export your private key from account settings. Treat it like a banking PIN:
    </p>
    <ul>
      <li>Never share it with anyone, including &ldquo;Fundi3 support&rdquo;. We will never ask for it.</li>
      <li>Anyone with your private key has full control of your wallet.</li>
      <li>Write it down offline if you export it — not in a screenshot synced to the cloud.</li>
    </ul>
  </article>
);

const walletSetupFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Fundi3 utilise <strong>Privy</strong> pour donner automatiquement un portefeuille Solana à
      chaque apprenant — sans phrase secrète à noter, sans application à installer, sans risque de
      perdre l&rsquo;accès dès le premier jour.
    </p>

    <h2>Qu&rsquo;est-ce qu&rsquo;un portefeuille, vraiment ?</h2>
    <p>
      Un portefeuille crypto, c&rsquo;est juste une paire de clés : une <strong>adresse publique</strong>
      (comme un numéro de compte — sans danger à partager) et une <strong>clé privée</strong> (comme
      un code PIN — à ne jamais partager). Tout ce qui est signé avec ta clé privée vient
      indéniablement de toi. Ton portefeuille te permet de recevoir et de prouver la possession de
      tes certificats NFT.
    </p>

    <h2>Comment Fundi3 crée le tien</h2>
    <p>
      Quand tu t&rsquo;inscris avec un email ou un numéro, Privy crée un portefeuille en
      arrière-plan et le relie à ton compte. Tu peux voir l&rsquo;adresse de ton portefeuille à tout
      moment depuis ton{" "}
      <a href="/dashboard" style={{ color: "#1D9E75" }}>tableau de bord</a>. Rien à configurer — il
      est prêt dès ta première connexion.
    </p>

    <h2>Dois-je le recharger ?</h2>
    <p>
      Non. Fundi3 fonctionne sur le <strong>devnet</strong> de Solana pendant la phase
      d&rsquo;apprentissage — frapper un certificat NFT coûte moins de 0,01 $, et Fundi3 prend en
      charge ce coût. Tu n&rsquo;as pas besoin d&rsquo;acheter du SOL ou une quelconque
      cryptomonnaie pour terminer les cours gratuits ou réclamer tes certificats.
    </p>

    <h2>Exporter ta clé privée</h2>
    <p>
      Si tu veux un jour utiliser ton portefeuille Fundi3 ailleurs — par exemple dans Phantom — tu
      peux exporter ta clé privée depuis les paramètres de ton compte. Traite-la comme un code PIN
      bancaire :
    </p>
    <ul>
      <li>Ne la partage jamais avec personne, y compris un &laquo; support Fundi3 &raquo;. Nous ne te la demanderons jamais.</li>
      <li>Quiconque possède ta clé privée a le contrôle total de ton portefeuille.</li>
      <li>Si tu l&rsquo;exportes, note-la hors ligne — pas dans une capture d&rsquo;écran synchronisée sur le cloud.</li>
    </ul>
  </article>
);

// ─── "Your first lesson" ────────────────────────────────────────────────────────

const firstLessonEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Every Fundi3 lesson follows the same simple layout, so once you know your way around the
      first one, you know your way around all of them.
    </p>

    <h2>The lesson player</h2>
    <p>
      Open any course and pick a lesson from the <strong>curriculum tree</strong> on the left
      (or from the menu on mobile). Each lesson has:
    </p>
    <ul>
      <li>A short reading section explaining the concept — in French or English, your choice</li>
      <li>One or more <strong>code playgrounds</strong> where you write real code</li>
      <li>A &ldquo;Mark complete&rdquo; button once you&rsquo;re done</li>
    </ul>

    <h2>Using the code editor</h2>
    <p>Depending on the lesson, you&rsquo;ll get a different environment:</p>
    <table>
      <thead><tr><th>Lesson type</th><th>Editor</th><th>Runs where</th></tr></thead>
      <tbody>
        <tr><td>JavaScript / TypeScript</td><td>Monaco + Sandpack</td><td>In your browser, instantly</td></tr>
        <tr><td>Solidity</td><td>Remix IDE (embedded)</td><td>In your browser, no install</td></tr>
        <tr><td>Rust / Anchor (Solana)</td><td>Solana Playground (embedded)</td><td>In your browser, no install</td></tr>
      </tbody>
    </table>
    <p>
      Nothing to install, nothing to configure. If you switch tabs and come back, your code and the
      embedded editor stay exactly as you left them.
    </p>

    <h2>Stuck? Ask the AI tutor</h2>
    <p>
      Click the <strong>chat icon</strong> to open the AI tutor — it knows which lesson and course
      you&rsquo;re on, responds in the language you write in, and explains code line by line. See{" "}
      <a href="/docs/ai-tutor" style={{ color: "#1D9E75" }}>The AI tutor</a> for tips.
    </p>

    <h2>Finishing up</h2>
    <p>
      When you&rsquo;re confident with a lesson, click <strong>&ldquo;Mark complete&rdquo;</strong>.
      Your progress bar updates immediately, and your dashboard tracks how many lessons you&rsquo;ve
      finished across every course. Complete every lesson in a course to unlock your{" "}
      <a href="/docs/nft-certificates" style={{ color: "#1D9E75" }}>NFT certificate</a>.
    </p>
  </article>
);

const firstLessonFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Chaque leçon Fundi3 suit la même mise en page simple — une fois que tu connais la première,
      tu connais toutes les autres.
    </p>

    <h2>Le lecteur de leçon</h2>
    <p>
      Ouvre un cours et choisis une leçon dans l&rsquo;<strong>arbre du programme</strong> à gauche
      (ou dans le menu sur mobile). Chaque leçon contient :
    </p>
    <ul>
      <li>Une courte section de lecture expliquant le concept — en français ou en anglais, à ton choix</li>
      <li>Un ou plusieurs <strong>terrains de code</strong> où tu écris du vrai code</li>
      <li>Un bouton &laquo; Marquer comme terminé &raquo; une fois fini</li>
    </ul>

    <h2>Utiliser l&rsquo;éditeur de code</h2>
    <p>Selon la leçon, tu obtiens un environnement différent :</p>
    <table>
      <thead><tr><th>Type de leçon</th><th>Éditeur</th><th>S&rsquo;exécute où</th></tr></thead>
      <tbody>
        <tr><td>JavaScript / TypeScript</td><td>Monaco + Sandpack</td><td>Dans ton navigateur, instantanément</td></tr>
        <tr><td>Solidity</td><td>Remix IDE (intégré)</td><td>Dans ton navigateur, sans installation</td></tr>
        <tr><td>Rust / Anchor (Solana)</td><td>Solana Playground (intégré)</td><td>Dans ton navigateur, sans installation</td></tr>
      </tbody>
    </table>
    <p>
      Rien à installer, rien à configurer. Si tu changes d&rsquo;onglet et reviens, ton code et
      l&rsquo;éditeur intégré restent exactement comme tu les as laissés.
    </p>

    <h2>Bloqué ? Demande au tuteur IA</h2>
    <p>
      Clique sur l&rsquo;<strong>icône de chat</strong> pour ouvrir le tuteur IA — il sait sur quelle
      leçon et quel cours tu es, répond dans la langue que tu utilises, et explique le code ligne
      par ligne. Voir{" "}
      <a href="/docs/ai-tutor" style={{ color: "#1D9E75" }}>Le tuteur IA</a> pour des astuces.
    </p>

    <h2>Pour terminer</h2>
    <p>
      Quand tu te sens à l&rsquo;aise avec une leçon, clique sur{" "}
      <strong>&laquo; Marquer comme terminé &raquo;</strong>. Ta barre de progression se met à jour
      immédiatement, et ton tableau de bord suit le nombre de leçons terminées dans chaque cours.
      Termine toutes les leçons d&rsquo;un cours pour débloquer ton{" "}
      <a href="/docs/nft-certificates" style={{ color: "#1D9E75" }}>certificat NFT</a>.
    </p>
  </article>
);

// ─── "What is a smart contract?" ───────────────────────────────────────────────

const whatIsSmartContractEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      A <strong>smart contract</strong> is a small program stored on a blockchain that runs exactly
      as written — no one can pause it, change its rules after the fact, or make an exception for a
      friend. Once deployed, its code <em>is</em> the agreement.
    </p>

    <h2>A simple analogy</h2>
    <p>
      Think of a vending machine. You put in 500 FCFA, press B3, and a drink drops — automatically,
      every time, for everyone. No cashier can give their cousin a discount or &ldquo;forget&rdquo;
      to give change. A smart contract works the same way, but instead of drinks and coins, it moves
      tokens, records data, or manages a Njangi pot.
    </p>

    <h2>Anatomy of a Solidity contract</h2>
    <p>
      Here&rsquo;s a tiny contract that tracks Njangi contributions. Don&rsquo;t worry about
      understanding every line yet — you&rsquo;ll write your first one in{" "}
      <a href="/courses" style={{ color: "#1D9E75" }}>Build Your First Smart Contract</a>.
    </p>
    <CodeBlock>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NjangiPot {
    mapping(address => uint256) public contributions;

    // Anyone can contribute. The amount is recorded forever.
    function contribute() external payable {
        contributions[msg.sender] += msg.value;
    }

    // Anyone can verify any member's total — no trust required.
    function totalContributed(address member) external view returns (uint256) {
        return contributions[member];
    }
}`}</CodeBlock>
    <ul>
      <li><strong>contract</strong> — the container for the rules, like the vending machine itself</li>
      <li><strong>mapping</strong> — a lookup table (address → amount), like a ledger page per member</li>
      <li><strong>function</strong> — an action anyone can trigger, following the written rules exactly</li>
    </ul>

    <h2>Where do smart contracts run?</h2>
    <table>
      <thead><tr><th>Platform</th><th>Language</th><th>Runtime</th></tr></thead>
      <tbody>
        <tr><td>Ethereum &amp; EVM chains</td><td>Solidity</td><td>Ethereum Virtual Machine (EVM)</td></tr>
        <tr><td>Solana</td><td>Rust (with Anchor)</td><td>Sealevel runtime — parallel execution, very low fees</td></tr>
      </tbody>
    </table>
    <p>
      Fundi3&rsquo;s Developer track covers both — Solidity in the embedded Remix IDE, and
      Rust/Anchor in the embedded Solana Playground.
    </p>

    <h2>Why this matters for Africa</h2>
    <p>
      A Njangi works on trust — everyone trusts the treasurer to record contributions and pay out
      fairly. A smart contract <em>removes the need for that trust</em>: the rules are public,
      automatic, and impossible to bend. No treasurer can disappear with the pot, and every member
      can verify every contribution themselves, anytime.
    </p>
  </article>
);

const whatIsSmartContractFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Un <strong>smart contract</strong> (contrat intelligent) est un petit programme stocké sur une
      blockchain qui s&rsquo;exécute exactement comme écrit — personne ne peut le mettre en pause,
      changer ses règles après coup, ou faire une exception pour un ami. Une fois déployé, son code{" "}
      <em>est</em> l&rsquo;accord.
    </p>

    <h2>Une analogie simple</h2>
    <p>
      Pense à un distributeur automatique. Tu insères 500 FCFA, tu appuies sur B3, et une boisson
      tombe — automatiquement, à chaque fois, pour tout le monde. Aucun caissier ne peut faire une
      remise à son cousin ou &laquo; oublier &raquo; de rendre la monnaie. Un smart contract suit la
      même logique, mais au lieu de boissons et de pièces, il déplace des jetons, enregistre des
      données, ou gère une cagnotte Njangi.
    </p>

    <h2>Anatomie d&rsquo;un contrat Solidity</h2>
    <p>
      Voici un petit contrat qui suit les contributions d&rsquo;un Njangi. Ne t&rsquo;inquiète pas
      de tout comprendre tout de suite — tu écriras ton premier contrat dans{" "}
      <a href="/courses" style={{ color: "#1D9E75" }}>Build Your First Smart Contract</a>.
    </p>
    <CodeBlock>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NjangiPot {
    mapping(address => uint256) public contributions;

    // Tout le monde peut contribuer. Le montant est enregistré pour toujours.
    function contribute() external payable {
        contributions[msg.sender] += msg.value;
    }

    // Tout le monde peut vérifier le total d'un membre — aucune confiance requise.
    function totalContributed(address member) external view returns (uint256) {
        return contributions[member];
    }
}`}</CodeBlock>
    <ul>
      <li><strong>contract</strong> — le conteneur des règles, comme le distributeur lui-même</li>
      <li><strong>mapping</strong> — une table de correspondance (adresse → montant), comme une page de registre par membre</li>
      <li><strong>function</strong> — une action que tout le monde peut déclencher, en suivant exactement les règles écrites</li>
    </ul>

    <h2>Où s&rsquo;exécutent les smart contracts ?</h2>
    <table>
      <thead><tr><th>Plateforme</th><th>Langage</th><th>Environnement d&rsquo;exécution</th></tr></thead>
      <tbody>
        <tr><td>Ethereum et chaînes EVM</td><td>Solidity</td><td>Ethereum Virtual Machine (EVM)</td></tr>
        <tr><td>Solana</td><td>Rust (avec Anchor)</td><td>Runtime Sealevel — exécution parallèle, frais très faibles</td></tr>
      </tbody>
    </table>
    <p>
      Le parcours Développeur de Fundi3 couvre les deux — Solidity dans l&rsquo;IDE Remix intégré, et
      Rust/Anchor dans le Solana Playground intégré.
    </p>

    <h2>Pourquoi c&rsquo;est important pour l&rsquo;Afrique</h2>
    <p>
      Un Njangi repose sur la confiance — tout le monde fait confiance au trésorier pour enregistrer
      les contributions et payer équitablement. Un smart contract <em>supprime ce besoin de
      confiance</em> : les règles sont publiques, automatiques, et impossibles à contourner. Aucun
      trésorier ne peut disparaître avec la cagnotte, et chaque membre peut vérifier chaque
      contribution lui-même, à tout moment.
    </p>
  </article>
);

// ─── "What is DeFi?" ────────────────────────────────────────────────────────────

const whatIsDefiEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      <strong>DeFi</strong> (Decentralized Finance) means financial services — saving, borrowing,
      trading, earning interest — built from smart contracts instead of banks. No branch, no
      account manager, no opening hours. Just code that anyone with an internet connection can use.
    </p>

    <h2>Traditional finance vs DeFi</h2>
    <table>
      <thead><tr><th></th><th>Traditional bank</th><th>DeFi</th></tr></thead>
      <tbody>
        <tr><td>Who holds your money</td><td>The bank</td><td>You — in your own wallet</td></tr>
        <tr><td>Account requirements</td><td>ID, address proof, often a minimum balance</td><td>None — just a wallet</td></tr>
        <tr><td>Opening hours</td><td>Business hours, business days</td><td>24/7, every day</td></tr>
        <tr><td>Cross-border transfer</td><td>Days, fees up to 10–15%</td><td>Minutes, fees often under $0.01</td></tr>
      </tbody>
    </table>

    <h2>The core building blocks</h2>
    <ul>
      <li><strong>Stablecoins</strong> — tokens like USDC, pegged 1:1 to the US dollar, so your savings don&rsquo;t lose value to local inflation</li>
      <li><strong>Lending protocols</strong> — deposit assets to earn interest, or borrow against collateral you already hold</li>
      <li><strong>DEXs (Decentralized Exchanges)</strong> — swap one token for another directly, without a middleman holding your funds</li>
    </ul>

    <h2>DeFi in the African context</h2>
    <p>
      Picture a Njangi where contributions are made in USDC instead of cash. Members across
      Cameroon, Gabon, and Côte d&rsquo;Ivoire can contribute from their phones, the pot earns
      interest automatically through a lending protocol while it waits to be paid out, and every
      member can verify the balance — no need to trust a single treasurer or worry about currency
      depreciation between contribution and payout.
    </p>

    <h2>Risks to understand</h2>
    <p>Before using real money in DeFi, know the trade-offs:</p>
    <ul>
      <li><strong>No customer support hotline.</strong> If you send funds to the wrong address, there&rsquo;s no &ldquo;undo&rdquo;.</li>
      <li><strong>Smart contract bugs.</strong> Even audited protocols can have vulnerabilities — never deposit more than you can afford to lose.</li>
      <li><strong>Volatility.</strong> Non-stablecoin assets can swing in value sharply and quickly.</li>
    </ul>
    <p>
      Fundi3&rsquo;s DeFi track teaches all of this hands-on — on Solana devnet, with fake funds,
      before you ever touch a real wallet.
    </p>
  </article>
);

const whatIsDefiFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      La <strong>DeFi</strong> (finance décentralisée) désigne des services financiers — épargner,
      emprunter, échanger, gagner des intérêts — construits avec des smart contracts plutôt
      qu&rsquo;avec des banques. Pas d&rsquo;agence, pas de conseiller, pas d&rsquo;horaires
      d&rsquo;ouverture. Juste du code que tout le monde avec une connexion internet peut utiliser.
    </p>

    <h2>Finance traditionnelle vs DeFi</h2>
    <table>
      <thead><tr><th></th><th>Banque traditionnelle</th><th>DeFi</th></tr></thead>
      <tbody>
        <tr><td>Qui détient ton argent</td><td>La banque</td><td>Toi — dans ton propre portefeuille</td></tr>
        <tr><td>Conditions d&rsquo;ouverture</td><td>Pièce d&rsquo;identité, preuve d&rsquo;adresse, souvent un solde minimum</td><td>Aucune — juste un portefeuille</td></tr>
        <tr><td>Horaires</td><td>Heures et jours ouvrables</td><td>24h/24, 7j/7</td></tr>
        <tr><td>Transfert transfrontalier</td><td>Plusieurs jours, frais jusqu&rsquo;à 10–15 %</td><td>Quelques minutes, frais souvent sous 0,01 $</td></tr>
      </tbody>
    </table>

    <h2>Les briques essentielles</h2>
    <ul>
      <li><strong>Stablecoins</strong> — des jetons comme l&rsquo;USDC, indexés 1:1 sur le dollar américain, pour que ton épargne ne perde pas de valeur face à l&rsquo;inflation locale</li>
      <li><strong>Protocoles de prêt</strong> — dépose des actifs pour gagner des intérêts, ou emprunte contre une garantie que tu détiens déjà</li>
      <li><strong>DEX (échanges décentralisés)</strong> — échange un jeton contre un autre directement, sans intermédiaire qui détient tes fonds</li>
    </ul>

    <h2>La DeFi dans le contexte africain</h2>
    <p>
      Imagine un Njangi où les contributions se font en USDC plutôt qu&rsquo;en espèces. Les membres
      au Cameroun, au Gabon et en Côte d&rsquo;Ivoire peuvent contribuer depuis leur téléphone, la
      cagnotte génère automatiquement des intérêts via un protocole de prêt en attendant le
      versement, et chaque membre peut vérifier le solde — sans avoir à faire confiance à un seul
      trésorier ni craindre une dépréciation de la monnaie entre la contribution et le versement.
    </p>

    <h2>Les risques à connaître</h2>
    <p>Avant d&rsquo;utiliser de l&rsquo;argent réel en DeFi, connais les compromis :</p>
    <ul>
      <li><strong>Pas de service client.</strong> Si tu envoies des fonds à la mauvaise adresse, il n&rsquo;y a pas de &laquo; annuler &raquo;.</li>
      <li><strong>Bugs de smart contracts.</strong> Même les protocoles audités peuvent avoir des failles — ne dépose jamais plus que ce que tu peux perdre.</li>
      <li><strong>Volatilité.</strong> Les actifs autres que les stablecoins peuvent varier fortement et rapidement.</li>
    </ul>
    <p>
      Le parcours DeFi de Fundi3 enseigne tout cela en pratique — sur le devnet de Solana, avec des
      fonds fictifs, avant que tu ne touches un vrai portefeuille.
    </p>
  </article>
);

// ─── "What is an NFT?" ──────────────────────────────────────────────────────────

const whatIsNftEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      <strong>NFT</strong> stands for <em>Non-Fungible Token</em> — a unique digital item recorded
      on a blockchain that proves who owns it, with no possibility of forgery or duplication.
    </p>

    <h2>Fungible vs non-fungible</h2>
    <table>
      <thead><tr><th></th><th>Fungible</th><th>Non-fungible (NFT)</th></tr></thead>
      <tbody>
        <tr><td>Example</td><td>A 1,000 FCFA note, 1 USDC</td><td>Your land title, your diploma, your ID card</td></tr>
        <tr><td>Interchangeable?</td><td>Yes — any 1,000 FCFA note is the same as another</td><td>No — each one is unique and tied to a specific owner or item</td></tr>
      </tbody>
    </table>
    <p>
      A 1,000 FCFA note can be swapped for any other 1,000 FCFA note — no difference. But your
      diploma with your name on it can&rsquo;t be swapped for someone else&rsquo;s — it&rsquo;s
      unique to you. NFTs bring that same uniqueness on-chain.
    </p>

    <h2>What&rsquo;s actually stored on-chain?</h2>
    <p>
      An NFT itself is small — usually just an ID, an owner&rsquo;s wallet address, and a link to{" "}
      <strong>metadata</strong> (a name, description, and image). The metadata and image are
      typically stored off-chain (e.g. on a CDN), while the blockchain holds the permanent,
      tamper-proof record of <em>who owns what</em>.
    </p>

    <h2>NFTs beyond digital art</h2>
    <p>
      NFTs are often associated with art, but the underlying idea — a unique, verifiable, ownable
      record — applies far beyond:
    </p>
    <ul>
      <li><strong>Certificates &amp; diplomas</strong> — proof you completed a course, forever verifiable</li>
      <li><strong>Event tickets</strong> — can&rsquo;t be duplicated or counterfeited</li>
      <li><strong>Identity &amp; credentials</strong> — professional licenses, membership cards</li>
      <li><strong>Land &amp; property records</strong> — a tamper-proof title registry</li>
    </ul>

    <h2>Fundi3 NFT certificates</h2>
    <p>
      Every course you complete on Fundi3 can be claimed as an NFT certificate, minted on Solana
      using <strong>Metaplex compressed NFTs</strong> — costing Fundi3 a fraction of a cent per
      certificate. It lives in your wallet forever, and anyone can verify it&rsquo;s real by
      checking the blockchain. See{" "}
      <a href="/docs/nft-certificates" style={{ color: "#1D9E75" }}>NFT certificates</a> for how to
      claim yours.
    </p>
  </article>
);

const whatIsNftFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      <strong>NFT</strong> signifie <em>Non-Fungible Token</em> (jeton non fongible) — un objet
      numérique unique enregistré sur une blockchain qui prouve qui le possède, sans possibilité de
      falsification ni de duplication.
    </p>

    <h2>Fongible vs non fongible</h2>
    <table>
      <thead><tr><th></th><th>Fongible</th><th>Non fongible (NFT)</th></tr></thead>
      <tbody>
        <tr><td>Exemple</td><td>Un billet de 1 000 FCFA, 1 USDC</td><td>Ton titre foncier, ton diplôme, ta carte d&rsquo;identité</td></tr>
        <tr><td>Interchangeable ?</td><td>Oui — un billet de 1 000 FCFA équivaut à un autre</td><td>Non — chaque élément est unique et lié à un propriétaire ou objet précis</td></tr>
      </tbody>
    </table>
    <p>
      Un billet de 1 000 FCFA peut être échangé contre n&rsquo;importe quel autre billet de 1 000
      FCFA — aucune différence. Mais ton diplôme avec ton nom dessus ne peut pas être échangé contre
      celui de quelqu&rsquo;un d&rsquo;autre — il t&rsquo;est propre. Les NFT apportent cette même
      unicité sur la blockchain.
    </p>

    <h2>Qu&rsquo;est-ce qui est vraiment stocké sur la blockchain ?</h2>
    <p>
      Un NFT en lui-même est petit — généralement juste un identifiant, l&rsquo;adresse du
      propriétaire, et un lien vers des <strong>métadonnées</strong> (un nom, une description, une
      image). Les métadonnées et l&rsquo;image sont en général stockées hors chaîne (par exemple sur
      un CDN), tandis que la blockchain garde l&rsquo;enregistrement permanent et infalsifiable de{" "}
      <em>qui possède quoi</em>.
    </p>

    <h2>Les NFT au-delà de l&rsquo;art numérique</h2>
    <p>
      Les NFT sont souvent associés à l&rsquo;art, mais l&rsquo;idée sous-jacente — un enregistrement
      unique, vérifiable et possédable — va bien au-delà :
    </p>
    <ul>
      <li><strong>Certificats et diplômes</strong> — la preuve que tu as terminé un cours, vérifiable pour toujours</li>
      <li><strong>Billets d&rsquo;événements</strong> — impossibles à dupliquer ou contrefaire</li>
      <li><strong>Identité et accréditations</strong> — licences professionnelles, cartes de membre</li>
      <li><strong>Registres fonciers</strong> — un registre de titres infalsifiable</li>
    </ul>

    <h2>Les certificats NFT de Fundi3</h2>
    <p>
      Chaque cours terminé sur Fundi3 peut être réclamé sous forme de certificat NFT, frappé sur
      Solana avec les <strong>NFT compressés de Metaplex</strong> — coûtant à Fundi3 une fraction de
      centime par certificat. Il reste dans ton portefeuille pour toujours, et n&rsquo;importe qui
      peut vérifier son authenticité en consultant la blockchain. Voir{" "}
      <a href="/docs/nft-certificates" style={{ color: "#1D9E75" }}>Certificats NFT</a> pour savoir
      comment réclamer le tien.
    </p>
  </article>
);

// ─── "What is Solana?" ──────────────────────────────────────────────────────────

const whatIsSolanaEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      <strong>Solana</strong> is a high-performance blockchain designed to process thousands of
      transactions per second for a fraction of a cent each. It&rsquo;s the blockchain Fundi3 uses
      for NFT certificates — and the one you&rsquo;ll build on in our Developer and DeFi tracks.
    </p>

    <h2>Why speed and cost matter</h2>
    <p>
      On some blockchains, a single transaction can cost several dollars and take minutes to
      confirm — unworkable if you&rsquo;re sending 2,000 FCFA to a Njangi group, or minting a
      certificate for thousands of learners. Solana transactions typically confirm in under a
      second and cost a fraction of a cent, making everyday, small-value use cases actually
      practical.
    </p>

    <h2>Key concepts</h2>
    <ul>
      <li><strong>Programs</strong> — Solana&rsquo;s name for smart contracts. Written in Rust, usually with the Anchor framework.</li>
      <li><strong>Accounts</strong> — everything on Solana is an account: your wallet, a token balance, an NFT, even a program&rsquo;s code. Programs are logic; accounts are state.</li>
      <li><strong>Sealevel runtime</strong> — Solana&rsquo;s engine that runs many transactions in parallel (instead of one at a time), which is a big part of why it&rsquo;s fast.</li>
    </ul>

    <h2>Solana vs Ethereum</h2>
    <table>
      <thead><tr><th></th><th>Ethereum</th><th>Solana</th></tr></thead>
      <tbody>
        <tr><td>Smart contract language</td><td>Solidity</td><td>Rust (with Anchor)</td></tr>
        <tr><td>Typical transaction fee</td><td>$0.50 – $20+</td><td>&lt; $0.001</td></tr>
        <tr><td>Confirmation time</td><td>~12 seconds (often longer under load)</td><td>~400ms</td></tr>
        <tr><td>NFT minting (compressed)</td><td>Often $1+</td><td>&lt; $0.001</td></tr>
      </tbody>
    </table>

    <h2>The Anchor framework</h2>
    <p>
      Writing raw Solana programs in Rust is powerful but verbose. <strong>Anchor</strong> is a
      framework that adds structure, safety checks, and a much friendlier developer experience —
      the Solana equivalent of how frameworks make Solidity development easier. Fundi3&rsquo;s
      Solana lessons run entirely in the embedded <strong>Solana Playground</strong>, so
      there&rsquo;s nothing to install on your machine.
    </p>
  </article>
);

const whatIsSolanaFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      <strong>Solana</strong> est une blockchain haute performance conçue pour traiter des milliers
      de transactions par seconde pour une fraction de centime chacune. C&rsquo;est la blockchain
      qu&rsquo;utilise Fundi3 pour les certificats NFT — et celle sur laquelle tu construiras dans
      nos parcours Développeur et DeFi.
    </p>

    <h2>Pourquoi la vitesse et le coût comptent</h2>
    <p>
      Sur certaines blockchains, une seule transaction peut coûter plusieurs dollars et prendre
      plusieurs minutes à confirmer — impraticable si tu envoies 2 000 FCFA à un groupe Njangi, ou si
      tu frappes un certificat pour des milliers d&rsquo;apprenants. Les transactions Solana sont
      généralement confirmées en moins d&rsquo;une seconde et coûtent une fraction de centime, ce qui
      rend les usages quotidiens à faible valeur réellement praticables.
    </p>

    <h2>Concepts clés</h2>
    <ul>
      <li><strong>Programs</strong> — le nom donné aux smart contracts sur Solana. Écrits en Rust, généralement avec le framework Anchor.</li>
      <li><strong>Accounts</strong> — sur Solana, tout est un compte : ton portefeuille, un solde de jetons, un NFT, même le code d&rsquo;un programme. Les programmes sont la logique ; les comptes sont l&rsquo;état.</li>
      <li><strong>Runtime Sealevel</strong> — le moteur de Solana qui exécute de nombreuses transactions en parallèle (plutôt qu&rsquo;une à la fois), ce qui explique en grande partie sa rapidité.</li>
    </ul>

    <h2>Solana vs Ethereum</h2>
    <table>
      <thead><tr><th></th><th>Ethereum</th><th>Solana</th></tr></thead>
      <tbody>
        <tr><td>Langage des smart contracts</td><td>Solidity</td><td>Rust (avec Anchor)</td></tr>
        <tr><td>Frais de transaction typiques</td><td>0,50 $ – 20 $+</td><td>&lt; 0,001 $</td></tr>
        <tr><td>Temps de confirmation</td><td>~12 secondes (souvent plus en cas de charge)</td><td>~400ms</td></tr>
        <tr><td>Frappe de NFT (compressé)</td><td>Souvent 1 $+</td><td>&lt; 0,001 $</td></tr>
      </tbody>
    </table>

    <h2>Le framework Anchor</h2>
    <p>
      Écrire des programmes Solana bruts en Rust est puissant mais verbeux. <strong>Anchor</strong>
      est un framework qui ajoute de la structure, des vérifications de sécurité, et une expérience
      de développement bien plus agréable — l&rsquo;équivalent Solana de ce que les frameworks
      apportent à Solidity. Les leçons Solana de Fundi3 s&rsquo;exécutent entièrement dans le{" "}
      <strong>Solana Playground</strong> intégré, donc rien à installer sur ta machine.
    </p>
  </article>
);

// ─── "How courses work" ─────────────────────────────────────────────────────────

const howCoursesWorkEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Every course on Fundi3 is broken down the same way, so you always know where you are and
      what&rsquo;s next.
    </p>

    <h2>Course structure</h2>
    <ul>
      <li><strong>Track</strong> — Beginner, Developer, or DeFi. A broad learning path.</li>
      <li><strong>Course</strong> — a focused topic within a track, e.g. &ldquo;Blockchain 101&rdquo; or &ldquo;Njangi on the Blockchain&rdquo;.</li>
      <li><strong>Lesson</strong> — the smallest unit. A short read, often paired with a code playground.</li>
    </ul>
    <p>
      You can see the full breakdown of any course — every lesson, in order — in the{" "}
      <strong>curriculum tree</strong> before you even start.
    </p>

    <h2>Tracking your progress</h2>
    <p>
      As you complete lessons, your <strong>progress bar</strong> fills in on the course page and
      on your <a href="/dashboard" style={{ color: "#1D9E75" }}>dashboard</a>. Your dashboard
      shows, at a glance:
    </p>
    <ul>
      <li>How many lessons you&rsquo;ve completed in each course</li>
      <li>Your overall completion percentage</li>
      <li>Courses you&rsquo;re enrolled in vs. courses you&rsquo;ve finished</li>
    </ul>
    <p>
      Progress is saved automatically to your account — switch devices and pick up exactly where
      you left off.
    </p>

    <h2>Free vs paid</h2>
    <p>
      Courses marked <strong>Free</strong> are free forever, with no account upgrade needed. Some
      advanced courses may be part of paid tracks in the future — these will always be clearly
      labelled before you enroll, and your existing free progress is never taken away.
    </p>

    <h2>Finishing a course</h2>
    <p>
      Complete every lesson in a course, and a <strong>&ldquo;Claim certificate&rdquo;</strong>
      button appears. One click mints an NFT certificate to your wallet — see{" "}
      <a href="/docs/nft-certificates" style={{ color: "#1D9E75" }}>NFT certificates</a> for the
      details.
    </p>
  </article>
);

const howCoursesWorkFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Chaque cours sur Fundi3 est découpé de la même façon, pour que tu saches toujours où tu en es
      et ce qui vient ensuite.
    </p>

    <h2>Structure d&rsquo;un cours</h2>
    <ul>
      <li><strong>Parcours</strong> — Débutant, Développeur ou DeFi. Un chemin d&rsquo;apprentissage large.</li>
      <li><strong>Cours</strong> — un sujet précis au sein d&rsquo;un parcours, par ex. &laquo; Blockchain 101 &raquo; ou &laquo; Njangi sur la Blockchain &raquo;.</li>
      <li><strong>Leçon</strong> — la plus petite unité. Une courte lecture, souvent accompagnée d&rsquo;un terrain de code.</li>
    </ul>
    <p>
      Tu peux voir le déroulé complet de n&rsquo;importe quel cours — chaque leçon, dans
      l&rsquo;ordre — dans l&rsquo;<strong>arbre du programme</strong> avant même de commencer.
    </p>

    <h2>Suivre ta progression</h2>
    <p>
      À mesure que tu termines des leçons, ta <strong>barre de progression</strong> se remplit sur
      la page du cours et sur ton{" "}
      <a href="/dashboard" style={{ color: "#1D9E75" }}>tableau de bord</a>. Ton tableau de bord
      affiche, en un coup d&rsquo;œil :
    </p>
    <ul>
      <li>Le nombre de leçons terminées dans chaque cours</li>
      <li>Ton pourcentage global de complétion</li>
      <li>Les cours auxquels tu es inscrit vs. ceux que tu as terminés</li>
    </ul>
    <p>
      Ta progression est sauvegardée automatiquement sur ton compte — change d&rsquo;appareil et
      reprends exactement là où tu t&rsquo;étais arrêté.
    </p>

    <h2>Gratuit vs payant</h2>
    <p>
      Les cours marqués <strong>Gratuit</strong> le sont pour toujours, sans mise à niveau de
      compte. Certains cours avancés pourront faire partie de parcours payants à l&rsquo;avenir —
      ils seront toujours clairement indiqués avant ton inscription, et ta progression gratuite
      existante ne te sera jamais retirée.
    </p>

    <h2>Terminer un cours</h2>
    <p>
      Termine toutes les leçons d&rsquo;un cours, et un bouton{" "}
      <strong>&laquo; Réclamer le certificat &raquo;</strong> apparaît. Un clic suffit pour frapper
      un certificat NFT dans ton portefeuille — voir{" "}
      <a href="/docs/nft-certificates" style={{ color: "#1D9E75" }}>Certificats NFT</a> pour les
      détails.
    </p>
  </article>
);

// ─── "The code editor" ──────────────────────────────────────────────────────────

const codeEditorEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Fundi3 lessons run real code in your browser — nothing to install, nothing to configure.
      Which editor you see depends on the lesson&rsquo;s language.
    </p>

    <h2>JavaScript &amp; TypeScript: Monaco + Sandpack</h2>
    <p>
      For JS/TS lessons, you get the same editor that powers VS Code (<strong>Monaco</strong>),
      paired with <strong>Sandpack</strong> for instant execution. Write code on the left, see the
      output update live on the right. Great for learning core Web3 concepts like signing
      transactions or calling an RPC endpoint.
    </p>

    <h2>Solidity: Remix IDE</h2>
    <p>
      Solidity lessons embed the official <strong>Remix IDE</strong> — a full browser-based
      Solidity environment used by professional developers. You can write, compile, deploy, and
      test smart contracts entirely inside the lesson. Fundi3 keeps a single Remix session alive as
      you move between lessons in a course, so it doesn&rsquo;t reload every time.
    </p>

    <h2>Rust &amp; Anchor: Solana Playground</h2>
    <p>
      For Solana lessons, Fundi3 embeds <strong>Solana Playground</strong> — a browser IDE for
      writing and deploying Rust/Anchor programs to Solana devnet, with no local toolchain install
      required.
    </p>

    <h2>Tips for low-bandwidth connections</h2>
    <ul>
      <li>Embedded IDEs (Remix, Solana Playground) are the heaviest part of a lesson — give them a few extra seconds to load on slower connections.</li>
      <li>Your code in Monaco/Sandpack playgrounds is kept in memory as you navigate — but isn&rsquo;t saved permanently, so copy anything important before leaving a lesson.</li>
      <li>If an embedded IDE fails to load, refresh the page — it usually resolves a one-off network hiccup.</li>
    </ul>
  </article>
);

const codeEditorFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Les leçons Fundi3 exécutent du vrai code dans ton navigateur — rien à installer, rien à
      configurer. L&rsquo;éditeur que tu vois dépend du langage de la leçon.
    </p>

    <h2>JavaScript &amp; TypeScript : Monaco + Sandpack</h2>
    <p>
      Pour les leçons JS/TS, tu obtiens le même éditeur qui propulse VS Code (<strong>Monaco</strong>),
      couplé à <strong>Sandpack</strong> pour une exécution instantanée. Écris le code à gauche, vois
      le résultat se mettre à jour en direct à droite. Idéal pour apprendre les concepts Web3 de
      base comme signer une transaction ou appeler un point de terminaison RPC.
    </p>

    <h2>Solidity : Remix IDE</h2>
    <p>
      Les leçons Solidity intègrent l&rsquo;<strong>IDE Remix</strong> officiel — un environnement
      Solidity complet dans le navigateur, utilisé par des développeurs professionnels. Tu peux
      écrire, compiler, déployer et tester des smart contracts entièrement dans la leçon. Fundi3
      garde une seule session Remix active pendant que tu navigues entre les leçons d&rsquo;un
      cours, pour qu&rsquo;elle ne se recharge pas à chaque fois.
    </p>

    <h2>Rust &amp; Anchor : Solana Playground</h2>
    <p>
      Pour les leçons Solana, Fundi3 intègre <strong>Solana Playground</strong> — un IDE dans le
      navigateur pour écrire et déployer des programmes Rust/Anchor sur le devnet de Solana, sans
      aucune installation locale.
    </p>

    <h2>Astuces pour les connexions à faible débit</h2>
    <ul>
      <li>Les IDE intégrés (Remix, Solana Playground) sont la partie la plus lourde d&rsquo;une leçon — laisse-leur quelques secondes de plus pour charger sur une connexion lente.</li>
      <li>Ton code dans les terrains Monaco/Sandpack est conservé en mémoire pendant que tu navigues — mais n&rsquo;est pas sauvegardé de façon permanente, donc copie tout ce qui est important avant de quitter une leçon.</li>
      <li>Si un IDE intégré ne charge pas, rafraîchis la page — cela résout généralement un problème réseau ponctuel.</li>
    </ul>
  </article>
);

// ─── "NFT certificates" ─────────────────────────────────────────────────────────

const nftCertificatesEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      When you finish a course on Fundi3, you can claim a permanent, verifiable proof of completion
      — an NFT certificate minted on the Solana blockchain.
    </p>

    <h2>What you get</h2>
    <ul>
      <li>A unique NFT in your Fundi3 wallet, with your name, the course title, and the completion date</li>
      <li>A public link you can share — on LinkedIn, with employers, with anyone — that proves it&rsquo;s real</li>
      <li>A record that can never be revoked, edited, or lost as long as the blockchain exists</li>
    </ul>

    <h2>How minting works</h2>
    <p>
      Fundi3 uses <strong>Metaplex compressed NFTs (cNFTs)</strong> — a Solana technique that stores
      most of an NFT&rsquo;s data in a compact format, cutting the cost from several dollars (on
      some chains) to <strong>less than $0.01</strong>. This is what makes it possible for Fundi3 to
      issue certificates to thousands of learners for free.
    </p>

    <h2>Claiming your certificate</h2>
    <ol>
      <li>Complete every lesson in a course — your progress bar reaches 100%.</li>
      <li>Go to the course page or your dashboard and click <strong>&ldquo;Claim certificate&rdquo;</strong>.</li>
      <li>Fundi3 mints the NFT directly to the Solana wallet created for your account — no signature, no fee, no wallet app needed.</li>
      <li>View your certificate anytime from <a href="/dashboard" style={{ color: "#1D9E75" }}>your dashboard</a>.</li>
    </ol>

    <h2>Verifying a certificate</h2>
    <p>
      Every certificate is a real on-chain asset — anyone can look up the NFT&rsquo;s address on a
      Solana block explorer and see the issuing program, the recipient&rsquo;s wallet, and the
      timestamp. Unlike a PDF, it can&rsquo;t be edited or faked after the fact, which makes it
      useful proof of skill for employers, partners, or further study.
    </p>
  </article>
);

const nftCertificatesFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Quand tu termines un cours sur Fundi3, tu peux réclamer une preuve de réussite permanente et
      vérifiable — un certificat NFT frappé sur la blockchain Solana.
    </p>

    <h2>Ce que tu obtiens</h2>
    <ul>
      <li>Un NFT unique dans ton portefeuille Fundi3, avec ton nom, le titre du cours et la date d&rsquo;achèvement</li>
      <li>Un lien public que tu peux partager — sur LinkedIn, avec des employeurs, avec qui tu veux — qui prouve son authenticité</li>
      <li>Un enregistrement qui ne peut jamais être révoqué, modifié ou perdu tant que la blockchain existe</li>
    </ul>

    <h2>Comment fonctionne la frappe</h2>
    <p>
      Fundi3 utilise les <strong>NFT compressés de Metaplex (cNFT)</strong> — une technique Solana
      qui stocke la majorité des données d&rsquo;un NFT dans un format compact, faisant passer le
      coût de plusieurs dollars (sur certaines chaînes) à <strong>moins de 0,01 $</strong>. C&rsquo;est
      ce qui permet à Fundi3 de délivrer des certificats à des milliers d&rsquo;apprenants
      gratuitement.
    </p>

    <h2>Réclamer ton certificat</h2>
    <ol>
      <li>Termine toutes les leçons d&rsquo;un cours — ta barre de progression atteint 100 %.</li>
      <li>Va sur la page du cours ou ton tableau de bord et clique sur <strong>&laquo; Réclamer le certificat &raquo;</strong>.</li>
      <li>Fundi3 frappe le NFT directement dans le portefeuille Solana créé pour ton compte — aucune signature, aucun frais, aucune application de portefeuille requise.</li>
      <li>Consulte ton certificat à tout moment depuis <a href="/dashboard" style={{ color: "#1D9E75" }}>ton tableau de bord</a>.</li>
    </ol>

    <h2>Vérifier un certificat</h2>
    <p>
      Chaque certificat est un véritable actif on-chain — n&rsquo;importe qui peut rechercher
      l&rsquo;adresse du NFT sur un explorateur de blocs Solana et voir le programme émetteur, le
      portefeuille du destinataire et l&rsquo;horodatage. Contrairement à un PDF, il ne peut pas
      être modifié ou falsifié après coup, ce qui en fait une preuve de compétence utile pour des
      employeurs, des partenaires, ou la suite de tes études.
    </p>
  </article>
);

// ─── "The AI tutor" ──────────────────────────────────────────────────────────────

const aiTutorEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Stuck on a concept or a bug? The Fundi3 AI tutor is built into every lesson — a friendly,
      patient expert that knows exactly where you are in the curriculum.
    </p>

    <h2>How to open it</h2>
    <p>
      Click the <strong>chat icon</strong> in the lesson player to slide open the AI tutor panel.
      It stays open alongside your lesson and code editor, so you can ask questions without losing
      your place.
    </p>

    <h2>What it can help with</h2>
    <ul>
      <li>Explaining a concept again, in simpler terms or with a different analogy</li>
      <li>Walking through your code <strong>line by line</strong> to explain what each part does</li>
      <li>Debugging an error message you don&rsquo;t understand</li>
      <li>Connecting a lesson to African examples — Njangi, mobile money, CFA — if the lesson didn&rsquo;t already</li>
    </ul>

    <h2>Bilingual and context-aware</h2>
    <p>
      Write in French or English — the tutor detects your language and replies in kind. If you mix
      languages (Camfranglais-style), it responds in whichever language you&rsquo;re writing more
      of. It also knows the lesson title, the course, and your level, so its answers are tailored —
      not generic.
    </p>

    <h2>Tips for better answers</h2>
    <ul>
      <li>Paste the exact error message or line of code you&rsquo;re stuck on — the more specific, the better the help.</li>
      <li>It&rsquo;s okay to say &ldquo;I don&rsquo;t understand&rdquo; — the tutor will never make you feel bad for asking again.</li>
      <li>If a question isn&rsquo;t about Web3 or blockchain, the tutor will gently redirect you back — it&rsquo;s specialized on purpose.</li>
    </ul>
  </article>
);

const aiTutorFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Bloqué sur un concept ou un bug ? Le tuteur IA de Fundi3 est intégré dans chaque leçon — un
      expert patient et bienveillant qui sait exactement où tu es dans le programme.
    </p>

    <h2>Comment l&rsquo;ouvrir</h2>
    <p>
      Clique sur l&rsquo;<strong>icône de chat</strong> dans le lecteur de leçon pour ouvrir le
      panneau du tuteur IA. Il reste ouvert à côté de ta leçon et de ton éditeur de code, pour que
      tu puisses poser des questions sans perdre ta place.
    </p>

    <h2>Ce qu&rsquo;il peut t&rsquo;aider à faire</h2>
    <ul>
      <li>Expliquer un concept à nouveau, avec des mots plus simples ou une autre analogie</li>
      <li>Parcourir ton code <strong>ligne par ligne</strong> pour expliquer ce que fait chaque partie</li>
      <li>Déboguer un message d&rsquo;erreur que tu ne comprends pas</li>
      <li>Relier une leçon à des exemples africains — Njangi, mobile money, FCFA — si la leçon ne l&rsquo;avait pas déjà fait</li>
    </ul>

    <h2>Bilingue et conscient du contexte</h2>
    <p>
      Écris en français ou en anglais — le tuteur détecte ta langue et répond de la même manière. Si
      tu mélanges les langues (style camfranglais), il répond dans la langue que tu utilises le
      plus. Il connaît aussi le titre de la leçon, le cours, et ton niveau, donc ses réponses sont
      adaptées — pas génériques.
    </p>

    <h2>Astuces pour de meilleures réponses</h2>
    <ul>
      <li>Colle le message d&rsquo;erreur exact ou la ligne de code sur laquelle tu es bloqué — plus c&rsquo;est précis, meilleure est l&rsquo;aide.</li>
      <li>Tu peux dire &laquo; je ne comprends pas &raquo; — le tuteur ne te fera jamais sentir mal de redemander.</li>
      <li>Si une question ne concerne pas le Web3 ou la blockchain, le tuteur te redirigera gentiment — il est spécialisé volontairement.</li>
    </ul>
  </article>
);

// ─── "Teaching on Fundi3" ────────────────────────────────────────────────────────

const teachingOnFundi3En: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Fundi3 is built by and for the community — and that includes the people who teach on it. If
      you know Web3, Solidity, Rust, DeFi, or just have a gift for explaining hard things simply,
      we want to hear from you.
    </p>

    <h2>Who we&rsquo;re looking for</h2>
    <ul>
      <li><strong>Developers</strong> who&rsquo;ve shipped Solidity or Rust/Anchor projects and can break down how they work</li>
      <li><strong>Community educators</strong> who&rsquo;ve run Web3 meetups, Twitter Spaces, or study groups in French or English</li>
      <li><strong>DeFi practitioners</strong> who understand lending, DEXs, and stablecoins well enough to teach them safely</li>
      <li>Anyone passionate about <strong>African Web3 use cases</strong> — Njangi, remittances, mobile money rails</li>
    </ul>

    <h2>How to apply</h2>
    <p>
      Use the <a href="/contact" style={{ color: "#1D9E75" }}>Contact page</a> and choose{" "}
      <strong>&ldquo;Become an Instructor&rdquo;</strong> as the subject. Tell us:
    </p>
    <ul>
      <li>What topic(s) you&rsquo;d want to teach</li>
      <li>Your experience — links to projects, code, talks, or writing are great</li>
      <li>Which language(s) you&rsquo;re comfortable teaching in</li>
    </ul>
    <p>We read every message and reply within 48 hours.</p>

    <h2>What instructors get</h2>
    <ul>
      <li>Your name and bio credited on every course you create</li>
      <li>Early access to new platform features and the instructor dashboard</li>
      <li>A say in shaping the curriculum for African Web3 education</li>
    </ul>

    <h2>What we expect</h2>
    <p>
      Every Fundi3 course is <strong>bilingual (French + English)</strong>, written in plain
      language, and grounded in examples that make sense in an African context. You don&rsquo;t
      need to write both languages yourself — our team can help translate — but the structure and
      teaching approach should follow the{" "}
      <a href="/docs/course-creation-guide" style={{ color: "#1D9E75" }}>Course creation guide</a>.
    </p>
  </article>
);

const teachingOnFundi3Fr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Fundi3 est construit par et pour la communauté — y compris les personnes qui enseignent sur la
      plateforme. Si tu connais le Web3, Solidity, Rust, la DeFi, ou que tu as juste le don
      d&rsquo;expliquer simplement des choses compliquées, on veut te connaître.
    </p>

    <h2>Qui nous recherchons</h2>
    <ul>
      <li>Des <strong>développeurs</strong> ayant déjà livré des projets Solidity ou Rust/Anchor et capables d&rsquo;expliquer leur fonctionnement</li>
      <li>Des <strong>éducateurs communautaires</strong> ayant animé des meetups Web3, des Twitter Spaces ou des groupes d&rsquo;étude en français ou en anglais</li>
      <li>Des <strong>praticiens de la DeFi</strong> qui comprennent assez bien le prêt, les DEX et les stablecoins pour les enseigner en toute sécurité</li>
      <li>Toute personne passionnée par les <strong>cas d&rsquo;usage Web3 africains</strong> — Njangi, transferts d&rsquo;argent, mobile money</li>
    </ul>

    <h2>Comment postuler</h2>
    <p>
      Utilise la <a href="/contact" style={{ color: "#1D9E75" }}>page Contact</a> et choisis{" "}
      <strong>&laquo; Devenir instructeur &raquo;</strong> comme sujet. Dis-nous :
    </p>
    <ul>
      <li>Quel(s) sujet(s) tu aimerais enseigner</li>
      <li>Ton expérience — des liens vers des projets, du code, des conférences ou des articles sont parfaits</li>
      <li>Dans quelle(s) langue(s) tu es à l&rsquo;aise pour enseigner</li>
    </ul>
    <p>Nous lisons chaque message et répondons en moins de 48 heures.</p>

    <h2>Ce que les instructeurs reçoivent</h2>
    <ul>
      <li>Ton nom et ta bio crédités sur chaque cours que tu crées</li>
      <li>Un accès anticipé aux nouvelles fonctionnalités de la plateforme et au tableau de bord instructeur</li>
      <li>Un mot à dire dans la conception du programme d&rsquo;éducation Web3 pour l&rsquo;Afrique</li>
    </ul>

    <h2>Ce que nous attendons</h2>
    <p>
      Chaque cours Fundi3 est <strong>bilingue (français + anglais)</strong>, écrit dans un langage
      simple, et ancré dans des exemples qui ont du sens dans un contexte africain. Tu n&rsquo;as
      pas besoin d&rsquo;écrire toi-même dans les deux langues — notre équipe peut aider à traduire —
      mais la structure et l&rsquo;approche pédagogique doivent suivre le{" "}
      <a href="/docs/course-creation-guide" style={{ color: "#1D9E75" }}>Guide de création de cours</a>.
    </p>
  </article>
);

// ─── "Course creation guide" ───────────────────────────────────────────────────

const courseCreationGuideEn: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      This guide covers how a Fundi3 course is structured and what makes a lesson good — whether
      you&rsquo;re drafting your first course or your tenth.
    </p>

    <h2>Course anatomy</h2>
    <p>
      Every course is a tree: a course has modules, each module has lessons, and each lesson has a
      reading section plus optional playgrounds and quizzes. Here&rsquo;s the shape we work with:
    </p>
    <CodeBlock>{`{
  "slug": "njangi-on-the-blockchain",
  "title": { "en": "Njangi on the Blockchain", "fr": "Njangi sur la Blockchain" },
  "level": "intermediate",
  "modules": [
    {
      "title": { "en": "Why a Njangi DApp?", "fr": "Pourquoi une DApp Njangi ?" },
      "lessons": [
        {
          "slug": "njangi-problem",
          "content": { "en": "...", "fr": "..." },
          "playground": { "type": "solidity", "starter": "..." },
          "quiz": [ /* optional check-your-understanding questions */ ]
        }
      ]
    }
  ]
}`}</CodeBlock>

    <h2>Writing good lessons</h2>
    <ul>
      <li><strong>Short paragraphs.</strong> 2–4 sentences. Long blocks of text are hard to read on a phone, on 3G, after a long day.</li>
      <li><strong>One idea per section.</strong> Use <code>h2</code> headings to break a lesson into clear steps.</li>
      <li><strong>African examples first.</strong> Before reaching for Wall Street or Silicon Valley, ask: would a Njangi, MTN Mobile Money, or a CFA cross-border payment make this clearer?</li>
      <li><strong>Bilingual from the start.</strong> Write the English and French versions side by side — don&rsquo;t bolt on a translation later, meaning gets lost.</li>
      <li><strong>Explain code line by line.</strong> Don&rsquo;t just show a snippet — say what each part <em>does</em>, not just what it <em>is</em>.</li>
    </ul>

    <h2>Adding playgrounds &amp; quizzes</h2>
    <p>Each lesson can include:</p>
    <ul>
      <li>A <strong>JS/TS playground</strong> (Monaco + Sandpack) — best for Web3 fundamentals and scripting</li>
      <li>A <strong>Solidity playground</strong> (Remix) — for smart contract lessons</li>
      <li>A <strong>Rust/Anchor playground</strong> (Solana Playground) — for Solana program lessons</li>
      <li>A short <strong>quiz</strong> — 2–4 questions to reinforce the key takeaway, not to gatekeep progress</li>
    </ul>

    <h2>Submitting for review</h2>
    <p>
      Once your module or course draft is ready, send it through the{" "}
      <a href="/contact" style={{ color: "#1D9E75" }}>Contact page</a> (subject:{" "}
      <strong>&ldquo;Become an Instructor&rdquo;</strong> if you&rsquo;re new, or mention your
      existing course). The Fundi3 team reviews for technical accuracy, bilingual quality, and tone
      — then helps get it published and added to the curriculum tree.
    </p>
  </article>
);

const courseCreationGuideFr: ReactNode = (
  <article className="prose-fundi">
    <p className="lead">
      Ce guide explique comment un cours Fundi3 est structuré et ce qui fait une bonne leçon — que tu
      prépares ton premier cours ou ton dixième.
    </p>

    <h2>Anatomie d&rsquo;un cours</h2>
    <p>
      Chaque cours est un arbre : un cours contient des modules, chaque module contient des leçons,
      et chaque leçon contient une section de lecture ainsi que des terrains de code et quiz
      optionnels. Voici la structure que nous utilisons :
    </p>
    <CodeBlock>{`{
  "slug": "njangi-on-the-blockchain",
  "title": { "en": "Njangi on the Blockchain", "fr": "Njangi sur la Blockchain" },
  "level": "intermediate",
  "modules": [
    {
      "title": { "en": "Why a Njangi DApp?", "fr": "Pourquoi une DApp Njangi ?" },
      "lessons": [
        {
          "slug": "njangi-problem",
          "content": { "en": "...", "fr": "..." },
          "playground": { "type": "solidity", "starter": "..." },
          "quiz": [ /* questions optionnelles de compréhension */ ]
        }
      ]
    }
  ]
}`}</CodeBlock>

    <h2>Écrire de bonnes leçons</h2>
    <ul>
      <li><strong>Des paragraphes courts.</strong> 2 à 4 phrases. Les longs blocs de texte sont difficiles à lire sur téléphone, en 3G, après une longue journée.</li>
      <li><strong>Une idée par section.</strong> Utilise des titres <code>h2</code> pour découper une leçon en étapes claires.</li>
      <li><strong>Les exemples africains d&rsquo;abord.</strong> Avant de penser à Wall Street ou à la Silicon Valley, demande-toi : un Njangi, le Mobile Money MTN, ou un paiement transfrontalier en FCFA rendraient-ils cela plus clair ?</li>
      <li><strong>Bilingue dès le départ.</strong> Écris les versions anglaise et française côte à côte — ne rajoute pas une traduction plus tard, le sens se perd.</li>
      <li><strong>Explique le code ligne par ligne.</strong> Ne montre pas juste un extrait — dis ce que fait chaque partie, pas seulement ce qu&rsquo;elle est.</li>
    </ul>

    <h2>Ajouter des terrains de code et des quiz</h2>
    <p>Chaque leçon peut inclure :</p>
    <ul>
      <li>Un <strong>terrain JS/TS</strong> (Monaco + Sandpack) — idéal pour les bases du Web3 et les scripts</li>
      <li>Un <strong>terrain Solidity</strong> (Remix) — pour les leçons sur les smart contracts</li>
      <li>Un <strong>terrain Rust/Anchor</strong> (Solana Playground) — pour les leçons sur les programmes Solana</li>
      <li>Un court <strong>quiz</strong> — 2 à 4 questions pour renforcer l&rsquo;idée clé, pas pour bloquer la progression</li>
    </ul>

    <h2>Soumettre pour révision</h2>
    <p>
      Une fois ton module ou ton brouillon de cours prêt, envoie-le via la{" "}
      <a href="/contact" style={{ color: "#1D9E75" }}>page Contact</a> (sujet :{" "}
      <strong>&laquo; Devenir instructeur &raquo;</strong> si tu es nouveau, ou mentionne ton cours
      existant). L&rsquo;équipe Fundi3 vérifie la justesse technique, la qualité bilingue et le ton —
      puis aide à le publier et à l&rsquo;ajouter à l&rsquo;arbre du programme.
    </p>
  </article>
);

// ─── Code block used inside doc content ──────────────────────────────────────

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="my-5 rounded-xl overflow-hidden border" style={{ borderColor: "#1E2E28" }}>
      <div
        className="flex items-center gap-2 px-4 py-2 border-b"
        style={{ backgroundColor: "#0A0F0E", borderColor: "#1E2E28" }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <pre
        className="p-5 overflow-x-auto text-sm leading-relaxed"
        style={{ backgroundColor: "#0A0F0E", color: "#9FE1CB", margin: 0 }}
      >
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  );
}

// ─── Doc registry ─────────────────────────────────────────────────────────────

export const docs: Doc[] = [
  // Getting Started
  {
    slug: "what-is-fundi3",
    title: "What is Fundi3?",
    titleFr: "Qu'est-ce que Fundi3 ?",
    category: "Getting Started",
    categoryFr: "Premiers pas",
    readingTime: 3,
    lastUpdated: "2026-06-14",
    content: whatIsFundi3En,
    contentFr: whatIsFundi3Fr,
  },
  {
    slug: "creating-your-account",
    title: "Creating your account",
    titleFr: "Créer votre compte",
    category: "Getting Started",
    categoryFr: "Premiers pas",
    readingTime: 2,
    lastUpdated: "2026-06-14",
    content: creatingYourAccountEn,
    contentFr: creatingYourAccountFr,
  },
  {
    slug: "wallet-setup",
    title: "Setting up your wallet",
    titleFr: "Configurer votre portefeuille",
    category: "Getting Started",
    categoryFr: "Premiers pas",
    readingTime: 3,
    lastUpdated: "2026-06-14",
    content: walletSetupEn,
    contentFr: walletSetupFr,
  },
  {
    slug: "first-lesson",
    title: "Your first lesson",
    titleFr: "Votre première leçon",
    category: "Getting Started",
    categoryFr: "Premiers pas",
    readingTime: 3,
    lastUpdated: "2026-06-14",
    content: firstLessonEn,
    contentFr: firstLessonFr,
  },
  // Web3 Basics
  {
    slug: "what-is-blockchain",
    title: "What is blockchain?",
    titleFr: "Qu'est-ce que la blockchain ?",
    category: "Web3 Basics",
    categoryFr: "Les bases du Web3",
    readingTime: 6,
    lastUpdated: "2025-06-07",
    content: blockchainEn,
    contentFr: blockchainFr,
  },
  {
    slug: "what-is-smart-contract",
    title: "What is a smart contract?",
    titleFr: "Qu'est-ce qu'un smart contract ?",
    category: "Web3 Basics",
    categoryFr: "Les bases du Web3",
    readingTime: 4,
    lastUpdated: "2026-06-14",
    content: whatIsSmartContractEn,
    contentFr: whatIsSmartContractFr,
  },
  {
    slug: "what-is-defi",
    title: "What is DeFi?",
    titleFr: "Qu'est-ce que le DeFi ?",
    category: "Web3 Basics",
    categoryFr: "Les bases du Web3",
    readingTime: 4,
    lastUpdated: "2026-06-14",
    content: whatIsDefiEn,
    contentFr: whatIsDefiFr,
  },
  {
    slug: "what-is-nft",
    title: "What is an NFT?",
    titleFr: "Qu'est-ce qu'un NFT ?",
    category: "Web3 Basics",
    categoryFr: "Les bases du Web3",
    readingTime: 4,
    lastUpdated: "2026-06-14",
    content: whatIsNftEn,
    contentFr: whatIsNftFr,
  },
  {
    slug: "what-is-solana",
    title: "What is Solana?",
    titleFr: "Qu'est-ce que Solana ?",
    category: "Web3 Basics",
    categoryFr: "Les bases du Web3",
    readingTime: 4,
    lastUpdated: "2026-06-14",
    content: whatIsSolanaEn,
    contentFr: whatIsSolanaFr,
  },
  // Platform Guide
  {
    slug: "how-courses-work",
    title: "How courses work",
    titleFr: "Comment fonctionnent les cours",
    category: "Platform Guide",
    categoryFr: "Guide de la plateforme",
    readingTime: 3,
    lastUpdated: "2026-06-14",
    content: howCoursesWorkEn,
    contentFr: howCoursesWorkFr,
  },
  {
    slug: "code-editor",
    title: "The code editor",
    titleFr: "L'éditeur de code",
    category: "Platform Guide",
    categoryFr: "Guide de la plateforme",
    readingTime: 3,
    lastUpdated: "2026-06-14",
    content: codeEditorEn,
    contentFr: codeEditorFr,
  },
  {
    slug: "nft-certificates",
    title: "NFT certificates",
    titleFr: "Certificats NFT",
    category: "Platform Guide",
    categoryFr: "Guide de la plateforme",
    readingTime: 4,
    lastUpdated: "2026-06-14",
    content: nftCertificatesEn,
    contentFr: nftCertificatesFr,
  },
  {
    slug: "ai-tutor",
    title: "The AI tutor",
    titleFr: "Le tuteur IA",
    category: "Platform Guide",
    categoryFr: "Guide de la plateforme",
    readingTime: 3,
    lastUpdated: "2026-06-14",
    content: aiTutorEn,
    contentFr: aiTutorFr,
  },
  // For Instructors
  {
    slug: "teaching-on-fundi3",
    title: "Teaching on Fundi3",
    titleFr: "Enseigner sur Fundi3",
    category: "For Instructors",
    categoryFr: "Pour les instructeurs",
    readingTime: 3,
    lastUpdated: "2026-06-14",
    content: teachingOnFundi3En,
    contentFr: teachingOnFundi3Fr,
  },
  {
    slug: "course-creation-guide",
    title: "Course creation guide",
    titleFr: "Guide de création de cours",
    category: "For Instructors",
    categoryFr: "Pour les instructeurs",
    readingTime: 4,
    lastUpdated: "2026-06-14",
    content: courseCreationGuideEn,
    contentFr: courseCreationGuideFr,
  },
];

export function getDoc(slug: string): Doc | undefined {
  return docs.find((d) => d.slug === slug);
}

// ─── Sidebar nav structure ────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  labelFr: string;
  slug: string;
  available: boolean;
}

export interface NavSection {
  title: string;
  titleFr: string;
  items: NavItem[];
}

export const sidebarNav: NavSection[] = [
  {
    title: "Getting Started",
    titleFr: "Premiers pas",
    items: [
      { label: "What is Fundi3?",         labelFr: "Qu'est-ce que Fundi3 ?",    slug: "what-is-fundi3",         available: true },
      { label: "Creating your account",   labelFr: "Créer votre compte",        slug: "creating-your-account",  available: true },
      { label: "Setting up your wallet",  labelFr: "Configurer votre portefeuille", slug: "wallet-setup",       available: true },
      { label: "Your first lesson",       labelFr: "Votre première leçon",      slug: "first-lesson",           available: true },
    ],
  },
  {
    title: "Web3 Basics",
    titleFr: "Les bases du Web3",
    items: [
      { label: "What is blockchain?",       labelFr: "Qu'est-ce que la blockchain ?",    slug: "what-is-blockchain",   available: true  },
      { label: "What is a smart contract?", labelFr: "Qu'est-ce qu'un smart contract ?", slug: "what-is-smart-contract", available: true },
      { label: "What is DeFi?",             labelFr: "Qu'est-ce que le DeFi ?",          slug: "what-is-defi",         available: true },
      { label: "What is an NFT?",           labelFr: "Qu'est-ce qu'un NFT ?",            slug: "what-is-nft",          available: true },
      { label: "What is Solana?",           labelFr: "Qu'est-ce que Solana ?",           slug: "what-is-solana",       available: true },
    ],
  },
  {
    title: "Platform Guide",
    titleFr: "Guide de la plateforme",
    items: [
      { label: "How courses work",  labelFr: "Comment fonctionnent les cours", slug: "how-courses-work", available: true },
      { label: "The code editor",   labelFr: "L'éditeur de code",              slug: "code-editor",      available: true },
      { label: "NFT certificates",  labelFr: "Certificats NFT",                slug: "nft-certificates", available: true },
      { label: "The AI tutor",      labelFr: "Le tuteur IA",                   slug: "ai-tutor",         available: true },
    ],
  },
  {
    title: "For Instructors",
    titleFr: "Pour les instructeurs",
    items: [
      { label: "Teaching on Fundi3",    labelFr: "Enseigner sur Fundi3",      slug: "teaching-on-fundi3",   available: true },
      { label: "Course creation guide", labelFr: "Guide de création de cours", slug: "course-creation-guide", available: true },
    ],
  },
];
