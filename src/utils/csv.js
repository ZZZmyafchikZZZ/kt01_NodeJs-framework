const fs = require('fs');
const csvParser = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

function processCsv() {
  const results = [];

  fs.createReadStream(config.inputFile)
    .pipe(csvParser())
    .on('data', (data) => {
      const age = parseInt(data.age, 10);
      if (age >= config.minAge && data.city === config.cityFilter) {
        results.push(data);
      }
    })
    .on('end', () => {
      console.log(`Найдено подходящих записей: ${results.length}. Запись в файл...`);

      const csvWriter = createObjectCsvWriter({
        path: config.outputFile,
        header: [
          { id: 'id', title: 'id' },
          { id: 'name', title: 'name' },
          { id: 'age', title: 'age' },
          { id: 'city', title: 'city' }
        ]
      });

      csvWriter.writeRecords(results)
        .then(() => console.log(`Данные успешно перезаписаны в ${config.outputFile}`))
        .catch((err) => console.error('Ошибка записи файла:', err));
    })
    .on('error', (err) => {
      console.error('Ошибка чтения файла:', err);
    });
}

module.exports = { processCsv };
