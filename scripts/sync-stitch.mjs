import { StitchToolClient } from "@google/stitch-sdk";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) {
  console.error("Error: STITCH_API_KEY no está definida en el entorno");
  process.exit(1);
}
const client = new StitchToolClient({ apiKey: API_KEY });

const projectId = process.argv[2];
if (!projectId) {
  console.error("Uso: node scripts/sync-stitch.mjs <projectId>");
  process.exit(1);
}

const outDir = resolve("stitch-output");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const PREFIX = `projects/${projectId}/screens/`;

try {
  const project = await client.callTool("get_project", {
    name: `projects/${projectId}`,
  });
  console.log(`Proyecto: ${project.title ?? project.name}\n`);

  let screens = [];
  try {
    const raw = await client.callTool("list_screens", { projectId });
    const rawStr = JSON.stringify(raw);
    const ids = [...rawStr.matchAll(/"name"\s*:\s*"projects\/[^"]+\/screens\/([^"]+)"/g)];
    screens = [...new Set(ids.map((m) => m[1]))];
  } catch {}

  if (screens.length === 0) {
    console.log("No se detectaron screens via list_screens.");
    console.log("Proveé el screen ID manualmente:\n");
    console.log("  node scripts/sync-stitch.mjs <projectId> <screenId>");
    if (process.argv[3]) {
      screens = [process.argv[3]];
    } else {
      await client.close();
      process.exit(0);
    }
  }

  for (const screenId of screens) {
    try {
      const screen = await client.callTool("get_screen", {
        name: `${PREFIX}${screenId}`,
        projectId,
        screenId,
      });

      const title = screen.title ?? screenId;
      const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || screenId;
      const htmlUrl = screen.htmlCode?.downloadUrl;

      if (!htmlUrl) {
        console.log(`  ✗ ${title}: sin downloadUrl`);
        continue;
      }

      const resp = await fetch(htmlUrl);
      const html = await resp.text();
      const outPath = resolve(outDir, `${safeName}.html`);
      writeFileSync(outPath, html, "utf-8");
      console.log(`  ✓ ${title} → stitch-output/${safeName}.html`);

      const imgUrl = screen.screenshot?.downloadUrl;
      if (imgUrl) console.log(`    🖼  screenshot disponible`);
    } catch (e) {
      console.log(`  ✗ screen ${screenId}: ${e.message}`);
    }
  }
} catch (e) {
  console.error("Error:", e.message);
}

await client.close();
