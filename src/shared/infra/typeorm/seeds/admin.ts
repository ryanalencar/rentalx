import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import { createConnection } from '..';

export async function create() {
  const id = uuidV4();
  const password = await hash('admin', 8);

  const connection = await createConnection('localhost');

  await connection.query(
    `INSERT INTO USERS(id,name,email,password,"isAdmin",driver_license,created_at)
    VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXXXX','now()')`,
  );

  await connection.destroy();
}

create().then(() => {
  console.log('User admin created');
});
