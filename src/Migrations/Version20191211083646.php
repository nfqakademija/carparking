<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191211083646 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE user_away_users');
        $this->addSql('DROP TABLE user_aways');
        $this->addSql('ALTER TABLE users CHANGE user_role_id user_role_id INT DEFAULT NULL, CHANGE permanent_space_id permanent_space_id INT DEFAULT NULL, CHANGE surname surname VARCHAR(255) DEFAULT NULL, CHANGE status status SMALLINT DEFAULT NULL, CHANGE away_status away_status SMALLINT DEFAULT NULL, CHANGE email email VARCHAR(255) DEFAULT NULL, CHANGE licence_plate licence_plate VARCHAR(255) DEFAULT NULL, CHANGE permanent_park_space permanent_park_space VARCHAR(255) DEFAULT NULL, CHANGE created_at created_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE reservations CHANGE user_id user_id INT DEFAULT NULL, CHANGE park_space_id park_space_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_away ADD away_user_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_away ADD CONSTRAINT FK_DCDEEE18CB1A5639 FOREIGN KEY (away_user_id) REFERENCES users (id)');
        $this->addSql('CREATE INDEX IDX_DCDEEE18CB1A5639 ON user_away (away_user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user_away_users (user_away_id INT NOT NULL, users_id INT NOT NULL, INDEX IDX_A4C2B2C367B3B43D (users_id), INDEX IDX_A4C2B2C3D5E21695 (user_away_id), PRIMARY KEY(user_away_id, users_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE user_aways (user_id INT NOT NULL, away_user_id INT NOT NULL, INDEX IDX_8BE89B3CB1A5639 (away_user_id), INDEX IDX_8BE89B3A76ED395 (user_id), PRIMARY KEY(user_id, away_user_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE user_away_users ADD CONSTRAINT FK_A4C2B2C367B3B43D FOREIGN KEY (users_id) REFERENCES users (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_away_users ADD CONSTRAINT FK_A4C2B2C3D5E21695 FOREIGN KEY (user_away_id) REFERENCES user_away (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_aways ADD CONSTRAINT FK_8BE89B3A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE user_aways ADD CONSTRAINT FK_8BE89B3CB1A5639 FOREIGN KEY (away_user_id) REFERENCES user_away (id)');
        $this->addSql('ALTER TABLE reservations CHANGE user_id user_id INT DEFAULT NULL, CHANGE park_space_id park_space_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_away DROP FOREIGN KEY FK_DCDEEE18CB1A5639');
        $this->addSql('DROP INDEX IDX_DCDEEE18CB1A5639 ON user_away');
        $this->addSql('ALTER TABLE user_away DROP away_user_id');
        $this->addSql('ALTER TABLE users CHANGE user_role_id user_role_id INT DEFAULT NULL, CHANGE permanent_space_id permanent_space_id INT DEFAULT NULL, CHANGE surname surname VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE status status SMALLINT DEFAULT NULL, CHANGE away_status away_status SMALLINT DEFAULT NULL, CHANGE email email VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE licence_plate licence_plate VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE permanent_park_space permanent_park_space VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE created_at created_at DATETIME DEFAULT \'NULL\'');
    }
}
