import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Svg,
  Rect,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "@react-pdf/renderer";

// A4 landscape, in points.
const PAGE_WIDTH = 841.89;
const PAGE_HEIGHT = 595.28;

const COLORS = {
  bgFrom: "#111915",
  bgTo: "#0F6E56",
  green: "#1D9E75",
  amber: "#EF9F27",
  white: "#F5FAF7",
  muted: "#A9C2BB",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
  },
  frame: {
    position: "absolute",
    top: 28,
    left: 28,
    right: 28,
    bottom: 28,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 18,
  },
  content: {
    flex: 1,
    padding: 56,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    marginLeft: 16,
  },
  wordmark: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    letterSpacing: 4,
    color: COLORS.green,
  },
  tagline: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  body: {
    marginTop: 12,
  },
  smallMuted: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 6,
  },
  studentName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 42,
    color: COLORS.white,
    marginBottom: 16,
  },
  courseName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 26,
    color: COLORS.amber,
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  verifyBlock: {
    maxWidth: 440,
  },
  verifyBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  verifyLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: COLORS.green,
    marginLeft: 8,
  },
  mono: {
    fontFamily: "Courier",
    fontSize: 8,
    color: COLORS.muted,
    marginBottom: 3,
  },
  verifyUrl: {
    fontFamily: "Courier",
    fontSize: 8,
    color: COLORS.green,
    marginTop: 4,
  },
  qrBlock: {
    alignItems: "center",
  },
  qrCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  qrImage: {
    width: 110,
    height: 110,
  },
  qrCaption: {
    fontSize: 9,
    color: COLORS.muted,
    marginTop: 6,
  },
  strap: {
    marginTop: 24,
    fontSize: 9,
    color: COLORS.muted,
    textAlign: "center",
  },
});

/** Reproduces the Fundi3 F3 mark (`Blocks` in components/brand/Logo.tsx) as PDF-renderable vectors. */
function LogoMarkPdf({ size = 40, fill = COLORS.white }: { size?: number; fill?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Rect x={0} y={4} width={24} height={8} rx={1.5} fill={fill} />
      <Rect x={0} y={18} width={16} height={8} rx={1.5} fill={fill} />
      <Rect x={30} y={4} width={14} height={8} rx={1.5} fill={fill} />
      <Rect x={30} y={18} width={14} height={8} rx={1.5} fill={fill} />
      <Rect x={0} y={32} width={44} height={8} rx={1.5} fill={fill} />
    </Svg>
  );
}

/** Small filled circle + checkmark, used as the "verified" badge. */
function CheckBadge({ size = 14 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={11} fill={COLORS.green} />
      <Path
        d="M7 12.5 L10.5 16 L17 8.5"
        stroke="#04342C"
        strokeWidth={2.4}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export interface CertificatePdfProps {
  displayName: string;
  courseName: string;
  issuedAt: string;
  certId: string;
  certificatePda: string | null;
  qrDataUrl: string;
  verifyUrl: string;
  siteHost: string;
}

/** A4-landscape PDF certificate, styled to match the `/certificate/[certId]` verify page. */
export function CertificatePDF({
  displayName,
  courseName,
  issuedAt,
  certId,
  certificatePda,
  qrDataUrl,
  verifyUrl,
  siteHost,
}: CertificatePdfProps) {
  const issuedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(issuedAt));

  return (
    <Document title={`Fundi3 Certificate — ${courseName}`} author="Fundi3">
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Svg
          style={{ position: "absolute", top: 0, left: 0 }}
          width="100%"
          height="100%"
          viewBox={`0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}`}
        >
          <Defs>
            <LinearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={COLORS.bgFrom} />
              <Stop offset="1" stopColor={COLORS.bgTo} />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width={PAGE_WIDTH} height={PAGE_HEIGHT} fill="url(#bg)" />
          <Circle cx={PAGE_WIDTH - 90} cy={90} r={190} fill={COLORS.amber} fillOpacity={0.12} />
        </Svg>

        <View style={styles.frame} />

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <LogoMarkPdf />
            <View style={styles.headerText}>
              <Text style={styles.wordmark}>FUNDI3</Text>
              <Text style={styles.tagline}>CERTIFICATE OF COMPLETION</Text>
            </View>
          </View>

          <View style={styles.body}>
            <Text style={styles.smallMuted}>This certifies that</Text>
            <Text style={styles.studentName}>{displayName}</Text>
            <Text style={styles.smallMuted}>has successfully completed</Text>
            <Text style={styles.courseName}>{courseName}</Text>
            <Text style={styles.smallMuted}>on {issuedDate}</Text>
          </View>

          <View style={styles.footerRow}>
            <View style={styles.verifyBlock}>
              <View style={styles.verifyBadgeRow}>
                <CheckBadge />
                <Text style={styles.verifyLabel}>
                  {certificatePda ? "Verified on Solana" : "Fundi3 Certified"}
                </Text>
              </View>
              {certificatePda && <Text style={styles.mono}>PDA: {certificatePda}</Text>}
              <Text style={styles.mono}>Certificate ID: {certId}</Text>
              <Text style={styles.verifyUrl}>{verifyUrl}</Text>
            </View>

            <View style={styles.qrBlock}>
              <View style={styles.qrCard}>
                {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer's Image has no alt prop */}
                <Image src={qrDataUrl} style={styles.qrImage} />
              </View>
              <Text style={styles.qrCaption}>Scan to verify</Text>
            </View>
          </View>

          <Text style={styles.strap}>Built in Cameroon. For Africa. · {siteHost}</Text>
        </View>
      </Page>
    </Document>
  );
}
