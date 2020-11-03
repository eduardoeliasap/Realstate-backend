import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class UpdatePropertyFieldPhotos1603982878891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // *** Realtors ***
    await queryRunner.addColumn(
      'propertyphotos',
      new TableColumn({
        name: 'property_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'propertyphotos',
      new TableForeignKey({
        name: 'PropertyPhotos',
        columnNames: ['property_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'properties',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('propertyphotos', 'PropertyPhotos');

    await queryRunner.dropColumn('propertyphotos', 'property_id');
  }

}
