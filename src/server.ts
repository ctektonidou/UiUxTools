import { APP_BASE_HREF } from '@angular/common';
import { provideServerRendering, renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { AppComponent } from './app/app.component';

// Define server paths
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(browserDistFolder, 'index.html');

const app = express();

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html'
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', async (req, res, next) => {
  try {
    const document = readFileSync(indexHtml, 'utf8'); // Load HTML document
    const html = await renderApplication(() => bootstrapApplication(AppComponent, {
      providers: [
        provideServerRendering(),
        { provide: APP_BASE_HREF, useValue: req.baseUrl }
      ]
    }), { document }); // Pass document inside an options object
    
    res.send(html);
  } catch (err) {
    next(err);
  }
});

/**
 * Start the server
 */
const port = process.env['PORT'] || 4000;
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`Node Express server running at http://localhost:${port}`);
  });
}
