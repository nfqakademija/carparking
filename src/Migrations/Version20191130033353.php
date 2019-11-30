<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191130033353 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE roles (id INT AUTO_INCREMENT NOT NULL, role VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, user_role_id INT DEFAULT NULL, permanent_space_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, status SMALLINT NOT NULL, away_status SMALLINT NOT NULL, email VARCHAR(255) NOT NULL, licence_plate VARCHAR(255) DEFAULT NULL, permanent_park_space VARCHAR(255) NOT NULL, INDEX IDX_1483A5E98E0E3CA6 (user_role_id), UNIQUE INDEX UNIQ_1483A5E98C6678E9 (permanent_space_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reservations (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, park_space_id INT DEFAULT NULL, reservation_date DATETIME NOT NULL, INDEX IDX_4DA239A76ED395 (user_id), INDEX IDX_4DA23962A00C5A (park_space_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_away (id INT AUTO_INCREMENT NOT NULL, away_user_id INT NOT NULL, away_start_date DATETIME NOT NULL, away_end_date DATETIME NOT NULL, INDEX IDX_DCDEEE18CB1A5639 (away_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE park_spaces (id INT AUTO_INCREMENT NOT NULL, number VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE users ADD CONSTRAINT FK_1483A5E98E0E3CA6 FOREIGN KEY (user_role_id) REFERENCES roles (id)');
        $this->addSql('ALTER TABLE users ADD CONSTRAINT FK_1483A5E98C6678E9 FOREIGN KEY (permanent_space_id) REFERENCES park_spaces (id)');
        $this->addSql('ALTER TABLE reservations ADD CONSTRAINT FK_4DA239A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE reservations ADD CONSTRAINT FK_4DA23962A00C5A FOREIGN KEY (park_space_id) REFERENCES park_spaces (id)');
        $this->addSql('ALTER TABLE user_away ADD CONSTRAINT FK_DCDEEE18CB1A5639 FOREIGN KEY (away_user_id) REFERENCES users (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE users DROP FOREIGN KEY FK_1483A5E98E0E3CA6');
        $this->addSql('ALTER TABLE reservations DROP FOREIGN KEY FK_4DA239A76ED395');
        $this->addSql('ALTER TABLE user_away DROP FOREIGN KEY FK_DCDEEE18CB1A5639');
        $this->addSql('ALTER TABLE users DROP FOREIGN KEY FK_1483A5E98C6678E9');
        $this->addSql('ALTER TABLE reservations DROP FOREIGN KEY FK_4DA23962A00C5A');
        $this->addSql('DROP TABLE roles');
        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE reservations');
        $this->addSql('DROP TABLE user_away');
        $this->addSql('DROP TABLE park_spaces');
    }
}
