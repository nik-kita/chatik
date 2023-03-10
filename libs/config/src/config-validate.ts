import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';


export function configValidate(Expected: new () => any) {
  return (config: Record<string, unknown> = {}) => {
    const validatedConf = plainToInstance(Expected, config, {
      exposeDefaultValues: true,
    });
    const errors = validateSync(validatedConf);

    if (errors.length) throw new Error(errors.toString());

    return validatedConf;
  };
}
