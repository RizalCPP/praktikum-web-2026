import 'dotenv/config';
import mysql from '@prisma/orm-mysql/runtime';
import { contractFromJson } from '@prisma/orm-mysql/static';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };

export const contract = contractFromJson<Contract>(contractJson);

export const db = mysql({
  contract,
  url: process.env['DATABASE_URL']!,
});
