import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USERNAME_TEST,
  password: process.env.DB_PASSWORD_TEST,
  host: process.env.DB_HOST_TEST,
  port: parseInt(process.env.DB_PORT_TEST as string),
  database: process.env.DB_NAME_TEST,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function query(
  data: { text: string; values?: any[] },
  params?: any[],
) {
  const client = await pool.connect();
  try {
    const res = await client.query(data, params);
    return res;
  } finally {
    client.release();
  }
}

export async function dropTableData(tableNames: string[]) {
  for (const tableName of tableNames) {
    try {
      const sql = {
        text: `TRUNCATE ${tableName} RESTART IDENTITY CASCADE`,
      };
      await query(sql);
    } catch (error) {
      console.error(`Error dropping data from table ${tableName}:`, error);
      throw error;
    }
  }
}

export async function createTableData(tableNames: string[]) {
  for (const tableName of tableNames) {
    if (tableName === 'users') {
      await createUsersData();
    }
  }
}

async function createUsersData() {
  const users = [
    {
      name: 'Admin user',
      email: `admin-${Date.now()}@project.com`,
      // @TODO adicionar bcrypt hash
      passwordHash: 'admin123',
      isActive: true,
    },
  ];
  try {
    for (const user of users) {
      const sql = {
        text: `INSERT INTO public.users ("name", "email", "passwordHash", "isActive") VALUES ($1, $2, $3, $4)`,
        values: [user.name, user.email, user.passwordHash, user.isActive],
      };
      await query(sql);
    }
  } catch (error) {
    console.error('Error creating users data:', error);
    throw error;
  }
}

export async function getData(tableName: string) {
  try {
    const sql = {
      text: `SELECT * FROM public.${tableName}`,
    };
    const result = await query(sql);
    return result.rows;
  } catch (error) {
    console.error(`Error fetching data from table ${tableName}:`, error);
    throw error;
  }
}
