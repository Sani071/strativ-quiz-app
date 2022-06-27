import DB from "./IDB";
import seeds from "../seeds.json";

const onRequestError = (e) => {
  console.log("Database Error", e);
};

const userStore = "user";
const quizStore = "quiz";
const questionStore = "question";

/**
 * Register a new user to the database
 *
 * @param {Object} userInfo - user information, (should contains email, password, role)
 */
export const doSignUp = (userInfo, callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([userStore], "readwrite");
    const store = transaction.objectStore(userStore);
    const myIndex = store.index("email");
    const getRequest = myIndex.get(userInfo?.email);
    getRequest.onsuccess = function () {
      if (getRequest.result) {
        callback("email already exists");
      } else {
        store.add(userInfo);
        callback();
      }
    };
  };
};

/**
 *
 * @param {string} email
 * @param {*} password
 * @param {*} callback
 */
export const doSignIn = (email, password, callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([userStore], "readwrite");
    const store = transaction.objectStore(userStore);
    const myIndex = store.index("email");
    const getRequest = myIndex.get(email);
    getRequest.onsuccess = function () {
      const user = getRequest.result;
      if (user) {
        if (user.password === password) {
          callback(true, user.role, "login successful");
        } else {
          callback(false, null, "password incorrect");
        }
      } else {
        callback(false, null, "Any account not found with this email");
      }
    };
  };
};

/**
 * storing quiz to IndexDB
 * @param {Object} quiz - Quiz data to store in IndexDB
 */
export const addQuiz = (quiz) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([quizStore], "readwrite");
    const store = transaction.objectStore(quizStore);
    store.add(quiz);
  };
};

/**
 * Retrieving quiz from IndexDB
 * @param {Function} callback - callback function to invocation with result
 */
export const getQuiz = (callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([quizStore], "readonly");
    const store = transaction.objectStore(quizStore);
    store.getAll().onsuccess = (ev) => {
      callback(ev.target.result);
    };
  };
};

/**
 * Retrieving layout of a quiz by id from IndexDB
 * @param {string} id - Id of the quiz to retrieve
 * @param {Function} callback - callback function to invocation with result
 */
export const fetchQuizLayoutById = (id, callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([quizStore], "readonly");
    const store = transaction.objectStore(quizStore);
    store.get(id).onsuccess = (ev) => {
      const quiz = ev.target.result;
      callback(quiz?.layout?.value || "single");
    };
  };
};

/**
 * storing question to IndexDB
 * @param {Object} question - question object to save on IndexDB
 */
export const addQuestion = (question) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([questionStore], "readwrite");
    const store = transaction.objectStore(questionStore);
    store.add(question);
  };
};

/**
 * Updating question by ID
 * @param {Object} question - question object to update on IndexDB
 * @param {Object} updateId - question id to update on IndexDB
 */
export const updateQuestionById = (question, updateId, callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([questionStore], "readwrite");
    const store = transaction.objectStore(questionStore);
    store.get(updateId).onsuccess = (ev) => {
      const targetQuestion = ev.target.result;
      const newData = {
        ...targetQuestion,
        ...question,
      };
      store.put(newData);
      callback();
    };
  };
};

/**
 * Updating question by ID
 * @param {Object} updateId - question id to update on IndexDB
 */
export const archiveQuestionById = (updateId, callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([questionStore], "readwrite");
    const store = transaction.objectStore(questionStore);
    store.get(updateId).onsuccess = (ev) => {
      const targetQuestion = ev.target.result;
      const newData = {
        ...targetQuestion,
        isArchived: true,
      };
      store.put(newData);
      callback();
    };
  };
};

/**
 * Retrieving question by quiz id from IndexDB
 * @param {string} quizId - quiz id to retrieve
 * @param {Function} callback - callback function to invocation with result
 */
export const fetchQuestionByQuizId = (quizId, callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([questionStore], "readonly");
    const store = transaction.objectStore(questionStore);
    store.getAll().onsuccess = (ev) => {
      const questions = ev.target.result;
      let payload = [];
      if (Array.isArray(questions)) {
        payload = questions.filter(
          (question) => !question.isArchived && question.quizId === quizId
        );
      }
      callback(payload);
    };
  };
};
/**
 * Retrieving all archived questions
 * @param {Function} callback - callback function to invocation with result
 */
export const fetchArchivedQuestion = (callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([questionStore], "readonly");
    const store = transaction.objectStore(questionStore);
    store.getAll().onsuccess = (ev) => {
      const questions = ev.target.result;
      let payload = [];
      if (Array.isArray(questions)) {
        payload = questions.filter((question) => question.isArchived);
      }
      callback(payload);
    };
  };
};

/**
 *
 * @param {number} id         - The id of the targeted question that needs to be restored.
 * @param {Function} callback - callback function to invocation when work has done
 */
export const restoreArchivedQuestion = (id, callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([questionStore], "readwrite");
    const store = transaction.objectStore(questionStore);
    store.get(id).onsuccess = (ev) => {
      const targetQuestion = ev.target.result;
      const newData = {
        ...targetQuestion,
        isArchived: false,
      };
      store.put(newData);
      callback();
    };
  };
};

/**
 * Retrieving question by id from IndexDB
 * @param {string} questionId - question id to retrieve
 * @param {Function} callback - callback function to invocation with result
 */
export const fetchQuestionById = (questionId, callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([questionStore], "readonly");
    const store = transaction.objectStore(questionStore);
    store.get(questionId).onsuccess = (ev) => {
      callback(ev.target.result);
    };
  };
};

/**
 * Getting how much questions are available available by quizId
 * @param {Object} quizId - Quiz id to get the questions
 * @param {Function} callback - callback function to invocation with result
 */
export const countQuestionByQuizId = (quizId, callback = () => { }) => {
  const request = DB();

  request.onerror = onRequestError;

  request.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction([questionStore], "readonly");
    const store = transaction.objectStore(questionStore);
    store.getAll().onsuccess = (ev) => {
      const questions = ev.target.result;
      let payload = [];
      if (Array.isArray(questions)) {
        payload = questions.filter(
          (question) => question.quizId === quizId
        ).length;
      }
      callback(payload);
    };
  };
};

export const feedingDummyData = () => {
  const feeder = (feeds = [], method, cb = () => { }) => {
    feeds.forEach(feed => {
      method(feed, cb)
    })
  };

  feeder(seeds.quiz, addQuiz);
  feeder(seeds.question, addQuestion);
  feeder(seeds.user, doSignUp, () => { localStorage.setItem("hasLoadedSeedsv2", true) });
}