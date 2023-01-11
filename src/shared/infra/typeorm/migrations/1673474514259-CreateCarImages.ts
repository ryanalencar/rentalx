import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCarImages1673474514259 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'car_images',
        columns: [
          { name: 'id', type: 'uuid' },
          { name: 'car_id', type: 'uuid' },
          { name: 'image_name', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'car_images',
      new TableForeignKey({
        name: 'FKCarImage',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('car_images', 'FKCarImage');
    await queryRunner.dropTable('car_images');
  }
}
