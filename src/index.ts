import * as fs from 'fs';
import * as path from 'path';
import { readFromFile, tempFolderPath, writeToTempFile } from './file-utils';
import { getCSRFToken, getCredentials }  from './http-utils';


const run = async () => {
  return new Promise(async (resolve) => {
    // const originalExcelFile = path.join(
    //   __dirname,
    //   '../',
    //   'data',
    //   'duluxVisit.xlsx',
    // );
    // const tempCsvFilePath = path.join(tempFolderPath, 'temp_dulux.csv');
    // const jsonWriteFile = path.join(tempFolderPath, 'duluxVisit.xlsx');

    // console.log(`Reading file from: ${originalExcelFile}`);
    // await writeToTempFile(originalExcelFile, tempCsvFilePath);
    // const jsonObj = (await readFromFile(tempCsvFilePath)) as any[];

    // console.log(`Writing file ${jsonWriteFile}`);
    // const jsonWrite = fs.createWriteStream(jsonWriteFile);
    // jsonWrite.write(JSON.stringify(jsonObj, null, 2));

    const res = await getCredentials();
    console.log(res);

    return resolve({
      success: true,
      message: "all good"
    });
  });
};

run()
  .catch((e) => console.error(e))
  .then((c) => console.log('Complete', c));
