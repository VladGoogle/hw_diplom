import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1634047751595 implements MigrationInterface {
    name = 'Migrations1634047751595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "type" text NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "label" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying, CONSTRAINT "UQ_972f95f212512a35e838562ea30" UNIQUE ("name"), CONSTRAINT "PK_5692ac5348861d3776eb5843672" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "labelId" integer, "categoryId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mod_to_prod" ("id" SERIAL NOT NULL, "productId" integer, "modifierId" integer, CONSTRAINT "PK_3ae8723ac54776d12f078b7361c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modifier" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_8f06bb4ce538ef437fe650b8be0" UNIQUE ("name"), CONSTRAINT "PK_30c20db2bc7a8c2318b4db0dfc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mod_to_product_to_order" ("id" SERIAL NOT NULL, "totalProductPrice" integer NOT NULL, "productorderId" integer, "modifierId" integer, CONSTRAINT "PK_997d3a6bcfb004fce3a82193204" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_order" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "orderId" integer, CONSTRAINT "PK_9849f0d8ce095e50e752616f691" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "totalPrice" integer NOT NULL, "tax" integer NOT NULL, "status" text NOT NULL, "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "source" character varying NOT NULL, "amount" integer NOT NULL, "status" text NOT NULL, "currency" character varying NOT NULL, "description" character varying NOT NULL, "customer_token" character varying NOT NULL, "cardId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "external_id" character varying NOT NULL, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_64fcc7e081f386f2401fa9a5744" FOREIGN KEY ("labelId") REFERENCES "label"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod_to_prod" ADD CONSTRAINT "FK_c920772b4b0d6101255232f808d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod_to_prod" ADD CONSTRAINT "FK_7862c00879e361da5f47f812abf" FOREIGN KEY ("modifierId") REFERENCES "modifier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod_to_product_to_order" ADD CONSTRAINT "FK_12e8ae6eda9f9392a7bc86ee183" FOREIGN KEY ("productorderId") REFERENCES "product_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod_to_product_to_order" ADD CONSTRAINT "FK_d5e36824f74c7851ae7b447e077" FOREIGN KEY ("modifierId") REFERENCES "modifier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_42291ebe165058deecb017e652b" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_59c844d96a0248b1f7b0946a58b" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_59c844d96a0248b1f7b0946a58b"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_42291ebe165058deecb017e652b"`);
        await queryRunner.query(`ALTER TABLE "mod_to_product_to_order" DROP CONSTRAINT "FK_d5e36824f74c7851ae7b447e077"`);
        await queryRunner.query(`ALTER TABLE "mod_to_product_to_order" DROP CONSTRAINT "FK_12e8ae6eda9f9392a7bc86ee183"`);
        await queryRunner.query(`ALTER TABLE "mod_to_prod" DROP CONSTRAINT "FK_7862c00879e361da5f47f812abf"`);
        await queryRunner.query(`ALTER TABLE "mod_to_prod" DROP CONSTRAINT "FK_c920772b4b0d6101255232f808d"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_64fcc7e081f386f2401fa9a5744"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "product_order"`);
        await queryRunner.query(`DROP TABLE "mod_to_product_to_order"`);
        await queryRunner.query(`DROP TABLE "modifier"`);
        await queryRunner.query(`DROP TABLE "mod_to_prod"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "label"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
