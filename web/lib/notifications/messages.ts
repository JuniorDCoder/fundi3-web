import type { NotificationEvent } from "./types";

export interface NotificationMessages {
  titleEn: string;
  titleFr: string;
  bodyEn: string;
  bodyFr: string;
}

function formatSol(amountSol: number): string {
  return Number(amountSol.toFixed(4)).toString();
}

function shortenAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function buildMessages(event: NotificationEvent): NotificationMessages {
  switch (event.type) {
    case "wallet_send": {
      const amount = formatSol(event.amountSol);
      const to = shortenAddress(event.recipient);
      return {
        titleEn: "SOL sent",
        titleFr: "SOL envoyé",
        bodyEn: `You sent ${amount} SOL to ${to}.`,
        bodyFr: `Vous avez envoyé ${amount} SOL à ${to}.`,
      };
    }

    case "wallet_receive": {
      const amount = formatSol(event.amountSol);
      const from = event.sender ? shortenAddress(event.sender) : null;
      return {
        titleEn: "SOL received",
        titleFr: "SOL reçu",
        bodyEn: from ? `You received ${amount} SOL from ${from}.` : `You received ${amount} SOL.`,
        bodyFr: from ? `Vous avez reçu ${amount} SOL de ${from}.` : `Vous avez reçu ${amount} SOL.`,
      };
    }

    case "certificate_minted":
      return {
        titleEn: "Certificate minted!",
        titleFr: "Certificat émis !",
        bodyEn: `Your certificate for ${event.courseNameEn} is ready and minted on Solana.`,
        bodyFr: `Votre certificat pour ${event.courseNameFr} est prêt et émis sur Solana.`,
      };
  }
}
