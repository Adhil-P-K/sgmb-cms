import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvFormats from 'ajv-formats';
import fs from 'fs';
import { glob } from 'glob';

const ajv = new Ajv({ allErrors: true });

ajvFormats(ajv);
ajvErrors(ajv);

ajv.addKeyword({
  keyword: "isNotEmpty",
  validate: function (data: string) {
    return typeof data === "string" && data.trim() !== "";
  },
  errors: true,
});
const initAjv = async () => {
  const schemaFiles = await glob("./src/schemas/*.json");
  for (const filePath of schemaFiles) {
    const schema = JSON.parse(fs.readFileSync(filePath, "utf8"));
    ajv.addSchema(schema);
  }
};

const validateJson = (schema: string, json: any) => {
  const result = ajv.validate(schema, json);
  return {
    result,
    errors: ajv.errors,
  };
};

export { ajv, initAjv, validateJson };
