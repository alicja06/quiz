const questions = [
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

// Funkcja 50:50
document.getElementById('lifeline-50-50').addEventListener('click', () => {
    const correctAnswer = questions[currentQuestion].answer;
    const options = document.querySelectorAll('input[name="option"]');
    let removed = 0;

    // Usuń dwa błędne odpowiedzi
    options.forEach((option, index) => {
        if (index !== correctAnswer && removed < 2) {
            option.parentElement.style.display = 'none'; // Ukryj odpowiedź
            removed++;
        }
    });

    // Zablokuj możliwość użycia koła ratunkowego ponownie
    document.getElementById('lifeline-50-50').disabled = true;
});

// Funkcja ładująca pytania
function loadQuestion() 
{
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');
    const cashElement = document.getElementById('cash');

    if (currentQuestion < questions.length) 
        {
        questionElement.textContent = questions[currentQuestion].question;
        optionsElement.innerHTML = '';
        questions[currentQuestion].options.forEach((option, index) => {
            optionsElement.innerHTML += `<div><input type="radio" name="option" value="${index}" id="option${index}"><label for="option${index}">${option}</label></div>`;
        });
        resultElement.textContent = '';
    } 
    else 
    {
        questionElement.textContent = 'Gra zakończona!';
        optionsElement.innerHTML = '';
        document.getElementById('submit').style.display = 'none';
    }
    cashElement.textContent = `Zarobione: ${totalCash} zł`;
}

// Rozpoczęcie gry po kliknięciu przycisku
document.getElementById('start-game').addEventListener('click', () => 
{
    document.getElementById('welcome-panel').style.display = 'none'; // Ukryj panel powitalny
    document.getElementById('game').style.display = 'block'; // Pokaż grę
    document.getElementById('quit').style.display = 'none';
    loadQuestion(); // Załaduj pierwsze pytanie
});

// Obsługa zatwierdzania odpowiedzi
document.getElementById('submit').addEventListener('click', () => 
{
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption)
    {
        const answer = parseInt(selectedOption.value);
        if (answer === questions[currentQuestion].answer) 
        {
            totalCash += questions[currentQuestion].prize;
            document.getElementById('result').textContent = 'Poprawna odpowiedź!';
            document.getElementById('quit').style.display = 'none'; 
        } 
        else
        {
            document.getElementById('result').textContent = 'Błędna odpowiedź!';
            document.getElementById('submit').style.display = 'none'; // Ukryj przycisk zatwierdzania
            document.getElementById('quit').style.display = 'block'; // Pokaż przycisk zakończenia gry
            return;
        }
        currentQuestion++;
        loadQuestion();
    } 
    else 
    {
        alert('Wybierz odpowiedź!');
    }
});

// Zakończenie gry
document.getElementById('quit').addEventListener('click', () => {
    alert('Dziękujemy za grę!');
    location.reload();
});
