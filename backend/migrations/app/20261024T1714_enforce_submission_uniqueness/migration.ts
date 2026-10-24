#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/718433a1502c1cdfc5455514af7d4b6174156163e87b7cf37d7a30cc56bf2ccc/contract';
import endContract from '../../snapshots/718433a1502c1cdfc5455514af7d4b6174156163e87b7cf37d7a30cc56bf2ccc/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/da430e8c81d56d403d2cd4c698bc34617ab836326eb5c03c6112039ba15067f8/contract';
import startContract from '../../snapshots/da430e8c81d56d403d2cd4c698bc34617ab836326eb5c03c6112039ba15067f8/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createIndex({
        schema: 'public',
        table: 'submissions',
        index: 'one_pending_submission_per_student_89ecac1f',
        columns: ['studentId'],
        extras: { where: sql`("status" = 'PENDING')`, unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'submissions',
        index: 'submission_github_url_unique_7c3d0ef1',
        columns: ['githubUrl'],
        extras: { unique: true },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
