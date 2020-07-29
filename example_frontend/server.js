import express from 'express';
import fallback from 'express-history-api-fallback';
import compression from 'compression';

const app = express();

app.use(compression());

app.use(express.static(`${__dirname}/build`));

app.use(fallback(`${__dirname}/build/index.html`));

app.listen(process.env.PORT || 3000, () =>
	console.log(`Listening on port ${process.env.PORT || 3000}`)
);
