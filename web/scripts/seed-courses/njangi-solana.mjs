// Course: Rust & Anchor — Build a Njangi DApp on Solana
// Seeded by scripts/seed-courses/index.mjs — see CourseTreeInput in lib/courses/types.ts for shape.

export const njangiOnSolana = {
  slug: "njangi-on-solana",
  titleEn: "Rust & Anchor: Build a Njangi DApp on Solana",
  titleFr: "Rust et Anchor : créez une DApp Njangi sur Solana",
  descriptionEn:
    "Learn Rust and the Anchor framework by designing, building, testing, and deploying a real rotating savings circle (Njangi) program on Solana.",
  descriptionFr:
    "Apprenez Rust et le framework Anchor en concevant, construisant, testant et déployant un véritable programme de tontine rotative (Njangi) sur Solana.",
  longDescriptionEn:
    "Most Solana courses are written for developers who already know JavaScript, Rust, and command-line tooling — and they almost always use generic examples like \"a counter program\" or \"a to-do list\". This course is different: you'll learn Rust and the Anchor framework by building something real and familiar — a Njangi (rotating savings circle) program, the same kind of group savings system used across Cameroon, Gabon, and the wider CEMAC region.\n\nYou'll start with why Solana is fast and cheap, then get comfortable with just enough Rust to read and write Anchor programs. From there, you'll design your program's data model and implement instructions for creating a group, joining it, contributing, and receiving payouts in rotation — all directly in your browser using Solana Playground, no installation required.\n\nBy the end, you'll have a working Anchor program deployed to Solana's devnet, tested with real transactions, and a solid mental model for how Solana programs, accounts, and PDAs fit together — skills that transfer directly to any Solana project you build next.",
  longDescriptionFr:
    "La plupart des cours sur Solana s'adressent à des développeurs qui connaissent déjà JavaScript, Rust et les outils en ligne de commande — et utilisent presque toujours des exemples génériques comme « un programme compteur » ou « une liste de tâches ». Ce cours est différent : vous allez apprendre Rust et le framework Anchor en construisant quelque chose de réel et familier — un programme de tontine rotative (Njangi), le même type de système d'épargne collective utilisé au Cameroun, au Gabon et dans toute la zone CEMAC.\n\nVous commencerez par comprendre pourquoi Solana est rapide et peu coûteux, puis vous apprendrez juste assez de Rust pour lire et écrire des programmes Anchor. Vous concevrez ensuite le modèle de données de votre programme et implémenterez les instructions de création de groupe, d'adhésion, de contribution et de versement en rotation — tout cela directement dans votre navigateur avec Solana Playground, sans aucune installation.\n\nÀ la fin, vous aurez un programme Anchor fonctionnel déployé sur le devnet de Solana, testé avec de vraies transactions, et une solide compréhension de la façon dont les programmes, comptes et PDAs Solana s'articulent — des compétences directement transférables à tout projet Solana futur.",
  level: "intermediate",
  language: "both",
  isAfrican: true,
  durationLabel: "6h",
  gradientFrom: "#085041",
  gradientTo: "#1D9E75",
  tags: ["Rust", "Anchor", "Solana", "Njangi", "African context"],
  outcomesEn: [
    "Explain why Solana is fast and cheap, and how that compares to Ethereum",
    "Read and write core Rust syntax used in Anchor programs — structs, enums, Result, and the ? operator",
    "Describe how Solana accounts, rent, ownership, and Program Derived Addresses (PDAs) work",
    "Design and implement a complete Njangi rotating-savings program with Anchor — create, join, contribute, and payout instructions",
    "Test and deploy a real Anchor program to Solana's devnet using Solana Playground",
  ],
  outcomesFr: [
    "Expliquer pourquoi Solana est rapide et peu coûteux, et comment cela se compare à Ethereum",
    "Lire et écrire la syntaxe Rust de base utilisée dans les programmes Anchor — structs, enums, Result et l'opérateur ?",
    "Décrire le fonctionnement des comptes Solana, du rent, de la propriété et des Program Derived Addresses (PDAs)",
    "Concevoir et implémenter un programme complet de tontine rotative (Njangi) avec Anchor — instructions de création, d'adhésion, de contribution et de versement",
    "Tester et déployer un véritable programme Anchor sur le devnet de Solana avec Solana Playground",
  ],
  modules: [
    // ── Module 1: Why Solana? Rust for Web3 ──────────────────────────────────
    {
      titleEn: "Why Solana? Rust for Web3",
      titleFr: "Pourquoi Solana ? Rust pour le Web3",
      lessons: [
        {
          titleEn: "Solana vs Ethereum: Speed, Cost, and Why It Matters Here",
          titleFr: "Solana vs Ethereum : vitesse, coût et pourquoi c'est important ici",
          durationLabel: "10 min",
          lessonType: "text",
          contentEn: `You already met smart contracts on Ethereum in *Build Your First Smart Contract*. Solana is a different blockchain — built from the ground up for speed and low fees. For a Njangi group sending contributions every week, that difference isn't academic. It's the difference between a transaction that costs a fraction of a cent and confirms in under a second, and one that costs a dollar or more and takes minutes during busy periods.

### Why Solana is fast

Ethereum processes transactions roughly one block at a time, every 12 seconds. Solana uses a technique called **Proof of History** — a built-in clock that lets validators agree on the order of events without constantly talking to each other. Combined with parallel transaction processing, Solana can handle thousands of transactions per second, with blocks landing roughly every 400 milliseconds.

### Why this matters for African users

- **Fees** — a Solana transaction typically costs a fraction of a cent, even smaller than the smallest Mobile Money transfer fee.
- **Speed** — contributions, payouts, and votes confirm almost instantly, no waiting for "network congestion" to clear.
- **Programs, not contracts** — on Solana, smart contracts are called **programs**. They're usually written in **Rust**, a fast, memory-safe language, and deployed using a framework called **Anchor** that removes a lot of Ethereum-style boilerplate.

In this course, you'll design and build a **Njangi program** — a rotating savings circle — as a Solana program using Rust and Anchor. By the end, you'll understand how Solana accounts work, how to write and test a real program, and how to deploy it to Solana's public test network (devnet).`,
          contentFr: `Vous avez déjà rencontré les smart contracts sur Ethereum dans *Construisez votre premier smart contract*. Solana est une blockchain différente — conçue dès le départ pour la vitesse et des frais minimes. Pour un groupe Njangi qui envoie des contributions chaque semaine, cette différence n'est pas qu'académique. C'est la différence entre une transaction qui coûte une fraction de centime et se confirme en moins d'une seconde, et une transaction qui coûte un dollar ou plus et prend plusieurs minutes en période de forte activité.

### Pourquoi Solana est rapide

Ethereum traite les transactions à peu près bloc par bloc, toutes les 12 secondes. Solana utilise une technique appelée **Proof of History** — une horloge intégrée qui permet aux validateurs de s'accorder sur l'ordre des événements sans avoir à se synchroniser constamment. Combinée à un traitement parallèle des transactions, Solana peut gérer des milliers de transactions par seconde, avec des blocs toutes les 400 millisecondes environ.

### Pourquoi c'est important pour les utilisateurs africains

- **Frais** — une transaction Solana coûte généralement une fraction de centime, encore plus faible que les frais du plus petit transfert Mobile Money.
- **Vitesse** — les contributions, les versements et les votes se confirment presque instantanément, sans attendre que la « congestion du réseau » se résorbe.
- **Des programmes, pas des contrats** — sur Solana, les smart contracts sont appelés des **programmes**. Ils sont généralement écrits en **Rust**, un langage rapide et sûr pour la mémoire, et déployés avec un framework appelé **Anchor** qui supprime une grande partie du code répétitif propre à Ethereum.

Dans ce cours, vous allez concevoir et construire un **programme Njangi** — une tontine rotative — en tant que programme Solana avec Rust et Anchor. À la fin, vous comprendrez le fonctionnement des comptes Solana, comment écrire et tester un véritable programme, et comment le déployer sur le réseau de test public de Solana (devnet).`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Rust Crash Course for Solana Developers",
          titleFr: "Cours accéléré de Rust pour développeurs Solana",
          durationLabel: "16 min",
          lessonType: "code",
          contentEn: `Rust looks intimidating at first, but Anchor only requires a small subset of it to get started. Here's what you'll see constantly in this course.

### Variables and types

Rust variables are immutable by default — use \`mut\` to allow changes. Common types you'll use: \`u8\`, \`u64\` (unsigned integers of different sizes), \`bool\`, \`String\`, and \`Pubkey\` (a Solana wallet/account address).

### Structs — your data shapes

A \`struct\` groups related data together, similar to a Solidity \`struct\` you saw in the smart contract course:

\`\`\`rust
pub struct Member {
    pub wallet: Pubkey,
    pub has_paid: bool,
    pub position: u8,
}
\`\`\`

### Enums — a fixed set of options

\`\`\`rust
pub enum GroupStatus {
    Open,
    Active,
    Completed,
}
\`\`\`

### Result and the \`?\` operator

Anchor functions return \`Result<()>\` — either \`Ok(())\` on success, or an \`Err\` with a custom error. Anchor's \`require!\` macro checks a condition and returns early with that error if it fails:

\`\`\`rust
require!(group.members.len() < MAX_MEMBERS, ErrorCode::GroupFull);
\`\`\`

You don't need to memorize all of Rust today — you'll learn the rest by writing real code in the lessons ahead. Try editing the starter code: add a third field called \`contribution_total\` of type \`u64\` to the \`Member\` struct.`,
          contentFr: `Rust peut sembler intimidant au premier abord, mais Anchor n'en exige qu'un petit sous-ensemble pour démarrer. Voici ce que vous verrez constamment dans ce cours.

### Variables et types

En Rust, les variables sont immuables par défaut — utilisez \`mut\` pour autoriser les modifications. Types courants que vous utiliserez : \`u8\`, \`u64\` (entiers non signés de tailles différentes), \`bool\`, \`String\`, et \`Pubkey\` (une adresse de portefeuille/compte Solana).

### Les structs — vos formes de données

Un \`struct\` regroupe des données liées entre elles, comme les \`struct\` Solidity vues dans le cours sur les smart contracts :

\`\`\`rust
pub struct Member {
    pub wallet: Pubkey,
    pub has_paid: bool,
    pub position: u8,
}
\`\`\`

### Les enums — un ensemble fixe d'options

\`\`\`rust
pub enum GroupStatus {
    Open,
    Active,
    Completed,
}
\`\`\`

### Result et l'opérateur \`?\`

Les fonctions Anchor renvoient \`Result<()>\` — soit \`Ok(())\` en cas de succès, soit une \`Err\` avec une erreur personnalisée. La macro \`require!\` d'Anchor vérifie une condition et renvoie immédiatement cette erreur si elle échoue :

\`\`\`rust
require!(group.members.len() < MAX_MEMBERS, ErrorCode::GroupFull);
\`\`\`

Pas besoin de mémoriser tout Rust aujourd'hui — vous apprendrez le reste en écrivant du vrai code dans les leçons à venir. Essayez de modifier le code de démarrage : ajoutez un troisième champ nommé \`contribution_total\` de type \`u64\` à la struct \`Member\`.`,
          videoUrl: null,
          codeLanguage: "rust",
          codeStarterEn: `// Practice: extend this struct with a \`contribution_total: u64\` field.
pub struct Member {
    pub wallet: Pubkey,
    pub has_paid: bool,
    pub position: u8,
    // TODO: add contribution_total here
}
`,
          codeStarterFr: `// Exercice : ajoutez un champ \`contribution_total: u64\` à cette struct.
pub struct Member {
    pub wallet: Pubkey,
    pub has_paid: bool,
    pub position: u8,
    // TODO : ajoutez contribution_total ici
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: Solana Fundamentals",
          titleFr: "Quiz : les fondamentaux de Solana",
          durationLabel: "5 min",
          lessonType: "quiz",
          contentEn: "Check your understanding of why Solana is fast, what programs are, and basic Rust syntax before moving on to Anchor.",
          contentFr: "Vérifiez votre compréhension de la rapidité de Solana, de ce que sont les programmes, et de la syntaxe Rust de base avant de passer à Anchor.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "What is the main reason Solana transactions are cheaper and faster than on many other blockchains?",
              questionFr: "Quelle est la principale raison pour laquelle les transactions Solana sont moins chères et plus rapides que sur de nombreuses autres blockchains ?",
              optionsEn: [
                "It has fewer users",
                "Proof of History lets validators agree on transaction order without constant communication",
                "It doesn't use cryptography",
                "Transactions are processed off-chain",
              ],
              optionsFr: [
                "Elle a moins d'utilisateurs",
                "Le Proof of History permet aux validateurs de s'accorder sur l'ordre des transactions sans communication constante",
                "Elle n'utilise pas de cryptographie",
                "Les transactions sont traitées hors chaîne",
              ],
              correctIndex: 1,
              explanationEn: "Solana's Proof of History acts like a built-in clock, combined with parallel processing, allowing thousands of transactions per second at very low cost.",
              explanationFr: "Le Proof of History de Solana agit comme une horloge intégrée et, combiné au traitement parallèle, permet des milliers de transactions par seconde à très faible coût.",
            },
            {
              questionEn: "What is a Solana smart contract called?",
              questionFr: "Comment appelle-t-on un smart contract sur Solana ?",
              optionsEn: ["A contract", "A dApp", "A program", "A token"],
              optionsFr: ["Un contrat", "Une dApp", "Un programme", "Un token"],
              correctIndex: 2,
              explanationEn: "On Solana, on-chain code is called a program. Programs are commonly written in Rust and deployed with Anchor.",
              explanationFr: "Sur Solana, le code on-chain est appelé un programme. Les programmes sont généralement écrits en Rust et déployés avec Anchor.",
            },
            {
              questionEn: "Which Rust keyword allows a variable to be changed after it's created?",
              questionFr: "Quel mot-clé Rust permet de modifier une variable après sa création ?",
              optionsEn: ["const", "let", "mut", "var"],
              optionsFr: ["const", "let", "mut", "var"],
              correctIndex: 2,
              explanationEn: "Rust variables are immutable by default. Adding `mut` makes them mutable.",
              explanationFr: "En Rust, les variables sont immuables par défaut. Ajouter `mut` les rend modifiables.",
            },
          ],
        },
      ],
    },
    // ── Module 2: Your Anchor Dev Environment ────────────────────────────────
    {
      titleEn: "Your Anchor Dev Environment",
      titleFr: "Votre environnement de développement Anchor",
      lessons: [
        {
          titleEn: "Meet Solana Playground",
          titleFr: "Découvrez Solana Playground",
          durationLabel: "8 min",
          lessonType: "text",
          contentEn: `Just like you used Remix to write Solidity in your browser, **Solana Playground** (beta.solpg.io) lets you write, build, test, and deploy Anchor programs without installing anything — no Rust toolchain, no Solana CLI, no Node setup. It runs entirely in your browser, which makes it perfect for low-bandwidth connections: you only download what you need, when you need it.

### What Solana Playground gives you

- A code editor for your Rust/Anchor program (\`lib.rs\`)
- A built-in terminal to run \`build\`, \`deploy\`, and \`test\` commands
- A built-in wallet — Playground generates a devnet wallet for you, or you can connect Phantom/Solflare
- A free devnet faucet to get test SOL for deployment fees

### Setting up

1. Open **beta.solpg.io** in a new tab
2. Click **Create a new project** → choose the **Anchor (Rust)** framework
3. Playground scaffolds a starter program with \`lib.rs\`, \`Cargo.toml\`, and a \`tests/\` folder
4. Click the wallet icon in the bottom-left to create your Playground wallet, then use the faucet button to airdrop devnet SOL

Throughout the code lessons in this course, you'll see Rust snippets to copy into your Playground project's \`lib.rs\`. Keep Solana Playground open in another tab as you go — you'll build up the full Njangi program piece by piece.`,
          contentFr: `Tout comme vous avez utilisé Remix pour écrire du Solidity dans votre navigateur, **Solana Playground** (beta.solpg.io) vous permet d'écrire, compiler, tester et déployer des programmes Anchor sans rien installer — pas de toolchain Rust, pas de CLI Solana, pas de configuration Node. Il fonctionne entièrement dans le navigateur, ce qui est idéal pour les connexions à faible bande passante : vous ne téléchargez que ce dont vous avez besoin, au moment où vous en avez besoin.

### Ce que Solana Playground vous offre

- Un éditeur de code pour votre programme Rust/Anchor (\`lib.rs\`)
- Un terminal intégré pour exécuter les commandes \`build\`, \`deploy\` et \`test\`
- Un portefeuille intégré — Playground génère un portefeuille devnet pour vous, ou vous pouvez connecter Phantom/Solflare
- Un robinet (faucet) devnet gratuit pour obtenir du SOL de test pour les frais de déploiement

### Pour démarrer

1. Ouvrez **beta.solpg.io** dans un nouvel onglet
2. Cliquez sur **Create a new project** → choisissez le framework **Anchor (Rust)**
3. Playground génère un programme de départ avec \`lib.rs\`, \`Cargo.toml\` et un dossier \`tests/\`
4. Cliquez sur l'icône de portefeuille en bas à gauche pour créer votre portefeuille Playground, puis utilisez le bouton du faucet pour recevoir du SOL devnet

Tout au long des leçons de code de ce cours, vous verrez des extraits Rust à copier dans le fichier \`lib.rs\` de votre projet Playground. Gardez Solana Playground ouvert dans un autre onglet — vous construirez le programme Njangi complet, morceau par morceau.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Anchor Program Structure: Your First Program",
          titleFr: "Structure d'un programme Anchor : votre premier programme",
          durationLabel: "18 min",
          lessonType: "code",
          contentEn: `Every Anchor program follows the same basic shape. Here's the smallest possible program — a "Hello, Njangi" greeting:

\`\`\`rust
use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111111111111");

#[program]
pub mod njangi {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Karibu! Njangi program initialized.");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
\`\`\`

Let's break this down:

- \`declare_id!\` registers the program's on-chain address. Solana Playground generates a real one for you when you build.
- \`#[program]\` marks the module containing your program's **instructions** — the functions clients can call, similar to \`public\` functions in a Solidity contract.
- Each instruction takes a \`Context<T>\` — a typed list of accounts the instruction is allowed to read or write.
- \`#[derive(Accounts)]\` defines that account list. \`Initialize\` here is empty because this instruction doesn't touch any accounts yet.
- \`msg!\` writes to the program log — useful for debugging, similar to \`console.log\`.

### Try it

Paste this into your Solana Playground \`lib.rs\`, click **Build**, then **Deploy**. You've just deployed your first Solana program to devnet — for less than $0.001 in fees.`,
          contentFr: `Chaque programme Anchor suit la même structure de base. Voici le plus petit programme possible — un message de bienvenue « Hello, Njangi » :

\`\`\`rust
use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111111111111");

#[program]
pub mod njangi {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Karibu! Njangi program initialized.");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
\`\`\`

Décomposons ce code :

- \`declare_id!\` enregistre l'adresse on-chain du programme. Solana Playground en génère une vraie pour vous lors de la compilation.
- \`#[program]\` marque le module contenant les **instructions** de votre programme — les fonctions que les clients peuvent appeler, comme les fonctions \`public\` d'un contrat Solidity.
- Chaque instruction reçoit un \`Context<T>\` — une liste typée des comptes que l'instruction peut lire ou modifier.
- \`#[derive(Accounts)]\` définit cette liste de comptes. \`Initialize\` est vide ici car cette instruction ne touche encore aucun compte.
- \`msg!\` écrit dans le journal du programme — utile pour le débogage, comme \`console.log\`.

### Essayez

Collez ce code dans le fichier \`lib.rs\` de votre projet Solana Playground, cliquez sur **Build**, puis **Deploy**. Vous venez de déployer votre premier programme Solana sur devnet — pour moins de 0,001 $ de frais.`,
          videoUrl: null,
          codeLanguage: "rust",
          codeStarterEn: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111111111111");

#[program]
pub mod njangi {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        // TODO: log a welcome message using msg!
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
`,
          codeStarterFr: `use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111111111111");

#[program]
pub mod njangi {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        // TODO : affichez un message de bienvenue avec msg!
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: Anchor Basics",
          titleFr: "Quiz : les bases d'Anchor",
          durationLabel: "5 min",
          lessonType: "quiz",
          contentEn: "A quick check on Anchor's program structure before we start designing the Njangi data model.",
          contentFr: "Une petite vérification de la structure des programmes Anchor avant de concevoir le modèle de données du Njangi.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "What does the `#[program]` attribute mark in an Anchor program?",
              questionFr: "Que marque l'attribut `#[program]` dans un programme Anchor ?",
              optionsEn: [
                "The list of accounts used",
                "The module containing the program's callable instructions",
                "The program's on-chain address",
                "A test file",
              ],
              optionsFr: [
                "La liste des comptes utilisés",
                "Le module contenant les instructions appelables du programme",
                "L'adresse on-chain du programme",
                "Un fichier de test",
              ],
              correctIndex: 1,
              explanationEn: "`#[program]` marks the module whose public functions become the program's callable instructions.",
              explanationFr: "`#[program]` marque le module dont les fonctions publiques deviennent les instructions appelables du programme.",
            },
            {
              questionEn: "What is the purpose of `Context<T>` in an instruction function?",
              questionFr: "Quel est le rôle de `Context<T>` dans une fonction d'instruction ?",
              optionsEn: [
                "It stores the program's source code",
                "It provides a typed list of accounts the instruction can read or write",
                "It defines the program's price",
                "It is only used for error messages",
              ],
              optionsFr: [
                "Il stocke le code source du programme",
                "Il fournit une liste typée des comptes que l'instruction peut lire ou modifier",
                "Il définit le prix du programme",
                "Il sert uniquement aux messages d'erreur",
              ],
              correctIndex: 1,
              explanationEn: "`Context<T>` carries the accounts declared in the matching `#[derive(Accounts)]` struct, giving the instruction typed, validated access to them.",
              explanationFr: "`Context<T>` transporte les comptes déclarés dans la struct `#[derive(Accounts)]` correspondante, donnant à l'instruction un accès typé et validé à ceux-ci.",
            },
          ],
        },
      ],
    },
    // ── Module 3: Accounts, PDAs & State ─────────────────────────────────────
    {
      titleEn: "Accounts, PDAs & State",
      titleFr: "Comptes, PDAs et état",
      lessons: [
        {
          titleEn: "How Solana Stores Data: Accounts 101",
          titleFr: "Comment Solana stocke les données : les comptes 101",
          durationLabel: "10 min",
          lessonType: "text",
          contentEn: `On Ethereum, a smart contract stores its own data internally. On Solana, **programs are stateless** — all data lives in separate **accounts**, and programs read and write to those accounts. Think of a program like the rulebook of your Njangi group, and accounts like the actual notebook pages where balances and member lists are written.

### Key ideas

- **Everything is an account.** Wallets, token balances, and program data are all accounts — each with an address (a \`Pubkey\`), an owner program, and a data field (raw bytes).
- **Rent** — accounts that store data must hold a small SOL balance, called rent, proportional to their size. This pays for the network to keep your data available. For small accounts (a few hundred bytes), this is a tiny, one-time amount — a fraction of a cent to a few cents — and it's refunded if the account is closed.
- **Ownership** — only the program that owns an account can modify its data. Your Njangi program will own the "group" accounts it creates; no other program can tamper with them.
- **Anchor accounts** — Anchor lets you define a Rust \`struct\` as an account type with \`#[account]\`. Anchor automatically handles serializing (\`struct\` → bytes) and deserializing (bytes → \`struct\`) for you.

### Why this matters for Njangi

Each Njangi group you create on-chain will be its own **account** — holding the group's name, contribution amount, member list, and current rotation position. Members joining, contributing, or receiving payouts are really just **instructions that update the data inside that account**. In the next lesson, you'll learn how your program finds the *same* group account every time, without storing addresses anywhere — using Program Derived Addresses.`,
          contentFr: `Sur Ethereum, un smart contract stocke ses propres données en interne. Sur Solana, **les programmes sont sans état (stateless)** — toutes les données vivent dans des **comptes** séparés, et les programmes lisent et écrivent dans ces comptes. Imaginez un programme comme le règlement de votre groupe Njangi, et les comptes comme les pages réelles du cahier où sont inscrits les soldes et la liste des membres.

### Idées clés

- **Tout est un compte.** Les portefeuilles, les soldes de tokens et les données de programme sont tous des comptes — chacun avec une adresse (\`Pubkey\`), un programme propriétaire et un champ de données (octets bruts).
- **Le rent (loyer)** — les comptes qui stockent des données doivent détenir un petit solde en SOL, appelé rent, proportionnel à leur taille. Cela finance le maintien de vos données sur le réseau. Pour les petits comptes (quelques centaines d'octets), c'est un montant unique et minime — d'une fraction de centime à quelques centimes — remboursé si le compte est fermé.
- **La propriété (ownership)** — seul le programme propriétaire d'un compte peut modifier ses données. Votre programme Njangi possédera les comptes « groupe » qu'il crée ; aucun autre programme ne peut les modifier.
- **Les comptes Anchor** — Anchor vous permet de définir une \`struct\` Rust comme type de compte avec \`#[account]\`. Anchor gère automatiquement la sérialisation (\`struct\` → octets) et la désérialisation (octets → \`struct\`) pour vous.

### Pourquoi c'est important pour le Njangi

Chaque groupe Njangi que vous créez on-chain sera son propre **compte** — contenant le nom du groupe, le montant de la contribution, la liste des membres et la position actuelle de la rotation. Lorsqu'un membre rejoint le groupe, contribue ou reçoit un versement, ce sont en réalité des **instructions qui mettent à jour les données dans ce compte**. Dans la prochaine leçon, vous apprendrez comment votre programme retrouve *le même* compte de groupe à chaque fois, sans stocker d'adresses nulle part — grâce aux Program Derived Addresses.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Program Derived Addresses (PDAs) Explained",
          titleFr: "Les Program Derived Addresses (PDAs) expliquées",
          durationLabel: "12 min",
          lessonType: "text",
          contentEn: `How does your Njangi program find a group's account again next week, without a database? The answer is **Program Derived Addresses (PDAs)** — addresses that are mathematically derived from a set of "seeds" and your program's ID, rather than generated from a private key.

### How PDAs work

A PDA is computed from:

1. One or more **seeds** — usually fixed strings combined with dynamic data, like the group creator's wallet and the group's name
2. A **bump** — an extra byte tried until the result is *not* a valid Ed25519 public key (this guarantees no one holds a private key for it)
3. Your **program ID**

\`\`\`rust
#[account(
    init,
    payer = creator,
    space = 8 + Group::INIT_SPACE,
    seeds = [b"group", creator.key().as_ref(), name.as_bytes()],
    bump
)]
pub group: Account<'info, Group>,
\`\`\`

### Why this matters

- **No one can fake your data.** Only your program can sign for and write to a PDA — there's no private key for an attacker to steal.
- **Deterministic lookup.** Given the same seeds (creator + group name), anyone can recompute the exact same address — your frontend, your tests, or another program.
- **Think of it like a Njangi ledger ID.** Instead of writing "Group #4827" in a paper register and hoping no one tears the page out, the *group's identity itself* (creator + name) deterministically produces its storage address on-chain.

In the next lesson, you'll define the \`Group\` account struct your Njangi program will create as a PDA.`,
          contentFr: `Comment votre programme Njangi retrouve-t-il le compte d'un groupe la semaine suivante, sans base de données ? La réponse : les **Program Derived Addresses (PDAs)** — des adresses calculées mathématiquement à partir d'un ensemble de « seeds » (graines) et de l'ID de votre programme, plutôt que générées à partir d'une clé privée.

### Comment fonctionnent les PDAs

Une PDA est calculée à partir de :

1. Une ou plusieurs **seeds** — généralement des chaînes fixes combinées à des données dynamiques, comme le portefeuille du créateur du groupe et le nom du groupe
2. Un **bump** — un octet supplémentaire testé jusqu'à ce que le résultat *ne soit pas* une clé publique Ed25519 valide (ce qui garantit que personne ne détient de clé privée pour celle-ci)
3. L'**ID de votre programme**

\`\`\`rust
#[account(
    init,
    payer = creator,
    space = 8 + Group::INIT_SPACE,
    seeds = [b"group", creator.key().as_ref(), name.as_bytes()],
    bump
)]
pub group: Account<'info, Group>,
\`\`\`

### Pourquoi c'est important

- **Personne ne peut falsifier vos données.** Seul votre programme peut signer pour et écrire dans une PDA — il n'existe aucune clé privée qu'un attaquant pourrait voler.
- **Recherche déterministe.** Avec les mêmes seeds (créateur + nom du groupe), n'importe qui peut recalculer exactement la même adresse — votre frontend, vos tests, ou un autre programme.
- **Pensez-y comme un identifiant de registre Njangi.** Plutôt que d'écrire « Groupe n°4827 » dans un registre papier et d'espérer que personne n'arrache la page, c'est *l'identité même du groupe* (créateur + nom) qui produit de façon déterministe son adresse de stockage on-chain.

Dans la prochaine leçon, vous allez définir la struct de compte \`Group\` que votre programme Njangi créera sous forme de PDA.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Defining the Njangi Account Structs",
          titleFr: "Définir les structs de compte du Njangi",
          durationLabel: "20 min",
          lessonType: "code",
          contentEn: `Time to design the data your Njangi program will store on-chain. Every group needs: a name, a contribution amount, a list of members, and whose turn it is to receive the payout.

\`\`\`rust
use anchor_lang::prelude::*;

#[account]
pub struct Group {
    pub creator: Pubkey,
    pub name: String,             // max 32 chars
    pub contribution_amount: u64, // in lamports
    pub members: Vec<Pubkey>,
    pub current_round: u8,
    pub round_count: u8,
    pub bump: u8,
}

impl Group {
    pub const MAX_MEMBERS: usize = 10;
    // Anchor space calculation: discriminator (8) is added separately at init
    pub const INIT_SPACE: usize = 32              // creator
        + 4 + 32                                  // name (String prefix + max bytes)
        + 8                                       // contribution_amount
        + 4 + (32 * Self::MAX_MEMBERS)            // members vec
        + 1                                       // current_round
        + 1                                       // round_count
        + 1;                                      // bump
}
\`\`\`

### Notes on field choices

- \`contribution_amount\` is stored in **lamports** (1 SOL = 1,000,000,000 lamports) — Solana programs always work in the smallest unit, just like storing FCFA as whole francs rather than fractions.
- \`members: Vec<Pubkey>\` is a growable list of wallet addresses, capped at \`MAX_MEMBERS\` so we can calculate a fixed account size in advance — Solana accounts have a fixed size set at creation.
- \`current_round\` tracks whose turn it is to receive the pot — round 0 is the creator's turn, round 1 the next member, and so on.

### Try it

Add a new field \`pub total_pool: u64\` to track the running total collected this round, and update \`INIT_SPACE\` to add \`+ 8\` for it.`,
          contentFr: `Il est temps de concevoir les données que votre programme Njangi stockera on-chain. Chaque groupe a besoin de : un nom, un montant de contribution, une liste de membres, et de savoir à qui revient le versement.

\`\`\`rust
use anchor_lang::prelude::*;

#[account]
pub struct Group {
    pub creator: Pubkey,
    pub name: String,             // 32 caractères max
    pub contribution_amount: u64, // en lamports
    pub members: Vec<Pubkey>,
    pub current_round: u8,
    pub round_count: u8,
    pub bump: u8,
}

impl Group {
    pub const MAX_MEMBERS: usize = 10;
    // Le discriminateur Anchor (8 octets) est ajouté séparément lors de l'init
    pub const INIT_SPACE: usize = 32              // creator
        + 4 + 32                                  // name (préfixe String + octets max)
        + 8                                       // contribution_amount
        + 4 + (32 * Self::MAX_MEMBERS)            // vecteur members
        + 1                                       // current_round
        + 1                                       // round_count
        + 1;                                      // bump
}
\`\`\`

### Remarques sur ces choix de champs

- \`contribution_amount\` est stocké en **lamports** (1 SOL = 1 000 000 000 lamports) — les programmes Solana travaillent toujours dans la plus petite unité, comme on stockerait des FCFA en francs entiers plutôt qu'en fractions.
- \`members: Vec<Pubkey>\` est une liste extensible d'adresses de portefeuilles, plafonnée à \`MAX_MEMBERS\` pour pouvoir calculer une taille de compte fixe à l'avance — les comptes Solana ont une taille fixe définie à la création.
- \`current_round\` indique à qui revient la cagnotte — le tour 0 est celui du créateur, le tour 1 celui du membre suivant, et ainsi de suite.

### Essayez

Ajoutez un nouveau champ \`pub total_pool: u64\` pour suivre le total cumulé collecté ce tour, et mettez à jour \`INIT_SPACE\` en ajoutant \`+ 8\` pour celui-ci.`,
          videoUrl: null,
          codeLanguage: "rust",
          codeStarterEn: `use anchor_lang::prelude::*;

#[account]
pub struct Group {
    pub creator: Pubkey,
    pub name: String,
    pub contribution_amount: u64,
    pub members: Vec<Pubkey>,
    pub current_round: u8,
    pub round_count: u8,
    pub bump: u8,
    // TODO: add \`pub total_pool: u64\`
}

impl Group {
    pub const MAX_MEMBERS: usize = 10;
    pub const INIT_SPACE: usize = 32
        + 4 + 32
        + 8
        + 4 + (32 * Self::MAX_MEMBERS)
        + 1
        + 1
        + 1;
        // TODO: add \`+ 8\` for total_pool
}
`,
          codeStarterFr: `use anchor_lang::prelude::*;

#[account]
pub struct Group {
    pub creator: Pubkey,
    pub name: String,
    pub contribution_amount: u64,
    pub members: Vec<Pubkey>,
    pub current_round: u8,
    pub round_count: u8,
    pub bump: u8,
    // TODO : ajoutez \`pub total_pool: u64\`
}

impl Group {
    pub const MAX_MEMBERS: usize = 10;
    pub const INIT_SPACE: usize = 32
        + 4 + 32
        + 8
        + 4 + (32 * Self::MAX_MEMBERS)
        + 1
        + 1
        + 1;
        // TODO : ajoutez \`+ 8\` pour total_pool
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: Accounts & PDAs",
          titleFr: "Quiz : comptes et PDAs",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "Make sure accounts, rent, ownership, and PDAs are clear before you start writing instructions.",
          contentFr: "Assurez-vous que les comptes, le rent, la propriété et les PDAs sont clairs avant de commencer à écrire les instructions.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "On Solana, where does a program's data live?",
              questionFr: "Sur Solana, où vivent les données d'un programme ?",
              optionsEn: [
                "Inside the program's source code",
                "In separate accounts that the program reads and writes",
                "In the validator's local file system only",
                "Data is not stored on Solana",
              ],
              optionsFr: [
                "Dans le code source du programme",
                "Dans des comptes séparés que le programme lit et modifie",
                "Uniquement dans le système de fichiers local du validateur",
                "Les données ne sont pas stockées sur Solana",
              ],
              correctIndex: 1,
              explanationEn: "Solana programs are stateless — all persistent data lives in separate accounts that the program reads and writes.",
              explanationFr: "Les programmes Solana sont sans état — toutes les données persistantes vivent dans des comptes séparés que le programme lit et modifie.",
            },
            {
              questionEn: "What makes a PDA different from a normal wallet address?",
              questionFr: "Qu'est-ce qui différencie une PDA d'une adresse de portefeuille classique ?",
              optionsEn: [
                "PDAs are shorter",
                "No private key exists for a PDA — only the owning program can sign for it",
                "PDAs cost more rent",
                "PDAs can only hold NFTs",
              ],
              optionsFr: [
                "Les PDAs sont plus courtes",
                "Aucune clé privée n'existe pour une PDA — seul le programme propriétaire peut signer pour elle",
                "Les PDAs coûtent plus de rent",
                "Les PDAs ne peuvent contenir que des NFTs",
              ],
              correctIndex: 1,
              explanationEn: "PDAs are derived addresses with no corresponding private key — only the program that owns them can authorize changes.",
              explanationFr: "Les PDAs sont des adresses dérivées sans clé privée correspondante — seul le programme qui les possède peut autoriser des modifications.",
            },
            {
              questionEn: "Why does the `Group` struct cap `members` at `MAX_MEMBERS`?",
              questionFr: "Pourquoi la struct `Group` limite-t-elle `members` à `MAX_MEMBERS` ?",
              optionsEn: [
                "Anchor doesn't support lists",
                "Solana accounts have a fixed size set at creation, so the maximum size must be known in advance",
                "To save on transaction fees only",
                "Because Rust doesn't support Vec",
              ],
              optionsFr: [
                "Anchor ne supporte pas les listes",
                "Les comptes Solana ont une taille fixe définie à la création, donc la taille maximale doit être connue à l'avance",
                "Uniquement pour économiser sur les frais de transaction",
                "Parce que Rust ne supporte pas Vec",
              ],
              correctIndex: 1,
              explanationEn: "Solana account sizes are fixed at creation, so a `Vec` field needs a known maximum size to calculate that space.",
              explanationFr: "La taille des comptes Solana est fixée à la création, donc un champ `Vec` a besoin d'une taille maximale connue pour calculer cet espace.",
            },
          ],
        },
      ],
    },
    // ── Module 4: Designing & Building the Njangi Program ────────────────────
    {
      titleEn: "Designing & Building the Njangi Program",
      titleFr: "Concevoir et construire le programme Njangi",
      lessons: [
        {
          titleEn: "Designing the Njangi DApp: Rules of the Circle",
          titleFr: "Concevoir la DApp Njangi : les règles du cercle",
          durationLabel: "10 min",
          lessonType: "text",
          contentEn: `Before writing more code, let's agree on the rules — exactly like a real Njangi group agrees on its constitution before the first contribution is collected.

### Our Njangi program's rules

1. **Anyone can create a group** by choosing a name and a fixed contribution amount (in SOL).
2. **Up to 10 members** can join a group, including the creator. Joining is permanent for this version — no leaving mid-cycle, which keeps the rotation fair and the program simple.
3. **Each round**, every member contributes the fixed amount into the group's pooled account.
4. **One member receives the full pool** each round, in join order — member 0 (the creator) first, then member 1, and so on.
5. **After everyone has received a payout once**, the cycle is complete and \`current_round\` wraps back to 0.

### What we'll build, instruction by instruction

| Instruction | What it does |
| --- | --- |
| \`initialize_group\` | Creates the group account (a PDA) with its name and contribution amount |
| \`join_group\` | Adds the caller's wallet to the group's member list |
| \`contribute\` | Transfers the contribution amount from a member into the group's pool |
| \`payout\` | Transfers the pooled SOL to the current round's recipient and advances \`current_round\` |

### Mapping to real life

This mirrors how a Njangi group in Bamenda or Yaoundé already runs — except instead of a treasurer holding cash and a notebook, **the program is the treasurer** and **the blockchain is the notebook**. No member can skip their turn, take more than their share, or "forget" to record a contribution — the code enforces the rules for everyone, transparently.

In the next lessons, you'll implement \`initialize_group\`, \`join_group\`, and \`contribute\`.`,
          contentFr: `Avant d'écrire plus de code, mettons-nous d'accord sur les règles — exactement comme un vrai groupe Njangi se met d'accord sur sa constitution avant de collecter la première contribution.

### Les règles de notre programme Njangi

1. **N'importe qui peut créer un groupe** en choisissant un nom et un montant de contribution fixe (en SOL).
2. **Jusqu'à 10 membres** peuvent rejoindre un groupe, créateur inclus. Dans cette version, l'adhésion est définitive — pas de départ en cours de cycle, ce qui garde la rotation équitable et le programme simple.
3. **À chaque tour**, chaque membre verse le montant fixe de contribution dans le compte commun du groupe.
4. **Un membre reçoit la totalité de la cagnotte** à chaque tour, dans l'ordre d'adhésion — le membre 0 (le créateur) en premier, puis le membre 1, et ainsi de suite.
5. **Une fois que tout le monde a reçu un versement**, le cycle est terminé et \`current_round\` revient à 0.

### Ce que nous allons construire, instruction par instruction

| Instruction | Ce qu'elle fait |
| --- | --- |
| \`initialize_group\` | Crée le compte du groupe (une PDA) avec son nom et son montant de contribution |
| \`join_group\` | Ajoute le portefeuille de l'appelant à la liste des membres du groupe |
| \`contribute\` | Transfère le montant de contribution d'un membre vers la cagnotte du groupe |
| \`payout\` | Transfère le SOL accumulé au bénéficiaire du tour actuel et fait avancer \`current_round\` |

### En lien avec la vraie vie

Cela reproduit le fonctionnement d'un groupe Njangi à Bamenda ou Yaoundé — sauf qu'au lieu d'un trésorier qui détient l'argent liquide et un cahier, **le programme est le trésorier** et **la blockchain est le cahier**. Aucun membre ne peut sauter son tour, prendre plus que sa part, ou « oublier » d'enregistrer une contribution — le code applique les règles pour tout le monde, en toute transparence.

Dans les prochaines leçons, vous allez implémenter \`initialize_group\`, \`join_group\` et \`contribute\`.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Instruction: initialize_group & join_group",
          titleFr: "Instruction : initialize_group et join_group",
          durationLabel: "24 min",
          lessonType: "code",
          contentEn: `Let's implement the first two instructions. \`initialize_group\` creates the group PDA; \`join_group\` adds members to it.

\`\`\`rust
use anchor_lang::prelude::*;

#[program]
pub mod njangi {
    use super::*;

    pub fn initialize_group(
        ctx: Context<InitializeGroup>,
        name: String,
        contribution_amount: u64,
    ) -> Result<()> {
        require!(name.len() <= 32, ErrorCode::NameTooLong);
        require!(contribution_amount > 0, ErrorCode::InvalidAmount);

        let group = &mut ctx.accounts.group;
        group.creator = ctx.accounts.creator.key();
        group.name = name;
        group.contribution_amount = contribution_amount;
        group.members = vec![ctx.accounts.creator.key()]; // creator is member #0
        group.current_round = 0;
        group.round_count = 0;
        group.bump = ctx.bumps.group;

        msg!("Njangi group '{}' created!", group.name);
        Ok(())
    }

    pub fn join_group(ctx: Context<JoinGroup>) -> Result<()> {
        let group = &mut ctx.accounts.group;
        require!(group.members.len() < Group::MAX_MEMBERS, ErrorCode::GroupFull);
        require!(
            !group.members.contains(&ctx.accounts.member.key()),
            ErrorCode::AlreadyMember
        );

        group.members.push(ctx.accounts.member.key());
        msg!("New member joined '{}'. Total: {}", group.name, group.members.len());
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct InitializeGroup<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + Group::INIT_SPACE,
        seeds = [b"group", creator.key().as_ref(), name.as_bytes()],
        bump
    )]
    pub group: Account<'info, Group>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinGroup<'info> {
    #[account(mut)]
    pub group: Account<'info, Group>,
    pub member: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Group name must be 32 characters or fewer.")]
    NameTooLong,
    #[msg("Contribution amount must be greater than zero.")]
    InvalidAmount,
    #[msg("This group already has the maximum number of members.")]
    GroupFull,
    #[msg("This wallet is already a member of the group.")]
    AlreadyMember,
}
\`\`\`

### What's happening here

- \`InitializeGroup\` uses \`init\` + \`seeds\` + \`bump\` to create the \`Group\` PDA — Solana allocates the account and Anchor writes the struct into it.
- \`ctx.bumps.group\` is the bump Anchor found automatically — saved so the same PDA can be re-derived later.
- \`JoinGroup\` only needs \`#[account(mut)]\` because the account already exists; we're just updating its \`members\` list.
- \`require!(condition, ErrorCode::X)\` is Anchor's guard clause — if the condition is false, the instruction stops and **no state changes are saved** (Solana transactions are all-or-nothing, just like Solidity's \`revert\`).

### Try it

Add a \`require!\` to \`join_group\` that checks the group isn't already in an active round (\`group.current_round == 0 && group.round_count == 0\`) before allowing new members — so people can't join mid-cycle.`,
          contentFr: `Implémentons les deux premières instructions. \`initialize_group\` crée la PDA du groupe ; \`join_group\` y ajoute des membres.

\`\`\`rust
use anchor_lang::prelude::*;

#[program]
pub mod njangi {
    use super::*;

    pub fn initialize_group(
        ctx: Context<InitializeGroup>,
        name: String,
        contribution_amount: u64,
    ) -> Result<()> {
        require!(name.len() <= 32, ErrorCode::NameTooLong);
        require!(contribution_amount > 0, ErrorCode::InvalidAmount);

        let group = &mut ctx.accounts.group;
        group.creator = ctx.accounts.creator.key();
        group.name = name;
        group.contribution_amount = contribution_amount;
        group.members = vec![ctx.accounts.creator.key()]; // le créateur est le membre #0
        group.current_round = 0;
        group.round_count = 0;
        group.bump = ctx.bumps.group;

        msg!("Groupe Njangi '{}' créé !", group.name);
        Ok(())
    }

    pub fn join_group(ctx: Context<JoinGroup>) -> Result<()> {
        let group = &mut ctx.accounts.group;
        require!(group.members.len() < Group::MAX_MEMBERS, ErrorCode::GroupFull);
        require!(
            !group.members.contains(&ctx.accounts.member.key()),
            ErrorCode::AlreadyMember
        );

        group.members.push(ctx.accounts.member.key());
        msg!("Nouveau membre dans '{}'. Total : {}", group.name, group.members.len());
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct InitializeGroup<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + Group::INIT_SPACE,
        seeds = [b"group", creator.key().as_ref(), name.as_bytes()],
        bump
    )]
    pub group: Account<'info, Group>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinGroup<'info> {
    #[account(mut)]
    pub group: Account<'info, Group>,
    pub member: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Le nom du groupe doit comporter 32 caractères maximum.")]
    NameTooLong,
    #[msg("Le montant de la contribution doit être supérieur à zéro.")]
    InvalidAmount,
    #[msg("Ce groupe a déjà atteint le nombre maximum de membres.")]
    GroupFull,
    #[msg("Ce portefeuille est déjà membre du groupe.")]
    AlreadyMember,
}
\`\`\`

### Ce qui se passe ici

- \`InitializeGroup\` utilise \`init\` + \`seeds\` + \`bump\` pour créer la PDA \`Group\` — Solana alloue le compte et Anchor y écrit la struct.
- \`ctx.bumps.group\` est le bump trouvé automatiquement par Anchor — on le sauvegarde pour pouvoir redériver la même PDA plus tard.
- \`JoinGroup\` n'a besoin que de \`#[account(mut)]\` car le compte existe déjà ; on ne fait que mettre à jour sa liste \`members\`.
- \`require!(condition, ErrorCode::X)\` est la clause de garde d'Anchor — si la condition est fausse, l'instruction s'arrête et **aucun changement d'état n'est enregistré** (les transactions Solana sont tout-ou-rien, comme \`revert\` en Solidity).

### Essayez

Ajoutez un \`require!\` dans \`join_group\` qui vérifie que le groupe n'est pas déjà en cours de cycle (\`group.current_round == 0 && group.round_count == 0\`) avant d'autoriser de nouveaux membres — pour empêcher de rejoindre le groupe en cours de cycle.`,
          videoUrl: null,
          codeLanguage: "rust",
          codeStarterEn: `pub fn join_group(ctx: Context<JoinGroup>) -> Result<()> {
    let group = &mut ctx.accounts.group;
    require!(group.members.len() < Group::MAX_MEMBERS, ErrorCode::GroupFull);
    require!(
        !group.members.contains(&ctx.accounts.member.key()),
        ErrorCode::AlreadyMember
    );

    // TODO: require that group.current_round == 0 && group.round_count == 0
    // otherwise return a new ErrorCode::CycleAlreadyStarted

    group.members.push(ctx.accounts.member.key());
    Ok(())
}
`,
          codeStarterFr: `pub fn join_group(ctx: Context<JoinGroup>) -> Result<()> {
    let group = &mut ctx.accounts.group;
    require!(group.members.len() < Group::MAX_MEMBERS, ErrorCode::GroupFull);
    require!(
        !group.members.contains(&ctx.accounts.member.key()),
        ErrorCode::AlreadyMember
    );

    // TODO : vérifiez que group.current_round == 0 && group.round_count == 0
    // sinon renvoyez une nouvelle ErrorCode::CycleAlreadyStarted

    group.members.push(ctx.accounts.member.key());
    Ok(())
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Instruction: contribute",
          titleFr: "Instruction : contribute",
          durationLabel: "20 min",
          lessonType: "code",
          contentEn: `Now that members can join a group, let's implement \`contribute\` — the instruction members call each round to pay into the pool. Rather than tracking a separate balance field, members transfer SOL **directly into the group PDA's lamport balance** using a System Program transfer — Solana accounts can hold both data *and* a SOL balance at the same time.

\`\`\`rust
use anchor_lang::system_program;

pub fn contribute(ctx: Context<Contribute>) -> Result<()> {
    let group = &ctx.accounts.group;

    require!(
        group.members.contains(&ctx.accounts.member.key()),
        ErrorCode::NotAMember
    );

    let transfer_ix = system_program::Transfer {
        from: ctx.accounts.member.to_account_info(),
        to: ctx.accounts.group.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.system_program.to_account_info(), transfer_ix);
    system_program::transfer(cpi_ctx, group.contribution_amount)?;

    msg!(
        "{} contributed {} lamports to '{}'",
        ctx.accounts.member.key(),
        group.contribution_amount,
        group.name
    );
    Ok(())
}

#[derive(Accounts)]
pub struct Contribute<'info> {
    #[account(mut)]
    pub group: Account<'info, Group>,
    #[account(mut)]
    pub member: Signer<'info>,
    pub system_program: Program<'info, System>,
}
\`\`\`

### What's happening here

- **CPI** stands for **Cross-Program Invocation** — your program calling *another* program's instruction. Here, your Njangi program calls the built-in **System Program**'s \`transfer\` instruction to move SOL.
- \`require!\` again checks membership — only members of this exact group can contribute. Anyone not on the \`members\` list is rejected before any transfer happens.
- The group PDA's lamport balance now *is* the pool. To check how much has been collected, read \`group.to_account_info().lamports()\` from a client or another instruction.

### Try it

Add a new error variant \`NotAMember\` to the \`ErrorCode\` enum from the previous lesson, with the message "Only group members can contribute."`,
          contentFr: `Maintenant que les membres peuvent rejoindre un groupe, implémentons \`contribute\` — l'instruction que les membres appellent à chaque tour pour verser leur part dans la cagnotte. Plutôt que de suivre un champ de solde séparé, les membres transfèrent du SOL **directement dans le solde en lamports de la PDA du groupe** via un transfert du System Program — les comptes Solana peuvent contenir à la fois des données *et* un solde en SOL.

\`\`\`rust
use anchor_lang::system_program;

pub fn contribute(ctx: Context<Contribute>) -> Result<()> {
    let group = &ctx.accounts.group;

    require!(
        group.members.contains(&ctx.accounts.member.key()),
        ErrorCode::NotAMember
    );

    let transfer_ix = system_program::Transfer {
        from: ctx.accounts.member.to_account_info(),
        to: ctx.accounts.group.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.system_program.to_account_info(), transfer_ix);
    system_program::transfer(cpi_ctx, group.contribution_amount)?;

    msg!(
        "{} a contribué {} lamports à '{}'",
        ctx.accounts.member.key(),
        group.contribution_amount,
        group.name
    );
    Ok(())
}

#[derive(Accounts)]
pub struct Contribute<'info> {
    #[account(mut)]
    pub group: Account<'info, Group>,
    #[account(mut)]
    pub member: Signer<'info>,
    pub system_program: Program<'info, System>,
}
\`\`\`

### Ce qui se passe ici

- **CPI** signifie **Cross-Program Invocation** (invocation inter-programmes) — votre programme appelle l'instruction d'un *autre* programme. Ici, votre programme Njangi appelle l'instruction \`transfer\` du **System Program** intégré pour déplacer du SOL.
- \`require!\` vérifie à nouveau l'adhésion — seuls les membres de ce groupe précis peuvent y contribuer. Toute personne absente de la liste \`members\` est rejetée avant même qu'un transfert ait lieu.
- Le solde en lamports de la PDA du groupe *est* maintenant la cagnotte. Pour connaître le montant collecté, lisez \`group.to_account_info().lamports()\` depuis un client ou une autre instruction.

### Essayez

Ajoutez une nouvelle variante d'erreur \`NotAMember\` à l'enum \`ErrorCode\` de la leçon précédente, avec le message « Seuls les membres du groupe peuvent contribuer. »`,
          videoUrl: null,
          codeLanguage: "rust",
          codeStarterEn: `pub fn contribute(ctx: Context<Contribute>) -> Result<()> {
    let group = &ctx.accounts.group;

    // TODO: require that ctx.accounts.member.key() is in group.members
    // otherwise return ErrorCode::NotAMember

    let transfer_ix = system_program::Transfer {
        from: ctx.accounts.member.to_account_info(),
        to: ctx.accounts.group.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.system_program.to_account_info(), transfer_ix);
    system_program::transfer(cpi_ctx, group.contribution_amount)?;

    Ok(())
}
`,
          codeStarterFr: `pub fn contribute(ctx: Context<Contribute>) -> Result<()> {
    let group = &ctx.accounts.group;

    // TODO : vérifiez que ctx.accounts.member.key() est dans group.members
    // sinon renvoyez ErrorCode::NotAMember

    let transfer_ix = system_program::Transfer {
        from: ctx.accounts.member.to_account_info(),
        to: ctx.accounts.group.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.system_program.to_account_info(), transfer_ix);
    system_program::transfer(cpi_ctx, group.contribution_amount)?;

    Ok(())
}
`,
          quizQuestions: [],
        },
      ],
    },
    // ── Module 5: Payouts, Rotation & Errors ─────────────────────────────────
    {
      titleEn: "Payouts, Rotation & Errors",
      titleFr: "Versements, rotation et erreurs",
      lessons: [
        {
          titleEn: "Instruction: payout — Rotating the Pot",
          titleFr: "Instruction : payout — faire tourner la cagnotte",
          durationLabel: "24 min",
          lessonType: "code",
          contentEn: `The final core instruction: \`payout\`. It sends the group PDA's accumulated SOL to whichever member's turn it is, then advances \`current_round\` for next time.

\`\`\`rust
pub fn payout(ctx: Context<Payout>) -> Result<()> {
    let group = &mut ctx.accounts.group;

    let recipient_key = group.members[group.current_round as usize];
    require!(
        ctx.accounts.recipient.key() == recipient_key,
        ErrorCode::WrongRecipient
    );

    // Move lamports out of the PDA directly — PDAs can't sign CPIs to the
    // System Program for outgoing transfers, so we adjust balances manually.
    let pool_lamports = ctx.accounts.group.to_account_info().lamports();
    let rent_minimum = Rent::get()?.minimum_balance(8 + Group::INIT_SPACE);
    let payout_amount = pool_lamports.saturating_sub(rent_minimum);

    **ctx.accounts.group.to_account_info().try_borrow_mut_lamports()? -= payout_amount;
    **ctx.accounts.recipient.to_account_info().try_borrow_mut_lamports()? += payout_amount;

    // Advance the rotation
    group.round_count += 1;
    group.current_round = (group.current_round + 1) % group.members.len() as u8;

    msg!(
        "Paid out {} lamports to {} (round {} of {})",
        payout_amount,
        recipient_key,
        group.round_count,
        group.members.len()
    );
    Ok(())
}

#[derive(Accounts)]
pub struct Payout<'info> {
    #[account(mut)]
    pub group: Account<'info, Group>,
    /// CHECK: validated against group.members[current_round] above
    #[account(mut)]
    pub recipient: UncheckedAccount<'info>,
}
\`\`\`

### What's happening here

- We only allow the payout to go to \`group.members[current_round]\` — the program enforces the rotation order itself, exactly like the schedule a Njangi treasurer writes at the start of the cycle, except no one can change it later.
- Moving lamports **out of** a PDA can't go through \`system_program::transfer\` (PDAs can't sign for outgoing System Program transfers without extra setup). Instead, a program that owns an account can directly adjust its lamport balance with \`try_borrow_mut_lamports()\` — the standard pattern for PDA-owned "vault" accounts.
- \`Rent::get()?.minimum_balance(...)\` makes sure the PDA always keeps enough lamports to stay "rent-exempt" — we only pay out the *surplus* above that minimum.
- \`recipient\` is an \`UncheckedAccount\` because it's just receiving a balance increase, not being read as typed data — but it's safe because we already checked its key matches \`group.members[current_round]\`.

### Try it

After incrementing \`current_round\`, add a check: if \`group.round_count as usize == group.members.len()\`, log a message announcing the savings cycle is complete.`,
          contentFr: `La dernière instruction essentielle : \`payout\`. Elle envoie le SOL accumulé par la PDA du groupe au membre dont c'est le tour, puis fait avancer \`current_round\` pour la prochaine fois.

\`\`\`rust
pub fn payout(ctx: Context<Payout>) -> Result<()> {
    let group = &mut ctx.accounts.group;

    let recipient_key = group.members[group.current_round as usize];
    require!(
        ctx.accounts.recipient.key() == recipient_key,
        ErrorCode::WrongRecipient
    );

    // Déplace les lamports hors de la PDA directement — une PDA ne peut pas
    // signer un CPI sortant vers le System Program, donc on ajuste les soldes manuellement.
    let pool_lamports = ctx.accounts.group.to_account_info().lamports();
    let rent_minimum = Rent::get()?.minimum_balance(8 + Group::INIT_SPACE);
    let payout_amount = pool_lamports.saturating_sub(rent_minimum);

    **ctx.accounts.group.to_account_info().try_borrow_mut_lamports()? -= payout_amount;
    **ctx.accounts.recipient.to_account_info().try_borrow_mut_lamports()? += payout_amount;

    // Fait avancer la rotation
    group.round_count += 1;
    group.current_round = (group.current_round + 1) % group.members.len() as u8;

    msg!(
        "{} lamports versés à {} (tour {} sur {})",
        payout_amount,
        recipient_key,
        group.round_count,
        group.members.len()
    );
    Ok(())
}

#[derive(Accounts)]
pub struct Payout<'info> {
    #[account(mut)]
    pub group: Account<'info, Group>,
    /// CHECK: vérifié par rapport à group.members[current_round] ci-dessus
    #[account(mut)]
    pub recipient: UncheckedAccount<'info>,
}
\`\`\`

### Ce qui se passe ici

- Le versement ne peut aller qu'à \`group.members[current_round]\` — le programme applique lui-même l'ordre de rotation, exactement comme le calendrier qu'un trésorier Njangi écrit au début du cycle, sauf que personne ne peut le modifier ensuite.
- Déplacer des lamports **hors** d'une PDA ne peut pas passer par \`system_program::transfer\` (une PDA ne peut pas signer un transfert sortant du System Program sans configuration supplémentaire). À la place, un programme propriétaire d'un compte peut ajuster directement son solde en lamports avec \`try_borrow_mut_lamports()\` — le schéma standard pour les comptes « coffre » détenus par une PDA.
- \`Rent::get()?.minimum_balance(...)\` garantit que la PDA conserve toujours assez de lamports pour rester « exemptée de rent » — on ne verse que le *surplus* au-dessus de ce minimum.
- \`recipient\` est un \`UncheckedAccount\` car il ne fait que recevoir une augmentation de solde, sans être lu comme une donnée typée — mais c'est sûr car on a déjà vérifié que sa clé correspond à \`group.members[current_round]\`.

### Essayez

Après avoir incrémenté \`current_round\`, ajoutez une vérification : si \`group.round_count as usize == group.members.len()\`, affichez un message annonçant que le cycle d'épargne est terminé.`,
          videoUrl: null,
          codeLanguage: "rust",
          codeStarterEn: `pub fn payout(ctx: Context<Payout>) -> Result<()> {
    let group = &mut ctx.accounts.group;

    let recipient_key = group.members[group.current_round as usize];
    require!(
        ctx.accounts.recipient.key() == recipient_key,
        ErrorCode::WrongRecipient
    );

    let pool_lamports = ctx.accounts.group.to_account_info().lamports();
    let rent_minimum = Rent::get()?.minimum_balance(8 + Group::INIT_SPACE);
    let payout_amount = pool_lamports.saturating_sub(rent_minimum);

    **ctx.accounts.group.to_account_info().try_borrow_mut_lamports()? -= payout_amount;
    **ctx.accounts.recipient.to_account_info().try_borrow_mut_lamports()? += payout_amount;

    group.round_count += 1;
    group.current_round = (group.current_round + 1) % group.members.len() as u8;

    // TODO: if group.round_count as usize == group.members.len(),
    // log a message announcing the savings cycle is complete

    Ok(())
}
`,
          codeStarterFr: `pub fn payout(ctx: Context<Payout>) -> Result<()> {
    let group = &mut ctx.accounts.group;

    let recipient_key = group.members[group.current_round as usize];
    require!(
        ctx.accounts.recipient.key() == recipient_key,
        ErrorCode::WrongRecipient
    );

    let pool_lamports = ctx.accounts.group.to_account_info().lamports();
    let rent_minimum = Rent::get()?.minimum_balance(8 + Group::INIT_SPACE);
    let payout_amount = pool_lamports.saturating_sub(rent_minimum);

    **ctx.accounts.group.to_account_info().try_borrow_mut_lamports()? -= payout_amount;
    **ctx.accounts.recipient.to_account_info().try_borrow_mut_lamports()? += payout_amount;

    group.round_count += 1;
    group.current_round = (group.current_round + 1) % group.members.len() as u8;

    // TODO : si group.round_count as usize == group.members.len(),
    // affichez un message annonçant que le cycle d'épargne est terminé

    Ok(())
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Custom Errors & Validation in Anchor",
          titleFr: "Erreurs personnalisées et validation avec Anchor",
          durationLabel: "14 min",
          lessonType: "code",
          contentEn: `Throughout this course, you've used \`require!\` and \`#[error_code]\` to reject invalid calls. Let's collect everything into the complete \`ErrorCode\` enum and look at a few validation patterns worth remembering.

\`\`\`rust
#[error_code]
pub enum ErrorCode {
    #[msg("Group name must be 32 characters or fewer.")]
    NameTooLong,
    #[msg("Contribution amount must be greater than zero.")]
    InvalidAmount,
    #[msg("This group already has the maximum number of members.")]
    GroupFull,
    #[msg("This wallet is already a member of the group.")]
    AlreadyMember,
    #[msg("Only group members can contribute.")]
    NotAMember,
    #[msg("It is not this wallet's turn to receive the payout.")]
    WrongRecipient,
    #[msg("This group's savings cycle has already started.")]
    CycleAlreadyStarted,
}
\`\`\`

### Validation patterns you've now seen

- **Input validation** — \`require!(contribution_amount > 0, ErrorCode::InvalidAmount)\` rejects bad arguments before any state changes happen.
- **Authorization checks** — \`require!(group.members.contains(&member.key()), ErrorCode::NotAMember)\` confirms the caller is allowed to perform this action.
- **Business-rule enforcement** — \`require!(ctx.accounts.recipient.key() == recipient_key, ErrorCode::WrongRecipient)\` makes sure the *correct* account receives the payout, not just *any* account the caller chooses.
- **Capacity limits** — \`require!(group.members.len() < Group::MAX_MEMBERS, ErrorCode::GroupFull)\` prevents an account from growing beyond the space it was allocated.

### Why this matters

Every \`require!\` is a rule that used to depend on a trusted human — a treasurer double-checking who's owed money, a secretary cross-referencing the member list. Encoding these as on-chain checks means **the rules are enforced the same way for everyone, every time, with no exceptions and no favoritism** — exactly the trust guarantee a Njangi group is built on, now backed by code instead of reputation alone.

### Try it

Add one more error variant, \`EmptyPool\`, with the message "There is nothing to pay out yet." Where in \`payout\` would you add a \`require!\` using it?`,
          contentFr: `Tout au long de ce cours, vous avez utilisé \`require!\` et \`#[error_code]\` pour rejeter les appels invalides. Regroupons tout dans l'enum \`ErrorCode\` complet et passons en revue quelques schémas de validation à retenir.

\`\`\`rust
#[error_code]
pub enum ErrorCode {
    #[msg("Le nom du groupe doit comporter 32 caractères maximum.")]
    NameTooLong,
    #[msg("Le montant de la contribution doit être supérieur à zéro.")]
    InvalidAmount,
    #[msg("Ce groupe a déjà atteint le nombre maximum de membres.")]
    GroupFull,
    #[msg("Ce portefeuille est déjà membre du groupe.")]
    AlreadyMember,
    #[msg("Seuls les membres du groupe peuvent contribuer.")]
    NotAMember,
    #[msg("Ce n'est pas le tour de ce portefeuille de recevoir le versement.")]
    WrongRecipient,
    #[msg("Le cycle d'épargne de ce groupe a déjà commencé.")]
    CycleAlreadyStarted,
}
\`\`\`

### Les schémas de validation que vous avez maintenant vus

- **Validation des entrées** — \`require!(contribution_amount > 0, ErrorCode::InvalidAmount)\` rejette les arguments invalides avant tout changement d'état.
- **Vérifications d'autorisation** — \`require!(group.members.contains(&member.key()), ErrorCode::NotAMember)\` confirme que l'appelant est autorisé à effectuer cette action.
- **Application des règles métier** — \`require!(ctx.accounts.recipient.key() == recipient_key, ErrorCode::WrongRecipient)\` garantit que c'est le *bon* compte qui reçoit le versement, et non *n'importe quel* compte choisi par l'appelant.
- **Limites de capacité** — \`require!(group.members.len() < Group::MAX_MEMBERS, ErrorCode::GroupFull)\` empêche un compte de dépasser l'espace qui lui a été alloué.

### Pourquoi c'est important

Chaque \`require!\` est une règle qui dépendait autrefois d'une personne de confiance — un trésorier qui vérifie qui doit recevoir l'argent, un secrétaire qui consulte la liste des membres. Encoder ces règles sous forme de vérifications on-chain signifie que **les règles sont appliquées de la même manière pour tout le monde, à chaque fois, sans exception ni favoritisme** — exactement la garantie de confiance sur laquelle repose un groupe Njangi, désormais soutenue par le code et non plus seulement par la réputation.

### Essayez

Ajoutez une variante d'erreur supplémentaire, \`EmptyPool\`, avec le message « Il n'y a rien à verser pour l'instant. » Où, dans \`payout\`, ajouteriez-vous un \`require!\` qui l'utilise ?`,
          videoUrl: null,
          codeLanguage: "rust",
          codeStarterEn: `#[error_code]
pub enum ErrorCode {
    #[msg("Group name must be 32 characters or fewer.")]
    NameTooLong,
    #[msg("Contribution amount must be greater than zero.")]
    InvalidAmount,
    #[msg("This group already has the maximum number of members.")]
    GroupFull,
    #[msg("This wallet is already a member of the group.")]
    AlreadyMember,
    #[msg("Only group members can contribute.")]
    NotAMember,
    #[msg("It is not this wallet's turn to receive the payout.")]
    WrongRecipient,
    #[msg("This group's savings cycle has already started.")]
    CycleAlreadyStarted,
    // TODO: add EmptyPool with message "There is nothing to pay out yet."
}
`,
          codeStarterFr: `#[error_code]
pub enum ErrorCode {
    #[msg("Le nom du groupe doit comporter 32 caractères maximum.")]
    NameTooLong,
    #[msg("Le montant de la contribution doit être supérieur à zéro.")]
    InvalidAmount,
    #[msg("Ce groupe a déjà atteint le nombre maximum de membres.")]
    GroupFull,
    #[msg("Ce portefeuille est déjà membre du groupe.")]
    AlreadyMember,
    #[msg("Seuls les membres du groupe peuvent contribuer.")]
    NotAMember,
    #[msg("Ce n'est pas le tour de ce portefeuille de recevoir le versement.")]
    WrongRecipient,
    #[msg("Le cycle d'épargne de ce groupe a déjà commencé.")]
    CycleAlreadyStarted,
    // TODO : ajoutez EmptyPool avec le message « Il n'y a rien à verser pour l'instant. »
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: Njangi Program Logic",
          titleFr: "Quiz : la logique du programme Njangi",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "Check your understanding of the payout instruction and Anchor validation patterns.",
          contentFr: "Vérifiez votre compréhension de l'instruction payout et des schémas de validation Anchor.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "Why does `payout` adjust lamport balances directly with `try_borrow_mut_lamports()` instead of calling `system_program::transfer`?",
              questionFr: "Pourquoi `payout` ajuste-t-il directement les soldes en lamports avec `try_borrow_mut_lamports()` plutôt que d'appeler `system_program::transfer` ?",
              optionsEn: [
                "It's faster to type",
                "PDAs can't sign outgoing System Program transfers without extra setup, so a program adjusts balances it owns directly",
                "system_program::transfer doesn't exist",
                "It avoids paying rent entirely",
              ],
              optionsFr: [
                "C'est plus rapide à écrire",
                "Une PDA ne peut pas signer de transfert sortant du System Program sans configuration supplémentaire, donc le programme ajuste directement les soldes qu'il possède",
                "system_program::transfer n'existe pas",
                "Cela évite complètement de payer le rent",
              ],
              correctIndex: 1,
              explanationEn: "PDAs have no private key to sign with, so outgoing System Program transfers aren't straightforward — programs that own an account adjust its lamports directly instead.",
              explanationFr: "Les PDAs n'ont pas de clé privée pour signer, donc les transferts sortants via le System Program ne sont pas directs — un programme propriétaire d'un compte ajuste plutôt ses lamports directement.",
            },
            {
              questionEn: "What does `Rent::get()?.minimum_balance(...)` ensure in the payout instruction?",
              questionFr: "Que garantit `Rent::get()?.minimum_balance(...)` dans l'instruction payout ?",
              optionsEn: [
                "That the recipient pays a fee",
                "That the group PDA keeps enough lamports to remain rent-exempt after paying out",
                "That the program charges interest",
                "That only the creator can call payout",
              ],
              optionsFr: [
                "Que le destinataire paie des frais",
                "Que la PDA du groupe conserve assez de lamports pour rester exemptée de rent après le versement",
                "Que le programme facture des intérêts",
                "Que seul le créateur peut appeler payout",
              ],
              correctIndex: 1,
              explanationEn: "Only the surplus above the rent-exempt minimum is paid out, so the account itself stays funded.",
              explanationFr: "Seul le surplus au-dessus du minimum exempté de rent est versé, afin que le compte lui-même reste financé.",
            },
            {
              questionEn: "In the Njangi program's rotation, who can receive a given round's payout?",
              questionFr: "Dans la rotation du programme Njangi, qui peut recevoir le versement d'un tour donné ?",
              optionsEn: [
                "Whoever calls the instruction first",
                "Only group.members[current_round], enforced by a require! check",
                "The program's deployer, always",
                "Any wallet with enough SOL",
              ],
              optionsFr: [
                "Celui qui appelle l'instruction en premier",
                "Uniquement group.members[current_round], imposé par une vérification require!",
                "Le déployeur du programme, toujours",
                "Tout portefeuille disposant d'assez de SOL",
              ],
              correctIndex: 1,
              explanationEn: "The `require!` check ensures only the wallet whose turn it is — group.members[current_round] — can be paid, no matter who submits the transaction.",
              explanationFr: "La vérification `require!` garantit que seul le portefeuille dont c'est le tour — group.members[current_round] — peut être payé, quel que soit celui qui soumet la transaction.",
            },
          ],
        },
      ],
    },
    // ── Module 6: Testing, Deploying & Going Live ────────────────────────────
    {
      titleEn: "Testing, Deploying & Going Live",
      titleFr: "Tester, déployer et passer en production",
      lessons: [
        {
          titleEn: "Writing Tests for Your Anchor Program",
          titleFr: "Écrire des tests pour votre programme Anchor",
          durationLabel: "20 min",
          lessonType: "code",
          contentEn: `Anchor projects include a \`tests/\` folder with TypeScript tests that run against your deployed program, using the \`@coral-xyz/anchor\` client library — the same library a real frontend would use to call your program.

\`\`\`typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("njangi", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Njangi as Program;

  it("creates a group", async () => {
    const groupName = "Fundi3 Test Circle";
    const contributionAmount = new anchor.BN(0.01 * anchor.web3.LAMPORTS_PER_SOL);

    const [groupPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("group"), provider.wallet.publicKey.toBuffer(), Buffer.from(groupName)],
      program.programId,
    );

    await program.methods
      .initializeGroup(groupName, contributionAmount)
      .accounts({ group: groupPda, creator: provider.wallet.publicKey })
      .rpc();

    const group = await program.account.group.fetch(groupPda);
    assert.equal(group.name, groupName);
    assert.equal(group.members.length, 1);
    assert.equal(group.currentRound, 0);
  });

  it("lets a second member join", async () => {
    // derive the same groupPda, then call program.methods.joinGroup()
    // with a second wallet as \`member\`, and assert group.members.length === 2
  });
});
\`\`\`

### Key ideas

- **\`anchor.workspace.Njangi\`** automatically loads your program's IDL — a JSON description of every instruction and account, generated when you build. This is how the TypeScript client knows about \`initializeGroup\`, \`joinGroup\`, etc., with camelCase names auto-converted from your Rust snake_case.
- **\`findProgramAddressSync\`** mirrors the \`seeds = [...]\` you wrote in Rust — the client computes the *exact same* PDA address your program derives on-chain.
- **\`program.account.group.fetch(groupPda)\`** reads and deserializes the account's data — this is how a frontend would display a group's members and current round.
- Solana Playground's **Test** tab runs files like this automatically against your deployed program on devnet, showing pass/fail results plus transaction logs.

### Try it

Sketch the second test ("lets a second member join") using the pattern from the first — you don't need to run it, just describe the steps as comments.`,
          contentFr: `Les projets Anchor incluent un dossier \`tests/\` avec des tests TypeScript qui s'exécutent contre votre programme déployé, en utilisant la bibliothèque cliente \`@coral-xyz/anchor\` — la même bibliothèque qu'un vrai frontend utiliserait pour appeler votre programme.

\`\`\`typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("njangi", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Njangi as Program;

  it("crée un groupe", async () => {
    const groupName = "Fundi3 Test Circle";
    const contributionAmount = new anchor.BN(0.01 * anchor.web3.LAMPORTS_PER_SOL);

    const [groupPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("group"), provider.wallet.publicKey.toBuffer(), Buffer.from(groupName)],
      program.programId,
    );

    await program.methods
      .initializeGroup(groupName, contributionAmount)
      .accounts({ group: groupPda, creator: provider.wallet.publicKey })
      .rpc();

    const group = await program.account.group.fetch(groupPda);
    assert.equal(group.name, groupName);
    assert.equal(group.members.length, 1);
    assert.equal(group.currentRound, 0);
  });

  it("permet à un deuxième membre de rejoindre", async () => {
    // dérivez la même groupPda, puis appelez program.methods.joinGroup()
    // avec un second portefeuille comme \`member\`, et vérifiez group.members.length === 2
  });
});
\`\`\`

### Idées clés

- **\`anchor.workspace.Njangi\`** charge automatiquement l'IDL de votre programme — une description JSON de chaque instruction et compte, générée lors de la compilation. C'est ainsi que le client TypeScript connaît \`initializeGroup\`, \`joinGroup\`, etc., avec les noms convertis automatiquement de snake_case (Rust) en camelCase.
- **\`findProgramAddressSync\`** reproduit les \`seeds = [...]\` écrites en Rust — le client calcule *exactement la même* adresse PDA que votre programme dérive on-chain.
- **\`program.account.group.fetch(groupPda)\`** lit et désérialise les données du compte — c'est ainsi qu'un frontend afficherait les membres et le tour actuel d'un groupe.
- L'onglet **Test** de Solana Playground exécute automatiquement ce type de fichier contre votre programme déployé sur devnet, et affiche les résultats (réussite/échec) ainsi que les journaux de transactions.

### Essayez

Esquissez le second test (« permet à un deuxième membre de rejoindre ») en suivant le modèle du premier — pas besoin de l'exécuter, décrivez simplement les étapes en commentaires.`,
          videoUrl: null,
          codeLanguage: "typescript",
          codeStarterEn: `import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("njangi", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Njangi as Program;

  it("creates a group", async () => {
    // TODO: derive groupPda with findProgramAddressSync using
    // seeds ["group", creator pubkey, group name]

    // TODO: call program.methods.initializeGroup(name, amount)
    //       .accounts({ group: groupPda, creator: provider.wallet.publicKey })
    //       .rpc()

    // TODO: fetch the group account and assert its name and members.length
  });
});
`,
          codeStarterFr: `import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { assert } from "chai";

describe("njangi", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Njangi as Program;

  it("crée un groupe", async () => {
    // TODO : dérivez groupPda avec findProgramAddressSync en utilisant
    // les seeds ["group", clé publique du créateur, nom du groupe]

    // TODO : appelez program.methods.initializeGroup(name, amount)
    //       .accounts({ group: groupPda, creator: provider.wallet.publicKey })
    //       .rpc()

    // TODO : récupérez le compte group et vérifiez son nom et members.length
  });
});
`,
          quizQuestions: [],
        },
        {
          titleEn: "Deploy to Devnet with Solana Playground",
          titleFr: "Déployer sur devnet avec Solana Playground",
          durationLabel: "12 min",
          lessonType: "text",
          contentEn: `You've designed the data model and written every instruction. Now let's put it all together and deploy.

### Step by step in Solana Playground

1. **Paste the complete program.** Combine the \`Group\` struct, \`ErrorCode\` enum, and all four instructions (\`initialize_group\`, \`join_group\`, \`contribute\`, \`payout\`) into a single \`lib.rs\`, inside and alongside the \`#[program] pub mod njangi { ... }\` block.
2. **Build.** Click the **Build** button (hammer icon). Playground compiles your Rust program to a \`.so\` file and generates the IDL.
3. **Fund your wallet.** Click the wallet icon, then **Faucet** to airdrop devnet SOL — deploying costs a small amount of SOL for rent on the program's account.
4. **Deploy.** Click **Deploy**. Playground uploads your compiled program to devnet at the address from \`declare_id!\`.
5. **Test.** Open the **Test** tab and run the test file from the previous lesson — Playground executes real transactions against your deployed program on devnet.

### Verifying on Solana Explorer

Copy your program's address (from \`declare_id!\` or the Playground sidebar) and paste it into **explorer.solana.com** — make sure the network selector (top right) is set to **Devnet**. You'll see your program account, its executable data, and every transaction sent to it, including the test transactions you just ran. This is the Solana equivalent of viewing a contract on Sepolia Etherscan.

### What's next

You now have a deployed, tested Anchor program implementing a real Njangi savings circle. From here, a full dApp would add a web frontend — using \`@solana/web3.js\` and \`@coral-xyz/anchor\`, the same libraries from the test file — so members can create groups, join, contribute, and trigger payouts from a normal web page, no command line required.`,
          contentFr: `Vous avez conçu le modèle de données et écrit chaque instruction. Assemblons maintenant le tout et déployons.

### Étape par étape dans Solana Playground

1. **Collez le programme complet.** Combinez la struct \`Group\`, l'enum \`ErrorCode\` et les quatre instructions (\`initialize_group\`, \`join_group\`, \`contribute\`, \`payout\`) dans un seul fichier \`lib.rs\`, à l'intérieur et autour du bloc \`#[program] pub mod njangi { ... }\`.
2. **Build.** Cliquez sur le bouton **Build** (icône marteau). Playground compile votre programme Rust en fichier \`.so\` et génère l'IDL.
3. **Approvisionnez votre portefeuille.** Cliquez sur l'icône de portefeuille, puis sur **Faucet** pour recevoir du SOL devnet — le déploiement coûte un peu de SOL pour le rent du compte du programme.
4. **Deploy.** Cliquez sur **Deploy**. Playground téléverse votre programme compilé sur devnet, à l'adresse définie par \`declare_id!\`.
5. **Testez.** Ouvrez l'onglet **Test** et exécutez le fichier de test de la leçon précédente — Playground exécute de vraies transactions contre votre programme déployé sur devnet.

### Vérifier sur Solana Explorer

Copiez l'adresse de votre programme (depuis \`declare_id!\` ou la barre latérale de Playground) et collez-la dans **explorer.solana.com** — assurez-vous que le sélecteur de réseau (en haut à droite) est sur **Devnet**. Vous verrez le compte de votre programme, ses données exécutables, et chaque transaction qui lui a été envoyée, y compris les transactions de test que vous venez d'exécuter. C'est l'équivalent Solana de la consultation d'un contrat sur Sepolia Etherscan.

### Et ensuite ?

Vous disposez maintenant d'un programme Anchor déployé et testé, implémentant une véritable tontine Njangi. À partir de là, une dApp complète ajouterait un frontend web — utilisant \`@solana/web3.js\` et \`@coral-xyz/anchor\`, les mêmes bibliothèques que dans le fichier de test — pour que les membres puissent créer des groupes, rejoindre, contribuer et déclencher des versements depuis une page web classique, sans ligne de commande.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Final Quiz: Njangi on Solana",
          titleFr: "Quiz final : Njangi sur Solana",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "One last check before you claim your certificate — covering testing, deployment, and the Solana Explorer.",
          contentFr: "Une dernière vérification avant de réclamer votre certificat — sur les tests, le déploiement et Solana Explorer.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "What does Solana Playground's IDL describe?",
              questionFr: "Que décrit l'IDL généré par Solana Playground ?",
              optionsEn: [
                "The program's CSS styling",
                "A JSON description of every instruction and account in your program, used by TypeScript clients",
                "The program's rent balance",
                "The list of validators",
              ],
              optionsFr: [
                "Le style CSS du programme",
                "Une description JSON de chaque instruction et compte de votre programme, utilisée par les clients TypeScript",
                "Le solde de rent du programme",
                "La liste des validateurs",
              ],
              correctIndex: 1,
              explanationEn: "The IDL is generated at build time and lets TypeScript clients call your program's instructions with type safety.",
              explanationFr: "L'IDL est généré à la compilation et permet aux clients TypeScript d'appeler les instructions de votre programme de façon typée.",
            },
            {
              questionEn: "How does a test compute the same PDA address as the on-chain program?",
              questionFr: "Comment un test calcule-t-il la même adresse PDA que le programme on-chain ?",
              optionsEn: [
                "It guesses random addresses until one works",
                "It calls findProgramAddressSync with the same seeds and program ID used in the Rust code",
                "PDAs are stored in a config file",
                "It asks Solana support for the address",
              ],
              optionsFr: [
                "Il essaie des adresses au hasard jusqu'à ce que l'une fonctionne",
                "Il appelle findProgramAddressSync avec les mêmes seeds et le même program ID que dans le code Rust",
                "Les PDAs sont stockées dans un fichier de configuration",
                "Il demande l'adresse au support Solana",
              ],
              correctIndex: 1,
              explanationEn: "PDA derivation is deterministic — the same seeds and program ID always produce the same address, on-chain or off-chain.",
              explanationFr: "La dérivation d'une PDA est déterministe — les mêmes seeds et le même program ID produisent toujours la même adresse, on-chain comme off-chain.",
            },
            {
              questionEn: "What's the Solana equivalent of viewing a deployed contract on Sepolia Etherscan?",
              questionFr: "Quel est l'équivalent Solana de la consultation d'un contrat déployé sur Sepolia Etherscan ?",
              optionsEn: [
                "There is no equivalent",
                "Solana Explorer, set to the Devnet network",
                "The Anchor.toml file",
                "The Rust compiler output",
              ],
              optionsFr: [
                "Il n'y a pas d'équivalent",
                "Solana Explorer, avec le réseau réglé sur Devnet",
                "Le fichier Anchor.toml",
                "La sortie du compilateur Rust",
              ],
              correctIndex: 1,
              explanationEn: "explorer.solana.com lets you inspect programs, accounts, and transactions on any network, including Devnet.",
              explanationFr: "explorer.solana.com permet d'inspecter les programmes, comptes et transactions sur n'importe quel réseau, y compris Devnet.",
            },
          ],
        },
      ],
    },
  ],
};
