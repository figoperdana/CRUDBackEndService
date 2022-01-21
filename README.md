# KumparanInternTest

**CARA INSTALASI**

 1. Jalankan perintah

    `npm install` 
    
2. Buat dan Masukkan Database di PhpMyadmin Localhost server (XAMPP/Laragon)
   
   Nama Database : articles
   
   Query :
   
         create table `authors` (
        `id` int unsigned not null auto_increment,
        `name` text not null,
        primary key(`id`)
        );
        create table `articles` (
        `id` int unsigned not null auto_increment,
        `author_id` int unsigned null,
        `title` text not null,
        `body` text not null,
        `created_at` timestamp null,
        index pn_author_index(`author_id`),
        foreign key (`author_id`) references authors(`id`) on delete cascade,
        primary key(`id`) 
        );
      
 3. Jalankan perintah

    `npm start` 
    
 4. Jalankan di web browser 

    http://localhost:3000/
    atau
    http://localhost:3000/articles
    
 5. Jalankan Unit Test (Mochai) dengan perintah :

    `npm test` 
    
