// @flow
import React from "react";
import {Root} from "native-base";
import {StackNavigator, DrawerNavigator} from "react-navigation";

import SideBar from "./screens/sidebar";

import layoutLanchi from "./screens/lanchi";
import layoutLagarsh from "./screens/lagarsh";
import layoutLelijish from "./screens/lelijish";
import layoutMereja from "./screens/mereja";
import layoutYebetesebEkid from "./screens/yebetesebekid";

import layoutHome from "./layouts/Home";
import layoutDetail from "./layouts/Detail";
import layoutKickCounter from "./layouts/KickCounter";
import layoutSymptoms from "./layouts/Symptoms";
import layoutDueDate from "./layouts/DueDate";
import layoutPeriod from "./layouts/DueDate/period";
import layoutCall from "./layouts/Calls";
import layoutNotebook from "./layouts/Notebook";
import layoutEditor from "./layouts/Notebook/editor";
import layoutReminder from "./layouts/Reminder";
import layoutReminderEditor from "./layouts/Reminder/editor";
import layoutWeight from "./layouts/WeightCalculator";
import layoutVaccination from "./layouts/Vaccination";
import layoutBabyName from "./layouts/BabyName";
import layoutBabyMusic from "./layouts/BabyMusic";
import layoutGallery from "./layouts/Gallery";
import layoutCamera from "./layouts/Gallery/camera";
import layoutDetailPicture from "./layouts/Gallery/detailPicture";
import layoutChildFood from "./layouts/ChildFood";
import layoutAboutUs from "./layouts/AboutUs";

const Drawer = DrawerNavigator(
    {
        Home: {screen: layoutHome},
        Detail: {screen: layoutDetail},
        Lanchi: {screen: layoutLanchi},
        Lelijish: {screen: layoutLelijish},
        Lagarsh: {screen: layoutLagarsh},
        Mereja: {screen: layoutMereja},
        YebetesebEkid: {screen: layoutYebetesebEkid},
        KickCounter: {screen: layoutKickCounter},
        Symptoms: {screen: layoutSymptoms},
        DueDate: {screen: layoutDueDate},
        Period: {screen: layoutPeriod},
        Calls: {screen: layoutCall},
        Notebook: {screen: layoutNotebook},
        NoteEditor: {screen: layoutEditor},
        Reminder: {screen: layoutReminder},
        ReminderEditor: {screen: layoutReminderEditor},
        Weight: {screen: layoutWeight},
        Vaccination: {screen: layoutVaccination},
        BabyName: {screen: layoutBabyName},
        BabyMusic: {screen: layoutBabyMusic},
        Gallery: {screen: layoutGallery },
        TakePicture: {screen: layoutCamera},
        ChildFood: {screen: layoutChildFood},
        AboutUs: {screen: layoutAboutUs},
    },
    {
        initialRouteName: "Home",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

const AppNavigator = StackNavigator(
    {
        Drawer: {screen: Drawer},
        Detail: {screen: layoutDetail},
        Lanchi: {screen: layoutLanchi},
        Lelijish: {screen: layoutLelijish},
        Lagarsh: {screen: layoutLagarsh},
        Mereja: {screen: layoutMereja},
        YebetesebEkid: {screen: layoutYebetesebEkid},
        NoteEditor: {screen: layoutEditor},
        Period: {screen: layoutPeriod},
        DetailPicture : {screen: layoutDetailPicture},
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
