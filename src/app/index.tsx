import { Input } from "@/components/input"
import { Image, View } from "react-native"

import { Button } from "@/components/button"
import { colors } from "@/styles/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { StatusBar } from "react-native"

export default function Home(){
	return(
		<View className="flex-1 bg-green-500 items-center justify-center">
					<StatusBar barStyle="light-content"/>
			<Image 
				source={require("@/assets/logo.png")} 
				className="h-16" 
				resizeMode="contain" 
			/>
			<View className="w-full mt-12 px-6 gap-3">
				<Input>
				<MaterialCommunityIcons 
				name="ticket-confirmation-outline"
				color={colors.green[200]}
				size={20}
				/>
					<Input.Field placeholder="Ticket code"/>
				</Input>

				<Button title="Credential Access" />
				<Link href="/register" className="text-gray-100 font-bold text-center mt-8">
					Are you still not have ticket?
				</Link>
			</View>
		</View>
	)
}
