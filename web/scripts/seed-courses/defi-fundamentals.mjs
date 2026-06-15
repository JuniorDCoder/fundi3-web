// Course: DeFi Fundamentals
// Level: intermediate · Bilingual (EN/FR) · Free · African context

export const defiFundamentals = {
  slug: "defi-fundamentals",
  titleEn: "DeFi Fundamentals",
  titleFr: "Les fondamentaux de la DeFi",
  descriptionEn:
    "Understand how decentralized finance works — exchanges, lending, yield, and risk — through the lens of Njangi and African savings culture.",
  descriptionFr:
    "Comprenez le fonctionnement de la finance décentralisée — échanges, prêts, rendement et risques — à travers le prisme du Njangi et de la culture de l'épargne africaine.",
  longDescriptionEn: `DeFi — decentralized finance — recreates the financial services you already know (savings, loans, exchanges, insurance) using smart contracts instead of banks. No branch visits, no paperwork, no gatekeepers: just code that runs exactly as written, for anyone with an internet connection.

If you've ever been part of a Njangi, a tontine, or any rotating savings group, you already understand DeFi's core idea better than most Wall Street analysts: a group of people pooling resources, governed by rules everyone agreed to upfront, with no single person controlling the pot. DeFi takes that idea and makes it global, transparent, and automatic.

In this course, you'll learn how decentralized exchanges (DEXs) let people swap tokens without a middleman, how lending protocols let you earn interest or borrow against your crypto, how yield and staking work, and what risks to watch for. By the end, you'll design and partially build your own DeFi Njangi — a savings pool that runs entirely on smart contracts.`,
  longDescriptionFr: `La DeFi — finance décentralisée — recrée les services financiers que vous connaissez déjà (épargne, prêts, échanges, assurance) à l'aide de contrats intelligents plutôt que de banques. Pas de visite en agence, pas de papiers, pas d'intermédiaires : juste du code qui s'exécute exactement comme prévu, pour toute personne disposant d'une connexion internet.

Si vous avez déjà participé à un Njangi, une tontine, ou tout groupe d'épargne rotative, vous comprenez déjà l'idée centrale de la DeFi mieux que la plupart des analystes de Wall Street : un groupe de personnes mettant en commun des ressources, selon des règles convenues à l'avance, sans qu'une seule personne ne contrôle la caisse. La DeFi prend cette idée et la rend mondiale, transparente et automatique.

Dans ce cours, vous apprendrez comment les échanges décentralisés (DEX) permettent d'échanger des jetons sans intermédiaire, comment les protocoles de prêt permettent de gagner des intérêts ou d'emprunter contre vos cryptos, comment fonctionnent le rendement et le staking, et quels risques surveiller. À la fin, vous concevrez et construirez en partie votre propre Njangi DeFi — une caisse d'épargne qui fonctionne entièrement sur des contrats intelligents.`,
  level: "intermediate",
  language: "both",
  isAfrican: true,
  durationLabel: "5h",
  gradientFrom: "#EF9F27",
  gradientTo: "#FAC775",
  tags: ["DeFi", "Solidity", "Ethereum", "Lending", "African context"],
  outcomesEn: [
    "Explain DeFi using familiar Njangi/tontine concepts",
    "Understand how AMMs and decentralized exchanges set prices",
    "Read and reason about a Solidity lending pool contract",
    "Understand yield farming, staking, and impermanent loss",
    "Design a DeFi savings pool with rules, risks, and safeguards",
  ],
  outcomesFr: [
    "Expliquer la DeFi à l'aide de concepts familiers de Njangi/tontine",
    "Comprendre comment les AMM et les échanges décentralisés fixent les prix",
    "Lire et analyser un contrat Solidity de pool de prêt",
    "Comprendre le yield farming, le staking et la perte impermanente",
    "Concevoir une caisse d'épargne DeFi avec règles, risques et garde-fous",
  ],
  modules: [
    // ── Module 1: What Is DeFi? ───────────────────────────────────────────
    {
      titleEn: "What Is DeFi?",
      titleFr: "Qu'est-ce que la DeFi ?",
      lessons: [
        {
          titleEn: "From Njangi to DeFi",
          titleFr: "Du Njangi à la DeFi",
          durationLabel: "10 min",
          lessonType: "text",
          contentEn: `Picture a Njangi: ten friends each contribute 10,000 CFA every month. Each month, one member takes the full pot — 100,000 CFA. Everyone knows the rules. Everyone can see who has paid. No bank is involved, and no single person can run away with the money because everyone is watching.

DeFi — decentralized finance — takes that exact structure and writes it in code, called a **smart contract**, that runs on a blockchain. Instead of trusting a treasurer to "remember" who paid and who's next, the contract itself enforces the rules. It cannot be bribed, cannot "forget," and cannot play favorites.

### What DeFi replaces

| Traditional finance | DeFi equivalent |
| --- | --- |
| Bank savings account | Lending protocol (e.g., Aave, Compound) |
| Currency exchange bureau | Decentralized exchange (DEX, e.g., Uniswap) |
| Investment fund | Yield farming / liquidity pools |
| Insurance company | DeFi insurance protocols |
| Njangi / tontine treasurer | Smart contract holding the group's funds |

### Why it matters for Africa

Many Africans already practice informal finance — Njangi, tontines, esusu, chilembe — because formal banks are slow, expensive, or simply unavailable. DeFi doesn't introduce a foreign concept; it gives the concept Africans already trust a global, transparent, and automatic upgrade — accessible to anyone with a phone and an internet connection, with no minimum balance and no branch visit required.

### The trade-off

DeFi removes the need to trust a *person*. But it introduces a new requirement: you must trust the *code*. If a smart contract has a bug, there's no manager to call — the code is the final word. That's why later in this course we'll look closely at risks, and why testing matters so much.`,
          contentFr: `Imaginez un Njangi : dix amis contribuent chacun 10 000 FCFA chaque mois. Chaque mois, un membre reçoit la totalité de la caisse — 100 000 FCFA. Tout le monde connaît les règles. Tout le monde peut voir qui a payé. Aucune banque n'est impliquée, et personne ne peut s'enfuir avec l'argent car tout le monde surveille.

La DeFi — finance décentralisée — reprend exactement cette structure et l'écrit sous forme de code, appelé **contrat intelligent**, qui s'exécute sur une blockchain. Au lieu de faire confiance à un trésorier pour « se souvenir » de qui a payé et de qui est le prochain, c'est le contrat lui-même qui applique les règles. Il ne peut pas être corrompu, ne peut pas « oublier », et ne fait pas de favoritisme.

### Ce que la DeFi remplace

| Finance traditionnelle | Équivalent DeFi |
| --- | --- |
| Compte d'épargne bancaire | Protocole de prêt (ex. Aave, Compound) |
| Bureau de change | Échange décentralisé (DEX, ex. Uniswap) |
| Fonds d'investissement | Yield farming / pools de liquidité |
| Compagnie d'assurance | Protocoles d'assurance DeFi |
| Trésorier de Njangi / tontine | Contrat intelligent détenant les fonds du groupe |

### Pourquoi c'est important pour l'Afrique

De nombreux Africains pratiquent déjà la finance informelle — Njangi, tontines, esusu, chilembe — car les banques formelles sont lentes, coûteuses ou simplement inaccessibles. La DeFi n'introduit pas un concept étranger ; elle offre au concept que les Africains connaissent déjà une mise à niveau mondiale, transparente et automatique — accessible à toute personne disposant d'un téléphone et d'une connexion internet, sans solde minimum ni visite en agence.

### Le compromis

La DeFi supprime le besoin de faire confiance à une *personne*. Mais elle introduit une nouvelle exigence : vous devez faire confiance au *code*. Si un contrat intelligent contient un bug, il n'y a pas de gestionnaire à appeler — le code a le dernier mot. C'est pourquoi, plus loin dans ce cours, nous examinerons attentivement les risques, et pourquoi les tests sont si importants.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Stablecoins & Money in DeFi",
          titleFr: "Stablecoins et monnaie dans la DeFi",
          durationLabel: "12 min",
          lessonType: "text",
          contentEn: `Before you can lend, borrow, or trade in DeFi, you need a way to hold value that doesn't swing wildly in price. That's the job of **stablecoins**.

### What is a stablecoin?

A stablecoin is a cryptocurrency designed to hold a stable value, usually pegged 1:1 to a real-world currency like the US dollar. The most widely used are **USDC** and **USDT** — each one is meant to always be worth $1.

Think of it like the CFA franc's peg to the euro: the CFA franc (XAF/XOF) is pegged at a fixed rate (≈655.96 CFA = 1 EUR), guaranteed by reserves held by the central banks (BEAC/BCEAO). A fiat-backed stablecoin like USDC works similarly — for every 1 USDC in circulation, the issuer (Circle) claims to hold $1 in reserves (cash and short-term US treasuries), which can in principle be redeemed.

### Why stablecoins matter in DeFi

- **Pricing stability**: If you lend 1,000 USDC and earn 5% interest, you know you'll get back ~1,050 USDC worth roughly the same in dollars a year later — unlike lending a volatile token like ETH or SOL.
- **Cross-border value**: A trader in Douala and a trader in Nairobi can both hold and transact in USDC without either needing a US bank account, and without the multi-day delays of traditional cross-border transfers.
- **On-ramp/off-ramp**: Many African exchanges let users convert mobile money (MTN MoMo, Orange Money) directly to stablecoins and back — this is often the first DeFi interaction for new users.

### Types of stablecoins

| Type | How it stays stable | Example |
| --- | --- | --- |
| Fiat-backed | Issuer holds real dollars/reserves 1:1 | USDC, USDT |
| Crypto-collateralized | Backed by *more* crypto than the stablecoin's value (over-collateralized) | DAI |
| Algorithmic | Uses code/incentives to adjust supply — historically the riskiest category | (several have failed) |

### A word of caution

A stablecoin is only as trustworthy as what backs it. "Algorithmic" stablecoins that rely purely on market incentives (rather than real reserves) have collapsed before, wiping out savings overnight — a reminder that "stable" in the name is a *design goal*, not a guarantee. Always check what backs a stablecoin before trusting it with savings.`,
          contentFr: `Avant de pouvoir prêter, emprunter ou échanger dans la DeFi, vous avez besoin d'un moyen de conserver de la valeur sans fluctuations brutales de prix. C'est le rôle des **stablecoins**.

### Qu'est-ce qu'un stablecoin ?

Un stablecoin est une cryptomonnaie conçue pour conserver une valeur stable, généralement indexée 1:1 sur une monnaie réelle comme le dollar américain. Les plus utilisés sont **USDC** et **USDT** — chacun est censé valoir toujours 1 $.

Pensez-y comme à l'arrimage du franc CFA à l'euro : le franc CFA (XAF/XOF) est fixé à un taux fixe (≈655,96 FCFA = 1 EUR), garanti par les réserves détenues par les banques centrales (BEAC/BCEAO). Un stablecoin adossé à du fiat comme USDC fonctionne de manière similaire — pour chaque USDC en circulation, l'émetteur (Circle) affirme détenir 1 $ de réserves (liquidités et bons du Trésor américain à court terme), qui peuvent en principe être échangés.

### Pourquoi les stablecoins comptent dans la DeFi

- **Stabilité des prix** : si vous prêtez 1 000 USDC et gagnez 5 % d'intérêt, vous savez que vous récupérerez ~1 050 USDC valant à peu près la même chose en dollars un an plus tard — contrairement à un prêt en jeton volatil comme ETH ou SOL.
- **Valeur transfrontalière** : un commerçant à Douala et un commerçant à Nairobi peuvent tous deux détenir et échanger des USDC sans qu'aucun des deux n'ait besoin d'un compte bancaire américain, et sans les délais de plusieurs jours des transferts transfrontaliers traditionnels.
- **Entrée/sortie** : de nombreuses plateformes africaines permettent de convertir le mobile money (MTN MoMo, Orange Money) directement en stablecoins et inversement — c'est souvent la première interaction avec la DeFi pour les nouveaux utilisateurs.

### Types de stablecoins

| Type | Comment il reste stable | Exemple |
| --- | --- | --- |
| Adossé au fiat | L'émetteur détient de vrais dollars/réserves 1:1 | USDC, USDT |
| Adossé à des cryptos | Garanti par *plus* de cryptos que la valeur du stablecoin (surcollatéralisé) | DAI |
| Algorithmique | Utilise du code/des incitations pour ajuster l'offre — historiquement la catégorie la plus risquée | (plusieurs ont échoué) |

### Un mot de prudence

Un stablecoin n'est fiable que dans la mesure de ce qui le garantit. Les stablecoins « algorithmiques » qui reposent uniquement sur des incitations de marché (plutôt que sur de vraies réserves) se sont déjà effondrés, anéantissant des économies du jour au lendemain — un rappel que « stable » dans le nom est un *objectif de conception*, pas une garantie. Vérifiez toujours ce qui garantit un stablecoin avant de lui confier votre épargne.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: DeFi Basics",
          titleFr: "Quiz : les bases de la DeFi",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "Check your understanding of DeFi's core ideas and stablecoins before moving on to decentralized exchanges.",
          contentFr: "Vérifiez votre compréhension des idées centrales de la DeFi et des stablecoins avant de passer aux échanges décentralisés.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "In the Njangi-to-DeFi analogy, what plays the role of the 'treasurer'?",
              questionFr: "Dans l'analogie Njangi → DeFi, qu'est-ce qui joue le rôle du « trésorier » ?",
              optionsEn: ["A bank employee", "A smart contract", "The group's oldest member", "A government agency"],
              optionsFr: ["Un employé de banque", "Un contrat intelligent", "Le membre le plus âgé du groupe", "Une agence gouvernementale"],
              correctIndex: 1,
              explanationEn: "The smart contract enforces the group's rules automatically, replacing a human treasurer.",
              explanationFr: "Le contrat intelligent applique automatiquement les règles du groupe, remplaçant un trésorier humain.",
            },
            {
              questionEn: "What is a stablecoin primarily designed to do?",
              questionFr: "Quel est le rôle principal d'un stablecoin ?",
              optionsEn: ["Increase in value quickly", "Maintain a stable value, usually pegged to a currency like the US dollar", "Replace Bitcoin entirely", "Pay validators"],
              optionsFr: ["Augmenter rapidement de valeur", "Conserver une valeur stable, généralement indexée sur une monnaie comme le dollar américain", "Remplacer entièrement le Bitcoin", "Payer les validateurs"],
              correctIndex: 1,
              explanationEn: "Stablecoins like USDC and USDT aim to always be worth ~$1, much like the CFA franc's peg to the euro.",
              explanationFr: "Les stablecoins comme USDC et USDT visent à toujours valoir ~1 $, à l'image de l'arrimage du franc CFA à l'euro.",
            },
            {
              questionEn: "What's the key trade-off DeFi introduces compared to trusting a person?",
              questionFr: "Quel est le compromis clé qu'introduit la DeFi par rapport à la confiance envers une personne ?",
              optionsEn: ["You must trust the code/smart contract instead of a person", "You need a passport", "You must use cash only", "There is no trade-off"],
              optionsFr: ["Vous devez faire confiance au code/contrat intelligent plutôt qu'à une personne", "Vous avez besoin d'un passeport", "Vous devez utiliser uniquement des espèces", "Il n'y a aucun compromis"],
              correctIndex: 0,
              explanationEn: "DeFi removes the need to trust a treasurer, but the smart contract's code becomes the new thing you must trust — and verify.",
              explanationFr: "La DeFi supprime le besoin de faire confiance à un trésorier, mais le code du contrat intelligent devient la nouvelle chose à laquelle il faut faire confiance — et à vérifier.",
            },
          ],
        },
      ],
    },

    // ── Module 2: Decentralized Exchanges & AMMs ─────────────────────────────
    {
      titleEn: "Decentralized Exchanges & AMMs",
      titleFr: "Échanges décentralisés et AMM",
      lessons: [
        {
          titleEn: "How Decentralized Exchanges Work",
          titleFr: "Comment fonctionnent les échanges décentralisés",
          durationLabel: "14 min",
          lessonType: "text",
          contentEn: `When you want to exchange CFA for euros at a currency bureau, the bureau sets a rate, takes a cut, and gives you euros from its own reserves. A **decentralized exchange (DEX)** does the same job for crypto tokens — but instead of a bureau with a vault, it's a smart contract holding a pool of two tokens.

### Order books vs. liquidity pools

Traditional exchanges (and some DEXs) use an **order book**: buyers and sellers each post the price they want, and the exchange matches them. This requires constant activity from many traders to keep prices fair.

Most popular DEXs (Uniswap, Raydium, and similar) instead use an **Automated Market Maker (AMM)**: a smart contract holds a pool of two tokens (say, SOL and USDC), and a formula automatically calculates the price based on the *ratio* of tokens in the pool. No order book, no need for a matching buyer — you trade directly against the pool.

### A simple example

Imagine a pool holding 100 SOL and 20,000 USDC. The pool's formula says: \`SOL_amount × USDC_amount = constant (k)\`. Here, \`k = 100 × 20,000 = 2,000,000\`.

If you want to buy SOL with USDC, you add USDC to the pool and the contract removes SOL to keep \`k\` constant. The more SOL you try to buy in one trade, the worse your price gets — this is called **slippage**, and it's why large trades on small pools cost more per token.

### Who provides the tokens in the pool?

Anyone! Users called **liquidity providers (LPs)** deposit pairs of tokens into the pool and earn a small fee (e.g., 0.3%) from every trade that happens against that pool — proportional to their share of the pool. This is the DeFi version of a Njangi member contributing capital and earning a return for keeping the group's pool funded.

### Why this matters

DEXs let anyone — anywhere, anytime — swap tokens 24/7 without needing a licensed exchange, a bank account, or approval from anyone. For African users, this means access to global markets that traditional brokers in many countries simply don't offer.`,
          contentFr: `Lorsque vous souhaitez échanger des FCFA contre des euros dans un bureau de change, le bureau fixe un taux, prélève une commission et vous remet des euros depuis ses propres réserves. Un **échange décentralisé (DEX)** fait le même travail pour les jetons crypto — mais au lieu d'un bureau avec un coffre-fort, il s'agit d'un contrat intelligent détenant une réserve de deux jetons.

### Carnets d'ordres vs pools de liquidité

Les échanges traditionnels (et certains DEX) utilisent un **carnet d'ordres** : acheteurs et vendeurs publient chacun le prix qu'ils souhaitent, et l'échange les met en relation. Cela nécessite une activité constante de nombreux traders pour maintenir des prix équitables.

La plupart des DEX populaires (Uniswap, Raydium, et similaires) utilisent plutôt un **Automated Market Maker (AMM)** : un contrat intelligent détient une réserve de deux jetons (par exemple SOL et USDC), et une formule calcule automatiquement le prix en fonction du *ratio* de jetons dans la réserve. Pas de carnet d'ordres, pas besoin d'un acheteur correspondant — vous échangez directement contre la réserve.

### Un exemple simple

Imaginez une réserve contenant 100 SOL et 20 000 USDC. La formule de la réserve dit : \`montant_SOL × montant_USDC = constante (k)\`. Ici, \`k = 100 × 20 000 = 2 000 000\`.

Si vous voulez acheter du SOL avec des USDC, vous ajoutez des USDC à la réserve et le contrat retire du SOL pour maintenir \`k\` constant. Plus vous essayez d'acheter de SOL en une seule transaction, plus votre prix se dégrade — c'est ce qu'on appelle le **slippage** (glissement de prix), et c'est pourquoi les grosses transactions sur de petites réserves coûtent plus cher par jeton.

### Qui fournit les jetons dans la réserve ?

N'importe qui ! Des utilisateurs appelés **fournisseurs de liquidité (LP)** déposent des paires de jetons dans la réserve et gagnent une petite commission (ex. 0,3 %) sur chaque échange effectué contre cette réserve — proportionnellement à leur part de la réserve. C'est la version DeFi d'un membre de Njangi qui apporte du capital et obtient un rendement en maintenant la caisse du groupe alimentée.

### Pourquoi c'est important

Les DEX permettent à n'importe qui — n'importe où, n'importe quand — d'échanger des jetons 24h/24 et 7j/7 sans avoir besoin d'un échange agréé, d'un compte bancaire, ou de l'approbation de quiconque. Pour les utilisateurs africains, cela signifie un accès à des marchés mondiaux que les courtiers traditionnels, dans de nombreux pays, n'offrent simplement pas.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Automated Market Makers & Liquidity Pools",
          titleFr: "Automated Market Makers et pools de liquidité",
          durationLabel: "20 min",
          lessonType: "code",
          contentEn: `Let's read a simplified AMM swap function written in Solidity. Real DEXs (Uniswap v2/v3) are more complex — with fees, multiple pools, and safety checks — but this captures the core idea: the constant product formula.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleAMM {
    uint256 public reserveA; // e.g., SOL-equivalent token
    uint256 public reserveB; // e.g., USDC-equivalent token

    constructor(uint256 initialA, uint256 initialB) {
        reserveA = initialA;
        reserveB = initialB;
    }

    // Returns how much of token B you'd receive for \`amountIn\` of token A
    function getAmountOut(uint256 amountIn) public view returns (uint256) {
        // Constant product formula: (reserveA + amountIn) * (reserveB - amountOut) = reserveA * reserveB
        uint256 k = reserveA * reserveB;
        uint256 newReserveA = reserveA + amountIn;
        uint256 newReserveB = k / newReserveA;
        return reserveB - newReserveB;
    }

    function swapAForB(uint256 amountIn) external {
        uint256 amountOut = getAmountOut(amountIn);
        reserveA += amountIn;
        reserveB -= amountOut;
        // In a real contract: transfer tokens in/out here
    }
}
\`\`\`

### Walking through the code

- **\`reserveA\` and \`reserveB\`** hold the pool's two token balances — like the 100 SOL and 20,000 USDC in our earlier example.
- **\`getAmountOut\`** is the heart of the AMM. It computes \`k = reserveA * reserveB\` (the constant), then figures out what \`reserveB\` would need to become to keep \`k\` the same after \`amountIn\` is added to \`reserveA\`. The difference is what the trader receives.
- **\`swapAForB\`** updates the pool's balances after a trade. A real implementation would also move the actual tokens between the trader's wallet and the contract, and would charge a small fee that stays in the pool for liquidity providers.

### Try it

Using the constructor values \`initialA = 100\` and \`initialB = 20000\` (our 100 SOL / 20,000 USDC pool), trace through \`getAmountOut(10)\` by hand:

1. \`k = 100 * 20000 = 2,000,000\`
2. \`newReserveA = 100 + 10 = 110\`
3. \`newReserveB = 2,000,000 / 110 = 18,181\` (integer division)
4. \`amountOut = 20,000 - 18,181 = 1,819\`

So 10 units of token A buys ~1,819 units of token B — notice this is *less* than the "naive" price of 2,000 (10 × 200), because of slippage. Try computing \`getAmountOut(50)\` and compare the effective price per token — this is slippage in action.`,
          contentFr: `Lisons une fonction d'échange AMM simplifiée écrite en Solidity. Les vrais DEX (Uniswap v2/v3) sont plus complexes — avec des frais, plusieurs pools et des vérifications de sécurité — mais ceci capture l'idée centrale : la formule du produit constant.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleAMM {
    uint256 public reserveA; // ex. jeton équivalent SOL
    uint256 public reserveB; // ex. jeton équivalent USDC

    constructor(uint256 initialA, uint256 initialB) {
        reserveA = initialA;
        reserveB = initialB;
    }

    // Retourne la quantité de jeton B reçue pour \`amountIn\` de jeton A
    function getAmountOut(uint256 amountIn) public view returns (uint256) {
        // Formule du produit constant : (reserveA + amountIn) * (reserveB - amountOut) = reserveA * reserveB
        uint256 k = reserveA * reserveB;
        uint256 newReserveA = reserveA + amountIn;
        uint256 newReserveB = k / newReserveA;
        return reserveB - newReserveB;
    }

    function swapAForB(uint256 amountIn) external {
        uint256 amountOut = getAmountOut(amountIn);
        reserveA += amountIn;
        reserveB -= amountOut;
        // Dans un vrai contrat : transférer les jetons ici
    }
}
\`\`\`

### Analyse du code

- **\`reserveA\` et \`reserveB\`** détiennent les deux soldes de jetons de la réserve — comme les 100 SOL et 20 000 USDC de notre exemple précédent.
- **\`getAmountOut\`** est le cœur de l'AMM. Elle calcule \`k = reserveA * reserveB\` (la constante), puis détermine ce que \`reserveB\` devrait devenir pour que \`k\` reste identique après l'ajout de \`amountIn\` à \`reserveA\`. La différence est ce que reçoit le trader.
- **\`swapAForB\`** met à jour les soldes de la réserve après un échange. Une vraie implémentation déplacerait aussi les jetons entre le portefeuille du trader et le contrat, et prélèverait une petite commission qui reste dans la réserve pour les fournisseurs de liquidité.

### Essayez

Avec les valeurs du constructeur \`initialA = 100\` et \`initialB = 20000\` (notre réserve de 100 SOL / 20 000 USDC), suivez \`getAmountOut(10)\` à la main :

1. \`k = 100 * 20000 = 2 000 000\`
2. \`newReserveA = 100 + 10 = 110\`
3. \`newReserveB = 2 000 000 / 110 = 18 181\` (division entière)
4. \`amountOut = 20 000 - 18 181 = 1 819\`

Donc 10 unités du jeton A achètent ~1 819 unités du jeton B — remarquez que c'est *moins* que le prix « naïf » de 2 000 (10 × 200), à cause du slippage. Essayez de calculer \`getAmountOut(50)\` et comparez le prix effectif par jeton — c'est le slippage en action.`,
          videoUrl: null,
          codeLanguage: "solidity",
          codeStarterEn: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleAMM {
    uint256 public reserveA;
    uint256 public reserveB;

    constructor(uint256 initialA, uint256 initialB) {
        reserveA = initialA;
        reserveB = initialB;
    }

    function getAmountOut(uint256 amountIn) public view returns (uint256) {
        // TODO: compute k = reserveA * reserveB
        // TODO: compute newReserveA = reserveA + amountIn
        // TODO: compute newReserveB = k / newReserveA
        // TODO: return reserveB - newReserveB
    }

    function swapAForB(uint256 amountIn) external {
        // TODO: call getAmountOut, then update reserveA and reserveB
    }
}
`,
          codeStarterFr: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleAMM {
    uint256 public reserveA;
    uint256 public reserveB;

    constructor(uint256 initialA, uint256 initialB) {
        reserveA = initialA;
        reserveB = initialB;
    }

    function getAmountOut(uint256 amountIn) public view returns (uint256) {
        // TODO : calculez k = reserveA * reserveB
        // TODO : calculez newReserveA = reserveA + amountIn
        // TODO : calculez newReserveB = k / newReserveA
        // TODO : retournez reserveB - newReserveB
    }

    function swapAForB(uint256 amountIn) external {
        // TODO : appelez getAmountOut, puis mettez à jour reserveA et reserveB
    }
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: DEXs & AMMs",
          titleFr: "Quiz : DEX et AMM",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "Check your understanding of automated market makers, liquidity pools, and slippage.",
          contentFr: "Vérifiez votre compréhension des automated market makers, des pools de liquidité et du slippage.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "In an AMM like the one in this lesson, what determines the price of a trade?",
              questionFr: "Dans un AMM comme celui de cette leçon, qu'est-ce qui déterminé le prix d'un échange ?",
              optionsEn: ["A human market maker sets it manually", "The ratio of the two token reserves in the pool, via the constant product formula", "The exchange's CEO", "The price is always fixed"],
              optionsFr: ["Un teneur de marché humain le fixe manuellement", "Le ratio des deux réserves de jetons dans la pool, via la formule du produit constant", "Le PDG de l'échange", "Le prix est toujours fixe"],
              correctIndex: 1,
              explanationEn: "The constant product formula (x * y = k) automatically adjusts price based on the pool's current token ratio.",
              explanationFr: "La formule du produit constant (x * y = k) ajuste automatiquement le prix selon le ratio actuel des jetons dans la pool.",
            },
            {
              questionEn: "What is 'slippage'?",
              questionFr: "Qu'est-ce que le « slippage » ?",
              optionsEn: ["A transaction fee paid to validators", "The difference between the expected price and the actual price you get, caused by your trade moving the pool's ratio", "A type of stablecoin", "An error in the smart contract"],
              optionsFr: ["Une commission de transaction payée aux validateurs", "La différence entre le prix attendu et le prix obtenu, causée par le fait que votre échange modifie le ratio de la pool", "Un type de stablecoin", "Une erreur dans le contrat intelligent"],
              correctIndex: 1,
              explanationEn: "The larger your trade relative to the pool, the more the ratio shifts, and the worse your effective price becomes.",
              explanationFr: "Plus votre échange est important par rapport à la pool, plus le ratio change, et plus votre prix effectif se dégrade.",
            },
            {
              questionEn: "Who are 'liquidity providers' and what do they earn?",
              questionFr: "Qui sont les « fournisseurs de liquidité » et que gagnent-ils ?",
              optionsEn: ["Validators who earn block rewards", "Users who deposit token pairs into a pool and earn a share of trading fees", "Government regulators who earn taxes", "Developers who earn salaries"],
              optionsFr: ["Des validateurs qui gagnent des récompenses de bloc", "Des utilisateurs qui déposent des paires de jetons dans une pool et gagnent une part des frais de transaction", "Des régulateurs gouvernementaux qui perçoivent des taxes", "Des développeurs qui touchent un salaire"],
              correctIndex: 1,
              explanationEn: "LPs are rewarded proportionally to their share of the pool — similar to a Njangi member earning a return for keeping the group's pool funded.",
              explanationFr: "Les LP sont récompensés proportionnellement à leur part de la pool — comme un membre de Njangi qui obtient un rendement pour avoir alimenté la caisse du groupe.",
            },
          ],
        },
      ],
    },

    // ── Module 3: Lending & Borrowing Protocols ──────────────────────────────
    {
      titleEn: "Lending & Borrowing Protocols",
      titleFr: "Protocoles de prêt et d'emprunt",
      lessons: [
        {
          titleEn: "How Lending Protocols Work",
          titleFr: "Comment fonctionnent les protocoles de prêt",
          durationLabel: "15 min",
          lessonType: "text",
          contentEn: `In a Njangi, members sometimes need cash before their turn for the pot comes around — so some groups let a member borrow against their future payout, often with a small fee. DeFi lending protocols generalize this idea into a global, automated money market.

### Two sides of the market

- **Lenders/Suppliers** deposit tokens (e.g., USDC) into a shared pool and earn interest, paid by borrowers.
- **Borrowers** deposit a different token as **collateral** (e.g., ETH or SOL) and borrow against it — usually *less* than the collateral is worth.

### Why over-collateralization?

Unlike a bank loan, DeFi lending protocols generally don't check your identity, income, or credit score — there's no court to sue you if you disappear. So instead, protocols require **over-collateralization**: to borrow $100 of USDC, you might need to deposit $150 of ETH as collateral. This ratio is called the **Loan-to-Value (LTV) ratio** — here, 100/150 ≈ 67%.

### What happens if the collateral drops in value?

If the value of your collateral falls and your LTV ratio crosses a **liquidation threshold** (say, 80%), anyone can trigger a **liquidation**: your collateral is automatically sold to repay your loan, plus a penalty fee that goes to the liquidator as a reward for keeping the protocol solvent. This all happens via smart contract — instantly, with no phone call, no warning letter, and no human decision involved.

### Interest rates are dynamic

Interest rates in lending protocols usually adjust automatically based on **utilization** — the percentage of the pool's deposits that are currently borrowed:

- **Low utilization** (lots of idle deposits, few borrowers) → low borrow rates, to attract borrowers.
- **High utilization** (most deposits are lent out) → high borrow rates, to attract more lenders and discourage further borrowing.

This is the DeFi equivalent of a Njangi group raising the "borrowing fee" when too many members want to borrow from the pot at once, so the pool doesn't run dry for everyone else.

### Why this matters for Africa

In many African countries, getting a bank loan requires collateral documentation, credit history, and weeks of paperwork — and is often unavailable to informal workers. A DeFi lending protocol, accessed from a smartphone, lets anyone with crypto collateral borrow instantly, 24/7, with transparent and predictable rules written in code.`,
          contentFr: `Dans un Njangi, les membres ont parfois besoin de liquidités avant que leur tour pour recevoir la caisse n'arrive — certains groupes permettent alors à un membre d'emprunter sur son versement futur, souvent avec de petits frais. Les protocoles de prêt DeFi généralisent cette idée en un marché monétaire mondial et automatisé.

### Les deux côtés du marché

- **Prêteurs/fournisseurs** déposent des jetons (ex. USDC) dans une réserve commune et gagnent des intérêts, payés par les emprunteurs.
- **Emprunteurs** déposent un autre jeton en **garantie** (ex. ETH ou SOL) et emprunteurs contre celle-ci — généralement *moins* que la valeur de la garantie.

### Pourquoi la surcollatéralisation ?

Contrairement à un prêt bancaire, les protocoles de prêt DeFi ne vérifient généralement pas votre identité, vos revenus ou votre score de crédit — il n'y a pas de tribunal pour vous poursuivre si vous disparaissez. Les protocoles exigent donc une **surcollatéralisation** : pour emprunter 100 $ d'USDC, vous devrez peut-être déposer 150 $ d'ETH en garantie. Ce ratio s'appelle le **ratio prêt/valeur (LTV)** — ici, 100/150 ≈ 67 %.

### Que se passe-t-il si la garantie perd de la valeur ?

Si la valeur de votre garantie baisse et que votre ratio LTV dépasse un **seuil de liquidation** (disons 80 %), n'importe qui peut déclencher une **liquidation** : votre garantie est automatiquement vendue pour rembourser votre prêt, plus une pénalité versée au liquidateur en récompense pour avoir maintenu la solvabilité du protocole. Tout cela se fait via un contrat intelligent — instantanément, sans appel téléphonique, sans lettre d'avertissement, et sans aucune décision humaine.

### Les taux d'intérêt sont dynamiques

Les taux d'intérêt des protocoles de prêt s'ajustent généralement automatiquement en fonction du **taux d'utilisation** — le pourcentage des dépôts de la réserve actuellement emprunté :

- **Faible utilisation** (beaucoup de dépôts inactifs, peu d'emprunteurs) → taux d'emprunt bas, pour attirer les emprunteurs.
- **Forte utilisation** (la plupart des dépôts sont prêtés) → taux d'emprunt élevés, pour attirer plus de prêteurs et décourager de nouveaux emprunts.

C'est l'équivalent DeFi d'un groupe Njangi qui augmente les « frais d'emprunt » lorsque trop de membres veulent emprunter sur la caisse à la fois, pour que la réserve ne s'épuise pas pour les autres.

### Pourquoi c'est important pour l'Afrique

Dans de nombreux pays africains, obtenir un prêt bancaire nécessite des documents de garantie, un historique de crédit et des semaines de démarches — et reste souvent inaccessible aux travailleurs informels. Un protocole de prêt DeFi, accessible depuis un smartphone, permet à toute personne disposant d'une garantie crypto d'emprunter instantanément, 24h/24 et 7j/7, avec des règles transparentes et prévisibles écrites dans le code.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Reading a Solidity Lending Pool Contract",
          titleFr: "Lire un contrat Solidity de pool de prêt",
          durationLabel: "22 min",
          lessonType: "code",
          contentEn: `Here's a simplified lending pool contract. It's intentionally minimal — a real protocol (Aave, Compound) adds interest accrual, price oracles, and liquidations — but this shows the core deposit/borrow/collateral mechanics.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleLendingPool {
    mapping(address => uint256) public deposits;   // USDC supplied by lenders
    mapping(address => uint256) public collateral; // ETH deposited by borrowers
    mapping(address => uint256) public borrowed;    // USDC borrowed

    uint256 public constant MAX_LTV_PERCENT = 66; // borrow up to 66% of collateral value
    uint256 public ethPriceInUsdc = 3000; // simplified fixed price oracle

    function deposit(uint256 amount) external {
        deposits[msg.sender] += amount;
        // In a real contract: transferFrom(msg.sender, address(this), amount)
    }

    function depositCollateral(uint256 ethAmount) external {
        collateral[msg.sender] += ethAmount;
    }

    function borrow(uint256 usdcAmount) external {
        uint256 collateralValueUsdc = collateral[msg.sender] * ethPriceInUsdc;
        uint256 maxBorrow = (collateralValueUsdc * MAX_LTV_PERCENT) / 100;

        require(borrowed[msg.sender] + usdcAmount <= maxBorrow, "Exceeds max LTV");

        borrowed[msg.sender] += usdcAmount;
        // In a real contract: transfer(msg.sender, usdcAmount)
    }

    function repay(uint256 usdcAmount) external {
        require(usdcAmount <= borrowed[msg.sender], "Repaying too much");
        borrowed[msg.sender] -= usdcAmount;
    }
}
\`\`\`

### Walking through the code

- **\`deposits\`, \`collateral\`, and \`borrowed\`** are mappings — each address gets its own balance for each role, just like each Njangi member has their own contribution record.
- **\`MAX_LTV_PERCENT = 66\`** enforces over-collateralization: you can never borrow more than 66% of your collateral's USD value.
- **\`borrow\`** computes \`collateralValueUsdc\` using the (simplified, fixed) price oracle \`ethPriceInUsdc\`, then checks with \`require\` that the new total borrowed amount stays under \`maxBorrow\`. If it doesn't, the whole transaction reverts — no partial borrow happens.
- **\`repay\`** simply reduces the borrower's debt. A real protocol would also calculate accrued interest here.

### What's missing (and why it matters)

- **Price oracle risk**: \`ethPriceInUsdc\` is hardcoded here. Real protocols use decentralized price feeds (like Chainlink or Pyth) — if a price feed is wrong or manipulated, borrowers could be unfairly liquidated, or the protocol could become insolvent.
- **Liquidations**: there's no liquidation function here. In production, if \`collateral value * MAX_LTV_PERCENT / 100 < borrowed\`, anyone should be able to call a \`liquidate\` function.
- **Interest**: real protocols increase \`borrowed[msg.sender]\` over time based on a per-second interest rate.

### Try it

Trace through this scenario: Alice deposits 1 ETH as collateral (\`ethPriceInUsdc = 3000\`, so her collateral is worth $3,000). What's the maximum USDC she can borrow? *(Hint: 3000 × 66 / 100)*`,
          contentFr: `Voici un contrat de pool de prêt simplifié. Il est volontairement minimal — un vrai protocole (Aave, Compound) ajoute l'accumulation d'intérêts, des oracles de prix et des liquidations — mais cela montre les mécanismes de base du dépôt/emprunt/garantie.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleLendingPool {
    mapping(address => uint256) public deposits;   // USDC fourni par les prêteurs
    mapping(address => uint256) public collateral; // ETH déposé par les emprunteurs
    mapping(address => uint256) public borrowed;    // USDC emprunté

    uint256 public constant MAX_LTV_PERCENT = 66; // emprunter jusqu'à 66% de la valeur de la garantie
    uint256 public ethPriceInUsdc = 3000; // oracle de prix simplifié et fixe

    function deposit(uint256 amount) external {
        deposits[msg.sender] += amount;
        // Dans un vrai contrat : transferFrom(msg.sender, address(this), amount)
    }

    function depositCollateral(uint256 ethAmount) external {
        collateral[msg.sender] += ethAmount;
    }

    function borrow(uint256 usdcAmount) external {
        uint256 collateralValueUsdc = collateral[msg.sender] * ethPriceInUsdc;
        uint256 maxBorrow = (collateralValueUsdc * MAX_LTV_PERCENT) / 100;

        require(borrowed[msg.sender] + usdcAmount <= maxBorrow, "Exceeds max LTV");

        borrowed[msg.sender] += usdcAmount;
        // Dans un vrai contrat : transfer(msg.sender, usdcAmount)
    }

    function repay(uint256 usdcAmount) external {
        require(usdcAmount <= borrowed[msg.sender], "Repaying too much");
        borrowed[msg.sender] -= usdcAmount;
    }
}
\`\`\`

### Analyse du code

- **\`deposits\`, \`collateral\` et \`borrowed\`** sont des mappings — chaque adresse possède son propre solde pour chaque rôle, tout comme chaque membre d'un Njangi a son propre relevé de contributions.
- **\`MAX_LTV_PERCENT = 66\`** impose la surcollatéralisation : vous ne pouvez jamais emprunter plus de 66 % de la valeur en USD de votre garantie.
- **\`borrow\`** calcule \`collateralValueUsdc\` à l'aide de l'oracle de prix (simplifié et fixe) \`ethPriceInUsdc\`, puis vérifie avec \`require\` que le nouveau montant total emprunté reste sous \`maxBorrow\`. Si ce n'est pas le cas, toute la transaction est annulée — aucun emprunt partiel n'a lieu.
- **\`repay\`** réduit simplement la dette de l'emprunteur. Un vrai protocole calculerait aussi les intérêts accumulés ici.

### Ce qui manque (et pourquoi c'est important)

- **Risque d'oracle de prix** : \`ethPriceInUsdc\` est codé en dur ici. Les vrais protocoles utilisent des flux de prix décentralisés (comme Chainlink ou Pyth) — si un flux de prix est incorrect ou manipulé, des emprunteurs pourraient être injustement liquidés, ou le protocole pourrait devenir insolvable.
- **Liquidations** : il n'y a pas de fonction de liquidation ici. En production, si \`valeur_garantie * MAX_LTV_PERCENT / 100 < borrowed\`, n'importe qui devrait pouvoir appeler une fonction \`liquidate\`.
- **Intérêts** : les vrais protocoles augmentent \`borrowed[msg.sender]\` au fil du temps selon un taux d'intérêt par seconde.

### Essayez

Suivez ce scénario : Alice dépose 1 ETH en garantie (\`ethPriceInUsdc = 3000\`, donc sa garantie vaut 3 000 $). Quel est le montant maximum d'USDC qu'elle peut emprunter ? *(Indice : 3000 × 66 / 100)*`,
          videoUrl: null,
          codeLanguage: "solidity",
          codeStarterEn: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleLendingPool {
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public collateral;
    mapping(address => uint256) public borrowed;

    uint256 public constant MAX_LTV_PERCENT = 66;
    uint256 public ethPriceInUsdc = 3000;

    function deposit(uint256 amount) external {
        deposits[msg.sender] += amount;
    }

    function depositCollateral(uint256 ethAmount) external {
        collateral[msg.sender] += ethAmount;
    }

    function borrow(uint256 usdcAmount) external {
        // TODO: compute collateralValueUsdc = collateral[msg.sender] * ethPriceInUsdc
        // TODO: compute maxBorrow = collateralValueUsdc * MAX_LTV_PERCENT / 100
        // TODO: require(borrowed[msg.sender] + usdcAmount <= maxBorrow, "Exceeds max LTV")
        // TODO: borrowed[msg.sender] += usdcAmount
    }

    function repay(uint256 usdcAmount) external {
        // TODO: require usdcAmount <= borrowed[msg.sender]
        // TODO: borrowed[msg.sender] -= usdcAmount
    }
}
`,
          codeStarterFr: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleLendingPool {
    mapping(address => uint256) public deposits;
    mapping(address => uint256) public collateral;
    mapping(address => uint256) public borrowed;

    uint256 public constant MAX_LTV_PERCENT = 66;
    uint256 public ethPriceInUsdc = 3000;

    function deposit(uint256 amount) external {
        deposits[msg.sender] += amount;
    }

    function depositCollateral(uint256 ethAmount) external {
        collateral[msg.sender] += ethAmount;
    }

    function borrow(uint256 usdcAmount) external {
        // TODO : calculez collateralValueUsdc = collateral[msg.sender] * ethPriceInUsdc
        // TODO : calculez maxBorrow = collateralValueUsdc * MAX_LTV_PERCENT / 100
        // TODO : require(borrowed[msg.sender] + usdcAmount <= maxBorrow, "Exceeds max LTV")
        // TODO : borrowed[msg.sender] += usdcAmount
    }

    function repay(uint256 usdcAmount) external {
        // TODO : require usdcAmount <= borrowed[msg.sender]
        // TODO : borrowed[msg.sender] -= usdcAmount
    }
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: Lending & Borrowing",
          titleFr: "Quiz : prêt et emprunt",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "Check your understanding of over-collateralization, liquidations, and dynamic interest rates.",
          contentFr: "Vérifiez votre compréhension de la surcollatéralisation, des liquidations et des taux d'intérêt dynamiques.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "Why do DeFi lending protocols require over-collateralization?",
              questionFr: "Pourquoi les protocoles de prêt DeFi exigent-ils une surcollatéralisation ?",
              optionsEn: [
                "To make borrowing more expensive for fun",
                "Because there's no credit check or legal recourse if a borrower disappears, so the loan must be backed by more value than it's worth",
                "Because smart contracts can't hold multiple tokens",
                "To comply with KYC laws",
              ],
              optionsFr: [
                "Pour rendre l'emprunt plus cher sans raison",
                "Parce qu'il n'y a pas de vérification de crédit ni de recours légal si un emprunteur disparaît, donc le prêt doit être garanti par plus de valeur qu'il n'en vaut",
                "Parce que les contrats intelligents ne peuvent pas détenir plusieurs jetons",
                "Pour se conformer aux lois KYC",
              ],
              correctIndex: 1,
              explanationEn: "Over-collateralization protects lenders since there's no identity or legal system backing the loan.",
              explanationFr: "La surcollatéralisation protège les prêteurs puisqu'aucun système d'identité ou légal ne garantit le prêt.",
            },
            {
              questionEn: "What happens when a borrower's collateral value falls below the liquidation threshold?",
              questionFr: "Que se passe-t-il lorsque la valeur de la garantie d'un emprunteur tombe sous le seuil de liquidation ?",
              optionsEn: [
                "Nothing, the loan continues as normal",
                "Anyone can trigger a liquidation, automatically selling the collateral to repay the loan plus a penalty",
                "The borrower goes to jail",
                "The protocol pauses forever",
              ],
              optionsFr: [
                "Rien, le prêt continue normalement",
                "N'importe qui peut déclencher une liquidation, vendant automatiquement la garantie pour rembourser le prêt plus une pénalité",
                "L'emprunteur va en prison",
                "Le protocole s'arrête définitivement",
              ],
              correctIndex: 1,
              explanationEn: "Liquidation is automatic and permissionless — it's an incentive mechanism, not a punishment by a person.",
              explanationFr: "La liquidation est automatique et sans permission — c'est un mécanisme d'incitation, pas une punition décidée par une personne.",
            },
            {
              questionEn: "How do interest rates typically respond to high pool utilization?",
              questionFr: "Comment les taux d'intérêt réagissent-ils généralement à une forte utilisation de la pool ?",
              optionsEn: [
                "They go to zero",
                "They increase, to attract more lenders and discourage further borrowing",
                "They stay exactly the same always",
                "They become negative",
              ],
              optionsFr: [
                "Ils tombent à zéro",
                "Ils augmentent, pour attirer plus de prêteurs et décourager de nouveaux emprunts",
                "Ils restent toujours exactement identiques",
                "Ils deviennent négatifs",
              ],
              correctIndex: 1,
              explanationEn: "Higher rates when utilization is high balance supply and demand, similar to a Njangi raising borrowing fees when the pot is in high demand.",
              explanationFr: "Des taux plus élevés en cas de forte utilisation équilibrent l'offre et la demande, comme un Njangi qui augmente ses frais d'emprunt quand la caisse est très demandée.",
            },
          ],
        },
      ],
    },

    // ── Module 4: Yield, Staking & Risk ──────────────────────────────────────
    {
      titleEn: "Yield, Staking & Risk",
      titleFr: "Rendement, staking et risques",
      lessons: [
        {
          titleEn: "Yield Farming & Staking",
          titleFr: "Yield farming et staking",
          durationLabel: "15 min",
          lessonType: "text",
          contentEn: `So far you've seen lending (earn interest by supplying tokens) and AMMs (earn fees by providing liquidity). **Yield farming** and **staking** are two more ways tokens can earn a return in DeFi — and they come with their own unique risks.

### Staking

**Staking** means locking up tokens to support a blockchain's operations — usually to help validate transactions (similar to what Solana validators do) — in exchange for rewards paid in the same token. If you hold SOL, you can stake it with a validator and earn ~5-7% annually, paid in more SOL. Your tokens aren't "spent" — they're locked, and you can usually "unstake" after a cooldown period (a few days).

Think of staking like a fixed-term Njangi: you commit your contribution for a set period, and in exchange, you receive a guaranteed bonus when the period ends — except here, the "bonus" comes from the network's own token issuance, not from other members' contributions.

### Yield farming

**Yield farming** means actively moving your tokens between different DeFi protocols (lending pools, liquidity pools, etc.) to chase the highest available return — sometimes called "APY" (Annual Percentage Yield). Protocols often offer extra reward tokens to attract liquidity, especially when they're new and need to bootstrap activity.

### Impermanent loss

If you provide liquidity to an AMM pool (Module 2) with two volatile tokens, and the *price ratio* between them changes significantly, you can end up with less total value than if you'd simply held both tokens separately — even though you earned trading fees the whole time. This is called **impermanent loss**, and it's one of the most misunderstood risks in DeFi.

**Why it happens**: the AMM automatically rebalances your share of the pool as the price ratio shifts — selling the token that's going up and buying the token that's going down, relative to holding. The fees you earn may or may not offset this, depending on how much trading volume the pool sees.

### "If it's too good to be true..."

Extremely high advertised APYs (hundreds or thousands of percent) are usually a red flag. They're often funded by newly-minted reward tokens whose price will crash as more people sell them — meaning your "yield" is paid in a token that's rapidly losing value. Always ask: *where does this yield actually come from?*

### Why this matters for Africa

Yield and staking can be powerful tools for growing savings — but the same instinct that makes a high-interest Njangi or "fast money" scheme attractive can also lead people into DeFi protocols that promise unsustainable returns. The skill in this lesson — asking "where does the yield come from?" — applies just as much to a WhatsApp investment group as to a DeFi protocol.`,
          contentFr: `Jusqu'ici, vous avez vu le prêt (gagner des intérêts en fournissant des jetons) et les AMM (gagner des frais en fournissant de la liquidité). Le **yield farming** et le **staking** sont deux autres façons pour les jetons de générer un rendement dans la DeFi — et ils comportent leurs propres risques.

### Le staking

Le **staking** consiste à verrouiller des jetons pour soutenir le fonctionnement d'une blockchain — généralement pour aider à valider les transactions (comme le font les validateurs Solana) — en échange de récompenses payées dans le même jeton. Si vous détenez du SOL, vous pouvez le staker auprès d'un validateur et gagner ~5-7 % par an, payés en SOL supplémentaire. Vos jetons ne sont pas « dépensés » — ils sont verrouillés, et vous pouvez généralement les « déstaker » après une période de carence (quelques jours).

Pensez au staking comme à un Njangi à durée fixe : vous engagez votre contribution pour une période déterminée, et en échange, vous recevez un bonus garanti à la fin de la période — sauf qu'ici, le « bonus » provient de l'émission propre du réseau, et non des contributions des autres membres.

### Le yield farming

Le **yield farming** consiste à déplacer activement vos jetons entre différents protocoles DeFi (pools de prêt, pools de liquidité, etc.) pour rechercher le meilleur rendement disponible — parfois appelé « APY » (rendement annuel en pourcentage). Les protocoles offrent souvent des jetons de récompense supplémentaires pour attirer de la liquidité, surtout lorsqu'ils sont nouveaux et doivent amorcer leur activité.

### La perte impermanente

Si vous fournissez de la liquidité à une pool AMM (Module 2) avec deux jetons volatils, et que le *ratio de prix* entre eux change significativement, vous pourriez vous retrouver avec moins de valeur totale que si vous aviez simplement conservé les deux jetons séparément — même si vous avez gagné des frais de transaction tout ce temps. C'est ce qu'on appelle la **perte impermanente**, l'un des risques les plus mal compris de la DeFi.

**Pourquoi cela se produit** : l'AMM rééquilibre automatiquement votre part de la pool à mesure que le ratio de prix évolue — vendant le jeton qui monte et achetant celui qui baisse, par rapport à une simple détention. Les frais que vous gagnez peuvent ou non compenser cela, selon le volume d'échanges de la pool.

### « Si c'est trop beau pour être vrai... »

Des APY annoncés extrêmement élevés (des centaines ou des milliers de pourcents) sont généralement un signal d'alarme. Ils sont souvent financés par des jetons de récompense nouvellement émis dont le prix s'effondrera à mesure que davantage de personnes les vendront — ce qui signifie que votre « rendement » est payé dans un jeton qui perd rapidement de la valeur. Demandez-vous toujours : *d'où vient réellement ce rendement ?*

### Pourquoi c'est important pour l'Afrique

Le rendement et le staking peuvent être de puissants outils pour faire croître l'épargne — mais le même instinct qui rend attrayant un Njangi à intérêt élevé ou un système d'« argent rapide » peut aussi attirer des personnes vers des protocoles DeFi promettant des rendements insoutenables. La compétence acquise ici — demander « d'où vient ce rendement ? » — s'applique tout autant à un groupe d'investissement WhatsApp qu'à un protocole DeFi.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "A Solidity Staking Contract",
          titleFr: "Un contrat Solidity de staking",
          durationLabel: "20 min",
          lessonType: "code",
          contentEn: `Here's a simplified staking contract — lock tokens, earn rewards proportional to time staked.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStaking {
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakeStartTime;

    uint256 public constant REWARD_RATE_PER_SECOND = 1e15; // reward units per token per second (scaled)

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");

        // If already staking, settle previous rewards first (omitted here for simplicity)
        stakedAmount[msg.sender] += amount;
        stakeStartTime[msg.sender] = block.timestamp;
        // In a real contract: transferFrom(msg.sender, address(this), amount)
    }

    function calculateReward(address user) public view returns (uint256) {
        if (stakedAmount[user] == 0) return 0;

        uint256 timeStaked = block.timestamp - stakeStartTime[user];
        return (stakedAmount[user] * timeStaked * REWARD_RATE_PER_SECOND) / 1e18;
    }

    function unstake() external {
        uint256 reward = calculateReward(msg.sender);
        uint256 amount = stakedAmount[msg.sender];

        stakedAmount[msg.sender] = 0;
        stakeStartTime[msg.sender] = 0;

        // In a real contract: transfer(msg.sender, amount + reward)
    }
}
\`\`\`

### Walking through the code

- **\`stakedAmount\` and \`stakeStartTime\`** track how much each address staked and when — this is how the contract knows how long to "count" for rewards.
- **\`calculateReward\`** multiplies the staked amount by the time elapsed and a fixed rate, then scales down by \`1e18\` (this kind of fixed-point math is common in Solidity since it has no floating-point numbers).
- **\`unstake\`** reads the current reward, resets the user's staked balance to zero, and (in a real contract) sends back the original stake *plus* the reward.

### A subtle bug to notice

This contract has a known weakness: if a user calls \`stake\` again while already staking, \`stakeStartTime\` is overwritten — meaning any rewards accrued *before* the second \`stake\` call are silently lost, because \`calculateReward\` only looks at time since the *most recent* \`stakeStartTime\`. A correct implementation would calculate and "bank" pending rewards into a separate balance *before* updating \`stakeStartTime\`.

### Try it

Suppose \`REWARD_RATE_PER_SECOND = 1e15\`, a user stakes \`100 * 1e18\` tokens (100 tokens, in 18-decimal units), and 1,000 seconds pass. What does \`calculateReward\` return? *(Hint: (100e18 * 1000 * 1e15) / 1e18)*`,
          contentFr: `Voici un contrat de staking simplifié — verrouillez des jetons, gagnez des récompenses proportionnelles au temps staké.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStaking {
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakeStartTime;

    uint256 public constant REWARD_RATE_PER_SECOND = 1e15; // unités de récompense par jeton par seconde (mise à l'échelle)

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");

        // Si déjà en staking, régler les récompenses précédentes d'abord (omis ici par simplicité)
        stakedAmount[msg.sender] += amount;
        stakeStartTime[msg.sender] = block.timestamp;
        // Dans un vrai contrat : transferFrom(msg.sender, address(this), amount)
    }

    function calculateReward(address user) public view returns (uint256) {
        if (stakedAmount[user] == 0) return 0;

        uint256 timeStaked = block.timestamp - stakeStartTime[user];
        return (stakedAmount[user] * timeStaked * REWARD_RATE_PER_SECOND) / 1e18;
    }

    function unstake() external {
        uint256 reward = calculateReward(msg.sender);
        uint256 amount = stakedAmount[msg.sender];

        stakedAmount[msg.sender] = 0;
        stakeStartTime[msg.sender] = 0;

        // Dans un vrai contrat : transfer(msg.sender, amount + reward)
    }
}
\`\`\`

### Analyse du code

- **\`stakedAmount\` et \`stakeStartTime\`** suivent combien chaque adresse a staké et depuis quand — c'est ainsi que le contrat sait combien de temps « compter » pour les récompenses.
- **\`calculateReward\`** multiplie le montant staké par le temps écoulé et un taux fixe, puis divise par \`1e18\` (ce type de calcul en virgule fixe est courant en Solidity, qui n'a pas de nombres à virgule flottante).
- **\`unstake\`** lit la récompense actuelle, remet à zéro le solde staké de l'utilisateur, et (dans un vrai contrat) renvoie la mise initiale *plus* la récompense.

### Un bug subtil à remarquer

Ce contrat a une faiblesse connue : si un utilisateur appelle à nouveau \`stake\` alors qu'il est déjà en staking, \`stakeStartTime\` est écrasé — ce qui signifie que toutes les récompenses accumulées *avant* le second appel à \`stake\` sont silencieusement perdues, car \`calculateReward\` ne regarde que le temps depuis le \`stakeStartTime\` *le plus récent*. Une implémentation correcte calculerait et « mettrait en banque » les récompenses en attente dans un solde séparé *avant* de mettre à jour \`stakeStartTime\`.

### Essayez

Supposons \`REWARD_RATE_PER_SECOND = 1e15\`, un utilisateur stake \`100 * 1e18\` jetons (100 jetons, en unités à 18 décimales), et 1 000 secondes s'écoulent. Que retourne \`calculateReward\` ? *(Indice : (100e18 * 1000 * 1e15) / 1e18)*`,
          videoUrl: null,
          codeLanguage: "solidity",
          codeStarterEn: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStaking {
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakeStartTime;

    uint256 public constant REWARD_RATE_PER_SECOND = 1e15;

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");
        // TODO: update stakedAmount[msg.sender] and stakeStartTime[msg.sender]
    }

    function calculateReward(address user) public view returns (uint256) {
        // TODO: if stakedAmount[user] == 0, return 0
        // TODO: compute timeStaked = block.timestamp - stakeStartTime[user]
        // TODO: return (stakedAmount[user] * timeStaked * REWARD_RATE_PER_SECOND) / 1e18
    }

    function unstake() external {
        // TODO: read reward via calculateReward
        // TODO: reset stakedAmount and stakeStartTime to 0
    }
}
`,
          codeStarterFr: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStaking {
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakeStartTime;

    uint256 public constant REWARD_RATE_PER_SECOND = 1e15;

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0");
        // TODO : mettez à jour stakedAmount[msg.sender] et stakeStartTime[msg.sender]
    }

    function calculateReward(address user) public view returns (uint256) {
        // TODO : si stakedAmount[user] == 0, retournez 0
        // TODO : calculez timeStaked = block.timestamp - stakeStartTime[user]
        // TODO : retournez (stakedAmount[user] * timeStaked * REWARD_RATE_PER_SECOND) / 1e18
    }

    function unstake() external {
        // TODO : lisez la récompense via calculateReward
        // TODO : remettez stakedAmount et stakeStartTime à 0
    }
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Quiz: Yield, Staking & Risk",
          titleFr: "Quiz : rendement, staking et risques",
          durationLabel: "6 min",
          lessonType: "quiz",
          contentEn: "Check your understanding of staking, impermanent loss, and how to spot unsustainable yield.",
          contentFr: "Vérifiez votre compréhension du staking, de la perte impermanente, et comment repérer un rendement insoutenable.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "What is 'impermanent loss'?",
              questionFr: "Qu'est-ce que la « perte impermanente » ?",
              optionsEn: [
                "A permanent loss of all funds",
                "A reduction in total value compared to simply holding two tokens, caused by an AMM pool rebalancing as prices shift",
                "A tax on staking rewards",
                "A bug that only affects Solana",
              ],
              optionsFr: [
                "Une perte permanente de tous les fonds",
                "Une réduction de la valeur totale par rapport à la simple détention de deux jetons, causée par le rééquilibrage d'une pool AMM lorsque les prix évoluent",
                "Une taxe sur les récompenses de staking",
                "Un bug qui n'affecte que Solana",
              ],
              correctIndex: 1,
              explanationEn: "Impermanent loss happens because the AMM automatically sells the rising token and buys the falling one as it maintains its price formula.",
              explanationFr: "La perte impermanente survient parce que l'AMM vend automatiquement le jeton qui monte et achète celui qui baisse pour maintenir sa formule de prix.",
            },
            {
              questionEn: "In the staking contract example, what bug exists if a user calls stake() again while already staking?",
              questionFr: "Dans l'exemple de contrat de staking, quel bug existe si un utilisateur appelle à nouveau stake() alors qu'il est déjà en staking ?",
              optionsEn: [
                "The contract becomes permanently locked",
                "Previously accrued rewards are lost because stakeStartTime is overwritten without banking pending rewards",
                "The user loses their original stake",
                "There is no bug",
              ],
              optionsFr: [
                "Le contrat devient définitivement verrouillé",
                "Les récompenses précédemment accumulées sont perdues car stakeStartTime est écrasé sans mettre en banque les récompenses en attente",
                "L'utilisateur perd sa mise initiale",
                "Il n'y a aucun bug",
              ],
              correctIndex: 1,
              explanationEn: "calculateReward only counts time since the most recent stakeStartTime, so overwriting it silently discards prior accrued rewards.",
              explanationFr: "calculateReward ne compte le temps que depuis le stakeStartTime le plus récent, donc l'écraser fait silencieusement perdre les récompenses déjà accumulées.",
            },
            {
              questionEn: "What's a red flag for an unsustainable yield offer?",
              questionFr: "Quel est un signal d'alarme pour une offre de rendement insoutenable ?",
              optionsEn: [
                "A modest, clearly-explained interest rate",
                "An extremely high advertised APY funded by newly-minted reward tokens",
                "A protocol that's been audited",
                "A stablecoin-only pool",
              ],
              optionsFr: [
                "Un taux d'intérêt modeste et clairement expliqué",
                "Un APY annoncé extrêmement élevé, financé par des jetons de récompense nouvellement émis",
                "Un protocole qui a été audité",
                "Une pool composée uniquement de stablecoins",
              ],
              correctIndex: 1,
              explanationEn: "If the 'yield' comes from inflationary token emissions rather than real revenue, the token's price tends to collapse as recipients sell.",
              explanationFr: "Si le « rendement » provient d'émissions inflationnistes de jetons plutôt que d'un revenu réel, le prix du jeton a tendance à s'effondrer lorsque les bénéficiaires le vendent.",
            },
          ],
        },
      ],
    },

    // ── Module 5: Building a Group Savings Pool (DeFi Njangi) ────────────────
    {
      titleEn: "Building a Group Savings Pool (DeFi Njangi)",
      titleFr: "Construire une caisse d'épargne de groupe (Njangi DeFi)",
      lessons: [
        {
          titleEn: "Designing a DeFi Njangi",
          titleFr: "Concevoir un Njangi DeFi",
          durationLabel: "12 min",
          lessonType: "text",
          contentEn: `You've now seen DEXs, lending, staking, and yield. Let's combine these ideas into something deeply familiar: a DeFi version of a Njangi savings circle — a **group savings pool** where members contribute on a schedule and receive payouts in rotation, but everything is enforced by a smart contract instead of a human treasurer.

### Core design questions

Before writing any code, a good DeFi designer asks the same questions a real Njangi group would ask when setting up their rules:

1. **Who can join?** Anyone with a wallet, or only invited addresses? (A real Njangi often only accepts people the group trusts.)
2. **What's the contribution amount and schedule?** Fixed amount, fixed interval (e.g., every 30 days)?
3. **What's the payout order?** Fixed rotation decided at signup? Random? First-come-first-served?
4. **What happens if someone misses a contribution?** Are they removed? Penalized? Does the group continue without them?
5. **What token is used?** A stablecoin (USDC) avoids the complexity of price volatility affecting contribution "fairness."
6. **Who can trigger a payout?** Anyone, once conditions are met (e.g., all members have contributed for the round)? Or does it require a specific call?

### Mapping rules to code

| Njangi rule | Smart contract mechanism |
| --- | --- |
| "Members contribute monthly" | A \`contribute()\` function, callable once per round per member, checked against \`block.timestamp\` |
| "Each member gets a turn" | An array of member addresses + a \`currentRound\` index |
| "Everyone must pay before payout" | A \`require()\` check that counts contributions for the round before allowing \`payout()\` |
| "No one can take the pot early" | The pot is held *by the contract itself* — no individual has withdrawal rights outside \`payout()\` |

### A key safeguard: the contract holds the funds

In a traditional Njangi, the treasurer holds the cash — and trust in that person is the system's weak point. In a DeFi Njangi, **the smart contract's address holds the funds**. No individual, including the group's creator, can withdraw funds except through the rules written into \`contribute()\` and \`payout()\`. This is the same idea as the Solana program account holding lamports that you built in the Njangi-on-Solana course — but here we're sketching the same logic in Solidity.

### What we'll build next

In the next lesson, you'll read a simplified Solidity version of this group savings pool — covering joining, contributing, and triggering a payout to the current round's recipient.`,
          contentFr: `Vous avez maintenant vu les DEX, le prêt, le staking et le rendement. Combinons ces idées dans quelque chose de profondément familier : une version DeFi d'un cercle d'épargne Njangi — une **caisse d'épargne de groupe** où les membres contribuent selon un calendrier et reçoivent des versements à tour de rôle, mais tout est appliqué par un contrat intelligent plutôt que par un trésorier humain.

### Questions de conception fondamentales

Avant d'écrire le moindre code, un bon concepteur DeFi se pose les mêmes questions qu'un vrai groupe Njangi se poserait en établissant ses règles :

1. **Qui peut rejoindre ?** N'importe qui avec un portefeuille, ou seulement des adresses invitées ? (Un vrai Njangi n'accepte souvent que des personnes de confiance du groupe.)
2. **Quel est le montant et le calendrier des contributions ?** Montant fixe, intervalle fixe (ex. tous les 30 jours) ?
3. **Quel est l'ordre des versements ?** Rotation fixe décidée à l'inscription ? Aléatoire ? Premier arrivé, premier servi ?
4. **Que se passe-t-il si quelqu'un manque une contribution ?** Est-il exclu ? Pénalisé ? Le groupe continue-t-il sans lui ?
5. **Quel jeton est utilisé ?** Un stablecoin (USDC) évite la complexité de la volatilité des prix affectant l'équité des contributions.
6. **Qui peut déclencher un versement ?** N'importe qui, une fois les conditions remplies (ex. tous les membres ont contribué pour le tour) ? Ou cela nécessite-t-il un appel spécifique ?

### Traduire les règles en code

| Règle Njangi | Mécanisme du contrat intelligent |
| --- | --- |
| « Les membres contribuent mensuellement » | Une fonction \`contribute()\`, appelable une fois par tour par membre, vérifiée par rapport à \`block.timestamp\` |
| « Chaque membre a son tour » | Un tableau d'adresses de membres + un index \`currentRound\` |
| « Tout le monde doit payer avant le versement » | Une vérification \`require()\` qui compte les contributions du tour avant d'autoriser \`payout()\` |
| « Personne ne peut prendre la caisse tôt » | La caisse est détenue *par le contrat lui-même* — aucun individu n'a de droit de retrait hors de \`payout()\` |

### Un garde-fou clé : le contrat détient les fonds

Dans un Njangi traditionnel, le trésorier détient les espèces — et la confiance envers cette personne est le point faible du système. Dans un Njangi DeFi, **l'adresse du contrat intelligent détient les fonds**. Aucun individu, y compris le créateur du groupe, ne peut retirer des fonds sauf via les règles écrites dans \`contribute()\` et \`payout()\`. C'est la même idée que le compte de programme Solana détenant des lamports que vous avez construit dans le cours Njangi sur Solana — mais ici nous esquissons la même logique en Solidity.

### Ce que nous allons construire ensuite

Dans la prochaine leçon, vous lirez une version Solidity simplifiée de cette caisse d'épargne de groupe — couvrant l'adhésion, la contribution, et le déclenchement d'un versement vers le bénéficiaire du tour actuel.`,
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [],
        },
        {
          titleEn: "Solidity: Group Savings Pool Contract",
          titleFr: "Solidity : contrat de caisse d'épargne de groupe",
          durationLabel: "25 min",
          lessonType: "code",
          contentEn: `Here's a simplified group savings pool contract — the Solidity sibling of the Anchor program you built in the Njangi-on-Solana course.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GroupSavingsPool {
    address[] public members;
    uint256 public contributionAmount;
    uint256 public currentRound;
    mapping(uint256 => mapping(address => bool)) public hasContributed; // round => member => paid?

    constructor(uint256 _contributionAmount) {
        contributionAmount = _contributionAmount;
        members.push(msg.sender); // creator is the first member
    }

    function join() external {
        for (uint256 i = 0; i < members.length; i++) {
            require(members[i] != msg.sender, "Already a member");
        }
        members.push(msg.sender);
    }

    function contribute() external payable {
        require(msg.value == contributionAmount, "Incorrect contribution amount");
        require(!hasContributed[currentRound][msg.sender], "Already contributed this round");

        hasContributed[currentRound][msg.sender] = true;
    }

    function allContributed() public view returns (bool) {
        for (uint256 i = 0; i < members.length; i++) {
            if (!hasContributed[currentRound][members[i]]) {
                return false;
            }
        }
        return true;
    }

    function payout() external {
        require(allContributed(), "Not everyone has contributed yet");

        address recipient = members[currentRound % members.length];
        uint256 amount = contributionAmount * members.length;

        currentRound += 1;

        (bool sent, ) = recipient.call{value: amount}("");
        require(sent, "Payout failed");
    }
}
\`\`\`

### Walking through the code

- **\`members\`** is the rotation list — like the Solana program's \`members: Vec<Pubkey>\`.
- **\`contribute()\` is \`payable\`** — this Solidity keyword lets the function receive ETH directly as part of the transaction (\`msg.value\`). The contract's own balance grows automatically; no separate "vault account" is needed like in the Solana version, because every contract address can hold ETH.
- **\`hasContributed\`** is a *nested mapping*: round number → member address → paid this round? This prevents double-contributions in the same round, just like the Anchor program's per-round tracking.
- **\`allContributed()\`** loops through all members to check the round is complete — the same logic as the Solana program's contribution check, just written with a Solidity \`for\` loop instead of Rust's iterator methods.
- **\`payout()\`** picks the recipient using \`currentRound % members.length\` — identical rotation logic to the Anchor program — then sends the contract's accumulated ETH using \`.call{value: amount}("")\`, the recommended way to send ETH in modern Solidity (safer than \`.transfer()\` for compatibility with contract-based wallets).

### Comparing to Anchor/Solana

| Concept | Solana/Anchor | Solidity/EVM |
| --- | --- | --- |
| Group state | A \`Group\` account (PDA) | Contract storage variables |
| Holding funds | A separate vault PDA, owned by the program | The contract's own address (it can hold ETH directly) |
| Sending funds out | \`try_borrow_mut_lamports()\` on the vault | \`recipient.call{value: amount}("")\` |
| Per-round tracking | A field/array inside the \`Group\` account | A nested \`mapping\` |

The *logic* — rotation, contribution checks, contract-controlled funds — is identical. Only the language and account model differ.

### Try it

This contract is missing one safeguard from the Anchor version: a check that prevents new members from \`join()\`-ing in the middle of a round and disrupting the rotation (since \`members.length\` changes the \`currentRound % members.length\` calculation for everyone). Sketch, in comments, how you might restrict \`join()\` to only be callable when \`currentRound == 0\`, or track a separate "locked" flag once the first round starts.`,
          contentFr: `Voici un contrat de caisse d'épargne de groupe simplifié — le pendant Solidity du programme Anchor que vous avez construit dans le cours Njangi sur Solana.

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GroupSavingsPool {
    address[] public members;
    uint256 public contributionAmount;
    uint256 public currentRound;
    mapping(uint256 => mapping(address => bool)) public hasContributed; // tour => membre => payé ?

    constructor(uint256 _contributionAmount) {
        contributionAmount = _contributionAmount;
        members.push(msg.sender); // le créateur est le premier membre
    }

    function join() external {
        for (uint256 i = 0; i < members.length; i++) {
            require(members[i] != msg.sender, "Already a member");
        }
        members.push(msg.sender);
    }

    function contribute() external payable {
        require(msg.value == contributionAmount, "Incorrect contribution amount");
        require(!hasContributed[currentRound][msg.sender], "Already contributed this round");

        hasContributed[currentRound][msg.sender] = true;
    }

    function allContributed() public view returns (bool) {
        for (uint256 i = 0; i < members.length; i++) {
            if (!hasContributed[currentRound][members[i]]) {
                return false;
            }
        }
        return true;
    }

    function payout() external {
        require(allContributed(), "Not everyone has contributed yet");

        address recipient = members[currentRound % members.length];
        uint256 amount = contributionAmount * members.length;

        currentRound += 1;

        (bool sent, ) = recipient.call{value: amount}("");
        require(sent, "Payout failed");
    }
}
\`\`\`

### Analyse du code

- **\`members\`** est la liste de rotation — comme le \`members: Vec<Pubkey>\` du programme Solana.
- **\`contribute()\` est \`payable\`** — ce mot-clé Solidity permet à la fonction de recevoir directement de l'ETH dans le cadre de la transaction (\`msg.value\`). Le solde du contrat lui-même augmente automatiquement ; aucun « compte de coffre » séparé n'est nécessaire comme dans la version Solana, car toute adresse de contrat peut détenir de l'ETH.
- **\`hasContributed\`** est un *mapping imbriqué* : numéro de tour → adresse du membre → a payé ce tour ? Cela empêche les doubles contributions au même tour, tout comme le suivi par tour du programme Anchor.
- **\`allContributed()\`** parcourt tous les membres pour vérifier que le tour est complet — la même logique que la vérification des contributions du programme Solana, simplement écrite avec une boucle \`for\` Solidity au lieu des méthodes d'itérateur de Rust.
- **\`payout()\`** choisit le bénéficiaire avec \`currentRound % members.length\` — logique de rotation identique au programme Anchor — puis envoie l'ETH accumulé du contrat via \`.call{value: amount}("")\`, la méthode recommandée pour envoyer de l'ETH en Solidity moderne (plus sûre que \`.transfer()\` pour la compatibilité avec les portefeuilles basés sur des contrats).

### Comparaison avec Anchor/Solana

| Concept | Solana/Anchor | Solidity/EVM |
| --- | --- | --- |
| État du groupe | Un compte \`Group\` (PDA) | Variables de stockage du contrat |
| Détention des fonds | Une PDA de coffre séparée, détenue par le programme | L'adresse du contrat lui-même (il peut détenir de l'ETH directement) |
| Envoi des fonds | \`try_borrow_mut_lamports()\` sur le coffre | \`recipient.call{value: amount}("")\` |
| Suivi par tour | Un champ/tableau dans le compte \`Group\` | Un \`mapping\` imbriqué |

La *logique* — rotation, vérification des contributions, fonds contrôlés par le contrat — est identique. Seuls le langage et le modèle de comptes diffèrent.

### Essayez

Ce contrat manque d'un garde-fou présent dans la version Anchor : une vérification empêchant de nouveaux membres de \`join()\` au milieu d'un tour et de perturber la rotation (puisque \`members.length\` change le calcul \`currentRound % members.length\` pour tout le monde). Esquissez, en commentaires, comment vous pourriez restreindre \`join()\` pour qu'il ne soit appelable que lorsque \`currentRound == 0\`, ou suivre un indicateur « verrouillé » séparé une fois le premier tour commencé.`,
          videoUrl: null,
          codeLanguage: "solidity",
          codeStarterEn: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GroupSavingsPool {
    address[] public members;
    uint256 public contributionAmount;
    uint256 public currentRound;
    mapping(uint256 => mapping(address => bool)) public hasContributed;

    constructor(uint256 _contributionAmount) {
        contributionAmount = _contributionAmount;
        members.push(msg.sender);
    }

    function join() external {
        // TODO: require msg.sender is not already in members
        // TODO: push msg.sender to members
    }

    function contribute() external payable {
        // TODO: require msg.value == contributionAmount
        // TODO: require !hasContributed[currentRound][msg.sender]
        // TODO: set hasContributed[currentRound][msg.sender] = true
    }

    function allContributed() public view returns (bool) {
        // TODO: loop through members, return false if any haven't contributed this round
        // TODO: return true if all have
    }

    function payout() external {
        // TODO: require allContributed()
        // TODO: compute recipient = members[currentRound % members.length]
        // TODO: compute amount = contributionAmount * members.length
        // TODO: increment currentRound
        // TODO: send \`amount\` to recipient with .call{value: amount}("")
    }
}
`,
          codeStarterFr: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GroupSavingsPool {
    address[] public members;
    uint256 public contributionAmount;
    uint256 public currentRound;
    mapping(uint256 => mapping(address => bool)) public hasContributed;

    constructor(uint256 _contributionAmount) {
        contributionAmount = _contributionAmount;
        members.push(msg.sender);
    }

    function join() external {
        // TODO : vérifiez que msg.sender n'est pas déjà dans members
        // TODO : ajoutez msg.sender à members
    }

    function contribute() external payable {
        // TODO : require msg.value == contributionAmount
        // TODO : require !hasContributed[currentRound][msg.sender]
        // TODO : définissez hasContributed[currentRound][msg.sender] = true
    }

    function allContributed() public view returns (bool) {
        // TODO : parcourez members, retournez false si l'un n'a pas contribué ce tour
        // TODO : retournez true si tous ont contribué
    }

    function payout() external {
        // TODO : require allContributed()
        // TODO : calculez recipient = members[currentRound % members.length]
        // TODO : calculez amount = contributionAmount * members.length
        // TODO : incrémentez currentRound
        // TODO : envoyez \`amount\` à recipient avec .call{value: amount}("")
    }
}
`,
          quizQuestions: [],
        },
        {
          titleEn: "Final Quiz: DeFi Fundamentals",
          titleFr: "Quiz final : les fondamentaux de la DeFi",
          durationLabel: "8 min",
          lessonType: "quiz",
          contentEn: "One last check across the whole course — DEXs, lending, staking, and your DeFi Njangi.",
          contentFr: "Une dernière vérification sur tout le cours — DEX, prêts, staking et votre Njangi DeFi.",
          videoUrl: null,
          codeLanguage: null,
          codeStarterEn: null,
          codeStarterFr: null,
          quizQuestions: [
            {
              questionEn: "In the GroupSavingsPool contract, what does the 'payable' keyword on contribute() do?",
              questionFr: "Dans le contrat GroupSavingsPool, à quoi sert le mot-clé « payable » sur contribute() ?",
              optionsEn: [
                "Marks the function as expensive to call",
                "Allows the function to receive ETH as part of the transaction (msg.value)",
                "Makes the function private",
                "Pays the caller a reward",
              ],
              optionsFr: [
                "Marque la fonction comme coûteuse à appeler",
                "Permet à la fonction de recevoir de l'ETH dans le cadre de la transaction (msg.value)",
                "Rend la fonction privée",
                "Verse une récompense à l'appelant",
              ],
              correctIndex: 1,
              explanationEn: "Without 'payable', a Solidity function cannot receive ETH — any attempt to send value would revert.",
              explanationFr: "Sans « payable », une fonction Solidity ne peut pas recevoir d'ETH — toute tentative d'envoyer de la valeur serait annulée.",
            },
            {
              questionEn: "What is the Solidity/EVM equivalent of a Solana program's vault PDA holding pooled funds?",
              questionFr: "Quel est l'équivalent Solidity/EVM de la PDA de coffre d'un programme Solana détenant les fonds mis en commun ?",
              optionsEn: [
                "A separate bank account",
                "The contract's own address, which can hold ETH directly",
                "A government escrow service",
                "There is no equivalent",
              ],
              optionsFr: [
                "Un compte bancaire séparé",
                "L'adresse du contrat lui-même, qui peut détenir de l'ETH directement",
                "Un service d'entiercement gouvernemental",
                "Il n'y a pas d'équivalent",
              ],
              correctIndex: 1,
              explanationEn: "Every contract address can hold ETH balance directly — no separate vault account is needed, unlike Solana's account model.",
              explanationFr: "Toute adresse de contrat peut détenir un solde d'ETH directement — aucun compte de coffre séparé n'est nécessaire, contrairement au modèle de comptes de Solana.",
            },
            {
              questionEn: "Across DEXs, lending, staking, and group savings pools, what's the common thread that makes DeFi work without a trusted intermediary?",
              questionFr: "À travers les DEX, le prêt, le staking et les caisses d'épargne de groupe, quel est le fil commun qui permet à la DeFi de fonctionner sans intermédiaire de confiance ?",
              optionsEn: [
                "Government regulation",
                "Rules enforced automatically by smart contract code that anyone can read and verify",
                "A central company that guarantees all transactions",
                "Insurance policies on every transaction",
              ],
              optionsFr: [
                "La régulation gouvernementale",
                "Des règles appliquées automatiquement par du code de contrat intelligent que tout le monde peut lire et vérifier",
                "Une entreprise centrale qui garantit toutes les transactions",
                "Des polices d'assurance sur chaque transaction",
              ],
              correctIndex: 1,
              explanationEn: "Every protocol in this course replaces a trusted human role with transparent, verifiable, automatically-enforced code — the same principle as a Njangi's shared, agreed-upon rules.",
              explanationFr: "Chaque protocole de ce cours remplace un rôle humain de confiance par du code transparent, vérifiable et appliqué automatiquement — le même principe que les règles partagées et convenues d'un Njangi.",
            },
          ],
        },
      ],
    },
  ],
};
