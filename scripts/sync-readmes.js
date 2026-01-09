const fs = require('fs');
const path = require('path');

async function syncReadmes() {
  const portfolioPath = path.join(process.cwd(), 'data/portfolio.json');

  if (!fs.existsSync(portfolioPath)) {
    console.error('portfolio.json not found at:', portfolioPath);
    process.exit(1);
  }

  const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf-8'));

  const readmesDir = path.join(process.cwd(), 'data/readmes');
  if (!fs.existsSync(readmesDir)) {
    fs.mkdirSync(readmesDir, { recursive: true });
  }

  console.log('Syncing READMEs for projects with GitHub links...\n');

  for (const project of portfolio.projects) {
    if (!project.github) {
      console.log(`Skipping ${project.name} - no GitHub link`);
      continue;
    }

    const [owner, repo] = project.github.split('/');
    const url = `https://api.github.com/repos/${owner}/${repo}/readme`;

    console.log(`Fetching README for ${project.name} (${project.github})...`);

    try {
      const headers = {
        'Accept': 'application/vnd.github.raw+json',
        'User-Agent': 'Portfolio-Sync'
      };

      // Use GitHub token if available
      if (process.env.GH_TOKEN) {
        headers['Authorization'] = `token ${process.env.GH_TOKEN}`;
      }

      const response = await fetch(url, { headers });

      if (response.ok) {
        const content = await response.text();
        const filename = `${repo}.md`;
        const filepath = path.join(readmesDir, filename);
        fs.writeFileSync(filepath, content);
        console.log(`  ✓ Synced: ${filename}`);
      } else if (response.status === 404) {
        console.log(`  ⚠ README not found for ${project.github}`);
      } else {
        console.warn(`  ✗ Failed to fetch README for ${project.github}: ${response.status}`);
      }
    } catch (error) {
      console.error(`  ✗ Error fetching ${project.github}:`, error.message);
    }
  }

  console.log('\nSync complete!');
}

syncReadmes().catch(console.error);
