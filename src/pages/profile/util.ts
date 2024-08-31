export const getTimeSpecificWelcomeMessage = (userName: string | undefined) => {
  const currentHour = new Date().getHours();
  const nameOrEmpty = userName ? `, ${userName.split(" ")[0]}` : "";
  let message = "";

  if (currentHour >= 5 && currentHour < 12) {
    const morningMessages = [
      `Good morning${nameOrEmpty}! Ready to whip up something delicious for breakfast? 🍳`,
      `Morning${nameOrEmpty}! The kitchen is calling, and it's time for a tasty start! ☕`,
      `Top of the morning to you${nameOrEmpty}! Let's make breakfast the best meal of the day! 🥐`,
      `Good morning${nameOrEmpty}! Time to cook up some morning magic! 🥚`,
    ];
    message =
      morningMessages[Math.floor(Math.random() * morningMessages.length)];
  } else if (currentHour >= 12 && currentHour < 17) {
    const afternoonMessages = [
      `Good afternoon${nameOrEmpty}! How about a tasty lunch idea? 🥗`,
      `Hey${nameOrEmpty}! Ready to try a new recipe for lunch today? 🥙`,
      `Good afternoon${nameOrEmpty}! Let's cook something delicious to power through the day! 🌯`,
      `Good afternoon${nameOrEmpty}! Ready to spice up your lunch? 🥪`,
    ];
    message =
      afternoonMessages[Math.floor(Math.random() * afternoonMessages.length)];
  } else if (currentHour >= 17 && currentHour < 21) {
    const eveningMessages = [
      `Good evening${nameOrEmpty}! What's cooking for dinner tonight? 🍲`,
      `Evening${nameOrEmpty}! Ready to try a new dinner recipe? 🍝`,
      `Good evening${nameOrEmpty}! Let's end the day with a delicious meal! 🥘`,
      `Hey ${nameOrEmpty}, it's dinner time! What's on the menu? 🍱`,
    ];
    message =
      eveningMessages[Math.floor(Math.random() * eveningMessages.length)];
  } else {
    const nightMessages = [
      `Good night${nameOrEmpty}! How about a quick snack before bed? 🍪`,
      `Nighty night${nameOrEmpty}! Don't forget to prep something yummy for tomorrow! 🥮`,
      `Good night${nameOrEmpty}! Time for some late-night recipe inspiration!🍗`,
      `Sweet dreams${nameOrEmpty}! Maybe dream up a new recipe for tomorrow! 🍜`,
    ];
    message = nightMessages[Math.floor(Math.random() * nightMessages.length)];
  }

  return message;
};
