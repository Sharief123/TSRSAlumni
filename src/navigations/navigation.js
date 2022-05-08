import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome_Page from "../screens/Welcome_Page";
import Otp_Page from "../screens/Otp_Page";
import Class_Details from "../screens/Class_Details";
import Personal_Details from "../screens/Personal_Details";
import Professional_Details from "../screens/Professional_Details";
import Family_Details from "../screens/Family_Details";
import Add_Profile_Pic from "../screens/Add_Profile_Pic";
import Select_MemberShip from "../screens/Select_MemberShip";
import Profile from "../screens/Profile";
import Events_Home_Page from "../screens/Events_Home_Page";
import Insert_Event from "../screens/Insert_Event";
import { ProfileAppBar } from "../AppBars/ProfileAppBar";
import Home_Page from "../screens/Home_Page";
import Insert_Post from "../screens/Insert_Post";
import Financial_Page from "../screens/Financial_Page";
import My_Tasks from "../screens/My_Tasks";
import Notifications from "../screens/Notifications";
import Decision_Page from "../screens/Decision_Page";
import Action_Page from "../screens/Action";
import My_Events from "../screens/My_Events";
import My_messages from "../screens/My_Messages";
import About_us from "../screens/About_Us";
import Pending_Page from "../screens/Pending_Screen";
import Rejected_Page from "../screens/Rejcted_Page";
import Full_Event from "../screens/Full_Event";
import My_Event_Action from "../screens/My_Event_Action";
import Location from "../screens/Location";
import Locations from "../screens/Location";
import MapViews from "../screens/MapView";
import DynamicTextInput from "../screens/Dynamic_TextInput";
import Upload_F_R from "../screens/Insert_F_R";
import Full_Profile from "../screens/Full_Profile";
import PDF from "../screens/Pdf";
import GoogleAddress from "../screens/GoogleMapsCode";
import Members from "../screens/Members";

const stack = createStackNavigator();

//screens

//common styling for header
const commonStyle = {
  headerTitleAlign: "left",

  headerStyle: {
    backgroundColor: "#FFFF",
    elevation: 6,
  },
  headerTitleStyle: { 
    fontSize: 20,
  },
  headerTintColor: "black",
};

export function HomeScreen() {
  return (
    <stack.Navigator initialRouteName="home_page"
       screenOptions={{
        keyboardHandlingEnabled:"false"
       }}
       >
      <stack.Screen
        name="Welcome_Page"
        component={Welcome_Page}
        options={{
          // title: "My Profile",
          headerShown:false,
          ...commonStyle,
        }}
      />
      <stack.Screen
        name="Otp_Page"
        component={Otp_Page}
        options={{
          title: "Write Comment",
          ...commonStyle,
          headerShown:false,
        }}
      />

     <stack.Screen
            name="Class_Details"
            component={Class_Details}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />
           <stack.Screen
            name="notifications"
            component={My_Approvals}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />
      <stack.Screen
            name="Personal_Details"
            component={Personal_Details}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />

      <stack.Screen
            name="Family_Details"
            component={Family_Details}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />

      <stack.Screen
            name="Professional_Details"
            component={Professional_Details}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />

        <stack.Screen
            name="Add_Profile_Pic"
            component={Add_Profile_Pic}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />

      <stack.Screen
            name="Select_MemberShip"
            component={Select_MemberShip}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />
          <stack.Screen
            name="Profile"
            component={Profile}
            options={{
              header: (props) => <ProfileAppBar {...props} />,
              title: "Write Comment",
              ...commonStyle,
            }}
          />
           <stack.Screen
            name="F_P"
            component={Full_Profile}
            options={{
              header: (props) => <ProfileAppBar {...props} />,
              title: "Write Comment",
              ...commonStyle,
            }}
          />
           <stack.Screen
            name="EHP"
            component={Events_Home_Page}
            options={{
              title: "Write Comment",
              ...commonStyle,
            }}
          />

        <stack.Screen
            name="Insert_Event"
            component={Insert_Event}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false
            }}
          />
          <stack.Screen
            name="Insert_Post"
            component={Insert_Post}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false
            }}
          />
          <stack.Screen
            name="my_message"
            component={My_messages}
            options={{
              title: "Write Comment",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
          <stack.Screen
            name="home_page"
            component={Home_Page}
            options={{
              title: "Hoome page",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
          <stack.Screen
        name="Map_View"
        component={MapViews}
        options={{
          // title: "My Profile",
          headerShown:false,
          ...commonStyle,
        }}
      />
    </stack.Navigator>
  );
}

export function Nav_screens() {
  return (
    <stack.Navigator initialRouteName="Welcome_Page"
       screenOptions={{
        keyboardHandlingEnabled:"false"
       }}
       >
      <stack.Screen
        name="Welcome_Page"
        component={Welcome_Page}
        options={{
          // title: "My Profile",
          headerShown:false,
          ...commonStyle,
        }}
      />
      <stack.Screen
        name="Otp_Page"
        component={Otp_Page}
        options={{
          title: "Write Comment",
          ...commonStyle,
          headerShown:false,
        }}
      />

     <stack.Screen
            name="Class_Details"
            component={Class_Details}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />

      <stack.Screen
            name="Personal_Details"
            component={Personal_Details}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />
 <stack.Screen
        name="Map_View"
        component={MapViews}
        options={{
          // title: "My Profile",
          headerShown:false,
          ...commonStyle,
        }}
      />
<stack.Screen
            name="location"
            component={Locations}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />
      <stack.Screen
            name="Family_Details"
            component={Family_Details}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />

      <stack.Screen
            name="Professional_Details"
            component={Professional_Details}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />

        <stack.Screen
            name="Add_Profile_Pic"
            component={Add_Profile_Pic}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />

      <stack.Screen
            name="Select_MemberShip"
            component={Select_MemberShip}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />
          {/* <stack.Screen
            name="Profile"
            component={Profile}
            options={{
              header: (props) => <ProfileAppBar {...props} />,
              title: "Write Comment",
              ...commonStyle,
            }}
          /> */}
           <stack.Screen
            name="EHP"
            component={Events_Home_Page}
            options={{
              title: "Write Comment",
              ...commonStyle,
            }}
          />

        <stack.Screen
            name="Insert_Event"
            component={Insert_Event}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false
            }}
          />
          <stack.Screen
            name="home_page"
            component={Home_Page}
            options={{
              title: "Hoome page",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
          <stack.Screen
            name="Profile_pending"
            component={Pending_Page}
            options={{
              title: "Hoome page",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
           <stack.Screen
            name="Reject_Page"
            component={Rejected_Page}
            options={{
              title: "Hoome page",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
    </stack.Navigator>
  );
}

export function home_page(props) {
  return (
    <stack.Navigator 
    screenOptions={{
      keyboardHandlingEnabled:"false"
     }}>
       <stack.Screen
            name="home_page"
            component={Home_Page}
            options={{
              title: "Hoome page",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
    </stack.Navigator>
  );
}


export function profile(props) {
  return (
    <stack.Navigator 
    screenOptions={{
      keyboardHandlingEnabled:"false"
     }}>
       <stack.Screen
            name="PROFILE"
            component={Profile}
            options={{
              title: "Write Comment",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />

<stack.Screen
            name="DTI"
            component={DynamicTextInput}
            options={{
              title: "Write Comment",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
           {/* <stack.Screen
            name="home_page"
            component={Home_Page}
            options={{
              title: "Hoome page",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
          <stack.Screen
            name="Insert_Post"
            component={Insert_Post}
            options={{
              title: "Hoome page",
              ...commonStyle,
              headerShown:false
              // header: (props) => <ProfileAppBar {...props} />,
            }}
          /> */}
           <stack.Screen
            name="notifications"
            component={My_Approvals}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />
    </stack.Navigator>
  );
}

export function Events(props) {
  return (
    <stack.Navigator 
      screenOptions={{
        keyboardHandlingEnabled:"false"
      }}    >
      <stack.Screen
            name="EHP"
            component={Events_Home_Page}
            options={{
              title: "Write Comment",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />

        <stack.Screen
            name="Insert_Event"
            component={Insert_Event}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false
            }}
          />

          <stack.Screen
              name="My_events"
              component={My_Events}
              options={{
                title:"Write",
                ...commonStyle,
                header: (props) => <ProfileAppBar {...props} />,
              }}
          />
          <stack.Screen
            name="full_event"
            component={Full_Event}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />
          <stack.Screen
            name="notifications"
            component={My_Approvals}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
            }}
          />
          <stack.Screen
            name="F_P"
            component={Full_Profile}
            options={{
              header: (props) => <ProfileAppBar {...props} />,
              title: "Write Comment",
              ...commonStyle,
            }}
          />
    </stack.Navigator>
  );
}


export function Financial_Reports(props) {
  return (
    <stack.Navigator 
      screenOptions={{
        keyboardHandlingEnabled:"false"
      }}    >
      <stack.Screen
            name="Financial_Page" 
            component={Financial_Page}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
          <stack.Screen
            name="Upload_Financial_Page" 
            component={Upload_F_R}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
          <stack.Screen
            name="pdf" 
            component={PDF}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
    </stack.Navigator>
  );
}



export function My_Approvals(props) {
  return (
    <stack.Navigator 
      screenOptions={{
        keyboardHandlingEnabled:"false"
      }}    >
      <stack.Screen
            name="My_Tasks"
            component={My_Tasks}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
          <stack.Screen
            name="My_Message_Action"
            component={Action_Page}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
          <stack.Screen
            name="My_Event_Action"
            component={My_Event_Action}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
          <stack.Screen
            name="My_Descision_Page"
            component={Decision_Page}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />
    </stack.Navigator>
  );
}

export function my_events(props) {
  return (
    <stack.Navigator 
      screenOptions={{
        keyboardHandlingEnabled:"false"
      }}    >
      <stack.Screen
            name="My_events"
            component={My_Events}
            options={{
              title: "Write Comment",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />

        <stack.Screen
            name="Insert_Event"
            component={Insert_Event}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false
            }}
          />
          <stack.Screen
            name="Full_event"
            component={Full_Event}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false
            }}
          />
    </stack.Navigator>
  );
}
export function My_Messages(props) {
  return (
    <stack.Navigator 
      screenOptions={{
        keyboardHandlingEnabled:"false"
      }}    >
      <stack.Screen
            name="my_message"
            component={My_messages}
            options={{
              title: "Write Comment",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />

        <stack.Screen
            name="Insert_Post"
            component={Insert_Post}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false
            }}
          />
    </stack.Navigator>
  );
}

export function About_Alumni(props) {
  return (
    <stack.Navigator 
      screenOptions={{
        keyboardHandlingEnabled:"false"
      }}    >

      <stack.Screen
            name="About_Us"
            component={About_us}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />

    </stack.Navigator>
  );
}

export function Upload_Financial_Reports(props) {
  return (
    <stack.Navigator 
      screenOptions={{
        keyboardHandlingEnabled:"false"
      }}    >

      <stack.Screen
            name="members"
            component={Members}
            options={{
              title: "Write Comment",
              ...commonStyle,
              headerShown:false,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />

      <stack.Screen
            name="full"
            component={Full_Profile}
            options={{
              title: "Write Comment",
              ...commonStyle,
              header: (props) => <ProfileAppBar {...props} />,
            }}
          />

    </stack.Navigator>
  );
}
