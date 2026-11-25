#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/312221b7c5cb080eec9bf4acd3fd18e9b56e9ad9a00c4e54025dc0cde8dafc3e/contract';
import endContract from '../../snapshots/312221b7c5cb080eec9bf4acd3fd18e9b56e9ad9a00c4e54025dc0cde8dafc3e/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  primaryKey,
  sql,
  unique,
} from '@prisma/orm-mysql/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        table: 'user',
        columns: [
          col('email', 'varchar(191)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
          }),
          col('id', 'int', {
            notNull: true,
            default: fn(sql`autoincrement()`),
            codecRef: { codecId: 'mysql/int@1' },
          }),
          col('name', 'varchar(191)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
          }),
        ],
        constraints: [primaryKey(['id']), unique(['email'], { name: 'user_email_key' })],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
