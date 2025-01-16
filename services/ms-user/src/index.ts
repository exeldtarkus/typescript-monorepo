import app from '@lib/core-server';
import logger from '@lib/core-logger';

// dotenv.config();
const port = 8094;

app.listen(port, () => {
  logger.info(`[ms-user] - http://localhost:${port}`);
});

export default app;
