export const notifier = {
  getPermission: async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      throw new Error('Notifications permition denied!');
    }
  },
  notify: async (title, body) => {
    new Notification(title, { body, icon: '../timer.svg' });
  },
};
