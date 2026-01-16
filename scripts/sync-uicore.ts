
import { ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.224.0/path/mod.ts";

const REGISTRY_URL = "https://datakitreactuicore.danieltarazona.workers.dev";
const PACKAGE_NAME = "@datakit/react-ui-core";
const DEST_DIR = "./libs";

async function main() {
    const clientId = Deno.env.get("CF_CLIENT_ID");
    const clientSecret = Deno.env.get("CF_CLIENT_SECRET");

    if (!clientId || !clientSecret) {
        console.error("Error: CF_CLIENT_ID and CF_CLIENT_SECRET environment variables are required.");
        Deno.exit(1);
    }

    const headers = {
        "CF-Access-Client-Id": clientId,
        "CF-Access-Client-Secret": clientSecret,
    };

    console.log(`Fetching metadata for ${PACKAGE_NAME}...`);
    const metaRes = await fetch(`${REGISTRY_URL}/${encodeURIComponent(PACKAGE_NAME)}`, { headers });

    if (!metaRes.ok) {
        console.error(`Failed to fetch metadata: ${metaRes.status} ${metaRes.statusText}`);
        const text = await metaRes.text();
        console.error(text);
        Deno.exit(1);
    }

    const metadata = await metaRes.json();
    const latestVersion = metadata["dist-tags"]?.latest;

    if (!latestVersion) {
        console.error("No 'latest' version found in metadata.");
        Deno.exit(1);
    }

    console.log(`Latest version: ${latestVersion}`);
    const tarballUrl = metadata.versions[latestVersion].dist.tarball;

    console.log(`Downloading tarball from ${tarballUrl}...`);
    const tarballRes = await fetch(tarballUrl, { headers });

    if (!tarballRes.ok) {
        console.error(`Failed to download tarball: ${tarballRes.status} ${tarballRes.statusText}`);
        Deno.exit(1);
    }

    const buffer = await tarballRes.arrayBuffer();
    const destPath = path.join(DEST_DIR, `${PACKAGE_NAME.replace('/', '-')}-${latestVersion}.tgz`);
    const finalPath = path.join(DEST_DIR, "datakit-react-ui-core.tgz"); // Constant name for easier package.json ref? 
    // Portfolio used dynamic name but let's see. 
    // Usually it's better to use a fixed name for package.json to point to "file:./libs/pkg.tgz" 
    // OR we update package.json.
    // I'll stick to fixed name for simplicity in this migration: `datakit-react-ui-core.tgz`.

    await ensureDir(DEST_DIR);
    await Deno.writeFile(finalPath, new Uint8Array(buffer));

    console.log(`Saved tarball to ${finalPath}`);
}

main();
