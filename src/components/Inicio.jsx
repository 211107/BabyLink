import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image as RNImage,
} from 'react-native';
import Svg, {Text as SvgText, Image as SvgImage, Rect} from 'react-native-svg';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BabyService from '../infrastructure/repositories/ApiBbayRepositor';
import moment from 'moment';
moment.locale('es');

const Inicio = ({navigation}) => {
  const [usuarioNombre, serUsuarioNombre] = useState('');
  const [nombreBebe, setNombreBebe] = useState('');
  const [pesoBebe, setPesoBebe] = useState('');
  const [estaturaBebe, setEstaturaBebe] = useState('');
  const [fechaNacimientoBebe, setFechaNacimientoBebe] = useState('');
  const [bebe, setBebe] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (isFocused) {
      cargarDatos();
      console.log('Inicio cargado');
    }
  }, [isFocused]);

  const cargarDatos = async () => {
    try {
      const usuario = JSON.parse(await AsyncStorage.getItem('usuario'));
      console.log('storage inicio: ', usuario);
      serUsuarioNombre(usuario?.fullName + ' ' + usuario?.fullLastName);
      let baby = await BabyService.getBabyById(usuario?.IdUser);

      setBebe(baby?.value);
      AsyncStorage.setItem('bebe', JSON.stringify(baby?.value));
      if (baby?.value) {
        setNombreBebe(baby?.value?.nameBaby);
        setPesoBebe(baby?.value?.weight);
        setEstaturaBebe(baby?.value?.height);
        setFechaNacimientoBebe(
          moment(baby?.value?.birthdate).format('DD [de] MMM [de] YYYY'),
        );
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Svg height="1001" width="543" style={styles.svgContainer}>
          <SvgText
            x="100"
            y="35"
            fill="#000"
            fontSize="24"
            fontFamily="Urbanist-Bold"
            textAnchor="start">
            {`${usuarioNombre}`}
          </SvgText>
          <Rect
            x="86.5"
            y="90"
            width="370"
            height="210"
            rx="25"
            fill="#4CCFC0"
          />
          <SvgImage
            x="310"
            y="50"
            width="150"
            height="177"
            href={require('../assets/images/nino2.png')}
          />
          <Rect
            x="56.5"
            y="348"
            width="430"
            height="593"
            rx="58"
            ry="58"
            fill="rgba(76, 207, 192, 0.18)"
          />

          {/* Información del bebé */}
          <SvgText
            x="101.5"
            y="140"
            fill="#FFF"
            fontSize="23"
            fontWeight="bold">
            {`${nombreBebe}`}
          </SvgText>
          <SvgText x="101.5" y="200" fill="#FFF" fontSize="20">
            Peso: {pesoBebe} kg
          </SvgText>
          <SvgText x="101.5" y="235" fill="#FFF" fontSize="20">
            Estatura: {estaturaBebe} cm
          </SvgText>
          <SvgText x="101.5" y="280" fill="#FFF" fontSize="20">
            {fechaNacimientoBebe ?? ""}
          </SvgText>

          {/* Botón de editar */}
        </Svg>
        <TouchableOpacity
          style={styles.editButton}
          onPress={async () => {
            await navigation.navigate('RegistroBebe', {bebe: bebe ?? null});
          }}>
          <View style={styles.editButtonContent}>
            <RNImage
              source={require('../assets/images/edit_icon.png')}
              style={styles.editIcon}
            />
          </View>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('RegistroCita')}>
            <Svg height="150" width="150">
              <Rect
                x="0"
                y="0"
                width="150"
                height="150"
                rx="12"
                ry="12"
                fill="#FFFFFF"
              />
              <SvgImage
                x="50"
                y="50"
                width="50"
                height="50"
                href={require('../assets/images/citamedica.png')}
              />
              <SvgText
                x="75"
                y="120"
                fill="#000"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle">
                Cita Médica
              </SvgText>
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('Vacunacion')}>
            <Svg height="150" width="150">
              <Rect
                x="0"
                y="0"
                width="150"
                height="150"
                rx="12"
                ry="12"
                fill="#FFFFFF"
              />
              <SvgImage
                x="50"
                y="50"
                width="50"
                height="50"
                href={require('../assets/images/vacuna.png')}
              />
              <SvgText
                x="75"
                y="120"
                fill="#000"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle">
                Vacunación
              </SvgText>
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('SueñoPrincipal')}>
            <Svg height="150" width="150">
              <Rect
                x="0"
                y="0"
                width="150"
                height="150"
                rx="12"
                ry="12"
                fill="#FFFFFF"
              />
              <SvgImage
                x="50"
                y="50"
                width="50"
                height="50"
                href={require('../assets/images/sueno.png')}
              />
              <SvgText
                x="75"
                y="120"
                fill="#000"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle">
                Sueño
              </SvgText>
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('Alimentacion')}>
            <Svg height="150" width="150">
              <Rect
                x="0"
                y="0"
                width="150"
                height="150"
                rx="12"
                ry="12"
                fill="#FFFFFF"
              />
              <SvgImage
                x="50"
                y="50"
                width="50"
                height="50"
                href={require('../assets/images/alimentacion.png')}
              />

              <SvgText
                x="75"
                y="120"
                fill="#000"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle">
                Alimentación
              </SvgText>
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Menu')}>
          <RNImage
            source={require('../assets/images/Usuario.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Notificaciones')}>
          <RNImage
            source={require('../assets/images/notificaciones.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <RNImage
            source={require('../assets/images/home.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('ChatPadres')}>
          <RNImage
            source={require('../assets/images/comentarios.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Pediatras')}>
          <RNImage
            source={require('../assets/images/doctores.png')}
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Logo del menú */}
      <TouchableOpacity
        style={styles.tabIcon1}
        onPress={() => navigation.navigate('Menu')}>
        <RNImage
          source={require('../assets/images/menu.png')}
          style={styles.menuLogo}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  svgContainer: {
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  editButton: {
    position: 'absolute',
    left: 290, // Ajusta la posición según sea necesario
    top: 260, // Ajusta la posición según sea necesario
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#4CCFC0',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    top: 395, // Ajusta la posición según sea necesario
  },
  cardButton: {
    marginBottom: 20,
    marginHorizontal: 10, // Espacio horizontal entre botones
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon1Container: {
    position: 'absolute',
    top: 0,
    left: 10,
  },
  tabIcon1: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 25,
    left: 350,
  },
  menuLogo: {
    width: 30,
    height: 30,
  },
});

export default Inicio;
