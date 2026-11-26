#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/312221b7c5cb080eec9bf4acd3fd18e9b56e9ad9a00c4e54025dc0cde8dafc3e/contract';
import startContract from '../../snapshots/312221b7c5cb080eec9bf4acd3fd18e9b56e9ad9a00c4e54025dc0cde8dafc3e/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/7be3a09a5e6a00b0df3d65b5f84c56f4de129c4a3429633b7d89616707de4a53/contract';
import endContract from '../../snapshots/7be3a09a5e6a00b0df3d65b5f84c56f4de129c4a3429633b7d89616707de4a53/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-mysql/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        table: 'user',
        column: col('nim', 'varchar(191)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
        }),
      }),
      this.addColumn({
        table: 'user',
        column: col('password', 'varchar(191)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
        }),
      }),
      this.addColumn({
        table: 'user',
        column: col('role', 'varchar(191)', {
          notNull: true,
          default: lit('mahasiswa'),
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
