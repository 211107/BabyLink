// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Portada,
  AgregarAlimento,
  Alimentacion,
  AlimentoList,
  ChatPadres,
  CitaMedica,
  Inicio,
  Lista04,
  Lista06,
  Lista18,
  ListaSueno,
  Login,
  Menu,
  Notificaciones,
  Pediatras,
  PersonalizadoSueno,
  Registro,
  RegistroBebe,
  RegistroCita,
  SueñoPrincipal,
  Vacunacion,
  Bienvenida
} from './src/components';
import { NotificationProvider } from './src/components/context/NotificationContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Portada"
            component={Portada}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen
            name="Bienvenida"
            component={Bienvenida}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegistroBebe"
            component={RegistroBebe}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pediatras"
            component={Pediatras}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatPadres"
            component={ChatPadres}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notificaciones"
            component={Notificaciones}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cita Medica"
            component={CitaMedica}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Vacunacion"
            component={Vacunacion}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Lista04"
            component={Lista04}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Lista06"
            component={Lista06}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Lista18"
            component={Lista18}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SueñoPrincipal"
            component={SueñoPrincipal}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ListaSueno"
            component={ListaSueno}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PersonalizadoSueno"
            component={PersonalizadoSueno}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Alimentacion"
            component={Alimentacion}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AlimentoList"
            component={AlimentoList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AgregarAlimento"
            component={AgregarAlimento}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="RegistroCita"
            component={RegistroCita}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
};

export default App;
