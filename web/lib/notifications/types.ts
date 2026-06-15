export type NotificationEvent =
  | {
      type: "wallet_send";
      amountSol: number;
      recipient: string;
      signature: string;
      explorerUrl: string;
    }
  | {
      type: "wallet_receive";
      amountSol: number;
      sender: string | null;
      signature: string;
      explorerUrl: string;
    }
  | {
      type: "certificate_minted";
      courseNameEn: string;
      courseNameFr: string;
      certId: string;
    };

export type NotificationType = NotificationEvent["type"];
