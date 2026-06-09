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
      { label: "What is Fundi3?",         labelFr: "Qu'est-ce que Fundi3 ?",    slug: "what-is-fundi3",         available: false },
      { label: "Creating your account",   labelFr: "Créer votre compte",        slug: "creating-your-account",  available: false },
      { label: "Setting up your wallet",  labelFr: "Configurer votre portefeuille", slug: "wallet-setup",       available: false },
      { label: "Your first lesson",       labelFr: "Votre première leçon",      slug: "first-lesson",           available: false },
    ],
  },
  {
    title: "Web3 Basics",
    titleFr: "Les bases du Web3",
    items: [
      { label: "What is blockchain?",       labelFr: "Qu'est-ce que la blockchain ?",    slug: "what-is-blockchain",   available: true  },
      { label: "What is a smart contract?", labelFr: "Qu'est-ce qu'un smart contract ?", slug: "what-is-smart-contract", available: false },
      { label: "What is DeFi?",             labelFr: "Qu'est-ce que le DeFi ?",          slug: "what-is-defi",         available: false },
      { label: "What is an NFT?",           labelFr: "Qu'est-ce qu'un NFT ?",            slug: "what-is-nft",          available: false },
      { label: "What is Solana?",           labelFr: "Qu'est-ce que Solana ?",           slug: "what-is-solana",       available: false },
    ],
  },
  {
    title: "Platform Guide",
    titleFr: "Guide de la plateforme",
    items: [
      { label: "How courses work",  labelFr: "Comment fonctionnent les cours", slug: "how-courses-work", available: false },
      { label: "The code editor",   labelFr: "L'éditeur de code",              slug: "code-editor",      available: false },
      { label: "NFT certificates",  labelFr: "Certificats NFT",                slug: "nft-certificates", available: false },
      { label: "The AI tutor",      labelFr: "Le tuteur IA",                   slug: "ai-tutor",         available: false },
    ],
  },
  {
    title: "For Instructors",
    titleFr: "Pour les instructeurs",
    items: [
      { label: "Teaching on Fundi3",    labelFr: "Enseigner sur Fundi3",      slug: "teaching-on-fundi3",   available: false },
      { label: "Course creation guide", labelFr: "Guide de création de cours", slug: "course-creation-guide", available: false },
    ],
  },
];
