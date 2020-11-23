import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class UpdateRealtorsAvatarIDField1604064347179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'realtors',
      new TableColumn({
        name: 'avatar_id',
        type: 'int',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'realtors',
      new TableForeignKey({
        name: 'AvatarRealtor',
        columnNames: ['avatar_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'avatarrealtors',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('realtors', 'AvatarRealtor');

    await queryRunner.dropColumn('realtors', 'avatar_id');
  }

}
