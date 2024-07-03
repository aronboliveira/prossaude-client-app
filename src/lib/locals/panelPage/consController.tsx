import { User } from "../../global/declarations/classes";

export const fillScheduleState = { acc: 0 };
export const formData: { [key: string]: string } = {};
export const user = (async () => {
  let userName = "Anônimo",
    userArea = "odontologia",
    userClass = "estudante",
    userEmail = "Não fornecido",
    userTel = "Não fornecido";
  try {
    const res = await fetch("user.json", {
      method: "GET",
    });
    if (!res.ok) throw new Error(`Failed to get proper response from server.`);
    const fetchedUser = await res.json();
    if (!fetchedUser) throw new Error(`Failed to parse fetched data.`);
    return Object.freeze(
      new User(
        fetchedUser._class,
        fetchedUser._area,
        fetchedUser._name,
        fetchedUser._email,
        fetchedUser._tel
      )
    );
  } catch (err) {
    setTimeout(() => {
      if (
        document.getElementById("nameLogin")?.innerText === "" ||
        (document.getElementById("nameLogin") &&
          /anônimo/gi.test(document.getElementById("nameLogin")!.innerText))
      )
        console.error(`FETCH ERROR:
    ${(err as Error).message}`);
    }, 1000);
    return Object.freeze(
      new User(userClass, userArea, userName, userEmail, userTel)
    );
  }
})();
