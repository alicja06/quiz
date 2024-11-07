const questions = [ //const = coś stałego, tutaj tworzymy tablicę pytań
    {
        question: "Jakie drewno jest najlepsze do palenia w kominku?",
        options: ["Dąb", "Sosna", "Topola", "Brzoza"],
        answer: 0,
        prize: 500 
    },

    {
        question: "Jak często powinno się przeprowadzać przegląd kominka?",
        options: ["Co dwa lata", "Raz w roku", "Dwa razy w roku", "Raz na pięć lat"],
        answer: 1,
        prize: 1000
    },

    {
        question: "Co to jest sprawność energetyczna pieca?",
        options: ["Miara efektywności, z jaką piec przekształca dostarczaną mu energię z paliwa w ciepło", "Określa zapotrzebowanie paliwa do pracy", "Odnosi się do emisji zanieczyszczeń, jaką piec produkuje podczas pracy", "Oznacza moc pieca"],
        answer: 0,
        prize: 2000
    },

    {
        question: "Jak działa kominek konwekcyjny?",
        options: ["Wykorzystuje promieniowanie cieplne", "Podgrzewa wodę, która następnie krąży po całym systemie ogrzewania", "Spala paliwo stałe", "Przekazuje ciepło poprzez ruch powietrza"],
        answer: 3,
        prize: 5000
    },

    {
        question: "Jakie są najczęstsze przyczyny dymienia kominka?",
        options: ["Złe ułożenie drewna", "Zatkany komin", "Wilgotne drewno", "Wszystkie odpowiedzi są prawidłowe"],
        answer: 3,
        prize: 10000
    },

    {
        question: "Co to jest kreozot?",
        options: ["Rodzaj paliwa wykorzystywanego w piecach", "Substancja powstająca podczas nieodpowiedniego spalania drewna mogąca osadzać się w kominie", "Silny środek czyszczący do kominków", "Materiał izolacyjny używany do budowy pieców"],
        answer: 1,
        prize: 20000
    },

    {
        question: "Kim jest zdun?",
        options: ["Miłośnik kominków", "Ekspert w sprawie doradztwa kominków", "Specjalista od budowy i naprawy pieców", "Sprzedawca pieców i kominków"],
        answer: 2,
        prize: 40000
    },

    {
        question: "Za co odpowiada płaszcz wodny w kominkach i piecach?",
        options: ["Podgrzewa wodę użytkową i wpływa na wydajniejsze wykorzystanie ciepła", "Zmniejsza wilgotność w pomieszczeniu poprzez odparowywanie", "Zwiększa wilgotność w pomieszczeniu, nawilżając otoczenie i wpływa na samopoczucie domowników", "Filtruje wodę w systemie grzewczym"],
        answer: 0,
        prize: 75000
    },

    {
        question: "Ile powinna wynosić optymalna wilgotność drewna opałowego, aby zapewnić efektywne spalanie?",
        options: ["5-10%", "15-20%", "30-35%", "40-45%"],
        answer: 1,
        prize: 125000
    },

    {
        question: "Co to jest grudziądzka?",
        options: ["Metoda zdobienia pieców", "Element dekoracyjny kominków", "Nowoczesny kominek kaflowy", "Tradycyjna kuchnia węglowa"],
        answer: 3,
        prize: 250000
    },

    {
        question: "Co wyróżnia piec kaflowy od innych?",
        options: ["Nie wymaga wentylacji", "Lepiej akumuluje ciepło", "Jest łatwiejszy w montażu", "Jest dużo tańszy"],
        answer: 1,
        prize: 5000000
    },

    {
        question: "Czego dotyczy Ekoprojekt?",
        options: ["Są to wymogi środowiskowe, jakie musi spełniać urządzenie grzewcze", "Jest to lokalny projekt zachęcający do wymiany kominków na nowocześniejsze urządzenia grzewcze", "Ściśle określa rodzaj paliwa, jaki można wykorzystywać do palenia w urządzeniach grzewczych", "Reguluje rodzaj materiałów używanych do budowy urządzeń grzewczych, aby produkcja była ekologiczna"],
        answer: 0,
        prize: 1000000
    }

];

let currentQuestion = 0; 
let totalCash = 0; 

// Rozpoczęcie gry po kliknięciu przycisku
document.getElementById('start-game').addEventListener('click', () => //sprawdza czy ktoś kliknął ROZPOCZNIJ GRĘ i uruchamia funkcję:
{
    document.getElementById('welcome-panel').style.display = 'none'; // Ukryj panel powitalny
    document.getElementById('game').style.display = 'block'; // Pokaż grę
    document.getElementById('quit').style.display = 'none'; //ukrywa przycisk zakończenia gry
    loadQuestion(); // Załaduj pierwsze pytanie
});

// Funkcja ładująca pytania
function loadQuestion() 
{
    const questionElement = document.getElementById('question'); //pobiera element html z id question do wyświetlenia treści pytania
    const optionsElement = document.getElementById('options'); //pobiera element html z id options do wyświetlenia odpowiedzi
    const resultElement = document.getElementById('result'); //pobiera element html z id result, aby pokazać wynik (poprawna/błędna odpowiedź)
    const cashElement = document.getElementById('cash'); //pobiera element html z id cash do wyświetlenia nagrody

    if (currentQuestion < questions.length) //sprawdza czy obecne pytanie istnieje czy nie jesteśmy na końcu
        {
        questionElement.textContent = questions[currentQuestion].question; //wstawia treść obecnego pytania do questionElement
        optionsElement.innerHTML = ''; //czyści poprzednie odpowiedzi
        questions[currentQuestion].options.forEach((option, index) => 
        {
            optionsElement.innerHTML += `<div><input type="radio" name="option" value="${index}" id="option${index}"><label for="option${index}">${option}</label></div>`; 
        });
        resultElement.textContent = ''; //czyści wynik z poprzedniego pytania (np. poprawna odpowiedź)
    } 
    else //jeśli nie ma już pytań to:
    {
        questionElement.textContent = 'Gra zakończona!'; //wstawia tekst o zakończeniu gry
        optionsElement.innerHTML = ''; //czyści odpowiedzi
        document.getElementById('submit').style.display = 'none'; //ukrywa przycisk zatwierdź
    }
    cashElement.textContent = `Zarobione: ${totalCash} zł`; //wyświetla aktualną kwotę zarobioną przez gracza
}

// Funkcja 50:50
document.getElementById('lifeline-50-50').addEventListener('click', () => //dodajemy możliwość kliknięcia na lifeline, po tym zostanie wykonana następująca funkcja:
{
    const correctAnswer = questions[currentQuestion].answer; //pobiera indeks poprawnej odpowiedzi dla obecnego pytania
    const options = document.querySelectorAll('input[name="option"]'); //pobiera wszystkie pola odpowiedzi (input) jako listę
    let removed = 0; //tworzy licznik, który pozwala usunąć tylko dwie błędne odpowiedzi

    // Usuń dwie błędne odpowiedzi
    options.forEach((option, index) => //dla każdej odpowiedzi sprawdza czy indeks odpowiedzi różni się od indeksu poprawnej odpowiedzi
    {
        if (index !== correctAnswer && removed < 2) //jeśli odpowiedź nie jest poprawna i usunięto mniej niż 2 odpowiedzi to:
        {
            option.parentElement.style.display = 'none'; // Ukryj odpowiedź
            removed++;
        }
    });

    // Zablokuj możliwość użycia koła ratunkowego ponownie
    document.getElementById('lifeline-50-50').disabled = true;
});

document.getElementById('lifeline-phone').addEventListener('click', () => //sprawdza czy ktoś kliknął w telefon do przyjaciela
{
    const correctAnswer = questions[currentQuestion].answer; //zapisuje indeks poprawnej odpowiedzi na aktualne pytanie
    const options = questions[currentQuestion].options; //zapisuje dostępne opcje odpowiedzi dla aktualnego pytania
    let friendAnswer; //tutaj deklarujemy zmienną, która będzie przechowywać odpowiedź przyjaciela

    // Szansa 70% na poprawną odpowiedź, 30% na inną
    if (Math.random() < 0.7) 
    {
        friendAnswer = correctAnswer; //70% że poda dobrą odpowiedź
    } 
    else //w innym przypadku:
    {
        do 
        {
            friendAnswer = Math.floor(Math.random() * options.length); //losowanie odpowiedzi
        } 
        while (friendAnswer === correctAnswer); // Upewnij się, że nie zgadnie prawidłowej odpowiedzi przez przypadek
    }

    // Pokaż odpowiedź przyjaciela w oknie HTML
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Twój przyjaciel sugeruje odpowiedź (psst! Może się mylić...): "${options[friendAnswer]}"`;
    
    // Wyłącz przycisk "Telefon do przyjaciela" po jednym użyciu
    document.getElementById('lifeline-phone').disabled = true;
});

// Obsługa przycisku "Zapytaj publiczność"
document.getElementById('lifeline-audience').addEventListener('click', () => //czeka aż ktoś kliknie, wtedy się uruchamia funkcja:
{
    const correctAnswer = questions[currentQuestion].answer;
    const options = questions[currentQuestion].options;
    
    // Generowanie procentowych wyników dla każdej opcji, tworzy tablicę, nie wiem, czarna magia
    let audienceVotes = new Array(options.length).fill(0);

    // Ustalanie prawdopodobieństwa dla poprawnej odpowiedzi
    audienceVotes[correctAnswer] = Math.floor(Math.random() * 20) + 80; 

    // Ustalanie prawdopodobieństwa dla pozostałych odpowiedzi
    let remainingPercentage = 100 - audienceVotes[correctAnswer]; //oblicza ile procent głosów pozostaje do przyznania innym odpowiedziom
    for (let i=0; i<options.length; i++)
    {
        if (i !== correctAnswer) {
            let percentage = Math.floor(Math.random() * remainingPercentage);
            audienceVotes[i] = percentage;
            remainingPercentage -= percentage;
        } //przyznaje odpowiedziom losowe procenty, upewniając się, że nie przyznaje ich poprawnej odpowiedzi
    }
    // Przyznaj resztę procentów ostatniej opcji
    audienceVotes[options.length - 1] += remainingPercentage;

    // Wyświetlanie wyników w HTML jako lista
    const audienceResultElement = document.getElementById('audienceResultText'); 
    const ul = document.createElement('ul'); // Tworzymy nowy element ul

    options.forEach((option, index) => 
    {
        const li = document.createElement('li'); // Tworzymy nowy element li
        li.textContent = `${option}: ${audienceVotes[index]}%`; // Ustawiamy tekst elementu listy
        ul.appendChild(li); // Dodajemy element li do ul
    });

    audienceResultElement.innerHTML = ''; // Czyścimy poprzednie wyniki
    audienceResultElement.appendChild(ul); // Dodajemy ul do div

    // Wyłącz przycisk po użyciu
    document.getElementById('lifeline-audience').disabled = true;
    
    // Pokazanie przycisku zamykającego
    const closeResultButton = document.getElementById('close-audience-result');
    closeResultButton.style.display = 'block';

    closeResultButton.addEventListener('click', () => //dodajemy funkcjonalność dla przycisku 
    {
        audienceResultElement.innerHTML = ''; // Czyścimy wyniki
        closeResultButton.style.display = 'none'; // Ukrywamy przycisk
    });
});

let lifelinesUsed = false; // Nowa zmienna do śledzenia użycia kół ratunkowych

// Funkcja do sprawdzania odpowiedzi
document.getElementById('submit').addEventListener('click', () => //sprawdza czy ktoś kliknął w ZATWIERDŹ
{
const options = document.querySelectorAll('input[name="option"]'); //zbiera wszystkie opcje odpowiedzi w tablicy options
let selectedAnswer; //deklarujemy zmienną, która przechowuje wartość wybranej odpowiedzi
options.forEach((option) => //sprawdza która odpowiedź została wybrana
    {
    if (option.checked) 
        {
        selectedAnswer = parseInt(option.value); //jeśli odpowiedź jest zaznaczona, przypisuje jej wartość do selectedAnswer
        }
    });

   //Sprawdź, czy odpowiedź została wybrana
    if (selectedAnswer === undefined) 
    {
        alert('Proszę wybrać odpowiedź!');
        return;
    }

    const correctAnswer = questions[currentQuestion].answer; //zapisuje poprawną odpowiedź dla aktualnego pytania

    // Sprawdź odpowiedź
    if (selectedAnswer === correctAnswer) 
    {
        totalCash = questions[currentQuestion].prize; // Zaktualizuj nagrodę
        // Zaktualizuj komunikat o zdobytej nagrodzie na stronie
        const cashElement = document.getElementById('cash'); //zaktualizuj nagrodę
        cashElement.textContent = `Zarobione: ${totalCash} zł`; //wyświetla aktualną kwotę nagrody
        document.getElementById('result').style.display = 'block'; //pokazuje komunikat o poprawnej odpowiedzi
        document.getElementById('result').textContent = 'Poprawna odpowiedź!';
        document.getElementById('quit').style.display = 'none'; 

        currentQuestion++; 
        loadQuestion(); // Tylko po poprawnej odpowiedzi ładujemy nowe pytanie
    } 
    else //jeśli odpowiedź jest błędna to:
    {
        document.getElementById('result').style.display = 'block'; 
        document.getElementById('result').textContent = 'Błędna odpowiedź!'; //wyświetla komunikat
        document.getElementById('submit').style.display = 'none'; // Ukryj przycisk zatwierdzania
        document.getElementById('quit').style.display = 'block'; // Pokaż przycisk zakończenia gry
        if (!lifelinesUsed) //jeśli były używane koła ratunkowe to:
        {
            document.getElementById('lifeline-phone').disabled = true;
            document.getElementById('lifeline-audience').disabled = true;
            document.getElementById('lifeline-50-50').disabled = true;
            lifelinesUsed = true; // Ustaw flagę na true
        }
        return;
    }

    currentQuestion++; 
    loadQuestion(); 
});


// Zakończenie gry
document.getElementById('quit').addEventListener('click', () => //sprawdza czy ktoś kliknął w ZAKOŃCZ
{
    alert('Dziękujemy za grę!');
    location.reload(); //odświeża stronę
});
