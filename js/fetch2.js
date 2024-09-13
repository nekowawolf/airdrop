import { get } from "https://bukulapak.github.io/api/process.js";
import { fillTableAirdrop } from "./controller/get.js";
import { urlAPIPaid } from "./config/url.js";

get(urlAPIPaid, fillTableAirdrop);
