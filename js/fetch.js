import { get } from "https://bukulapak.github.io/api/process.js";
import { fillTableAirdrop } from "./controller/get.js";
import { urlAPIFree } from "./config/url.js";

get(urlAPIFree, fillTableAirdrop);
