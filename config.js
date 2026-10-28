/* Anthropic ($ANT) — Ethereum meme site config
   Edit these values when CA / X go live. */
window.ANT_CONFIG = {
  NAME: "Anthropic",
  SYMBOL: "ANT",
  TICKER: "$ANT",
  CHAIN: "Ethereum",
  CA: "0xCommingSoon",
  LAUNCHED: false,
  X_LINK: "https://x.com/",
  BUY_BASE: "https://app.uniswap.org/swap?chain=ethereum&outputCurrency=",
  CHART_BASE: "https://dexscreener.com/ethereum/",
  EMBED_POST_ID: "2114705042817110293",
  EMBED_POST_URL: "https://x.com/AnthropicAI/status/2114705042817110293",
  SEC_LINK: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm",
  SEC_SEARCH: "https://www.sec.gov/edgar/search/#/q%253DAnthropic%2520PBC%2520S-1"
};

/** True when CA looks like a real 40-hex Ethereum address */
window.ANT_isLiveCA = function (ca) {
  return /^0x[a-fA-F0-9]{40}$/.test(String(ca || "").trim());
};
