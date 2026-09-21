import 'dotenv/config';
import path from 'path';

const requiredEnv = ['INPUT_FILE', 'OUTPUT_FILE', 'MIN_AGE', 'CITY_FILTER'];

// Проверяем заполненность всех переменных окружения
for (const envVar of requiredEnv) {
  if (!process.env[envVar]) {
    console.error(`Ошибка: Переменная окружения ${envVar} отсутствует в конфигурации.`);
    process.exit(1);
  }
}

export const config = {
  inputFile: path.resolve(process.env.INPUT_FILE),
  outputFile: path.resolve(process.env.OUTPUT_FILE),
  minAge: parseInt(process.env.MIN_AGE, 10),
  cityFilter: process.env.CITY_FILTER.trim().toLowerCase()
};
