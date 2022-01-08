import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { ref, computed, onMounted, onUnmounted } from "vue";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyC8f6A0qqwjgC7CViNjAg1M7QftldAUoyw",
  authDomain: "gurmani-backend-349cc.firebaseapp.com",
  projectId: "gurmani-backend-349cc",
  storageBucket: "gurmani-backend-349cc.appspot.com",
  messagingSenderId: "452902941388",
  appId: "1:452902941388:web:e1407d94ed20ab1b0c8869",
});

export const useAuthState = () => {
  const user = ref(null);
  const error = ref(null);

  const auth = getAuth();
  let unsubscribe;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      (u) => (user.value = u),
      (e) => (error.value = e)
    );
  });
  onUnmounted(() => unsubscribe());

  const isAuthenticated = computed(() => user.value != null);

  return { user, error, isAuthenticated };
};

export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
  );
