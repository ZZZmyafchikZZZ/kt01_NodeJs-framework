import fs from 'fs';
import readline from 'readline';

export async function processCsv({ inputFile, outputFile, minAge, cityFilter }) {
  // Требование: проверка отсутствия входного файла с понятным сообщением
  if (!fs.existsSync(inputFile)) {
    console.error(`Ошибка: Входной файл по пути "${inputFile}" не найден.`);
    process.exit(1);
  }

  // Чтение CSV через Readable stream с помощью потока fs.createReadStream
  const inputStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
  const outputStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  let isHeader = true;
  let totalRows = 0;
  let passedRows = 0;
  let headers = [];

  for await (const line of rl) {
    if (!line.trim()) continue;

    // Обработка первой строки (заголовка)
    if (isHeader) {
      headers = line.split(',').map(h => h.trim());
      outputStream.write(line + '\n'); // Сохранение заголовка в выходной файл
      isHeader = false;
      continue;
    }

    totalRows++;
    const values = line.split(',').map(v => v.trim());
    
    // Собираем объект строки на основе заголовков
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });

    const age = parseInt(row.age, 10);
    const city = row.city ? row.city.toLowerCase() : '';

    // Фильтрация работает одновременно по минимальному возрасту и городу
    if (age >= minAge && city === cityFilter) {
      outputStream.write(line + '\n');
      passedRows++;
    }
  }

  outputStream.end();

  // Вывод статистики работы в консоль
  console.log(`\n--- Статистика обработки ---`);
  console.log(`Обработано строк: ${totalRows}`);
  console.log(`Прошло фильтр: ${passedRows}`);
  console.log(`-----------------------------\n`);
}
