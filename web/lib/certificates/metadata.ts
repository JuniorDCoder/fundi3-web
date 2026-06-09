export interface CertificateMetadata {
  name: string;
  symbol: string;
  description: string;
  attributes: Array<{ trait_type: string; value: string }>;
  external_url: string;
}

export function buildCertificateMetadata(params: {
  certId: string;
  courseName: string;
  studentName: string;
  issuedAt: Date;
  appUrl: string;
}): CertificateMetadata {
  const { certId, courseName, studentName, issuedAt, appUrl } = params;
  return {
    name: `Fundi3 Certificate — ${courseName}`,
    symbol: "FUNDI3",
    description: `Certificate of completion for "${courseName}" issued by Fundi3 to ${studentName}.`,
    attributes: [
      { trait_type: "Course", value: courseName },
      { trait_type: "Student", value: studentName },
      { trait_type: "Issued At", value: issuedAt.toISOString().split("T")[0] },
      { trait_type: "Platform", value: "Fundi3" },
      { trait_type: "Network", value: "Solana Devnet" },
    ],
    external_url: `${appUrl}/certificate/${certId}`,
  };
}
