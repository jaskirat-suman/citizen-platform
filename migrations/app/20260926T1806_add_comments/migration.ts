#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0119856f69152c9e255648ab44b0d3156cbfb115e9f7a39933d059fb9b55c915/contract';
import endContract from '../../snapshots/0119856f69152c9e255648ab44b0d3156cbfb115e9f7a39933d059fb9b55c915/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/35843e202f4f6f70ada91faf819d7805d71171a0e114a6eb58336bd38dedfbeb/contract';
import startContract from '../../snapshots/35843e202f4f6f70ada91faf819d7805d71171a0e114a6eb58336bd38dedfbeb/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'comments',
        columns: [
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('issueId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
