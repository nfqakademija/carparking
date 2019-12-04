<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191204162720 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE users CHANGE user_role_id user_role_id INT DEFAULT NULL, CHANGE permanent_space_id permanent_space_id INT DEFAULT NULL, CHANGE licence_plate licence_plate VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE reservations CHANGE user_id user_id INT DEFAULT NULL, CHANGE park_space_id park_space_id INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE reservations CHANGE user_id user_id INT DEFAULT NULL, CHANGE park_space_id park_space_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE users CHANGE user_role_id user_role_id INT DEFAULT NULL, CHANGE permanent_space_id permanent_space_id INT DEFAULT NULL, CHANGE licence_plate licence_plate VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
    }
}
