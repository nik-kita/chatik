import { IsString } from 'class-validator';
import { configValidate } from './config-validate';

class SuccessFixture {
  @IsString()
  ENV_PROP = 'default';
}

class FailFixture {
  @IsString()
  ENV_PROP: string;
}

describe('configValidate()', () => {
  it('Should allow config', () => {
    expect(configValidate(SuccessFixture)).not.toThrowError();
  });

  it('Should forbid config', () => {
    expect(configValidate(FailFixture)).toThrowError();
  });
});
