import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import io from 'socket.io-client';
import CitasMedicasServices from '../../infrastructure/repositories/CitasMedicasServices';
import moment from 'moment';
import DreamService from '../../infrastructure/repositories/ApiDreamRepository';
moment.locale('es');

const socket = io('https://babylink.liosftwr.space/api-baby-link'); // APIGATEWAY

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'babylink-channel',
        channelName: 'Babylink Notifications',
        channelDescription: 'Canal de notificaciones de Babylink',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`)
    );

    PushNotification.configure({
      onNotification: function (notification) {
        const nuevaNotificacion = {
          id: Math.random(),
          texto: notification.message,
          tiempo: 'ahora',
        };
        setNotificaciones(prevNotificaciones => [
          ...prevNotificaciones,
          nuevaNotificacion,
        ]);
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    socket.on('newRecord', async newRecord => {
      PushNotification.localNotification({
        title: 'Nueva Notificación',
        message: 'Han comentado algo en el chat',
        playSound: true,
        soundName: 'default',
      });
    });

    socket.on('tick', async newRecord => {
      listarCitasMedicas();
      listarDreams();
    });

    return () => {
      socket.off('newRecord');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    listarCitasMedicas();
    listarDreams();
  }, []);

  useEffect(() => {
    try {
      const intervalo = setInterval(() => {
        listarCitasMedicas();
        listarDreams();
      }, 5000);
      return () => clearInterval(intervalo);
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const listarDreams = async () => {
    try {
      let { IdBaby, nameBaby } = JSON.parse(await AsyncStorage.getItem('bebe'));
      if (!IdBaby) return;
      const response = await DreamService.list(IdBaby);
      console.log('dreams notifications', response);
      if (response) {
        const newNotificaciones = response.value.filter(async item => {
          const notificationSent = await isNotificationSent(item?.IdDream);
          return notificationSent;
        }).map(item => ({
          id: item?.IdDream,
          texto: `Hora de dormir a las ${item?.initialHour}`,
          tiempo: moment(`${item?.initialHour}`, 'HH:mm A').fromNow(),
          icono: require('../../assets/images/notificaciones.png'),
        }));
        
        setNotificaciones(prevNotificaciones => mergeNotificaciones(prevNotificaciones, newNotificaciones));
        
        response.value.forEach(async item => {
          const hourToDream = moment(`${item?.initialHour}`, 'HH:mm:ss');
          if (isFifteenMinutesOrLessAway(hourToDream)) {
            const notificationSent = await isNotificationSent(item?.IdDream);
            if (!notificationSent) {
              PushNotification.localNotification({
                channelId: 'babylink-channel',
                title: 'Recordatorio de Sueño',
                message: `${nameBaby} llegó la hora de dormir`,
                playSound: true,
                soundName: 'default',
              });
              await markNotificationAsSent(item?.IdDream);
            }
          }
        });
      } else {
        console.log('sin respuesta: ', response);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const listarCitasMedicas = async () => {
    try {
      let { IdBaby } = JSON.parse(await AsyncStorage.getItem('bebe'));
      if (!IdBaby) return;
      const response = await CitasMedicasServices.list(IdBaby);
      if (response) {
        const newNotificaciones = response.value.filter(async item => {
          const notificationSent = await isNotificationSent(item?.IdMedicalAppointment);
          return notificationSent;
        }).map(item => ({
          id: item?.IdMedicalAppointment,
          texto: `${item?.title}`,
          tiempo: moment(`${item?.date} ${item?.hour}`, 'YYYY-MM-DD HH:mm:ss').fromNow(),
          icono: require('../../assets/images/notificaciones.png'),
        }));
        
        setNotificaciones(prevNotificaciones => mergeNotificaciones(prevNotificaciones, newNotificaciones));

        response.value.forEach(async item => {
          const appointmentTime = moment(`${item?.date} ${item?.hour}`, 'YYYY-MM-DD HH:mm:ss');
          if (isFifteenMinutesOrLessAway(appointmentTime)) {
            const notificationSent = await isNotificationSent(item?.IdMedicalAppointment);
            if (!notificationSent) {
              PushNotification.localNotification({
                channelId: 'babylink-channel',
                title: 'Recordatorio de Cita',
                message: `Tienes una cita médica a las ${appointmentTime.format('HH:mm A')}`,
                playSound: true,
                soundName: 'default',
              });
              await markNotificationAsSent(item?.IdMedicalAppointment);
            }
          }
        });
      } else {
        console.log('sin respuesta: ', response);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const isFifteenMinutesOrLessAway = targetDateTime => {
    const now = moment().local();
    const differenceInMinutes = targetDateTime.diff(now, 'minutes');
    console.log('differenceInMinutes', differenceInMinutes, ' ahora: ', now, ' cita: ', targetDateTime);
    return differenceInMinutes <= 15 && differenceInMinutes >= 0;
  };

  const isNotificationSent = async appointmentId => {
    try {
      const sentNotifications = await AsyncStorage.getItem('sentNotifications');
      if (sentNotifications) {
        const parsedNotifications = JSON.parse(sentNotifications);
        return parsedNotifications.includes(appointmentId);
      }
      return false;
    } catch (error) {
      console.log('Error checking if notification was sent:', error);
      return false;
    }
  };

  const markNotificationAsSent = async appointmentId => {
    try {
      const sentNotifications = await AsyncStorage.getItem('sentNotifications');
      let parsedNotifications = [];
      if (sentNotifications) {
        parsedNotifications = JSON.parse(sentNotifications);
      }
      parsedNotifications.push(appointmentId);
      await AsyncStorage.setItem('sentNotifications', JSON.stringify(parsedNotifications));
    } catch (error) {
      console.log('Error marking notification as sent:', error);
    }
  };

  const mergeNotificaciones = (oldList, newList) => {
    const combined = [...oldList, ...newList];
    const uniqueNotificaciones = [];
    const seenIds = new Set();

    combined.forEach(item => {
      if (!seenIds.has(item.id)) {
        uniqueNotificaciones.push(item);
        seenIds.add(item.id);
      }
    });

    return uniqueNotificaciones;
  };

  return (
    <NotificationContext.Provider value={{ notificaciones }}>
      {children}
    </NotificationContext.Provider>
  );
};