// Course: NFTs & Digital Ownership
// Level: beginner · Bilingual (EN/FR) · Free · African context

export const nftsAndOwnership = {
  slug: "nfts-and-digital-ownership",
  titleEn: "NFTs & Digital Ownership",
  titleFr: "NFT et propriété numérique",
  descriptionEn:
    "Understand what NFTs really are, how they work on-chain, and how they're used for certificates, land records, and digital identity across Africa.",
  descriptionFr:
    "Comprenez ce que sont vraiment les NFT, comment ils fonctionnent on-chain, et comment ils sont utilisés pour les certificats, les titres fonciers et l'identité numérique en Afrique.",
  longDescriptionEn: `You've probably heard "NFT" used to describe expensive cartoon pictures sold for huge sums — and dismissed the whole idea as a fad. But the underlying technology — a tamper-proof, verifiable record of ownership stored on a blockchain — has uses far beyond digital art.

In Africa, land disputes, fake diplomas, and unverifiable certificates cost people their property, jobs, and trust. An NFT is, at its core, a unique digital record that can't be secretly duplicated or altered — the same property that makes it useful for art also makes it useful for land titles, educational certificates, and proof of identity.

In this course, you'll learn what makes NFTs different from regular tokens, how ownership and metadata are stored on-chain, how Solana's compressed NFTs make minting affordable at scale (this is how Fundi3's own course certificates work), and how marketplaces and royalties function. By the end, you'll understand both the hype and the genuinely useful parts of NFT technology — and you'll have sketched your own small NFT collection.`,
  longDescriptionFr: `Vous avez probablement entendu parler de « NFT » pour décrire des images de dessins animés vendues à prix d'or — et rejeté toute l'idée comme une mode. Mais la technologie sous-jacente — un enregistrement de propriété infalsifiable et vérifiable stocké sur une blockchain — a des usages bien au-delà de l'art numérique.

En Afrique, les conflits fonciers, les faux diplômes et les certificats invérifiables coûtent aux gens leurs biens, leurs emplois et leur confiance. Un NFT est, à la base, un enregistrement numérique unique qui ne peut pas être secrètement dupliqué ou modifié — la même propriété qui le rend utile pour l'art le rend également utile pour les titres fonciers, les certificats éducatifs et la preuve d'identité.

Dans ce cours, vous apprendrez ce qui distingue les NFT des jetons ordinaires, comment la propriété et les métadonnées sont stockées on-chain, comment les NFT compressés de Solana rendent le mint abordable à grande échelle (c'est ainsi que fonctionnent les certificats de cours de Fundi3), et comment fonctionnent les marketplaces et les royalties. À la fin, vous comprendrez à la fois le battage médiatique et les parties réellement utiles de la technologie NFT — et vous aurez esquissé votre propre petite collection de NFT.`,
  level: "beginner",
  language: "both",
  isAfrican: true,
  durationLabel: "4h",
  gradientFrom: "#1D9E75",
  gradientTo: "#FAC775",
  tags: ["NFTs", "Solidity", "Metaplex", "Solana", "African context"],
  outcomesEn: [
    "Explain what makes NFTs different from fungible tokens like USDC or SOL",
    "Understand how on-chain metadata and ownership records work",
    "Read a basic Solidity ERC-721 contract",
    "Understand Solana compressed NFTs and how Fundi3 certificates use them",
    "Understand marketplaces, royalties, and how to design a small collection",
  ],
  outcomesFr: [
    "Expliquer ce qui distingue les NFT des jetons fongibles comme USDC ou SOL",
    "Comprendre comment fonctionnent les métadonnées et les registres de propriété on-chain",
    "Lire un contrat Solidity ERC-721 de base",
    "Comprendre les NFT compressés de Solana et comment les certificats Fundi3 les utilisent",
    "Comprendre les marketplaces, les royalties, et comment concevoir une petite collection",
  ],
  modules: [
    // ── Module 1: What Is an NFT, Really? ────────────────────────────────────
    {
      titleEn: "What Is an NFT, Really?",
      titleFr: "Qu'est-ce qu'un NFT, vraiment ?",
      lessons: [
        {
          titleEn: "Fungible vs Non-Fungible",
          titleFr: "Fongible vs non fongible",
          durationLabel: "10 min",
          lessonType: "text",
          contentEn: `The word "fungible" means interchangeable — one unit is exactly as good as any other unit of the same type.

### Fungible: CFA francs, SOL, USDC

A 1,000 CFA note is interchangeable with any other 1,000 CFA note — you don't care *which specific note* you receive in change at the market. Similarly, 1 SOL is identical to any other 1 SOL, and 1 USDC is identical to any other 1 USDC. These are **fungible tokens** — each unit is identical and interchangeable.

### Non-fungible: land titles, diplomas, IDs

Now think about a piece of paper that says "Plot 14, Bonaberi, registered to Aminatou Njoya" — or a university diploma with your name on it. These documents are **not interchangeable**. Your diploma and your classmate's diploma both say "Bachelor's Degree," but they represent *different, specific facts* — different names, different dates, different recipients. Swapping them would be meaningless, or even fraudulent.

A **Non-Fungible Token (NFT)** is a blockchain record that captures this same idea: a *unique* token representing a *specific* thing — whether that's a piece of digital art, a plot of land, a certificate, or a ticket to a specific seat at a specific concert.

### What an NFT actually contains

An NFT is usually just:

1. A unique ID (a "mint address" on Solana, or a token ID in an ERC-721 contract)
2. A record of who currently owns it
3. A link to **metadata** — a JSON file describing the NFT (name, image, attributes, etc.), often stored off-chain (e.g., on IPFS or Arweave) with only the *link* stored on-chain

### The key property: provenance

Because the blockchain records every transfer of ownership, an NFT has **provenance** — a complete, tamper-proof history of who has owned it and when. For a land title, this means a verifiable chain of ownership going back to when the title was first issued — something that's often missing or disputed in paper-based land registries.

### Why this matters for Africa

Land disputes are a massive source of conflict and lost wealth across Africa, often because paper titles are lost, forged, or double-issued. An NFT-based land registry doesn't fix corruption or bad surveying — but it does make the *record itself* impossible to quietly duplicate or backdate, which is a meaningful step toward trustworthy property records.`,
          contentFr: `Le mot « fongible » signifie interchangeable — une unité a exactement la même valeur que toute autre unité du même type.

### Fongible : francs CFA, SOL, USDC

Un billet de 1 000 FCFA est interchangeable avec n'importe quel autre billet de 1 000 FCFA — vous ne vous souciez pas de *quel billet précis* vous recevez en monnaie au marché. De même, 1 SOL est identique à n'importe quel autre 1 SOL, et 1 USDC est identique à n'importe quel autre 1 USDC. Ce sont des **jetons fongibles** — chaque unité est identique et interchangeable.

### Non fongible : titres fonciers, diplômes, pièces d'identité

Pensez maintenant à un document qui dit « Parcelle 14, Bonabéri, enregistrée au nom d'Aminatou Njoya » — ou à un diplôme universitaire portant votre nom. Ces documents **ne sont pas interchangeables**. Votre diplôme et celui de votre camarade disent tous deux « Licence », mais ils représentent des *faits différents et spécifiques* — noms différents, dates différentes, destinataires différents. Les échanger serait absurde, voire frauduleux.

Un **jeton non fongible (NFT)** est un enregistrement blockchain qui capture cette même idée : un jeton *unique* représentant une chose *spécifique* — qu'il s'agisse d'une œuvre d'art numérique, d'une parcelle de terrain, d'un certificat, ou d'un billet pour une place précise à un concert précis.

### Ce qu'un NFT contient réellement

Un NFT, c'est généralement juste :

1. Un identifiant unique (une « adresse de mint » sur Solana, ou un token ID dans un contrat ERC-721)
2. Un enregistrement de qui en est actuellement propriétaire
3. Un lien vers des **métadonnées** — un fichier JSON décrivant le NFT (nom, image, attributs, etc.), souvent stocké hors chaîne (ex. sur IPFS ou Arweave), seul le *lien* étant stocké on-chain

### La propriété clé : la provenance

Parce que la blockchain enregistre chaque transfert de propriété, un NFT a une **provenance** — un historique complet et infalsifiable de qui l'a possédé et quand. Pour un titre foncier, cela signifie une chaîne de propriété vérifiable remontant jusqu'à l'émission initiale du titre — quelque chose qui manque souvent ou est contesté dans les registres fonciers papier.

### Pourquoi c'est important pour l'Afrique

Les conflits fonciers sont une source massive de conflits et de richesse perdue en Afrique, souvent parce que les titres papier sont perdus, falsifiés ou émis en double. Un registre foncier basé sur des NFT ne résout pas la corruption ou les mauvais relevés cadastraux — mais il rend *l'enregistrement lui-même* impossible à dupliquer ou à antidater discrètement, ce qui est une avancée significative vers des registres de propriété fiables.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "NFTs Beyond Art: African Use Cases",
          titleFr: "Les NFT au-delà de l'art : cas d'usage africains",
          durationLabel: "12 min",
          lessonType: "text",
          contentEn: `NFT headlines focus on million-dollar digital art sales — but the technology's most transformative uses for Africa are much more practical.

### 1. Educational certificates

A paper diploma can be lost, damaged, or forged. An NFT certificate — like the ones Fundi3 issues on Solana — is permanently verifiable: an employer can check the blockchain directly to confirm you completed a course, with no phone calls to a registrar required. This is especially valuable when graduates move between countries and need their credentials recognized quickly.

### 2. Land and property titles

Several African governments and startups have piloted blockchain-based land registries. Instead of a single paper deed that can be lost or forged, ownership is recorded as an NFT — transferable only with the current owner's cryptographic signature, with every past transfer permanently visible.

### 3. Agricultural supply chain certificates

A cocoa cooperative in Côte d'Ivoire can issue an NFT for each batch of beans, recording the farm of origin, harvest date, and certification status (e.g., organic, fair-trade). As the batch moves through exporters, processors, and retailers, each step can be recorded — giving buyers in Europe verifiable proof of origin, and potentially better prices for farmers.

### 4. Event tickets and identity

An NFT ticket can't be screenshotted and resold to multiple people — only one wallet can hold it at a time, and the venue can verify ownership instantly at the door. The same idea extends to membership cards, loyalty programs, and (carefully, with privacy considerations) identity credentials.

### The common thread

In every case, the NFT's value isn't "owning a picture" — it's having a **unique, verifiable, transferable record** that no single party can secretly alter. That's a genuinely useful primitive for a continent where trust in centralized record-keepers is often (rightly) low.`,
          contentFr: `Les gros titres sur les NFT se concentrent sur des ventes d'art numérique à des millions de dollars — mais les usages les plus transformateurs de cette technologie pour l'Afrique sont bien plus pratiques.

### 1. Certificats éducatifs

Un diplôme papier peut être perdu, endommagé ou falsifié. Un certificat NFT — comme ceux que Fundi3 émet sur Solana — est vérifiable de façon permanente : un employeur peut consulter directement la blockchain pour confirmer que vous avez terminé un cours, sans appel téléphonique à un service de scolarité. C'est particulièrement utile lorsque des diplômés se déplacent entre pays et ont besoin que leurs qualifications soient reconnues rapidement.

### 2. Titres fonciers et de propriété

Plusieurs gouvernements et startups africains ont expérimenté des registres fonciers basés sur la blockchain. Au lieu d'un acte papier unique pouvant être perdu ou falsifié, la propriété est enregistrée sous forme de NFT — transférable uniquement avec la signature cryptographique du propriétaire actuel, avec chaque transfert passé visible de façon permanente.

### 3. Certificats de chaîne d'approvisionnement agricole

Une coopérative de cacao en Côte d'Ivoire peut émettre un NFT pour chaque lot de fèves, enregistrant la ferme d'origine, la date de récolte et le statut de certification (ex. bio, commerce équitable). À mesure que le lot passe par les exportateurs, transformateurs et détaillants, chaque étape peut être enregistrée — donnant aux acheteurs européens une preuve vérifiable d'origine, et potentiellement de meilleurs prix pour les agriculteurs.

### 4. Billets d'événements et identité

Un billet NFT ne peut pas être capturé en photo d'écran et revendu à plusieurs personnes — un seul portefeuille peut le détenir à la fois, et le lieu peut vérifier instantanément la propriété à l'entrée. La même idée s'étend aux cartes de membre, aux programmes de fidélité et (avec prudence, en tenant compte de la vie privée) aux justificatifs d'identité.

### Le fil commun

Dans tous les cas, la valeur du NFT n'est pas de « posséder une image » — c'est d'avoir un **enregistrement unique, vérifiable et transférable** qu'aucune partie ne peut modifier secrètement. C'est un outil réellement utile pour un continent où la confiance envers les organismes centralisés de tenue de registres est souvent (et à juste titre) faible.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: NFT Basics",
          titleFr: "Quiz : les bases des NFT",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "Check your understanding of fungibility, what an NFT contains, and African use cases beyond art.",
          contentFr: "Vérifiez votre compréhension de la fongibilité, du contenu d'un NFT, et des cas d'usage africains au-delà de l'art.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "What does 'fungible' mean?",
              questionFr: "Que signifie « fongible » ?",
              optionsEn: ["Expensive", "Interchangeable — each unit is identical to any other unit of the same type", "Stored on Ethereum only", "Non-transferable"],
              optionsFr: ["Cher", "Interchangeable — chaque unité est identique à toute autre unité du même type", "Stocké uniquement sur Ethereum", "Non transférable"],
              correctIndex: 1,
              explanationEn: "Fungible assets like CFA notes, SOL, or USDC are interchangeable — you don't care which specific unit you have.",
              explanationFr: "Les actifs fongibles comme les billets CFA, le SOL ou l'USDC sont interchangeables — vous ne vous souciez pas de l'unité précise que vous détenez.",
            },
            {
              questionEn: "What does an NFT typically contain on-chain?",
              questionFr: "Que contient généralement un NFT on-chain ?",
              optionsEn: ["The full image file", "A unique ID, an ownership record, and usually a link to off-chain metadata", "A bank account number", "Nothing, NFTs are purely conceptual"],
              optionsFr: ["Le fichier image complet", "Un identifiant unique, un enregistrement de propriété, et généralement un lien vers des métadonnées hors chaîne", "Un numéro de compte bancaire", "Rien, les NFT sont purement conceptuels"],
              correctIndex: 1,
              explanationEn: "Heavy data like images is usually stored off-chain (IPFS/Arweave), with only a link and ownership record on-chain.",
              explanationFr: "Les données volumineuses comme les images sont généralement stockées hors chaîne (IPFS/Arweave), seul un lien et l'enregistrement de propriété étant on-chain.",
            },
            {
              questionEn: "Why is 'provenance' valuable for a land title NFT?",
              questionFr: "Pourquoi la « provenance » est-elle précieuse pour un NFT de titre foncier ?",
              optionsEn: ["It makes the land bigger", "It provides a complete, tamper-proof history of ownership transfers", "It increases the land's tax rate", "It has no practical value"],
              optionsFr: ["Cela agrandit le terrain", "Cela fournit un historique complet et infalsifiable des transferts de propriété", "Cela augmente le taux d'imposition du terrain", "Cela n'a aucune valeur pratique"],
              correctIndex: 1,
              explanationEn: "A verifiable chain of past owners makes disputes and forged claims far easier to resolve.",
              explanationFr: "Une chaîne vérifiable des anciens propriétaires rend les litiges et les revendications falsifiées beaucoup plus faciles à résoudre.",
            },
          ],
        },
      ],
    },

    // ── Module 2: How NFTs Work On-Chain ──────────────────────────────────────
    {
      titleEn: "How NFTs Work On-Chain",
      titleFr: "Comment fonctionnent les NFT on-chain",
      lessons: [
        {
          titleEn: "Metadata, Tokens & Ownership Records",
          titleFr: "Métadonnées, jetons et registres de propriété",
          durationLabel: "14 min",
          lessonType: "text",
          contentEn: `Let's open up an NFT and look at what's actually inside.

### On-chain vs off-chain data

Blockchains are expensive places to store large amounts of data — every byte stored on-chain costs money (gas on Ethereum, rent on Solana) and is replicated across every node in the network forever. So NFTs split their data into two parts:

**On-chain (small, critical)**:
- A unique token ID or mint address
- The current owner's address
- A URI (link) pointing to the metadata

**Off-chain (large, descriptive)**:
- A JSON metadata file — name, description, image URL, attributes
- The actual image/media file

### A typical metadata JSON file

\`\`\`json
{
  "name": "Fundi3 Certificate — Blockchain Basics",
  "description": "Awarded to Aminatou Njoya for completing Blockchain Basics on Fundi3.",
  "image": "https://arweave.net/abc123...",
  "attributes": [
    { "trait_type": "Course", "value": "Blockchain Basics" },
    { "trait_type": "Completion Date", "value": "2025-03-14" },
    { "trait_type": "Platform", "value": "Fundi3" }
  ]
}
\`\`\`

This file is typically stored on a **decentralized, permanent storage network** like Arweave or IPFS — services designed so files can't be quietly deleted or modified once uploaded, unlike a normal web server. The on-chain NFT record stores only the *link* to this file (the "URI").

### Why does this split matter?

If everything were stored on-chain, minting an NFT could cost dollars in transaction fees — putting it out of reach for, say, issuing a certificate to every learner who completes a free course. By keeping only the small, critical data (ownership + a link) on-chain, and the large data (images, descriptions) on permanent off-chain storage, NFTs stay both **verifiable** and **affordable**.

### Ownership: who can prove they own an NFT?

Ownership on-chain is just: *"this specific token ID/mint is currently associated with this specific wallet address."* Proving ownership means proving you control the private key for that wallet — the same private key that controls your other tokens. There's no separate "NFT login" — your wallet *is* your proof of ownership.

### A subtle but important point

Because the metadata link (URI) is just a pointer, if that link breaks (e.g., a centralized server hosting the JSON goes offline), the *ownership record* on-chain is still perfectly intact — but the *image and description* may become unavailable. This is why permanent storage (Arweave, IPFS with pinning) matters for anything meant to last, like a certificate or land title.`,
          contentFr: `Ouvrons un NFT et regardons ce qu'il contient réellement.

### Données on-chain vs hors chaîne

Les blockchains sont des endroits coûteux pour stocker de grandes quantités de données — chaque octet stocké on-chain coûte de l'argent (gas sur Ethereum, rent sur Solana) et est répliqué sur chaque nœud du réseau, pour toujours. Les NFT divisent donc leurs données en deux parties :

**On-chain (petit, critique)** :
- Un identifiant de jeton unique ou une adresse de mint
- L'adresse du propriétaire actuel
- Une URI (lien) pointant vers les métadonnées

**Hors chaîne (volumineux, descriptif)** :
- Un fichier de métadonnées JSON — nom, description, URL de l'image, attributs
- Le fichier image/média réel

### Un fichier de métadonnées JSON typique

\`\`\`json
{
  "name": "Certificat Fundi3 — Blockchain 101",
  "description": "Décerné à Aminatou Njoya pour avoir terminé Blockchain 101 sur Fundi3.",
  "image": "https://arweave.net/abc123...",
  "attributes": [
    { "trait_type": "Cours", "value": "Blockchain 101" },
    { "trait_type": "Date de complétion", "value": "2025-03-14" },
    { "trait_type": "Plateforme", "value": "Fundi3" }
  ]
}
\`\`\`

Ce fichier est généralement stocké sur un **réseau de stockage décentralisé et permanent** comme Arweave ou IPFS — des services conçus pour que les fichiers ne puissent pas être supprimés ou modifiés discrètement une fois téléversés, contrairement à un serveur web classique. L'enregistrement NFT on-chain ne stocke que le *lien* vers ce fichier (l'« URI »).

### Pourquoi cette séparation est-elle importante ?

Si tout était stocké on-chain, créer un NFT pourrait coûter plusieurs dollars en frais de transaction — le rendant inaccessible pour, par exemple, délivrer un certificat à chaque apprenant qui termine un cours gratuit. En ne gardant on-chain que les données petites et critiques (propriété + un lien), et les données volumineuses (images, descriptions) sur un stockage permanent hors chaîne, les NFT restent à la fois **vérifiables** et **abordables**.

### Propriété : qui peut prouver qu'il possède un NFT ?

La propriété on-chain, c'est simplement : « ce jeton/mint spécifique est actuellement associé à cette adresse de portefeuille spécifique ». Prouver la propriété signifie prouver que vous contrôlez la clé privée de ce portefeuille — la même clé privée qui contrôle vos autres jetons. Il n'y a pas de « connexion NFT » séparée — votre portefeuille *est* votre preuve de propriété.

### Un point subtil mais important

Comme le lien des métadonnées (URI) n'est qu'un pointeur, si ce lien se rompt (ex. un serveur centralisé hébergeant le JSON tombe hors ligne), l'*enregistrement de propriété* on-chain reste parfaitement intact — mais l'*image et la description* peuvent devenir indisponibles. C'est pourquoi le stockage permanent (Arweave, IPFS avec pinning) est important pour tout ce qui est censé durer, comme un certificat ou un titre foncier.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Reading a Solidity ERC-721 Contract",
          titleFr: "Lire un contrat Solidity ERC-721",
          durationLabel: "22 min",
          lessonType: "code",
          contentEn: `ERC-721 is the standard interface that makes NFTs work the same way across wallets, marketplaces, and apps on Ethereum-compatible chains. Real-world NFT contracts usually build on a battle-tested library (like OpenZeppelin's \`ERC721\`), but let's read a simplified version that shows the core ideas.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleNFT {
    string public name = "Fundi3 Learner Badge";
    string public symbol = "F3BADGE";

    uint256 public nextTokenId;
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) public balanceOf;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function mint(address to, string memory uri) external returns (uint256) {
        require(msg.sender == owner, "Only owner can mint");

        uint256 tokenId = nextTokenId;
        ownerOf[tokenId] = to;
        _tokenURIs[tokenId] = uri;
        balanceOf[to] += 1;
        nextTokenId += 1;

        return tokenId;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(ownerOf[tokenId] != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function transferFrom(address from, address to, uint256 tokenId) external {
        require(ownerOf[tokenId] == from, "Not the owner");
        require(msg.sender == from, "Only owner can transfer");

        ownerOf[tokenId] = to;
        balanceOf[from] -= 1;
        balanceOf[to] += 1;
    }
}
\`\`\`

### Walking through the code

- **\`name\` / \`symbol\`** identify the collection — like "Fundi3 Learner Badge" / "F3BADGE".
- **\`nextTokenId\`** is a simple counter — each new NFT gets the next sequential ID (0, 1, 2, ...).
- **\`ownerOf\`** is the core on-chain ownership record: token ID → current owner's address. This is the single source of truth for "who owns NFT #7?"
- **\`_tokenURIs\`** maps each token ID to its metadata link (the off-chain JSON from the previous lesson).
- **\`mint\`** is restricted to \`owner\` (the contract deployer — e.g., Fundi3's certificate-issuing wallet). This prevents random addresses from minting fake "Fundi3" certificates.
- **\`transferFrom\`** lets the current owner transfer their NFT to someone else, updating both \`ownerOf\` and the \`balanceOf\` counters.

### What real ERC-721 contracts add

- **Approvals**: \`approve\` and \`setApprovalForAll\` let you authorize a marketplace contract to transfer your NFT on your behalf — this is how "list for sale" works without giving up custody until a sale completes.
- **Events**: a \`Transfer\` event is emitted on every mint and transfer, so wallets and marketplaces can track ownership changes without scanning all contract storage.
- **Safety checks**: \`safeTransferFrom\` checks that the recipient contract can actually handle NFTs, preventing tokens from getting permanently stuck.

### Try it

Walk through what happens when Fundi3 calls \`mint(aminatouAddress, "https://arweave.net/abc123...")\` for the first time:

1. What is \`nextTokenId\` *before* the call, and what does it become *after*?
2. What does \`ownerOf[0]\` become?
3. What does \`balanceOf[aminatouAddress]\` become?`,
          contentFr: `ERC-721 est l'interface standard qui fait fonctionner les NFT de la même manière sur les portefeuilles, marketplaces et applications des chaînes compatibles Ethereum. Les contrats NFT réels s'appuient généralement sur une bibliothèque éprouvée (comme \`ERC721\` d'OpenZeppelin), mais lisons une version simplifiée qui montre les idées centrales.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleNFT {
    string public name = "Fundi3 Learner Badge";
    string public symbol = "F3BADGE";

    uint256 public nextTokenId;
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) public balanceOf;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function mint(address to, string memory uri) external returns (uint256) {
        require(msg.sender == owner, "Only owner can mint");

        uint256 tokenId = nextTokenId;
        ownerOf[tokenId] = to;
        _tokenURIs[tokenId] = uri;
        balanceOf[to] += 1;
        nextTokenId += 1;

        return tokenId;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(ownerOf[tokenId] != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function transferFrom(address from, address to, uint256 tokenId) external {
        require(ownerOf[tokenId] == from, "Not the owner");
        require(msg.sender == from, "Only owner can transfer");

        ownerOf[tokenId] = to;
        balanceOf[from] -= 1;
        balanceOf[to] += 1;
    }
}
\`\`\`

### Analyse du code

- **\`name\` / \`symbol\`** identifient la collection — comme « Fundi3 Learner Badge » / « F3BADGE ».
- **\`nextTokenId\`** est un simple compteur — chaque nouveau NFT reçoit l'identifiant séquentiel suivant (0, 1, 2, ...).
- **\`ownerOf\`** est l'enregistrement de propriété on-chain central : token ID → adresse du propriétaire actuel. C'est la source unique de vérité pour « qui possède le NFT #7 ? »
- **\`_tokenURIs\`** associe chaque token ID à son lien de métadonnées (le JSON hors chaîne de la leçon précédente).
- **\`mint\`** est restreint à \`owner\` (le déployeur du contrat — ex. le portefeuille émetteur de certificats de Fundi3). Cela empêche n'importe quelle adresse de créer de faux certificats « Fundi3 ».
- **\`transferFrom\`** permet au propriétaire actuel de transférer son NFT à quelqu'un d'autre, en mettant à jour \`ownerOf\` et les compteurs \`balanceOf\`.

### Ce que les vrais contrats ERC-721 ajoutent

- **Approbations** : \`approve\` et \`setApprovalForAll\` vous permettent d'autoriser un contrat de marketplace à transférer votre NFT en votre nom — c'est ainsi que fonctionne « mettre en vente » sans céder la garde avant qu'une vente ne soit conclue.
- **Événements** : un événement \`Transfer\` est émis à chaque mint et transfert, afin que les portefeuilles et marketplaces puissent suivre les changements de propriété sans scanner tout le stockage du contrat.
- **Vérifications de sécurité** : \`safeTransferFrom\` vérifie que le contrat destinataire peut réellement gérer des NFT, évitant que des jetons restent bloqués définitivement.

### Essayez

Suivez ce qui se passe lorsque Fundi3 appelle \`mint(aminatouAddress, "https://arweave.net/abc123...")\` pour la première fois :

1. Que vaut \`nextTokenId\` *avant* l'appel, et que devient-il *après* ?
2. Que devient \`ownerOf[0]\` ?
3. Que devient \`balanceOf[aminatouAddress]\` ?`,
          videoUrl: null,
          codeLanguage: "solidity",
          codeStarterEn: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleNFT {
    string public name = "Fundi3 Learner Badge";
    string public symbol = "F3BADGE";

    uint256 public nextTokenId;
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) public balanceOf;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function mint(address to, string memory uri) external returns (uint256) {
        // TODO: require msg.sender == owner
        // TODO: assign tokenId = nextTokenId
        // TODO: set ownerOf[tokenId], _tokenURIs[tokenId], increment balanceOf[to] and nextTokenId
        // TODO: return tokenId
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        // TODO: require token exists, return _tokenURIs[tokenId]
    }

    function transferFrom(address from, address to, uint256 tokenId) external {
        // TODO: require ownerOf[tokenId] == from and msg.sender == from
        // TODO: update ownerOf, balanceOf[from], balanceOf[to]
    }
}
`,
          codeStarterFr: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleNFT {
    string public name = "Fundi3 Learner Badge";
    string public symbol = "F3BADGE";

    uint256 public nextTokenId;
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => uint256) public balanceOf;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function mint(address to, string memory uri) external returns (uint256) {
        // TODO : require msg.sender == owner
        // TODO : assignez tokenId = nextTokenId
        // TODO : définissez ownerOf[tokenId], _tokenURIs[tokenId], incrémentez balanceOf[to] et nextTokenId
        // TODO : retournez tokenId
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        // TODO : vérifiez que le token existe, retournez _tokenURIs[tokenId]
    }

    function transferFrom(address from, address to, uint256 tokenId) external {
        // TODO : require ownerOf[tokenId] == from et msg.sender == from
        // TODO : mettez à jour ownerOf, balanceOf[from], balanceOf[to]
    }
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: NFTs On-Chain",
          titleFr: "Quiz : les NFT on-chain",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "Check your understanding of on-chain ownership records, metadata, and the ERC-721 standard.",
          contentFr: "Vérifiez votre compréhension des registres de propriété on-chain, des métadonnées et de la norme ERC-721.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "In the SimpleNFT contract, what does `ownerOf` represent?",
              questionFr: "Dans le contrat SimpleNFT, que représente `ownerOf` ?",
              optionsEn: ["The contract's deployer", "A mapping from token ID to the current owner's address — the core on-chain ownership record", "The metadata JSON", "A list of all NFTs ever created"],
              optionsFr: ["Le déployeur du contrat", "Un mapping du token ID vers l'adresse du propriétaire actuel — l'enregistrement de propriété on-chain central", "Le JSON de métadonnées", "Une liste de tous les NFT jamais créés"],
              correctIndex: 1,
              explanationEn: "ownerOf[tokenId] is the single source of truth for who currently owns a given NFT.",
              explanationFr: "ownerOf[tokenId] est la source unique de vérité pour savoir qui possède actuellement un NFT donné.",
            },
            {
              questionEn: "Why is the actual image usually NOT stored directly on-chain?",
              questionFr: "Pourquoi l'image réelle n'est-elle généralement PAS stockée directement on-chain ?",
              optionsEn: ["Images are illegal on blockchains", "Storing large data on-chain is expensive and replicated across every node, so only a link is stored on-chain", "Wallets can't display images", "It's a technical impossibility"],
              optionsFr: ["Les images sont illégales sur les blockchains", "Stocker de grandes données on-chain est coûteux et répliqué sur chaque nœud, donc seul un lien est stocké on-chain", "Les portefeuilles ne peuvent pas afficher d'images", "C'est techniquement impossible"],
              correctIndex: 1,
              explanationEn: "Permanent off-chain storage (Arweave, IPFS) keeps costs low while the on-chain link remains verifiable.",
              explanationFr: "Le stockage permanent hors chaîne (Arweave, IPFS) maintient les coûts bas tout en gardant le lien on-chain vérifiable.",
            },
            {
              questionEn: "In SimpleNFT, why does `mint` require `msg.sender == owner`?",
              questionFr: "Dans SimpleNFT, pourquoi `mint` exige-t-il `msg.sender == owner` ?",
              optionsEn: ["To save gas", "To restrict minting to an authorized issuer (e.g., Fundi3), preventing anyone from creating fake certificates", "Because Solidity requires it for all functions", "It's a typo and shouldn't be there"],
              optionsFr: ["Pour économiser du gas", "Pour restreindre le mint à un émetteur autorisé (ex. Fundi3), empêchant quiconque de créer de faux certificats", "Parce que Solidity l'exige pour toutes les fonctions", "C'est une erreur et ça ne devrait pas être là"],
              correctIndex: 1,
              explanationEn: "Without this check, anyone could mint NFTs claiming to be official Fundi3 certificates.",
              explanationFr: "Sans cette vérification, n'importe qui pourrait créer des NFT prétendant être des certificats Fundi3 officiels.",
            },
          ],
        },
      ],
    },

    // ── Module 3: NFTs on Solana & Compressed NFTs ───────────────────────────
    {
      titleEn: "NFTs on Solana & Compressed NFTs",
      titleFr: "Les NFT sur Solana et les NFT compressés",
      lessons: [
        {
          titleEn: "Solana NFTs & Metaplex",
          titleFr: "Les NFT sur Solana et Metaplex",
          durationLabel: "14 min",
          lessonType: "text",
          contentEn: `Solana's account model means NFTs work a bit differently than the ERC-721 contracts you just read — but the core ideas (unique ID, ownership, metadata link) are the same.

### The Solana NFT recipe

A "regular" Solana NFT is actually three separate accounts working together:

1. **A mint account** — represents the token itself, with a total supply of exactly **1** and **0 decimals** (this is what makes it non-fungible — you can't have "0.5 of an NFT").
2. **A token account** — owned by the holder's wallet, records that this wallet holds 1 unit of this specific mint.
3. **A metadata account** — created by the **Metaplex Token Metadata program**, storing the NFT's name, symbol, and a URI pointing to the off-chain JSON (same idea as ERC-721's \`tokenURI\`, but stored in its own account rather than a contract mapping).

### Why three accounts?

Solana programs are generally small and focused — the core SPL Token program only knows how to manage token *balances*, not NFT-specific concepts like "name" or "image." Metaplex's Token Metadata program was built *on top of* SPL Token to add that layer, without needing to modify the token program itself. This is the composability that Solana's program model encourages: small programs that build on each other via shared account structures.

### Verifying ownership

Just like with ERC-721, "owning" a Solana NFT means your wallet's token account holds 1 unit of that mint, with 0 decimals. Anyone can query this on-chain — no central database needed.

### The cost problem

Creating these three accounts costs **rent** — a small SOL deposit Solana requires to keep an account's data alive. For a single NFT, this is tiny (a fraction of a cent). But if Fundi3 wants to mint a certificate for *every learner who completes a course* — potentially thousands per month — those small costs add up, and so does the *time* to create three accounts per certificate.

This is exactly the problem **compressed NFTs** solve, which we'll cover next.`,
          contentFr: `Le modèle de comptes de Solana fait que les NFT fonctionnent un peu différemment des contrats ERC-721 que vous venez de lire — mais les idées centrales (identifiant unique, propriété, lien de métadonnées) sont les mêmes.

### La recette du NFT Solana

Un NFT Solana « classique » est en réalité trois comptes distincts travaillant ensemble :

1. **Un compte mint** — représente le jeton lui-même, avec une offre totale d'exactement **1** et **0 décimale** (c'est ce qui le rend non fongible — vous ne pouvez pas avoir « 0,5 NFT »).
2. **Un compte token** — détenu par le portefeuille du propriétaire, enregistre que ce portefeuille détient 1 unité de ce mint spécifique.
3. **Un compte de métadonnées** — créé par le **programme Token Metadata de Metaplex**, stockant le nom du NFT, son symbole, et une URI pointant vers le JSON hors chaîne (même idée que le \`tokenURI\` d'ERC-721, mais stocké dans son propre compte plutôt que dans un mapping de contrat).

### Pourquoi trois comptes ?

Les programmes Solana sont généralement petits et ciblés — le programme SPL Token de base ne sait gérer que les *soldes* de jetons, pas des concepts spécifiques aux NFT comme « nom » ou « image ». Le programme Token Metadata de Metaplex a été construit *au-dessus* de SPL Token pour ajouter cette couche, sans avoir à modifier le programme de jetons lui-même. C'est la composabilité que le modèle de programmes de Solana encourage : de petits programmes qui s'appuient les uns sur les autres via des structures de comptes partagées.

### Vérifier la propriété

Tout comme avec ERC-721, « posséder » un NFT Solana signifie que le compte token de votre portefeuille détient 1 unité de ce mint, avec 0 décimale. N'importe qui peut interroger cela on-chain — aucune base de données centrale n'est nécessaire.

### Le problème du coût

Créer ces trois comptes coûte du **rent** — un petit dépôt en SOL que Solana exige pour maintenir les données d'un compte en vie. Pour un seul NFT, c'est minime (une fraction de centime). Mais si Fundi3 veut créer un certificat pour *chaque apprenant qui termine un cours* — potentiellement des milliers par mois — ces petits coûts s'additionnent, ainsi que le *temps* nécessaire pour créer trois comptes par certificat.

C'est exactement le problème que résolvent les **NFT compressés**, que nous aborderons ensuite.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Compressed NFTs: How Fundi3 Certificates Work",
          titleFr: "NFT compressés : comment fonctionnent les certificats Fundi3",
          durationLabel: "18 min",
          lessonType: "code",
          contentEn: `**Compressed NFTs (cNFTs)**, built using Metaplex's **Bubblegum** program, solve the cost problem from the previous lesson by storing NFT data in a **Merkle tree** instead of individual accounts.

### The core idea

Instead of creating 3 accounts per NFT (costing rent each time), a compressed NFT collection creates **one Merkle tree account** that can hold *millions* of NFTs. Each individual NFT's data isn't stored on-chain at all — only a **cryptographic hash** of it is stored as a "leaf" in the tree. The full data lives in cheaper off-chain storage (indexed by services like Helius), and anyone can *prove* a specific NFT's data is valid by checking it against the on-chain tree root — without trusting the indexer.

### Why this matters for cost

| | Regular NFT | Compressed NFT |
| --- | --- | --- |
| Accounts created per mint | 3 (mint, token, metadata) | 0 (just a new leaf in an existing tree) |
| Approximate cost per mint | ~0.01 SOL (varies with SOL price) | A fraction of a cent |
| Good for | Limited-edition art, high-value items | Certificates, game items, loyalty points — anything minted at scale |

### A simplified minting flow (TypeScript)

\`\`\`typescript
import { createTree, mintV1 } from "@metaplex-foundation/mpl-bubblegum";
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";

// 1. Create a Merkle tree once (Fundi3 does this during setup, not per certificate)
const merkleTree = generateSigner(umi);
await createTree(umi, {
  merkleTree,
  maxDepth: 14,    // up to 2^14 = 16,384 NFTs in this tree
  maxBufferSize: 64,
}).sendAndConfirm(umi);

// 2. Mint a compressed NFT certificate into that tree (Fundi3 does this per completion)
await mintV1(umi, {
  leafOwner: learnerWalletAddress,
  merkleTree: merkleTree.publicKey,
  metadata: {
    name: "Fundi3 Certificate — Blockchain Basics",
    uri: "https://arweave.net/abc123...", // the metadata JSON from Module 2
    sellerFeeBasisPoints: 0,
    collection: { key: fundi3CollectionAddress, verified: false },
    creators: [{ address: fundi3WalletAddress, verified: true, share: 100 }],
  },
}).sendAndConfirm(umi);
\`\`\`

### Walking through the code

- **\`createTree\`** runs *once* when Fundi3 sets up its certificate program. \`maxDepth: 14\` means the tree can hold up to 2^14 = 16,384 certificates — Fundi3 can create multiple trees as it scales further.
- **\`mintV1\`** is called every time a learner completes a course. \`leafOwner\` is the learner's wallet — this is who will "own" the certificate.
- **\`metadata\`** mirrors the same JSON structure from Module 2 — name, URI, creators. \`sellerFeeBasisPoints: 0\` means no resale royalty (certificates generally shouldn't be tradeable assets).
- This is conceptually the same flow used to issue your Fundi3 course certificates — a one-time tree setup, then one cheap \`mintV1\` call per learner per course.

### Why this matters for Africa

Affordable minting means Fundi3 can give *every* learner — not just paying customers — a verifiable, permanent, on-chain certificate. At regular NFT costs, minting certificates for thousands of free-tier learners would be financially unsustainable. Compressed NFTs make "a certificate for everyone" possible.

### Try it

If \`maxDepth: 14\` allows 16,384 certificates per tree, and Fundi3 has 50,000 learners who've completed at least one course, how many trees would Fundi3 need to create in total? *(Hint: 50,000 / 16,384, rounded up)*`,
          contentFr: `Les **NFT compressés (cNFT)**, construits avec le programme **Bubblegum** de Metaplex, résolvent le problème de coût de la leçon précédente en stockant les données NFT dans un **arbre de Merkle** plutôt que dans des comptes individuels.

### L'idée centrale

Au lieu de créer 3 comptes par NFT (coûtant du rent chaque fois), une collection de NFT compressés crée **un seul compte d'arbre de Merkle** pouvant contenir *des millions* de NFT. Les données de chaque NFT individuel ne sont pas stockées on-chain du tout — seul un **hash cryptographique** de celles-ci est stocké comme « feuille » dans l'arbre. Les données complètes vivent dans un stockage hors chaîne moins coûteux (indexé par des services comme Helius), et n'importe qui peut *prouver* que les données d'un NFT spécifique sont valides en les vérifiant par rapport à la racine de l'arbre on-chain — sans faire confiance à l'indexeur.

### Pourquoi c'est important pour le coût

| | NFT classique | NFT compressé |
| --- | --- | --- |
| Comptes créés par mint | 3 (mint, token, métadonnées) | 0 (juste une nouvelle feuille dans un arbre existant) |
| Coût approximatif par mint | ~0,01 SOL (varie selon le prix du SOL) | Une fraction de centime |
| Adapté pour | Art en édition limitée, objets de grande valeur | Certificats, objets de jeu, points de fidélité — tout ce qui est créé à grande échelle |

### Un flux de mint simplifié (TypeScript)

\`\`\`typescript
import { createTree, mintV1 } from "@metaplex-foundation/mpl-bubblegum";
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";

// 1. Créer un arbre de Merkle une fois (Fundi3 le fait lors de la configuration, pas par certificat)
const merkleTree = generateSigner(umi);
await createTree(umi, {
  merkleTree,
  maxDepth: 14,    // jusqu'à 2^14 = 16 384 NFT dans cet arbre
  maxBufferSize: 64,
}).sendAndConfirm(umi);

// 2. Créer un certificat NFT compressé dans cet arbre (Fundi3 le fait à chaque complétion)
await mintV1(umi, {
  leafOwner: learnerWalletAddress,
  merkleTree: merkleTree.publicKey,
  metadata: {
    name: "Certificat Fundi3 — Blockchain 101",
    uri: "https://arweave.net/abc123...", // le JSON de métadonnées du Module 2
    sellerFeeBasisPoints: 0,
    collection: { key: fundi3CollectionAddress, verified: false },
    creators: [{ address: fundi3WalletAddress, verified: true, share: 100 }],
  },
}).sendAndConfirm(umi);
\`\`\`

### Analyse du code

- **\`createTree\`** s'exécute *une seule fois* lorsque Fundi3 met en place son programme de certificats. \`maxDepth: 14\` signifie que l'arbre peut contenir jusqu'à 2^14 = 16 384 certificats — Fundi3 peut créer plusieurs arbres en grandissant davantage.
- **\`mintV1\`** est appelé chaque fois qu'un apprenant termine un cours. \`leafOwner\` est le portefeuille de l'apprenant — c'est lui qui « possédera » le certificat.
- **\`metadata\`** reprend la même structure JSON que dans le Module 2 — nom, URI, créateurs. \`sellerFeeBasisPoints: 0\` signifie aucune royalty de revente (les certificats ne devraient généralement pas être des actifs échangeables).
- C'est conceptuellement le même flux utilisé pour délivrer vos certificats de cours Fundi3 — une configuration d'arbre unique, puis un appel \`mintV1\` peu coûteux par apprenant et par cours.

### Pourquoi c'est important pour l'Afrique

Un mint abordable permet à Fundi3 d'offrir à *chaque* apprenant — pas seulement aux clients payants — un certificat vérifiable, permanent et on-chain. Aux coûts des NFT classiques, créer des certificats pour des milliers d'apprenants du niveau gratuit serait financièrement insoutenable. Les NFT compressés rendent possible « un certificat pour tous ».

### Essayez

Si \`maxDepth: 14\` permet 16 384 certificats par arbre, et que Fundi3 a 50 000 apprenants ayant terminé au moins un cours, combien d'arbres Fundi3 devrait-il créer en tout ? *(Indice : 50 000 / 16 384, arrondi au supérieur)*`,
          videoUrl: null,
          codeLanguage: "typescript",
          codeStarterEn: `import { createTree, mintV1 } from "@metaplex-foundation/mpl-bubblegum";
import { generateSigner } from "@metaplex-foundation/umi";

// TODO: create a Merkle tree (once, during setup)
const merkleTree = generateSigner(umi);
// await createTree(umi, { merkleTree, maxDepth: 14, maxBufferSize: 64 }).sendAndConfirm(umi);

// TODO: mint a compressed NFT certificate for a learner who completed a course
// await mintV1(umi, {
//   leafOwner: learnerWalletAddress,
//   merkleTree: merkleTree.publicKey,
//   metadata: {
//     name: "Fundi3 Certificate — ...",
//     uri: "https://arweave.net/...",
//     sellerFeeBasisPoints: 0,
//     collection: { key: fundi3CollectionAddress, verified: false },
//     creators: [{ address: fundi3WalletAddress, verified: true, share: 100 }],
//   },
// }).sendAndConfirm(umi);
`,
          codeStarterFr: `import { createTree, mintV1 } from "@metaplex-foundation/mpl-bubblegum";
import { generateSigner } from "@metaplex-foundation/umi";

// TODO : créez un arbre de Merkle (une fois, lors de la configuration)
const merkleTree = generateSigner(umi);
// await createTree(umi, { merkleTree, maxDepth: 14, maxBufferSize: 64 }).sendAndConfirm(umi);

// TODO : créez un certificat NFT compressé pour un apprenant ayant terminé un cours
// await mintV1(umi, {
//   leafOwner: learnerWalletAddress,
//   merkleTree: merkleTree.publicKey,
//   metadata: {
//     name: "Certificat Fundi3 — ...",
//     uri: "https://arweave.net/...",
//     sellerFeeBasisPoints: 0,
//     collection: { key: fundi3CollectionAddress, verified: false },
//     creators: [{ address: fundi3WalletAddress, verified: true, share: 100 }],
//   },
// }).sendAndConfirm(umi);
`,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: NFTs on Solana & Compressed NFTs",
          titleFr: "Quiz : NFT sur Solana et NFT compressés",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "Check your understanding of Solana's NFT account model and how compressed NFTs reduce cost.",
          contentFr: "Vérifiez votre compréhension du modèle de comptes NFT de Solana et comment les NFT compressés réduisent les coûts.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "What three account types make up a 'regular' Solana NFT?",
              questionFr: "Quels trois types de comptes composent un NFT Solana « classique » ?",
              optionsEn: ["A wallet, a validator, and a program", "A mint account, a token account, and a metadata account", "A block, a transaction, and a signature", "An RPC node, a keypair, and a cluster"],
              optionsFr: ["Un portefeuille, un validateur et un programme", "Un compte mint, un compte token et un compte de métadonnées", "Un bloc, une transaction et une signature", "Un nœud RPC, une paire de clés et un cluster"],
              correctIndex: 1,
              explanationEn: "The mint account represents the token (supply 1, 0 decimals), the token account records ownership, and the metadata account (via Metaplex) stores name/URI.",
              explanationFr: "Le compte mint représente le jeton (offre 1, 0 décimale), le compte token enregistre la propriété, et le compte de métadonnées (via Metaplex) stocke le nom/l'URI.",
            },
            {
              questionEn: "What core data structure do compressed NFTs use to avoid per-NFT account costs?",
              questionFr: "Quelle structure de données centrale les NFT compressés utilisent-ils pour éviter les coûts de compte par NFT ?",
              optionsEn: ["A linked list", "A Merkle tree, where each NFT is a leaf represented by a hash", "A spreadsheet", "A separate blockchain"],
              optionsFr: ["Une liste chaînée", "Un arbre de Merkle, où chaque NFT est une feuille représentée par un hash", "Une feuille de calcul", "Une blockchain séparée"],
              correctIndex: 1,
              explanationEn: "One tree account can hold millions of NFT 'leaves', avoiding the need for 3 new accounts per mint.",
              explanationFr: "Un seul compte d'arbre peut contenir des millions de « feuilles » NFT, évitant le besoin de 3 nouveaux comptes par mint.",
            },
            {
              questionEn: "Why does Fundi3 use compressed NFTs for course certificates?",
              questionFr: "Pourquoi Fundi3 utilise-t-il des NFT compressés pour les certificats de cours ?",
              optionsEn: ["Because regular NFTs don't support images", "Because minting thousands of regular NFTs would be too costly, while compressed NFTs cost a fraction of a cent each", "Because compressed NFTs are more valuable", "Because they expire after a year"],
              optionsFr: ["Parce que les NFT classiques ne supportent pas les images", "Parce que créer des milliers de NFT classiques serait trop coûteux, alors que les NFT compressés coûtent une fraction de centime chacun", "Parce que les NFT compressés ont plus de valeur", "Parce qu'ils expirent après un an"],
              correctIndex: 1,
              explanationEn: "Compressed NFTs let Fundi3 issue a certificate to every learner, including free-tier users, without the cost scaling with rent per account.",
              explanationFr: "Les NFT compressés permettent à Fundi3 de délivrer un certificat à chaque apprenant, y compris les utilisateurs du niveau gratuit, sans que le coût n'augmente avec le rent par compte.",
            },
          ],
        },
      ],
    },

    // ── Module 4: Marketplaces, Royalties & Your Own Collection ──────────────
    {
      titleEn: "Marketplaces, Royalties & Your Own Collection",
      titleFr: "Marketplaces, royalties et votre propre collection",
      lessons: [
        {
          titleEn: "Marketplaces & Royalties",
          titleFr: "Marketplaces et royalties",
          durationLabel: "12 min",
          lessonType: "text",
          contentEn: `Now that you understand how NFTs are minted and stored, let's look at how they're bought, sold, and how creators can earn ongoing income from their work.

### How NFT marketplaces work

An NFT marketplace (OpenSea on Ethereum, Magic Eden or Tensor on Solana) is mostly a **listing and discovery layer** built on top of the on-chain ownership records you already understand:

1. **Listing**: the owner calls \`approve\` (Solidity) or signs a "delegate" instruction (Solana), giving the marketplace contract permission to transfer the NFT *if* a sale completes — without giving up ownership yet.
2. **Discovery**: the marketplace's off-chain indexer (a database) scans the blockchain for listed NFTs and displays them with search, filters, and images.
3. **Sale**: a buyer sends payment to the marketplace contract, which atomically transfers the NFT to the buyer and the payment (minus fees) to the seller — all in one transaction, so neither party can be cheated.

### Royalties: ongoing income for creators

A **royalty** is a percentage of every *resale* price that goes back to the original creator — for example, 5%. If a digital artist sells a piece for $100 and it later resells for $1,000, a 5% royalty sends $50 back to the original artist automatically, enforced by code.

**Why this is revolutionary**: in traditional art markets, only the *first* sale benefits the artist — if a painting becomes famous and sells for millions later, the original artist (or their estate) gets nothing extra. On-chain royalties mean creators can benefit from their work's entire lifetime of value, automatically, anywhere in the world.

### The royalty enforcement problem

Royalties are enforced *by convention*, not by an unbreakable rule — a marketplace *could* choose not to honor them (some controversially have). On Solana, newer standards bake royalty enforcement more deeply into the transfer logic itself. On Ethereum, the **ERC-2981** standard lets a contract declare its royalty percentage in a standard way that marketplaces *can* read and respect — but ultimately, code can only request a royalty be paid; whether a given marketplace's *own* contract honors that request is a separate question.

### Designing your own small collection

If you were to launch a small NFT collection — say, "Fundi3 Founding Learners" for the first 500 people to complete a course — you'd need to decide:

- **Supply**: fixed at 500, enforced by a counter and a \`require\` check in \`mint\`
- **Mint price**: free (like Fundi3 certificates) or paid?
- **Royalty**: 0% (if it's a badge, not meant for trading) or a small percentage if resale is expected
- **Metadata**: same name/description/image/attributes pattern from Module 2, customized per holder or shared across the collection

In the next lesson, you'll read a Solidity contract that adds a **supply cap** and **royalty info** to the SimpleNFT contract from Module 2.`,
          contentFr: `Maintenant que vous comprenez comment les NFT sont créés et stockés, voyons comment ils sont achetés, vendus, et comment les créateurs peuvent tirer un revenu continu de leur travail.

### Comment fonctionnent les marketplaces NFT

Une marketplace NFT (OpenSea sur Ethereum, Magic Eden ou Tensor sur Solana) est essentiellement une **couche de mise en vente et de découverte** construite au-dessus des registres de propriété on-chain que vous comprenez déjà :

1. **Mise en vente** : le propriétaire appelle \`approve\` (Solidity) ou signe une instruction de « délégation » (Solana), donnant au contrat de la marketplace la permission de transférer le NFT *si* une vente se conclut — sans céder la propriété pour autant.
2. **Découverte** : l'indexeur hors chaîne de la marketplace (une base de données) scanne la blockchain pour les NFT mis en vente et les affiche avec recherche, filtres et images.
3. **Vente** : un acheteur envoie le paiement au contrat de la marketplace, qui transfère atomiquement le NFT à l'acheteur et le paiement (moins les frais) au vendeur — tout en une seule transaction, afin qu'aucune des parties ne puisse être trompée.

### Royalties : revenu continu pour les créateurs

Une **royalty** est un pourcentage de chaque prix de *revente* qui revient au créateur original — par exemple, 5 %. Si un artiste numérique vend une œuvre pour 100 $ et qu'elle se revend plus tard pour 1 000 $, une royalty de 5 % renvoie automatiquement 50 $ à l'artiste original, appliquée par le code.

**Pourquoi c'est révolutionnaire** : sur les marchés de l'art traditionnels, seule la *première* vente bénéficie à l'artiste — si une peinture devient célèbre et se vend pour des millions plus tard, l'artiste original (ou ses héritiers) n'en tire rien de plus. Les royalties on-chain signifient que les créateurs peuvent bénéficier de toute la valeur générée par leur œuvre au fil du temps, automatiquement, n'importe où dans le monde.

### Le problème de l'application des royalties

Les royalties sont appliquées *par convention*, pas par une règle inviolable — une marketplace *pourrait* choisir de ne pas les honorer (certaines l'ont fait, de manière controversée). Sur Solana, des normes plus récentes intègrent l'application des royalties plus profondément dans la logique de transfert elle-même. Sur Ethereum, la norme **ERC-2981** permet à un contrat de déclarer son pourcentage de royalty de manière standard, que les marketplaces *peuvent* lire et respecter — mais en fin de compte, le code ne peut que demander qu'une royalty soit payée ; que le contrat *propre* d'une marketplace donnée honore cette demande est une question séparée.

### Concevoir votre propre petite collection

Si vous deviez lancer une petite collection de NFT — par exemple, « Fundi3 Founding Learners » pour les 500 premières personnes à terminer un cours — vous devriez décider :

- **Offre** : fixée à 500, appliquée par un compteur et une vérification \`require\` dans \`mint\`
- **Prix de mint** : gratuit (comme les certificats Fundi3) ou payant ?
- **Royalty** : 0 % (s'il s'agit d'un badge, non destiné à l'échange) ou un petit pourcentage si une revente est attendue
- **Métadonnées** : même schéma nom/description/image/attributs du Module 2, personnalisé par détenteur ou partagé sur toute la collection

Dans la prochaine leçon, vous lirez un contrat Solidity qui ajoute un **plafond d'offre** et des **informations de royalty** au contrat SimpleNFT du Module 2.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Solidity: Royalties & Minting Limits",
          titleFr: "Solidity : royalties et limites de mint",
          durationLabel: "20 min",
          lessonType: "code",
          contentEn: `Let's extend the SimpleNFT contract from Module 2 with two common collection features: a maximum supply and royalty information (following the ERC-2981 pattern).

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FoundingLearnersNFT {
    string public name = "Fundi3 Founding Learners";
    string public symbol = "FOUNDER";

    uint256 public constant MAX_SUPPLY = 500;
    uint256 public nextTokenId;

    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => string) private _tokenURIs;

    address public royaltyReceiver;
    uint96 public royaltyBasisPoints; // 500 = 5%

    address public owner;

    constructor(address _royaltyReceiver, uint96 _royaltyBasisPoints) {
        owner = msg.sender;
        royaltyReceiver = _royaltyReceiver;
        royaltyBasisPoints = _royaltyBasisPoints;
    }

    function mint(address to, string memory uri) external returns (uint256) {
        require(msg.sender == owner, "Only owner can mint");
        require(nextTokenId < MAX_SUPPLY, "Max supply reached");

        uint256 tokenId = nextTokenId;
        ownerOf[tokenId] = to;
        _tokenURIs[tokenId] = uri;
        nextTokenId += 1;

        return tokenId;
    }

    // ERC-2981 style royalty info: marketplaces call this to learn the royalty split
    function royaltyInfo(uint256 /* tokenId */, uint256 salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount)
    {
        receiver = royaltyReceiver;
        royaltyAmount = (salePrice * royaltyBasisPoints) / 10000;
    }
}
\`\`\`

### Walking through the code

- **\`MAX_SUPPLY = 500\`** caps the collection size. The \`require(nextTokenId < MAX_SUPPLY, ...)\` check in \`mint\` makes it *impossible* to mint a 501st token — this guarantee is enforced by code, not a promise in a README.
- **\`royaltyReceiver\` and \`royaltyBasisPoints\`** are set once in the constructor — e.g., Fundi3's treasury address and \`500\` (5%, since basis points are hundredths of a percent: 10000 = 100%).
- **\`royaltyInfo\`** follows the shape of ERC-2981: given a sale price, it returns who should receive a royalty and how much. A marketplace *that respects ERC-2981* would call this function and pay \`royaltyAmount\` to \`receiver\` as part of the sale transaction.

### Try it

With \`royaltyBasisPoints = 500\` (5%) and a resale price of 1,000 USDC, what does \`royaltyInfo\` return for \`royaltyAmount\`? *(Hint: (1000 * 500) / 10000)*

Then consider: if Fundi3 set \`royaltyBasisPoints = 0\` for its certificate NFTs, what would that signal about whether certificates are meant to be resold?`,
          contentFr: `Étendons le contrat SimpleNFT du Module 2 avec deux fonctionnalités courantes de collection : une offre maximale et des informations de royalty (selon le modèle ERC-2981).

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FoundingLearnersNFT {
    string public name = "Fundi3 Founding Learners";
    string public symbol = "FOUNDER";

    uint256 public constant MAX_SUPPLY = 500;
    uint256 public nextTokenId;

    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => string) private _tokenURIs;

    address public royaltyReceiver;
    uint96 public royaltyBasisPoints; // 500 = 5%

    address public owner;

    constructor(address _royaltyReceiver, uint96 _royaltyBasisPoints) {
        owner = msg.sender;
        royaltyReceiver = _royaltyReceiver;
        royaltyBasisPoints = _royaltyBasisPoints;
    }

    function mint(address to, string memory uri) external returns (uint256) {
        require(msg.sender == owner, "Only owner can mint");
        require(nextTokenId < MAX_SUPPLY, "Max supply reached");

        uint256 tokenId = nextTokenId;
        ownerOf[tokenId] = to;
        _tokenURIs[tokenId] = uri;
        nextTokenId += 1;

        return tokenId;
    }

    // Royalty de style ERC-2981 : les marketplaces appellent ceci pour connaître la répartition
    function royaltyInfo(uint256 /* tokenId */, uint256 salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount)
    {
        receiver = royaltyReceiver;
        royaltyAmount = (salePrice * royaltyBasisPoints) / 10000;
    }
}
\`\`\`

### Analyse du code

- **\`MAX_SUPPLY = 500\`** plafonne la taille de la collection. La vérification \`require(nextTokenId < MAX_SUPPLY, ...)\` dans \`mint\` rend *impossible* la création d'un 501ᵉ jeton — cette garantie est appliquée par le code, pas par une promesse dans un README.
- **\`royaltyReceiver\` et \`royaltyBasisPoints\`** sont définis une fois dans le constructeur — ex. l'adresse de la trésorerie de Fundi3 et \`500\` (5 %, les points de base étant des centièmes de pourcent : 10000 = 100 %).
- **\`royaltyInfo\`** suit la forme d'ERC-2981 : étant donné un prix de vente, elle retourne qui devrait recevoir une royalty et combien. Une marketplace *qui respecte ERC-2981* appellerait cette fonction et verserait \`royaltyAmount\` à \`receiver\` dans le cadre de la transaction de vente.

### Essayez

Avec \`royaltyBasisPoints = 500\` (5 %) et un prix de revente de 1 000 USDC, que retourne \`royaltyInfo\` pour \`royaltyAmount\` ? *(Indice : (1000 * 500) / 10000)*

Réfléchissez ensuite : si Fundi3 définissait \`royaltyBasisPoints = 0\` pour ses NFT de certificats, qu'est-ce que cela indiquerait sur le fait que les certificats soient destinés ou non à être revendus ?`,
          videoUrl: null,
          codeLanguage: "solidity",
          codeStarterEn: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FoundingLearnersNFT {
    string public name = "Fundi3 Founding Learners";
    string public symbol = "FOUNDER";

    uint256 public constant MAX_SUPPLY = 500;
    uint256 public nextTokenId;

    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => string) private _tokenURIs;

    address public royaltyReceiver;
    uint96 public royaltyBasisPoints;

    address public owner;

    constructor(address _royaltyReceiver, uint96 _royaltyBasisPoints) {
        owner = msg.sender;
        royaltyReceiver = _royaltyReceiver;
        royaltyBasisPoints = _royaltyBasisPoints;
    }

    function mint(address to, string memory uri) external returns (uint256) {
        // TODO: require msg.sender == owner
        // TODO: require nextTokenId < MAX_SUPPLY
        // TODO: assign tokenId, set ownerOf/_tokenURIs, increment nextTokenId, return tokenId
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount)
    {
        // TODO: receiver = royaltyReceiver
        // TODO: royaltyAmount = (salePrice * royaltyBasisPoints) / 10000
    }
}
`,
          codeStarterFr: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FoundingLearnersNFT {
    string public name = "Fundi3 Founding Learners";
    string public symbol = "FOUNDER";

    uint256 public constant MAX_SUPPLY = 500;
    uint256 public nextTokenId;

    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => string) private _tokenURIs;

    address public royaltyReceiver;
    uint96 public royaltyBasisPoints;

    address public owner;

    constructor(address _royaltyReceiver, uint96 _royaltyBasisPoints) {
        owner = msg.sender;
        royaltyReceiver = _royaltyReceiver;
        royaltyBasisPoints = _royaltyBasisPoints;
    }

    function mint(address to, string memory uri) external returns (uint256) {
        // TODO : require msg.sender == owner
        // TODO : require nextTokenId < MAX_SUPPLY
        // TODO : assignez tokenId, définissez ownerOf/_tokenURIs, incrémentez nextTokenId, retournez tokenId
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount)
    {
        // TODO : receiver = royaltyReceiver
        // TODO : royaltyAmount = (salePrice * royaltyBasisPoints) / 10000
    }
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Final Quiz: NFTs & Digital Ownership",
          titleFr: "Quiz final : NFT et propriété numérique",
          durationLabel: "8 min",
          lessonType: "quiz",
          contentEn: "One last check across the whole course — fungibility, on-chain records, Solana/compressed NFTs, and marketplaces.",
          contentFr: "Une dernière vérification sur tout le cours — fongibilité, registres on-chain, NFT Solana/compressés, et marketplaces.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "What guarantees that a collection's max supply (e.g., 500) can never be exceeded?",
              questionFr: "Qu'est-ce qui garantit que l'offre maximale d'une collection (ex. 500) ne peut jamais être dépassée ?",
              optionsEn: ["A promise in the project's README", "A require() check in the mint function, enforced by the blockchain for every transaction", "The marketplace's terms of service", "Nothing guarantees it"],
              optionsFr: ["Une promesse dans le README du projet", "Une vérification require() dans la fonction mint, appliquée par la blockchain pour chaque transaction", "Les conditions d'utilisation de la marketplace", "Rien ne le garantit"],
              correctIndex: 1,
              explanationEn: "On-chain require() checks are enforced for every transaction by the network itself, not by trust in any party.",
              explanationFr: "Les vérifications require() on-chain sont appliquées pour chaque transaction par le réseau lui-même, sans confiance nécessaire envers une partie.",
            },
            {
              questionEn: "What does a royalty basis points value of 500 represent?",
              questionFr: "Que représente une valeur de royalty de 500 points de base ?",
              optionsEn: ["500 USDC", "5% (since 10,000 basis points = 100%)", "500%", "0.5 SOL"],
              optionsFr: ["500 USDC", "5 % (puisque 10 000 points de base = 100 %)", "500 %", "0,5 SOL"],
              correctIndex: 1,
              explanationEn: "Basis points are hundredths of a percent — a common fixed-point convention since Solidity has no decimals.",
              explanationFr: "Les points de base sont des centièmes de pourcent — une convention en virgule fixe courante puisque Solidity n'a pas de décimales.",
            },
            {
              questionEn: "Across certificates, land titles, and supply chain tracking, what makes NFTs useful beyond digital art?",
              questionFr: "À travers les certificats, les titres fonciers et le suivi de chaîne d'approvisionnement, qu'est-ce qui rend les NFT utiles au-delà de l'art numérique ?",
              optionsEn: ["Their resale price", "A unique, verifiable, tamper-proof on-chain record of ownership and provenance for a specific real-world thing", "Their file size", "Government backing"],
              optionsFr: ["Leur prix de revente", "Un enregistrement on-chain unique, vérifiable et infalsifiable de propriété et de provenance pour une chose spécifique du monde réel", "La taille de leur fichier", "Le soutien gouvernemental"],
              correctIndex: 1,
              explanationEn: "Whether it's a certificate, a land title, or a cocoa batch, the value is the tamper-proof, verifiable record — not the token's market price.",
              explanationFr: "Qu'il s'agisse d'un certificat, d'un titre foncier ou d'un lot de cacao, la valeur réside dans l'enregistrement infalsifiable et vérifiable — pas dans le prix de marché du jeton.",
            },
          ],
        },
      ],
    },
  ],
};
