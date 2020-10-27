import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class UpdatePropertyFieldRealrorContractType1603809139289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // *** Realtors ***
    await queryRunner.addColumn(
      'properties',
      new TableColumn({
        name: 'realtor_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'properties',
      new TableForeignKey({
        name: 'RealtorProvider',
        columnNames: ['realtor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'realtors',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    // *** Contract Type ***
    await queryRunner.addColumn(
      'properties',
      new TableColumn({
        name: 'contract_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'properties',
      new TableForeignKey({
        name: 'ContractType',
        columnNames: ['contract_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contracttypes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    // *** Property Type ***
    await queryRunner.addColumn(
      'properties',
      new TableColumn({
        name: 'type_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'properties',
      new TableForeignKey({
        name: 'PropertyType',
        columnNames: ['type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'propertytypes',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('properties', 'PropertyType');

    await queryRunner.dropColumn('properties', 'type_id');

    await queryRunner.dropForeignKey('properties', 'ContractType');

    await queryRunner.dropColumn('properties', 'contract_id');

    await queryRunner.dropForeignKey('properties', 'RealtorProvider');

    await queryRunner.dropColumn('properties', 'realtor_id');
  }
}
