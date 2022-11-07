import { parse } from "csv-parse";
import * as fs from "fs";

class ImportCategoryUseCase {
  execute(file: Express.Multer.File) {
    console.log(file);
    const stream = fs.createReadStream(file.path);

    const parseFile = parse();

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });
  }
}

export { ImportCategoryUseCase };
