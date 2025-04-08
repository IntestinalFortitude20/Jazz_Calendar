import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
  
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: "#33B5E5", //bottom tab color ("#4885ED" pixel blue, "#33B5E5" ICS blue )
        headerStyle: {
          backgroundColor: "#25292e", //header bar color
        },
        headerShadowVisible: false,
        headerTintColor: "#fff", //header text color
        tabBarStyle: {
          backgroundColor: "#25292e", //bottom tab background color
        }
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: "Jazz Events",
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={28} 
            />
          )
        }}
      />

      <Tabs.Screen
        name="calendar" //This is the file calendar.tsx
        options={{
          title: 'Calendar', //This is the title of the tab
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name={focused ? "calendar-number" : "calendar-number-outline"}
              color={color}
              size={28} 
            />
          )
        }}
      />

      <Tabs.Screen
        name="about"
        options={ {
                title: 'About',
                tabBarIcon: ({color, focused}) => (
                    <Ionicons
                        name={focused ? 'information-circle' : 'information-outline'}
                        color={color}
                        size={28} 
                    />
                )
            } }
      />
    </Tabs>
  
  );
}


// {

// export default function TabLayout() {
//     return (
//             <Tabs
//                 screenOptions={ {
//                         tabBarActiveTintColor: '#7cfc00',
//                         headerStyle: {
//                             backgroundColor: '#25292e',
//                         },
//                         headerShadowVisible: false,
//                         headerTintColor: '#fff',
//                         tabBarStyle: {
//                             backgroundColor: '#25292e',
//                         }
//                     } }
//             >
//                 <Tabs.Screen
//                     name="index"
//                     options={ {
//                             title: 'Home',
//                             tabBarIcon: ({color, focused}) => (
//                                 <Ionicons
//                                     name={focused ? 'home-sharp' : 'home-outline'}
//                                     color={color}
//                                     size={24} 
//                                 />
//                             )
//                         } }
//                 />

//                 <Tabs.Screen
//                     name="about"
//                     options={ {
//                             title: 'About',
//                             tabBarIcon: ({color, focused}) => (
//                                 <Ionicons 
//                                     name={focused ? 'information-circle' : 'information-outline'}
//                                     color={color}
//                                     size={24}
//                                 />
//                             )
//                         } }
//                 />
//             </Tabs>
//     );
// }

// }