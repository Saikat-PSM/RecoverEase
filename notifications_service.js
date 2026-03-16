import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Session times in 24h format
export const SESSION_TIMES = {
  Morning:   { hour: 8,  minute: 0 },
  Afternoon: { hour: 13, minute: 0 },
  Night:     { hour: 20, minute: 0 },
};

// ── Permission ───────────────────────────────────────────────────────────────
export async function requestNotificationPermission() {
  if (!Device.isDevice) {
    console.warn('Push notifications only work on physical devices.');
    return false;
  }
  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.warn('Notification permission denied.');
    return false;
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('medicine-reminders', {
      name: 'Medicine Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#185FA5',
    });
  }
  return true;
}

// ── Schedule a nudge for a single session ───────────────────────────────────
/**
 * scheduleNudge
 * @param {string} session      - "Morning" | "Afternoon" | "Night"
 * @param {number} nudgeMinutes - Minutes before session to notify (5 | 10 | 15)
 * @param {string} caregiverName
 * @param {string[]} medicineNames
 * @returns {Promise<string>} notificationId
 */
export async function scheduleNudge(session, nudgeMinutes, caregiverName, medicineNames) {
  const base = SESSION_TIMES[session];
  if (!base) throw new Error(`Unknown session: ${session}`);

  // Calculate trigger time = session time minus nudge minutes
  const now = new Date();
  const trigger = new Date();
  trigger.setHours(base.hour, base.minute - nudgeMinutes, 0, 0);

  // If that time has already passed today, schedule for tomorrow
  if (trigger <= now) trigger.setDate(trigger.getDate() + 1);

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: `💊 Medicine Time in ${nudgeMinutes} min — ${session}`,
      body: `${medicineNames.slice(0, 3).join(', ')}${medicineNames.length > 3 ? ` +${medicineNames.length - 3} more` : ''}`,
      data: { session, caregiverName, nudgeMinutes },
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: {
      date: trigger,
      repeats: false,
    },
  });

  console.log(`Nudge scheduled for ${caregiverName} at ${trigger.toLocaleTimeString()} (${session} - ${nudgeMinutes}min early). ID: ${id}`);
  return id;
}

// ── Schedule daily recurring nudges for all active caregivers ───────────────
/**
 * scheduleAllNudges
 * Schedules a daily notification for each session × caregiver combination.
 * Call this when caregivers are added/updated or app starts.
 */
export async function scheduleAllNudges(caregivers, medicines) {
  await cancelAllNudges(); // clear old ones first

  const activeCaregivers = caregivers.filter(c => c.active);
  const scheduledIds = [];

  for (const session of ['Morning', 'Afternoon', 'Night']) {
    const sessionMeds = medicines.filter(m => m.active && m.sessions.includes(session));
    if (sessionMeds.length === 0) continue;
    const medNames = sessionMeds.map(m => m.name);

    for (const cg of activeCaregivers) {
      // Schedule a daily repeating notification
      const base = SESSION_TIMES[session];
      let minuteOffset = base.minute - cg.nudgeMinutes;
      let hourOffset = base.hour;
      if (minuteOffset < 0) { minuteOffset += 60; hourOffset -= 1; }

      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `💊 Give medicines in ${cg.nudgeMinutes} min — ${session}`,
          body: `${medNames.slice(0, 2).join(', ')}${medNames.length > 2 ? ` +${medNames.length - 2} more` : ''}`,
          data: { session, caregiverId: cg.id, nudgeMinutes: cg.nudgeMinutes },
          sound: true,
        },
        trigger: {
          hour: hourOffset,
          minute: minuteOffset,
          repeats: true,
        },
      });
      scheduledIds.push({ id, caregiverId: cg.id, session });
    }
  }
  return scheduledIds;
}

// ── Cancel all scheduled nudges ──────────────────────────────────────────────
export async function cancelAllNudges() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// ── Send an immediate test nudge ─────────────────────────────────────────────
export async function sendTestNudge(caregiverName, session = 'Morning') {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `🔔 Test Nudge — RecoverEase`,
      body: `This is a test notification for ${caregiverName}. Real nudges work just like this!`,
      sound: true,
    },
    trigger: { seconds: 2 },
  });
}

// ── Notification handler setup ───────────────────────────────────────────────
export function setupNotificationHandlers(onReceive, onResponse) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const receiveSub = Notifications.addNotificationReceivedListener(onReceive);
  const responseSub = Notifications.addNotificationResponseReceivedListener(onResponse);

  return () => {
    receiveSub.remove();
    responseSub.remove();
  };
}
