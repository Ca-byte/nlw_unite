import "../styles/global.css";

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_700Bold,
	useFonts
} from "@expo-google-fonts/roboto";

export default function Layout(){
	const [fontLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_700Bold
	})
	if (!fontLoaded){
		return
	}
	return(
		<>
		<StatusBar style="light"/>
		<Slot />
		</>
	)
}