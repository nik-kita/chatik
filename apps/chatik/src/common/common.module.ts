import { Module } from '@nestjs/common';

const SHARING_MODULES = [];
const SHARING_PROVIDERS = [];


@Module({
  imports: SHARING_MODULES,
  providers: SHARING_PROVIDERS,
  exports: [...SHARING_MODULES, ...SHARING_PROVIDERS],
})
export class CommonModule {}
