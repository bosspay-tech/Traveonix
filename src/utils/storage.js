const KEY = "bus_demo_txns_v1";

export function readTxns() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addTxn(txn) {
  const list = readTxns();
  if (list.some((t) => t.id === txn.id)) return list; // dedupe
  const next = [txn, ...list].slice(0, 200);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
