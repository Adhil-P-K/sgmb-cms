import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvFormats from 'ajv-formats';
import fs from 'fs';
import { glob } from 'glob';
import { ObjectId } from 'mongodb';

const ajv = new Ajv({ allErrors: true });

ajvFormats(ajv);
ajvErrors(ajv);

ajv.addKeyword({
  keyword: 'isNotEmpty',
  validate: function (val: boolean, data: string) {
    return typeof data === 'string' && data.trim() !== '';
  },
  errors: true,
});
ajv.addFormat('objectid', {
  type: 'string',
  validate: (objId) => {
    return ObjectId.isValid(objId);
  },
});
ajv.addFormat('variable', {
  type: 'string',
  validate: (data) => {
    const regex = /^\{\{[^{}]+\}\}$/;
    return regex.test(data);
  },
});
ajv.addKeyword({
  keyword: 'exactIntDigit',
  validate: function (length: number, data: string) {
    const exactDigits = length;
    const numString = parseInt(data).toString();
    const digitCount = numString.length;
    return digitCount === exactDigits;
  },
  errors: true,
});
const initAjv = async () => {
  const schemaFiles = await glob('./src/schemas/*.json');
  for (const filePath of schemaFiles) {
    const schema = JSON.parse(fs.readFileSync(filePath, 'utf8'));
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
