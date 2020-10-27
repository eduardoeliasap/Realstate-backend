import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePropertys1603808724153 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'properties',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'city_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'desc',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'area',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'roons',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'garage',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'suite',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'latitude',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'situation',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('properties');
  }
}
