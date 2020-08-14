self.addEventListener('notificationclick', (e) => {
	const { action, notification } = e;
	if (action === 'show') {
		clients.openWindow(notification.data.url);
		notification.close();
	}
});
