Dokumentacja Projektu: Szkolny Sklepik

Opis projektu:

Szkolny Sklepik to aplikacja internetowa umożliwiająca użytkownikom przeglądanie produktów, składanie zamówień oraz zarządzanie produktami przez administratora.

Technologie:
	•	Frontend:
	    •	React (React Router, Bootstrap, css)
	•	Backend:
	    •	Node.js
	    •	Express.js
	    •	MongoDB (Mongoose)
	•	Biblioteki dodatkowe:
	    •	WebSocket
	    •	dotenv
	    •	body-parser
	    •	cors

Instalacja i uruchomienie:

1. Klonowanie repozytorium

    git clone https://github.com/Teiko303/sklepik_szkolny
    cd szkolny-sklepik

2.	Przejdź do folderu backend:

    cd szkolny-sklepik-backend

3.	Zainstaluj zależności:

    npm install

4.	utwórz Admina: 

    node addAdmin.js

5.	Uruchom serwer:

    node server.js

6.	Przejdź do folderu frontend:

    cd szkolny-sklepik-frontend

7.	Zainstaluj dodatkowe biblioteki:

    npm install express mongoose cors body-parser dotenv ws axios

8.	Uruchom aplikację React w trybie produkcyjnym:

    1. npm run build

    2. serve -s build

9.	Aplikacja będzie dostępna pod adresem:

    http://localhost:3000

Funkcjonalności:

1. Użytkownik
	•	Rejestracja i logowanie.
	•	Przeglądanie listy produktów.
	•	Dodawanie produktów do koszyka.
	•	Składanie zamówień.

2. Administrator
	•	Zarządzanie produktami (dodawanie, edycja, usuwanie).

Struktura projektu:

    Frontend (szkolny-sklepik-frontend/):

        src/
        ├── components/
        │   ├── admin/
        │   │   ├── AdminDashboard.js
        │   │   ├── OrderManager.js
        │   │   └── ProductManager.js
        │   ├── common/
        │   │   ├── Navbar.js
        │   │   ├── Footer.js
        │   │   ├── Login.js
        │   │   └── Register.js
        │   ├── products/
        │   │   ├── ProductCard.js
        │   │   └── ProductList.js
        │   └── cart/
        │       └── Cart.js
        ├── App.js
        └── index.js

    Backend (szkolny-sklepik-backend/):

        szkolny-sklepik-backend/
        ├── models/
        │   ├── Order.js
        │   ├── Product.js
        │   └── User.js
        ├── routes/
        │   ├── orderRoutes.js
        │   ├── productRoutes.js
        │   └── userRoutes.js
        ├── .env
        ├── server.js
        └── package.json

Autor: Filip Bugaj