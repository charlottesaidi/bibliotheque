Bibliotheque
========================

Started as a little side project to learn the Angular framework, this library project is built as a virtual bookcase. An online tool only destined for my own usage as I started to have way too many ebooks stored on my phone. 

- [Server](#server)
  - [Requirements](#requirements)
  - [Installation](#installation)
    - [Database](#database)
  - [Usage](#usage)
- [Client](#client)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)

## Server

### Requirements

  * PHP 8.0.8 or higher

### Installation

```cmd 
composer install
```  

Create a .env.local and configure your .env variables : database and keys.

#### Database 

Create the database :
```cmd
symfony console doctrine:database:create
```

Run migrations :
```cmd
symfony console doctrine:migrations:migrate
```

### Usage

There's no need to configure anything to run the application. If you have
installed Symfony binary, run this command:

```cmd
symfony serve
```

Then access the application in your browser at the given URL (`https://localhost:8000` by default).

If you don't have the Symfony binary installed, run `php -S localhost:8000 -t public/`
to use the built-in PHP web server or configure a web server like Nginx or
Apache to run the application.

## Client

### Requirements

  * Node 16.13.1
  * React 18.2.0

### Installation

Install node module dependencies:

```cmd
yarn install
```

### Usage

For the dev server run:

```cmd
yarn start
```

Navigate to `http://localhost:3000`. The application will automatically reload if you change any of the source files.
