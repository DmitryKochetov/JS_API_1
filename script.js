// Вы разрабатываете веб-страницу для отображения расписания занятий 
// в спортивном клубе. Каждое занятие имеет название, время проведения, 
// максимальное количество участников и текущее количество записанных 
// участников.

// 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью 
// для отображения занятий.
// 2. Загрузите информацию о занятиях из предоставленных JSON-данных. 
// Каждое занятие должно отображаться на странице с указанием его названия, 
// времени проведения, максимального количества участников и текущего 
// количества записанных участников.
// 3. Пользователь может нажать на кнопку "Записаться" для записи 
// на занятие. Если максимальное количество участников уже достигнуто, 
// кнопка "Записаться" становится неактивной.
// 4. После успешной записи пользователя на занятие, обновите 
// количество записанных участников и состояние кнопки "Записаться".

const Lessons = [
  {
    id: Date.now(),
    title: "Занятие 1",
    date: "01.01.2025",
    maxAppointments: 10,
    currentAppinement: 3
  },
  {
    id: Date.now()+1,
    title: "Занятие 2",
    date: "02.01.2025",
    maxAppointments: 15,
    currentAppinement: 2
  },
  {
    id: Date.now()+2,
    title: "Занятие 3",
    date: "03.01.2025",
    maxAppointments: 5,
    currentAppinement: 1
  },
];

saveLessonsToLocalStorage(Lessons);
renderLessonsList(Lessons);

function saveLessonsToLocalStorage(Lessons) {
  localStorage.setItem("Lessons", JSON.stringify(Lessons));
}

function getLessonsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("Lessons"));
}

function renderLessonsList(Lessons) {
  const LessonsList = Lessons
    .map((item) => renderLesson(item))
    .join("");
  document.querySelector(".list-group").innerHTML = LessonsList;
}

function renderLesson(item) {
  return `<div>
            <h2>${item.title}</h2>
            <h3>${item.date}</h3>
            <p>Максимальное кол-во участников: ${item.maxAppointments}</p>
            <p>Текущее кол-во участников: ${item.currentAppinement}</p>
            <button class="appointmentBtn" data-id="${item.id}">Записаться</button>
        </div>`;
}

const wrapper = document.querySelector(".list-group");

wrapper.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("appointmentBtn")) {
    appointmentHandler(target);
  }
});

function appointmentHandler(target) {
    const id = target.getAttribute("data-id");
    console.log(id);
    addLessonsAppointmentFromLocalStorage(id, target);
    renderLessonsList(getLessonsFromLocalStorage());
}

function addLessonsAppointmentFromLocalStorage(id, target) {
    let lessons = getLessonsFromLocalStorage();
    for (let i = 0; i < lessons.length; i++) {
        if (lessons[i].id == id) {
          if (lessons[i].currentAppinement < lessons[i].maxAppointments) {
            lessons[i].currentAppinement++;
          } else target.setAttribute('disabled', '');
        }
        saveLessonsToLocalStorage(lessons);
    }
}