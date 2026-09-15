const { processCsv } = require('./utils/csv');
const configData = require('./config/index');

// Делаем конфиг доступным для функции
global.config = configData;

// Запуск
processCsv();
