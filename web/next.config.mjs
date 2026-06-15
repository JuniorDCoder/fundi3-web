/** @type {import('next').NextConfig} */
const nextConfig = {
  // @solana/web3.js pulls in rpc-websockets -> ws, which webpack mis-bundles
  // for the server (its optional native bufferutil/utf-8-validate deps get
  // stubbed to empty modules, causing "bufferUtil.mask is not a function"
  // when confirming transactions via signatureSubscribe). Keeping these as
  // real runtime requires lets ws's pure-JS fallbacks work correctly.
  experimental: {
    serverComponentsExternalPackages: ["@solana/web3.js", "rpc-websockets", "ws"],
  },
};

export default nextConfig;
