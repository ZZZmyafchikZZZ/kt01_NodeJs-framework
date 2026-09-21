import { config } from './config/index.js';
import { processCsv } from './utils/csv.js';

async function main() {
  try {
    await processCsv(config);
    console.log('Обработка успешно завершена.');
  } catch (error) {
    console.error('Критическая ошибка во время выполнения скрипта:', error.message);
    process.exit(1); // Завершение процесса с ненулевым кодом при сбое
  }
}

main();
