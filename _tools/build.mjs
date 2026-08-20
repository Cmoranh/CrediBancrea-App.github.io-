#!/usr/bin/env node
// Cifra las páginas de _src/ y genera las rutas públicas con la pantalla de acceso.
//
// Uso:  CB_USER=... CB_PASS=... node _tools/build.mjs
// Sin variables de entorno, pregunta usuario y contraseña por consola.
//
// Salida: index.html, flujos/index.html, incode/index.html (cifrados con AES-256-GCM;
// la clave se deriva de la contraseña con PBKDF2-SHA256). El usuario se publica solo
// como hash SHA-256. La contraseña NO se escribe en ningún archivo generado.

import { createCipheriv, createHash, pbkdf2Sync, randomBytes } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ITER = 600000;

const PAGES = [
  { src: "_src/landing.html", out: "index.html" },
  { src: "_src/flujos.html",  out: "flujos/index.html" },
  { src: "_src/incode.html",  out: "incode/index.html" },
];

async function credentials() {
  let user = process.env.CB_USER, pass = process.env.CB_PASS;
  if (user && pass) return { user, pass };
  const rl = createInterface({ input: stdin, output: stdout });
  user = user || (await rl.question("Usuario: ")).trim();
  pass = pass || (await rl.question("Contraseña: "));
  rl.close();
  if (!user || !pass) throw new Error("Usuario y contraseña son obligatorios");
  return { user, pass };
}

const { user, pass } = await credentials();

const salt = randomBytes(16);
const key = pbkdf2Sync(pass, salt, ITER, 32, "sha256");
const userHash = createHash("sha256").update(user, "utf8").digest("hex");
const template = readFileSync(join(ROOT, "_tools/gate.html"), "utf8");

for (const { src, out } of PAGES) {
  const plain = readFileSync(join(ROOT, src));
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(plain), cipher.final(), cipher.getAuthTag()]);
  const html = template
    .replace("{{USER_HASH}}", userHash)
    .replace("{{SALT}}", salt.toString("base64"))
    .replace("{{IV}}", iv.toString("base64"))
    .replace("{{CT}}", ct.toString("base64"))
    .replace("{{ITER}}", String(ITER));
  mkdirSync(dirname(join(ROOT, out)), { recursive: true });
  writeFileSync(join(ROOT, out), html);
  console.log(`ok  ${out}  (${plain.length} → ${html.length} bytes)`);
}
console.log("Listo. Recuerda: _src/ está en .gitignore; no subas las fuentes en claro.");
