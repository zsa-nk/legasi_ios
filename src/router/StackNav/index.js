import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../container/pages/LoginScreen';
import HomeScreen from '../../container/pages/HomeScreen';
import PenyesuaianKehadiran from '../../container/pages/PenyesuaianKehadiran';
import ProfileScreen from '../../container/pages/ProfileScreen';
import AbsenKeluarScreen from '../../container/pages/AbsenKeluarScreen';
import AbsenMasukScreen from '../../container/pages/AbsenMasukScreen';
import InformasiScreen from '../../container/pages/InformasiScreen';
import RekapitulasiScreen from '../../container/pages/RekapitulasiScreen';
import ScanDokumenScreen from '../../container/pages/ScanDokumenScreen';
import StatistikScreen from '../../container/pages/StatistikScreen';
import StatistikPendidikan from '../../container/pages/StatistikPendidikan';
import AbsenCameraFaceDetection from '../../container/pages/AbsenMasukScreen/AbsenCameraFaceDetection';
import AbsenCamera from '../../container/pages/AbsenMasukScreen/AbsenCamera';

import HistoryJabatan from '../../container/pages/HistoryJabatan';
import HistoryPendidikan from '../../container/pages/HistoryPendidikan';
import Ekinerja from '../../container/pages/Ekinerja';
import PamongWalagri from '../../container/pages/PamongWalagri';
import PengajuanCuti from '../../container/pages/PengajuanCuti';
import Keluarga from '../../container/pages/Keluarga';
import JFPro from '../../container/pages/JFPro';
import SiPUJANGGA from '../../container/pages/SiPUJANGGA';
import TemanKita from '../../container/pages/TemanKita';

import UserProfile from '../../container/pages/UserProfile';
import HistoryKGB from '../../container/pages/HistoryKGB';
import HistoryKepangkatan from '../../container/pages/HistoryKepangkatan';
import HistorySKP from '../../container/pages/HistorySKP';
import HistoryDiklat from '../../container/pages/HistoryDiklat';
import TambahDinasLuar from '../../container/pages/TambahDinasLuar';
import AbsenCameraOut from '../../container/pages/AbsenKeluarScreen/AbsenCameraOut';
import AbsenCameraOutFaceDetection from '../../container/pages/AbsenKeluarScreen/AbsenCameraOutFaceDetection';
import SplashScreen from '../../container/pages/SplashScreen';
import useAuth from '../../app/_hooks/useAuth';

const Stack = createStackNavigator();
const Router = ({initialRouteName}) => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AbsenKeluarScreen"
        component={AbsenKeluarScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AbsenCamera"
        component={AbsenCameraFaceDetection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AbsenCameraOut"
        component={AbsenCameraOutFaceDetection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AbsenMasukScreen"
        component={AbsenMasukScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InformasiScreen"
        component={InformasiScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PenyesuaianKehadiran"
        component={PenyesuaianKehadiran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RekapitulasiScreen"
        component={RekapitulasiScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScanDokumenScreen"
        component={ScanDokumenScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatistikScreen"
        component={StatistikScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StatistikPendidikan"
        component={StatistikPendidikan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Ekinerja"
        component={Ekinerja}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SiPUJANGGA"
        component={SiPUJANGGA}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PamongWalagri"
        component={PamongWalagri}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TemanKita"
        component={TemanKita}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PengajuanCuti"
        component={PengajuanCuti}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HistoryJabatan"
        component={HistoryJabatan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HistoryPendidikan"
        component={HistoryPendidikan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HistoryKGB"
        component={HistoryKGB}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HistoryKepangkatan"
        component={HistoryKepangkatan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HistorySKP"
        component={HistorySKP}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HistoryDiklat"
        component={HistoryDiklat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Keluarga"
        component={Keluarga}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TambahDinasLuar"
        component={TambahDinasLuar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JFPro"
        component={JFPro}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
