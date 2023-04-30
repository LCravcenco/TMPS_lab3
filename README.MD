# Adapter Pattern
Adapter Pattern este utilizat în două locuri diferite.

- Primul loc este cu clasa BookAdapter. În momentul în care se adaugă o carte nouă în bibliotecă prin apăsarea butonului "Add Book", se creează un obiect Book cu titlul specificat, se împachetează într-un obiect SpecialItem, care devine un adaptor, și apoi acest adaptor este adăugat în colecția de cărți a bibliotecii.Apoi, când se dorește ștergerea unei cărți din bibliotecă prin apăsarea butonului "Delete Book", fiecare carte este comparată cu titlul specificat de utilizator. Deoarece obiectul stocat în colecția de cărți a bibliotecii este un adaptor, acesta trebuie să aibă o metodă getName() pentru a fi comparat cu titlul specificat. BookAdapter este creat pentru a adapta obiectul Book la metoda getName() a clasei SpecialItem.

- Al doilea loc este cu clasa AuthorAdapter. Acesta este folosit în același mod ca BookAdapter, dar pentru obiecte Author în loc de obiecte Book. Adaptorul AuthorAdapter este creat atunci când se adaugă un autor nou în bibliotecă prin apăsarea butonului "Add Author", iar apoi este utilizat pentru a adapta obiectul Author la metoda getName() a clasei SpecialItem pentru a fi afișat în lista de autori.
```
class BookAdapter {
    constructor(book) {
        this.book = book;
    }

    getName() {
        return this.book.getTitle();
    }
}

class AuthorAdapter {
    constructor(author) {
        this.author = author;
    }

    getName() {
        return this.author.getName();
    }
}
```
# Bridge Pattern
Bridge pattern este utilizat pentru a separa modul în care datele din bibliotecă sunt afișate de modul în care acestea sunt stocate și reprezentate intern în codul aplicației.

* Clasele LibraryRenderer și ListRenderMethod alcătuiesc Bridge pattern-ul, unde LibraryRenderer este clasa abstractă pentru modulul de randare, care definește metoda render care primește un obiect de date și îl afișează folosind modul de randare specificat prin intermediul proprietății renderMethod. ListRenderMethod este clasa concretă care implementează metoda render și se ocupă de randarea datelor într-un element HTML de tip listă.

Acest pattern permite schimbarea ușoară a modului de randare a datelor fără a afecta codul care stochează și gestionează datele din bibliotecă. De exemplu, dacă dorim să schimbăm modul de randare a datelor dintr-o listă într-un tabel, putem crea o nouă clasă de modul de randare care implementează metoda render și să o utilizăm în instanțierea clasei LibraryRenderer.
```
	class LibraryRenderer {
    constructor(renderMethod) {
        this.renderMethod = renderMethod;
    }

    render(data) {
        this.renderMethod.render(data);
    }
}

class ListRenderMethod {
    constructor(parentElement) {
        this.parentElement = parentElement;
    }

    render(data) {
        const listItem = document.createElement("li");
        listItem.textContent = data.getName();
        this.parentElement.appendChild(listItem);
    }
}
```
# Composite Pattern
Composite pattern e utilizat în clasa LibraryItemCollection. Aceasta este o clasă de colecții care poate conține obiecte de diferite tipuri, inclusiv cărți și autori, care sunt de asemenea colecții. Aceasta îndeplinește principiul compoziției, în care un obiect poate să conțină alte obiecte similare sau diverse, iar acestea sunt tratate uniform ca și cum ar fi un singur obiect.
	
* În cadrul funcției render din clasa LibraryItemCollection, colecția iterază prin toate obiectele și apoi utilizează metoda render a obiectului de tip LibraryRenderer, care face apel la metoda render a obiectului de tip ListRenderMethod pentru a afișa elementele în listă. Aceasta îndeplinește principiul deschis-închis, care permite adăugarea de noi clase în sistem fără a fi necesară modificarea codului existent, deoarece aceste noi clase trebuie doar să respecte interfața existentă.
```
	class LibraryItemCollection {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    render(renderer) {
        this.items.forEach(item => renderer.render(item));
    }
}
```

# Decorator Pattern
Decorator pattern este utilizat prin clasa SpecialItem. Această clasă servește ca un decorator pentru obiectele Book și Author prin adăugarea unui asterisc la început și la sfârșitul numelor lor atunci când sunt afișate. În loc să modificați direct clasa Book și Author, acestea sunt decorate prin intermediul clasei SpecialItem. Aceasta permite adăugarea de comportament suplimentar la obiectele existente, fără a afecta clasa de bază, și asigură o mai mare flexibilitate în programare.
```
class SpecialItem {
    constructor(item) {
        this.item = item;
    }

    getName() {
        return `*${this.item.getName()}*`;
    }
}
```