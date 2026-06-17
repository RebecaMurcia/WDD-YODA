import { checkLogin } from "./auth.mjs";
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import { getOrders } from "./externalServices.mjs";

checkLogin();

loadHeaderFooter();

const token = getLocalStorage("so-token");
const orders = await getOrders(token);
console.log(orders);